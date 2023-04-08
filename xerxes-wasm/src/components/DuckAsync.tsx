import * as duckdb from "@duckdb/duckdb-wasm";
const duckdb_wasm = require("@duckdb/duckdb-wasm/dist/duckdb-mvp.wasm");
const duckdb_wasm_eh = require("@duckdb/duckdb-wasm/dist/duckdb-eh.wasm");
const shell_wasm = require('@duckdb/duckdb-wasm-shell/dist/shell_bg.wasm');

import React from "react";
import styled from 'styled-components';
import "xterm/css/xterm.css";

const Container = styled.div`
  width: 100%;
  height: 100%;
  overflow: hidden;
  padding: 16px 0 0 20px;
  background-color: #333;
`

const DUCKDB_BUNDLES: duckdb.DuckDBBundles = {
  mvp: {
    mainModule: duckdb_wasm,
    mainWorker: global.window && new URL(
      "@duckdb/duckdb-wasm/dist/duckdb-browser-mvp.worker.js",
      import.meta.url
    ).toString(),
  },
  eh: {
    mainModule: duckdb_wasm_eh,
    mainWorker: global.window && new URL(
      "@duckdb/duckdb-wasm/dist/duckdb-browser-eh.worker.js",
      import.meta.url
    ).toString(),
  },
};

type SomeComponentProps = Record<string, string>;

const DuckAsync: React.FC<SomeComponentProps> = (props: SomeComponentProps) => {
  const term = React.useRef<HTMLDivElement | null>(null);
  React.useEffect(() => {
    if (global.window) {
      const shell = require("@duckdb/duckdb-wasm-shell");
      shell.embed({
        shellModule: shell_wasm,
        container: term.current!,
        resolveDatabase: async (props: any) => {
          const bundle = await duckdb.selectBundle(DUCKDB_BUNDLES);
          const logger = new duckdb.ConsoleLogger();
          const worker = new Worker(bundle.mainWorker!);
          const db = new duckdb.AsyncDuckDB(logger, worker);
          await db.instantiate(bundle.mainModule);
          return db;
        },
      });
    }
    
  }, []);

  return (
    <Container>
      <div ref= { term } />;
    </Container>
  )
};

export default DuckAsync;
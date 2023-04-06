// import { WEBPACK_BUNDLES, setup } from '@/components/DuckAsync'
import '@/styles/globals.css'
import type { AppProps } from 'next/app'
import { useEffect } from 'react'
// import {
//   DuckDBConnectionProvider,
//   DuckDBPlatform,
//   DuckDBProvider,
// } from '@duckdb/react-duckdb';
import * as duckdb from "@duckdb/duckdb-wasm";

const logger = new duckdb.ConsoleLogger(duckdb.LogLevel.WARNING);

export default function App({ Component, pageProps }: AppProps) {
  // useEffect(() => {
  //   setup();
  // })

  useEffect(() => {
  }, []);

  return (
    <Component {...pageProps} />
  )

  // return (
  //   <DuckDBPlatform logger={logger} bundles={WEBPACK_BUNDLES}>
  //     <DuckDBProvider>
  //       <DuckDBConnectionProvider>
  //         <Component {...pageProps} />
  //       </DuckDBConnectionProvider>
  //     </DuckDBProvider>
  //   </DuckDBPlatform>
  // )
}

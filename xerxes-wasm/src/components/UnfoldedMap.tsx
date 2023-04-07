
import React from 'react';

function UnfoldedMap({ setMap }: any) {
  const mountContainerRef = React.useRef(null);

  React.useEffect(() => {
    const loadMap = async () => {
      const { createMap } = require('@unfolded/map-sdk');
      const mapInstance = await createMap({
      });

      setMap(mapInstance);
      mapInstance.addToDOM(mountContainerRef && mountContainerRef.current as any);
    };
    if (global.window)
      loadMap();
  }, [setMap]);

  return (
    <div className="unfolded">
      <div ref={mountContainerRef} />
    </div>

  );
}

export default React.memo(UnfoldedMap);
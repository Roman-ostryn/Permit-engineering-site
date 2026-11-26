import {
  coastLine,
  insetLabels,
  mapSize,
  routePaths,
  stateBorders,
  statePaths,
} from './us-map-data';

export function UsMap() {
  return (
    <svg
      className="map-art"
      viewBox={`0 0 ${mapSize.width} ${mapSize.height}`}
      role="img"
      aria-label="Map of the United States, including Alaska and Hawaii"
    >
      <defs>
        <pattern id="mapGrid" width="32" height="32" patternUnits="userSpaceOnUse">
          <path d="M32 0H0V32" fill="none" stroke="currentColor" strokeWidth="0.7" />
        </pattern>
      </defs>
      <rect width={mapSize.width} height={mapSize.height} fill="url(#mapGrid)" />
      <g className="us-states">
        {statePaths.map((state) => (
          <path key={state.id} d={state.d} className="us-state">
            <title>{state.name}</title>
          </path>
        ))}
      </g>
      <path className="us-borders" d={stateBorders} />
      <path className="us-coast" d={coastLine} />
      <g className="map-routes" aria-hidden="true">
        {routePaths.map((route) => (
          <path key={route.d} className={`map-route route-${route.tone}`} d={route.d} />
        ))}
      </g>
      <g className="map-inset-labels" aria-hidden="true">
        <text x={insetLabels.alaska.x} y={insetLabels.alaska.y} textAnchor="middle">
          ALASKA
        </text>
        <text x={insetLabels.hawaii.x} y={insetLabels.hawaii.y} textAnchor="middle">
          HAWAII
        </text>
      </g>
    </svg>
  );
}

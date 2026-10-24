# ADR 010: MongoDB Geospatial Query Strategy and Location Privacy

## Status
Accepted

## Context
Citizens need to see reports near them, and municipal workers need to group reports by geographic zones. Storing arbitrary floats makes radius searches inefficient and prone to mathematical projection errors. Furthermore, publishing high-precision GPS coordinates for residential issues poses privacy risks.

## Decision
1. **GeoJSON Point Representation**:
   - Coordinates are stored strictly in standard GeoJSON format:
     ```json
     {
       "type": "Point",
       "coordinates": [longitude, latitude]
     }
     ```
   - Longitude is validated to `[-180, 180]`; Latitude is validated to `[-90, 90]`.
2. **MongoDB `2dsphere` Index**:
   - Index: `db.reports.createIndex({ location: "2dsphere" })`
   - Queries use `$near` or `$geoWithin` with `$maxDistance` in meters.
3. **Query Bounds**:
   - Maximum radius cap: 50,000 meters (50 km).
   - Maximum results per query: 100 items.
4. **Location Precision Policy**:
   - For public map feeds and listings, coordinates are returned up to 4 decimal places (~11 meters precision), avoiding millimeter-level pinpointing of private residential driveways, while preserving precise location for city field workers.

## Consequences
- **Positive**: High performance spherical distance calculations in MongoDB engine.
- **Positive**: Prevents DoS queries across entire global bounds.
- **Positive**: Respects citizen location privacy.

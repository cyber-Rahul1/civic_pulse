/**
 * Authentic Andhra Pradesh 28-District Regional Geographic Data Package
 *
 * Current as of October 2026.
 * Includes all 28 administrative districts:
 * - 26 districts formed under AP District Reorganisation Act 2022
 * - Plus Markapuram (G.O.Ms.No.524, Rev Lands-IV, effective Dec 31, 2025)
 * - Plus Polavaram (G.O.Ms.No.517, Rev Lands-IV, effective Dec 31, 2025)
 *
 * Sourced: OpenStreetMap / OpenData Locations Gazette-verified boundaries
 * Licensed under Open Database License (ODbL) 1.0 - (c) OpenStreetMap contributors
 * Simplification: Ramer-Douglas-Peucker (tolerance 0.005 deg) preserving natural boundaries,
 * multi-polygon rings, and coastline contours.
 */

export interface GeoCoordinate {
  latitude: number;
  longitude: number;
}

export interface DistrictInfo {
  id: string;
  name: string;
  headquarters: string;
  center: GeoCoordinate;
  region: 'Coastal Andhra' | 'Rayalaseema' | 'North Coastal';
  polygon: GeoCoordinate[];
  polygons?: GeoCoordinate[][];
}

export interface CityInfo {
  id: string;
  name: string;
  districtId: string;
  coordinate: GeoCoordinate;
  type: 'major_city' | 'town';
  populationTier: 1 | 2 | 3;
}

export interface AndhraPradeshMapPackage {
  metadata: {
    regionName: string;
    version: string;
    districtCount: number;
    license: string;
    attribution: string;
    source: string;
    boundingBox: {
      minLatitude: number;
      maxLatitude: number;
      minLongitude: number;
      maxLongitude: number;
    };
  };
  stateCenter: GeoCoordinate;
  stateBoundary: GeoCoordinate[];
  districts: DistrictInfo[];
  cities: CityInfo[];
}

export const ANDHRA_PRADESH_MAP_DATA: AndhraPradeshMapPackage = {
  metadata: {
    regionName: 'Andhra Pradesh, India',
    version: '3.0.0-ap-28-districts',
    districtCount: 28,
    license: 'Open Database License (ODbL) 1.0',
    attribution: 'Map data (c) OpenStreetMap contributors under ODbL',
    source: 'OSM & AP Gazette Boundary extracts (28 Districts)',
    boundingBox: {
      minLatitude: 12.62,
      maxLatitude: 19.16,
      minLongitude: 76.76,
      maxLongitude: 84.77,
    },
  },
  stateCenter: {
    latitude: 16.20,
    longitude: 80.45,
  },
  stateBoundary: [
  {
    "latitude": 14.9896,
    "longitude": 76.7601
  },
  {
    "latitude": 14.9561,
    "longitude": 76.8289
  },
  {
    "latitude": 14.9695,
    "longitude": 76.8673
  },
  {
    "latitude": 14.8098,
    "longitude": 76.8543
  },
  {
    "latitude": 14.7861,
    "longitude": 76.7823
  },
  {
    "latitude": 14.7425,
    "longitude": 76.8036
  },
  {
    "latitude": 14.602,
    "longitude": 76.765
  },
  {
    "latitude": 14.474,
    "longitude": 76.868
  },
  {
    "latitude": 14.4853,
    "longitude": 76.9748
  },
  {
    "latitude": 14.4003,
    "longitude": 76.9426
  },
  {
    "latitude": 14.4207,
    "longitude": 76.9157
  },
  {
    "latitude": 14.3921,
    "longitude": 76.8853
  },
  {
    "latitude": 14.3474,
    "longitude": 76.885
  },
  {
    "latitude": 14.2943,
    "longitude": 76.9565
  },
  {
    "latitude": 14.2737,
    "longitude": 76.9248
  },
  {
    "latitude": 14.245,
    "longitude": 76.9396
  },
  {
    "latitude": 14.2207,
    "longitude": 77.1096
  },
  {
    "latitude": 14.2921,
    "longitude": 77.1153
  },
  {
    "latitude": 14.3423,
    "longitude": 77.1632
  },
  {
    "latitude": 14.3174,
    "longitude": 77.2377
  },
  {
    "latitude": 14.3402,
    "longitude": 77.2866
  },
  {
    "latitude": 14.2829,
    "longitude": 77.2835
  },
  {
    "latitude": 14.2758,
    "longitude": 77.3638
  },
  {
    "latitude": 14.1999,
    "longitude": 77.387
  },
  {
    "latitude": 14.2116,
    "longitude": 77.4198
  },
  {
    "latitude": 14.3057,
    "longitude": 77.3766
  },
  {
    "latitude": 14.3358,
    "longitude": 77.393
  },
  {
    "latitude": 14.2636,
    "longitude": 77.5039
  },
  {
    "latitude": 14.1573,
    "longitude": 77.5037
  },
  {
    "latitude": 14.1743,
    "longitude": 77.3937
  },
  {
    "latitude": 14.1311,
    "longitude": 77.352
  },
  {
    "latitude": 14.1035,
    "longitude": 77.3474
  },
  {
    "latitude": 14.1198,
    "longitude": 77.4014
  },
  {
    "latitude": 14.0307,
    "longitude": 77.3323
  },
  {
    "latitude": 14.0166,
    "longitude": 77.3903
  },
  {
    "latitude": 13.9762,
    "longitude": 77.3815
  },
  {
    "latitude": 13.9755,
    "longitude": 77.4389
  },
  {
    "latitude": 13.9459,
    "longitude": 77.412
  },
  {
    "latitude": 13.9148,
    "longitude": 77.4346
  },
  {
    "latitude": 13.8885,
    "longitude": 77.3989
  },
  {
    "latitude": 13.916,
    "longitude": 77.3477
  },
  {
    "latitude": 13.9532,
    "longitude": 77.3716
  },
  {
    "latitude": 14.0301,
    "longitude": 77.3221
  },
  {
    "latitude": 14.0038,
    "longitude": 77.1409
  },
  {
    "latitude": 14.0471,
    "longitude": 77.1268
  },
  {
    "latitude": 14.0569,
    "longitude": 77.0316
  },
  {
    "latitude": 14.1774,
    "longitude": 77.0221
  },
  {
    "latitude": 14.1981,
    "longitude": 76.9475
  },
  {
    "latitude": 14.1679,
    "longitude": 76.8945
  },
  {
    "latitude": 14.1384,
    "longitude": 76.886
  },
  {
    "latitude": 14.081,
    "longitude": 76.975
  },
  {
    "latitude": 14.0302,
    "longitude": 76.9311
  },
  {
    "latitude": 13.9335,
    "longitude": 77.0415
  },
  {
    "latitude": 13.827,
    "longitude": 76.9781
  },
  {
    "latitude": 13.7453,
    "longitude": 76.9987
  },
  {
    "latitude": 13.7792,
    "longitude": 77.0244
  },
  {
    "latitude": 13.744,
    "longitude": 77.0643
  },
  {
    "latitude": 13.7621,
    "longitude": 77.1729
  },
  {
    "latitude": 13.8295,
    "longitude": 77.1687
  },
  {
    "latitude": 13.8565,
    "longitude": 77.1282
  },
  {
    "latitude": 13.8645,
    "longitude": 77.1685
  },
  {
    "latitude": 13.9251,
    "longitude": 77.1847
  },
  {
    "latitude": 13.8631,
    "longitude": 77.2004
  },
  {
    "latitude": 13.9041,
    "longitude": 77.2358
  },
  {
    "latitude": 13.8466,
    "longitude": 77.2568
  },
  {
    "latitude": 13.8665,
    "longitude": 77.3111
  },
  {
    "latitude": 13.833,
    "longitude": 77.3256
  },
  {
    "latitude": 13.8432,
    "longitude": 77.4325
  },
  {
    "latitude": 13.7989,
    "longitude": 77.4227
  },
  {
    "latitude": 13.8081,
    "longitude": 77.4645
  },
  {
    "latitude": 13.6822,
    "longitude": 77.4553
  },
  {
    "latitude": 13.6901,
    "longitude": 77.4919
  },
  {
    "latitude": 13.7148,
    "longitude": 77.4849
  },
  {
    "latitude": 13.6912,
    "longitude": 77.525
  },
  {
    "latitude": 13.7539,
    "longitude": 77.528
  },
  {
    "latitude": 13.7225,
    "longitude": 77.5604
  },
  {
    "latitude": 13.7506,
    "longitude": 77.5998
  },
  {
    "latitude": 13.7346,
    "longitude": 77.6279
  },
  {
    "latitude": 13.7685,
    "longitude": 77.6212
  },
  {
    "latitude": 13.7868,
    "longitude": 77.6802
  },
  {
    "latitude": 13.7605,
    "longitude": 77.6714
  },
  {
    "latitude": 13.7698,
    "longitude": 77.7034
  },
  {
    "latitude": 13.741,
    "longitude": 77.7174
  },
  {
    "latitude": 13.8002,
    "longitude": 77.7194
  },
  {
    "latitude": 13.8699,
    "longitude": 77.837
  },
  {
    "latitude": 13.9448,
    "longitude": 77.8265
  },
  {
    "latitude": 13.941,
    "longitude": 77.8958
  },
  {
    "latitude": 13.9054,
    "longitude": 77.9267
  },
  {
    "latitude": 13.9602,
    "longitude": 77.9721
  },
  {
    "latitude": 13.9029,
    "longitude": 77.9867
  },
  {
    "latitude": 13.8873,
    "longitude": 77.9494
  },
  {
    "latitude": 13.8272,
    "longitude": 77.953
  },
  {
    "latitude": 13.8732,
    "longitude": 78.0009
  },
  {
    "latitude": 13.8622,
    "longitude": 78.046
  },
  {
    "latitude": 13.8962,
    "longitude": 78.049
  },
  {
    "latitude": 13.8452,
    "longitude": 78.1236
  },
  {
    "latitude": 13.7866,
    "longitude": 78.1266
  },
  {
    "latitude": 13.7423,
    "longitude": 78.0918
  },
  {
    "latitude": 13.6925,
    "longitude": 78.1134
  },
  {
    "latitude": 13.6977,
    "longitude": 78.0695
  },
  {
    "latitude": 13.6434,
    "longitude": 78.0873
  },
  {
    "latitude": 13.6585,
    "longitude": 78.1563
  },
  {
    "latitude": 13.6284,
    "longitude": 78.2041
  },
  {
    "latitude": 13.5644,
    "longitude": 78.1931
  },
  {
    "latitude": 13.5988,
    "longitude": 78.2371
  },
  {
    "latitude": 13.5879,
    "longitude": 78.402
  },
  {
    "latitude": 13.3586,
    "longitude": 78.3658
  },
  {
    "latitude": 13.3457,
    "longitude": 78.4084
  },
  {
    "latitude": 13.3373,
    "longitude": 78.3783
  },
  {
    "latitude": 13.3154,
    "longitude": 78.4011
  },
  {
    "latitude": 13.3212,
    "longitude": 78.4834
  },
  {
    "latitude": 13.2669,
    "longitude": 78.532
  },
  {
    "latitude": 13.3091,
    "longitude": 78.5694
  },
  {
    "latitude": 13.2131,
    "longitude": 78.579
  },
  {
    "latitude": 13.1894,
    "longitude": 78.5501
  },
  {
    "latitude": 13.1674,
    "longitude": 78.5799
  },
  {
    "latitude": 13.1324,
    "longitude": 78.5176
  },
  {
    "latitude": 13.1057,
    "longitude": 78.5386
  },
  {
    "latitude": 13.0434,
    "longitude": 78.4623
  },
  {
    "latitude": 12.975,
    "longitude": 78.4675
  },
  {
    "latitude": 12.9811,
    "longitude": 78.4354
  },
  {
    "latitude": 12.9454,
    "longitude": 78.4111
  },
  {
    "latitude": 12.9053,
    "longitude": 78.4666
  },
  {
    "latitude": 12.8667,
    "longitude": 78.4647
  },
  {
    "latitude": 12.912,
    "longitude": 78.4449
  },
  {
    "latitude": 12.9065,
    "longitude": 78.3896
  },
  {
    "latitude": 12.9389,
    "longitude": 78.3527
  },
  {
    "latitude": 12.8584,
    "longitude": 78.3124
  },
  {
    "latitude": 12.8603,
    "longitude": 78.2523
  },
  {
    "latitude": 12.6847,
    "longitude": 78.2105
  },
  {
    "latitude": 12.7057,
    "longitude": 78.2679
  },
  {
    "latitude": 12.6268,
    "longitude": 78.3726
  },
  {
    "latitude": 12.6239,
    "longitude": 78.4649
  },
  {
    "latitude": 12.6758,
    "longitude": 78.4679
  },
  {
    "latitude": 12.7119,
    "longitude": 78.5198
  },
  {
    "latitude": 12.7471,
    "longitude": 78.4932
  },
  {
    "latitude": 12.6904,
    "longitude": 78.5362
  },
  {
    "latitude": 12.7096,
    "longitude": 78.5617
  },
  {
    "latitude": 12.7558,
    "longitude": 78.5555
  },
  {
    "latitude": 12.9321,
    "longitude": 78.6569
  },
  {
    "latitude": 12.9912,
    "longitude": 78.621
  },
  {
    "latitude": 13.0312,
    "longitude": 78.6563
  },
  {
    "latitude": 13.0155,
    "longitude": 78.7048
  },
  {
    "latitude": 13.0687,
    "longitude": 78.7141
  },
  {
    "latitude": 13.0549,
    "longitude": 78.7515
  },
  {
    "latitude": 13.0982,
    "longitude": 78.8817
  },
  {
    "latitude": 13.0331,
    "longitude": 78.8917
  },
  {
    "latitude": 13.0304,
    "longitude": 78.9371
  },
  {
    "latitude": 13.0476,
    "longitude": 78.9038
  },
  {
    "latitude": 13.0809,
    "longitude": 78.924
  },
  {
    "latitude": 13.0866,
    "longitude": 78.9953
  },
  {
    "latitude": 13.0256,
    "longitude": 79.0809
  },
  {
    "latitude": 13.0202,
    "longitude": 79.1633
  },
  {
    "latitude": 13.0467,
    "longitude": 79.1932
  },
  {
    "latitude": 13.0843,
    "longitude": 79.1805
  },
  {
    "latitude": 13.1051,
    "longitude": 79.2344
  },
  {
    "latitude": 13.1485,
    "longitude": 79.2099
  },
  {
    "latitude": 13.1707,
    "longitude": 79.2346
  },
  {
    "latitude": 13.1055,
    "longitude": 79.3072
  },
  {
    "latitude": 13.1236,
    "longitude": 79.3607
  },
  {
    "latitude": 13.1894,
    "longitude": 79.3742
  },
  {
    "latitude": 13.1883,
    "longitude": 79.4387
  },
  {
    "latitude": 13.2385,
    "longitude": 79.4531
  },
  {
    "latitude": 13.2654,
    "longitude": 79.4085
  },
  {
    "latitude": 13.3004,
    "longitude": 79.4457
  },
  {
    "latitude": 13.3078,
    "longitude": 79.3819
  },
  {
    "latitude": 13.3517,
    "longitude": 79.4356
  },
  {
    "latitude": 13.3385,
    "longitude": 79.5373
  },
  {
    "latitude": 13.2752,
    "longitude": 79.5348
  },
  {
    "latitude": 13.2573,
    "longitude": 79.5805
  },
  {
    "latitude": 13.2858,
    "longitude": 79.5987
  },
  {
    "latitude": 13.2956,
    "longitude": 79.683
  },
  {
    "latitude": 13.2224,
    "longitude": 79.7026
  },
  {
    "latitude": 13.2152,
    "longitude": 79.7755
  },
  {
    "latitude": 13.2419,
    "longitude": 79.7947
  },
  {
    "latitude": 13.2888,
    "longitude": 79.7335
  },
  {
    "latitude": 13.3557,
    "longitude": 79.9381
  },
  {
    "latitude": 13.3918,
    "longitude": 79.9627
  },
  {
    "latitude": 13.4166,
    "longitude": 79.9345
  },
  {
    "latitude": 13.4295,
    "longitude": 79.9732
  },
  {
    "latitude": 13.469,
    "longitude": 79.9724
  },
  {
    "latitude": 13.4937,
    "longitude": 80.0467
  },
  {
    "latitude": 13.5464,
    "longitude": 80.0018
  },
  {
    "latitude": 13.5489,
    "longitude": 80.0815
  },
  {
    "latitude": 13.4894,
    "longitude": 80.0775
  },
  {
    "latitude": 13.5045,
    "longitude": 80.1383
  },
  {
    "latitude": 13.4725,
    "longitude": 80.2418
  },
  {
    "latitude": 13.5639,
    "longitude": 80.268
  },
  {
    "latitude": 13.6564,
    "longitude": 80.2342
  },
  {
    "latitude": 13.7897,
    "longitude": 80.2508
  },
  {
    "latitude": 14.1441,
    "longitude": 80.1279
  },
  {
    "latitude": 14.5883,
    "longitude": 80.1941
  },
  {
    "latitude": 14.7773,
    "longitude": 80.0988
  },
  {
    "latitude": 15.0821,
    "longitude": 80.048
  },
  {
    "latitude": 15.3442,
    "longitude": 80.11
  },
  {
    "latitude": 15.4646,
    "longitude": 80.2006
  },
  {
    "latitude": 15.6997,
    "longitude": 80.2939
  },
  {
    "latitude": 15.8264,
    "longitude": 80.4781
  },
  {
    "latitude": 15.8798,
    "longitude": 80.697
  },
  {
    "latitude": 15.8375,
    "longitude": 80.8093
  },
  {
    "latitude": 15.7399,
    "longitude": 80.8139
  },
  {
    "latitude": 15.8071,
    "longitude": 80.7687
  },
  {
    "latitude": 15.7176,
    "longitude": 80.8228
  },
  {
    "latitude": 15.7203,
    "longitude": 80.9397
  },
  {
    "latitude": 15.7689,
    "longitude": 81.0147
  },
  {
    "latitude": 15.8341,
    "longitude": 81.009
  },
  {
    "latitude": 15.9762,
    "longitude": 81.139
  },
  {
    "latitude": 16.2241,
    "longitude": 81.2401
  },
  {
    "latitude": 16.2256,
    "longitude": 81.2189
  },
  {
    "latitude": 16.3032,
    "longitude": 81.3045
  },
  {
    "latitude": 16.3522,
    "longitude": 81.4847
  },
  {
    "latitude": 16.3103,
    "longitude": 81.7227
  },
  {
    "latitude": 16.5723,
    "longitude": 82.301
  },
  {
    "latitude": 16.7293,
    "longitude": 82.367
  },
  {
    "latitude": 16.7514,
    "longitude": 82.34
  },
  {
    "latitude": 16.8516,
    "longitude": 82.3556
  },
  {
    "latitude": 16.8771,
    "longitude": 82.2708
  },
  {
    "latitude": 16.9402,
    "longitude": 82.245
  },
  {
    "latitude": 17.0719,
    "longitude": 82.3312
  },
  {
    "latitude": 17.2744,
    "longitude": 82.5825
  },
  {
    "latitude": 17.5911,
    "longitude": 83.2131
  },
  {
    "latitude": 17.6764,
    "longitude": 83.2953
  },
  {
    "latitude": 17.7121,
    "longitude": 83.2638
  },
  {
    "latitude": 17.6882,
    "longitude": 83.3062
  },
  {
    "latitude": 17.7259,
    "longitude": 83.3455
  },
  {
    "latitude": 17.8522,
    "longitude": 83.4149
  },
  {
    "latitude": 18.0114,
    "longitude": 83.5704
  },
  {
    "latitude": 18.3113,
    "longitude": 84.124
  },
  {
    "latitude": 18.3771,
    "longitude": 84.1538
  },
  {
    "latitude": 18.5564,
    "longitude": 84.3552
  },
  {
    "latitude": 18.7916,
    "longitude": 84.5522
  },
  {
    "latitude": 19.0788,
    "longitude": 84.7658
  },
  {
    "latitude": 19.1178,
    "longitude": 84.7029
  },
  {
    "latitude": 19.1594,
    "longitude": 84.7103
  },
  {
    "latitude": 19.1323,
    "longitude": 84.5959
  },
  {
    "latitude": 19.076,
    "longitude": 84.6709
  },
  {
    "latitude": 19.0659,
    "longitude": 84.6184
  },
  {
    "latitude": 19.0222,
    "longitude": 84.5942
  },
  {
    "latitude": 19.0732,
    "longitude": 84.583
  },
  {
    "latitude": 19.0483,
    "longitude": 84.5164
  },
  {
    "latitude": 18.9885,
    "longitude": 84.479
  },
  {
    "latitude": 19.0222,
    "longitude": 84.4211
  },
  {
    "latitude": 18.9762,
    "longitude": 84.4525
  },
  {
    "latitude": 18.921,
    "longitude": 84.4386
  },
  {
    "latitude": 18.9034,
    "longitude": 84.3785
  },
  {
    "latitude": 18.8764,
    "longitude": 84.3933
  },
  {
    "latitude": 18.8947,
    "longitude": 84.3606
  },
  {
    "latitude": 18.8609,
    "longitude": 84.3736
  },
  {
    "latitude": 18.8901,
    "longitude": 84.3369
  },
  {
    "latitude": 18.837,
    "longitude": 84.3638
  },
  {
    "latitude": 18.8018,
    "longitude": 84.3446
  },
  {
    "latitude": 18.7568,
    "longitude": 84.0895
  },
  {
    "latitude": 18.8164,
    "longitude": 84.0385
  },
  {
    "latitude": 18.8145,
    "longitude": 83.8932
  },
  {
    "latitude": 19.018,
    "longitude": 83.7947
  },
  {
    "latitude": 18.9898,
    "longitude": 83.7461
  },
  {
    "latitude": 18.9158,
    "longitude": 83.7879
  },
  {
    "latitude": 18.925,
    "longitude": 83.7539
  },
  {
    "latitude": 19.0061,
    "longitude": 83.7085
  },
  {
    "latitude": 19.0218,
    "longitude": 83.73
  },
  {
    "latitude": 19.0763,
    "longitude": 83.664
  },
  {
    "latitude": 19.1594,
    "longitude": 83.6338
  },
  {
    "latitude": 19.0575,
    "longitude": 83.5845
  },
  {
    "latitude": 19.0805,
    "longitude": 83.5492
  },
  {
    "latitude": 19.0095,
    "longitude": 83.5367
  },
  {
    "latitude": 19.0208,
    "longitude": 83.5008
  },
  {
    "latitude": 19.0703,
    "longitude": 83.5116
  },
  {
    "latitude": 19.0931,
    "longitude": 83.468
  },
  {
    "latitude": 18.9547,
    "longitude": 83.4617
  },
  {
    "latitude": 19.0094,
    "longitude": 83.4006
  },
  {
    "latitude": 18.999,
    "longitude": 83.3107
  },
  {
    "latitude": 18.9323,
    "longitude": 83.3262
  },
  {
    "latitude": 18.9264,
    "longitude": 83.3485
  },
  {
    "latitude": 18.9674,
    "longitude": 83.3518
  },
  {
    "latitude": 18.9329,
    "longitude": 83.3875
  },
  {
    "latitude": 18.9435,
    "longitude": 83.3523
  },
  {
    "latitude": 18.8747,
    "longitude": 83.4147
  },
  {
    "latitude": 18.8428,
    "longitude": 83.4059
  },
  {
    "latitude": 18.7981,
    "longitude": 83.2847
  },
  {
    "latitude": 18.7645,
    "longitude": 83.2713
  },
  {
    "latitude": 18.7751,
    "longitude": 83.2246
  },
  {
    "latitude": 18.7303,
    "longitude": 83.2121
  },
  {
    "latitude": 18.7851,
    "longitude": 83.1384
  },
  {
    "latitude": 18.6654,
    "longitude": 83.058
  },
  {
    "latitude": 18.6463,
    "longitude": 83.0134
  },
  {
    "latitude": 18.6079,
    "longitude": 83.0006
  },
  {
    "latitude": 18.601,
    "longitude": 83.0526
  },
  {
    "latitude": 18.5439,
    "longitude": 83.0453
  },
  {
    "latitude": 18.5461,
    "longitude": 83.0952
  },
  {
    "latitude": 18.4559,
    "longitude": 83.0211
  },
  {
    "latitude": 18.43,
    "longitude": 83.0673
  },
  {
    "latitude": 18.3812,
    "longitude": 83.0568
  },
  {
    "latitude": 18.3585,
    "longitude": 82.9386
  },
  {
    "latitude": 18.3753,
    "longitude": 82.8913
  },
  {
    "latitude": 18.4241,
    "longitude": 82.895
  },
  {
    "latitude": 18.4495,
    "longitude": 82.8038
  },
  {
    "latitude": 18.3401,
    "longitude": 82.7751
  },
  {
    "latitude": 18.3017,
    "longitude": 82.6423
  },
  {
    "latitude": 18.2367,
    "longitude": 82.6374
  },
  {
    "latitude": 18.3151,
    "longitude": 82.5821
  },
  {
    "latitude": 18.3599,
    "longitude": 82.6209
  },
  {
    "latitude": 18.4008,
    "longitude": 82.5411
  },
  {
    "latitude": 18.4477,
    "longitude": 82.5618
  },
  {
    "latitude": 18.4663,
    "longitude": 82.5191
  },
  {
    "latitude": 18.5113,
    "longitude": 82.5323
  },
  {
    "latitude": 18.5484,
    "longitude": 82.4821
  },
  {
    "latitude": 18.4222,
    "longitude": 82.3657
  },
  {
    "latitude": 18.3674,
    "longitude": 82.3856
  },
  {
    "latitude": 18.3259,
    "longitude": 82.3394
  },
  {
    "latitude": 18.3284,
    "longitude": 82.3893
  },
  {
    "latitude": 18.2979,
    "longitude": 82.3927
  },
  {
    "latitude": 18.2802,
    "longitude": 82.3444
  },
  {
    "latitude": 18.2043,
    "longitude": 82.3115
  },
  {
    "latitude": 18.1471,
    "longitude": 82.3724
  },
  {
    "latitude": 18.1484,
    "longitude": 82.3395
  },
  {
    "latitude": 18.0578,
    "longitude": 82.3441
  },
  {
    "latitude": 18.0561,
    "longitude": 82.2729
  },
  {
    "latitude": 17.9962,
    "longitude": 82.2645
  },
  {
    "latitude": 18.0191,
    "longitude": 82.1799
  },
  {
    "latitude": 18.0509,
    "longitude": 82.169
  },
  {
    "latitude": 18.0688,
    "longitude": 82.0326
  },
  {
    "latitude": 17.9991,
    "longitude": 81.963
  },
  {
    "latitude": 17.9521,
    "longitude": 81.8112
  },
  {
    "latitude": 17.8765,
    "longitude": 81.7245
  },
  {
    "latitude": 17.9004,
    "longitude": 81.7021
  },
  {
    "latitude": 17.8849,
    "longitude": 81.6664
  },
  {
    "latitude": 17.8232,
    "longitude": 81.6183
  },
  {
    "latitude": 17.8123,
    "longitude": 81.4921
  },
  {
    "latitude": 17.8377,
    "longitude": 81.4735
  },
  {
    "latitude": 17.7957,
    "longitude": 81.3875
  },
  {
    "latitude": 17.8527,
    "longitude": 81.1594
  },
  {
    "latitude": 17.8108,
    "longitude": 81.0889
  },
  {
    "latitude": 17.772,
    "longitude": 81.1045
  },
  {
    "latitude": 17.7333,
    "longitude": 81.0585
  },
  {
    "latitude": 17.7795,
    "longitude": 80.973
  },
  {
    "latitude": 17.7521,
    "longitude": 80.9
  },
  {
    "latitude": 17.6837,
    "longitude": 80.8855
  },
  {
    "latitude": 17.6545,
    "longitude": 80.9109
  },
  {
    "latitude": 17.603,
    "longitude": 80.8556
  },
  {
    "latitude": 17.5988,
    "longitude": 80.9674
  },
  {
    "latitude": 17.5201,
    "longitude": 81.0198
  },
  {
    "latitude": 17.5043,
    "longitude": 81.0987
  },
  {
    "latitude": 17.5262,
    "longitude": 81.1276
  },
  {
    "latitude": 17.4407,
    "longitude": 81.1825
  },
  {
    "latitude": 17.4076,
    "longitude": 81.3138
  },
  {
    "latitude": 17.3285,
    "longitude": 81.2886
  },
  {
    "latitude": 17.3236,
    "longitude": 81.1895
  },
  {
    "latitude": 17.2314,
    "longitude": 81.1707
  },
  {
    "latitude": 17.2248,
    "longitude": 81.055
  },
  {
    "latitude": 17.1907,
    "longitude": 81.0312
  },
  {
    "latitude": 17.2204,
    "longitude": 80.9195
  },
  {
    "latitude": 17.1578,
    "longitude": 80.9239
  },
  {
    "latitude": 17.1609,
    "longitude": 80.8795
  },
  {
    "latitude": 17.0705,
    "longitude": 80.877
  },
  {
    "latitude": 17.0402,
    "longitude": 80.8451
  },
  {
    "latitude": 17.0788,
    "longitude": 80.7392
  },
  {
    "latitude": 17.0694,
    "longitude": 80.654
  },
  {
    "latitude": 17.1012,
    "longitude": 80.6706
  },
  {
    "latitude": 17.1534,
    "longitude": 80.58
  },
  {
    "latitude": 17.1223,
    "longitude": 80.5139
  },
  {
    "latitude": 17.0303,
    "longitude": 80.4648
  },
  {
    "latitude": 17.0917,
    "longitude": 80.4094
  },
  {
    "latitude": 17.0668,
    "longitude": 80.3857
  },
  {
    "latitude": 17.0158,
    "longitude": 80.407
  },
  {
    "latitude": 16.9761,
    "longitude": 80.3634
  },
  {
    "latitude": 16.9279,
    "longitude": 80.4937
  },
  {
    "latitude": 16.9614,
    "longitude": 80.5354
  },
  {
    "latitude": 16.9189,
    "longitude": 80.6025
  },
  {
    "latitude": 16.8336,
    "longitude": 80.5629
  },
  {
    "latitude": 16.7936,
    "longitude": 80.6129
  },
  {
    "latitude": 16.7679,
    "longitude": 80.5706
  },
  {
    "latitude": 16.7953,
    "longitude": 80.4646
  },
  {
    "latitude": 16.8653,
    "longitude": 80.3842
  },
  {
    "latitude": 16.8489,
    "longitude": 80.408
  },
  {
    "latitude": 16.8172,
    "longitude": 80.3811
  },
  {
    "latitude": 16.8788,
    "longitude": 80.3218
  },
  {
    "latitude": 16.9982,
    "longitude": 80.2923
  },
  {
    "latitude": 17.0113,
    "longitude": 80.2101
  },
  {
    "latitude": 17.0441,
    "longitude": 80.1965
  },
  {
    "latitude": 16.9903,
    "longitude": 80.1403
  },
  {
    "latitude": 16.9713,
    "longitude": 80.0548
  },
  {
    "latitude": 16.9152,
    "longitude": 80.0173
  },
  {
    "latitude": 16.8654,
    "longitude": 79.999
  },
  {
    "latitude": 16.8535,
    "longitude": 80.0467
  },
  {
    "latitude": 16.7965,
    "longitude": 80.0694
  },
  {
    "latitude": 16.6361,
    "longitude": 79.9507
  },
  {
    "latitude": 16.6348,
    "longitude": 79.9085
  },
  {
    "latitude": 16.697,
    "longitude": 79.8783
  },
  {
    "latitude": 16.6923,
    "longitude": 79.8166
  },
  {
    "latitude": 16.7315,
    "longitude": 79.7761
  },
  {
    "latitude": 16.661,
    "longitude": 79.6351
  },
  {
    "latitude": 16.6201,
    "longitude": 79.4478
  },
  {
    "latitude": 16.58,
    "longitude": 79.4175
  },
  {
    "latitude": 16.5672,
    "longitude": 79.2587
  },
  {
    "latitude": 16.4878,
    "longitude": 79.2147
  },
  {
    "latitude": 16.2284,
    "longitude": 79.2174
  },
  {
    "latitude": 16.2101,
    "longitude": 79.1595
  },
  {
    "latitude": 16.2417,
    "longitude": 79.0111
  },
  {
    "latitude": 16.1842,
    "longitude": 78.906
  },
  {
    "latitude": 16.1047,
    "longitude": 78.9221
  },
  {
    "latitude": 16.086,
    "longitude": 78.8956
  },
  {
    "latitude": 16.1442,
    "longitude": 78.8727
  },
  {
    "latitude": 16.1458,
    "longitude": 78.8344
  },
  {
    "latitude": 16.079,
    "longitude": 78.8401
  },
  {
    "latitude": 16.022,
    "longitude": 78.7852
  },
  {
    "latitude": 16.0098,
    "longitude": 78.7364
  },
  {
    "latitude": 16.0878,
    "longitude": 78.6278
  },
  {
    "latitude": 16.0427,
    "longitude": 78.5507
  },
  {
    "latitude": 16.075,
    "longitude": 78.4074
  },
  {
    "latitude": 16.0128,
    "longitude": 78.3148
  },
  {
    "latitude": 16.0256,
    "longitude": 78.2596
  },
  {
    "latitude": 15.9364,
    "longitude": 78.2522
  },
  {
    "latitude": 15.9115,
    "longitude": 78.1851
  },
  {
    "latitude": 15.8583,
    "longitude": 78.1765
  },
  {
    "latitude": 15.8367,
    "longitude": 78.1339
  },
  {
    "latitude": 15.8413,
    "longitude": 78.0837
  },
  {
    "latitude": 15.9077,
    "longitude": 78.032
  },
  {
    "latitude": 15.862,
    "longitude": 78.0089
  },
  {
    "latitude": 15.9067,
    "longitude": 77.8895
  },
  {
    "latitude": 15.8745,
    "longitude": 77.804
  },
  {
    "latitude": 15.8837,
    "longitude": 77.6822
  },
  {
    "latitude": 15.9188,
    "longitude": 77.6118
  },
  {
    "latitude": 15.9649,
    "longitude": 77.25
  },
  {
    "latitude": 15.9288,
    "longitude": 77.1024
  },
  {
    "latitude": 15.8375,
    "longitude": 77.0252
  },
  {
    "latitude": 15.8279,
    "longitude": 77.0652
  },
  {
    "latitude": 15.7403,
    "longitude": 77.0461
  },
  {
    "latitude": 15.6659,
    "longitude": 77.1289
  },
  {
    "latitude": 15.631,
    "longitude": 77.1214
  },
  {
    "latitude": 15.659,
    "longitude": 77.0832
  },
  {
    "latitude": 15.6345,
    "longitude": 77.0304
  },
  {
    "latitude": 15.5022,
    "longitude": 77.0298
  },
  {
    "latitude": 15.498,
    "longitude": 76.9747
  },
  {
    "latitude": 15.4331,
    "longitude": 77.0311
  },
  {
    "latitude": 15.3279,
    "longitude": 77.0621
  },
  {
    "latitude": 15.3338,
    "longitude": 77.1134
  },
  {
    "latitude": 15.2948,
    "longitude": 77.1183
  },
  {
    "latitude": 15.2684,
    "longitude": 77.1671
  },
  {
    "latitude": 15.2269,
    "longitude": 77.125
  },
  {
    "latitude": 15.1886,
    "longitude": 77.1661
  },
  {
    "latitude": 15.1483,
    "longitude": 77.1344
  },
  {
    "latitude": 15.123,
    "longitude": 77.1563
  },
  {
    "latitude": 15.0046,
    "longitude": 77.072
  },
  {
    "latitude": 15.0331,
    "longitude": 77.0496
  },
  {
    "latitude": 15.0306,
    "longitude": 76.8773
  },
  {
    "latitude": 15.0962,
    "longitude": 76.8004
  },
  {
    "latitude": 14.9896,
    "longitude": 76.7601
  }
],
  districts: [
  {
    "id": "markapuram",
    "name": "Markapuram",
    "headquarters": "Markapur",
    "center": {
      "latitude": 15.6254,
      "longitude": 79.2116
    },
    "region": "Coastal Andhra",
    "polygon": [
      {
        "latitude": 15.20121,
        "longitude": 78.73658
      },
      {
        "latitude": 15.18375,
        "longitude": 78.74186
      },
      {
        "latitude": 15.20043,
        "longitude": 78.77776
      },
      {
        "latitude": 15.19816,
        "longitude": 78.8718
      },
      {
        "latitude": 15.18751,
        "longitude": 78.91959
      },
      {
        "latitude": 15.2288,
        "longitude": 78.92726
      },
      {
        "latitude": 15.22875,
        "longitude": 78.94786
      },
      {
        "latitude": 15.17639,
        "longitude": 78.95766
      },
      {
        "latitude": 15.16513,
        "longitude": 78.98173
      },
      {
        "latitude": 15.16856,
        "longitude": 79.00938
      },
      {
        "latitude": 15.17955,
        "longitude": 79.01709
      },
      {
        "latitude": 15.17358,
        "longitude": 79.08208
      },
      {
        "latitude": 15.16499,
        "longitude": 79.07338
      },
      {
        "latitude": 15.14051,
        "longitude": 79.07234
      },
      {
        "latitude": 15.0514,
        "longitude": 79.08953
      },
      {
        "latitude": 15.08632,
        "longitude": 79.10019
      },
      {
        "latitude": 15.08838,
        "longitude": 79.12958
      },
      {
        "latitude": 15.10211,
        "longitude": 79.12904
      },
      {
        "latitude": 15.08714,
        "longitude": 79.21437
      },
      {
        "latitude": 15.10779,
        "longitude": 79.26207
      },
      {
        "latitude": 15.0982,
        "longitude": 79.26556
      },
      {
        "latitude": 15.09947,
        "longitude": 79.29211
      },
      {
        "latitude": 15.09504,
        "longitude": 79.30909
      },
      {
        "latitude": 15.08872,
        "longitude": 79.30729
      },
      {
        "latitude": 15.11785,
        "longitude": 79.33537
      },
      {
        "latitude": 15.10084,
        "longitude": 79.33579
      },
      {
        "latitude": 15.09446,
        "longitude": 79.32726
      },
      {
        "latitude": 15.08634,
        "longitude": 79.34386
      },
      {
        "latitude": 15.11772,
        "longitude": 79.3521
      },
      {
        "latitude": 15.08631,
        "longitude": 79.36783
      },
      {
        "latitude": 15.09239,
        "longitude": 79.39254
      },
      {
        "latitude": 15.07607,
        "longitude": 79.39087
      },
      {
        "latitude": 15.07402,
        "longitude": 79.4198
      },
      {
        "latitude": 15.05719,
        "longitude": 79.42248
      },
      {
        "latitude": 15.0682,
        "longitude": 79.4677
      },
      {
        "latitude": 15.05756,
        "longitude": 79.47613
      },
      {
        "latitude": 15.05712,
        "longitude": 79.50169
      },
      {
        "latitude": 15.03861,
        "longitude": 79.51852
      },
      {
        "latitude": 15.02224,
        "longitude": 79.55835
      },
      {
        "latitude": 15.04388,
        "longitude": 79.56429
      },
      {
        "latitude": 15.03509,
        "longitude": 79.62813
      },
      {
        "latitude": 15.0437,
        "longitude": 79.62913
      },
      {
        "latitude": 15.05764,
        "longitude": 79.60794
      },
      {
        "latitude": 15.10025,
        "longitude": 79.63303
      },
      {
        "latitude": 15.14878,
        "longitude": 79.62375
      },
      {
        "latitude": 15.15468,
        "longitude": 79.6497
      },
      {
        "latitude": 15.17232,
        "longitude": 79.64566
      },
      {
        "latitude": 15.17677,
        "longitude": 79.63383
      },
      {
        "latitude": 15.16559,
        "longitude": 79.62253
      },
      {
        "latitude": 15.1727,
        "longitude": 79.6217
      },
      {
        "latitude": 15.24583,
        "longitude": 79.65363
      },
      {
        "latitude": 15.26487,
        "longitude": 79.65039
      },
      {
        "latitude": 15.26506,
        "longitude": 79.66097
      },
      {
        "latitude": 15.32409,
        "longitude": 79.66794
      },
      {
        "latitude": 15.32721,
        "longitude": 79.65642
      },
      {
        "latitude": 15.36674,
        "longitude": 79.65711
      },
      {
        "latitude": 15.37679,
        "longitude": 79.66283
      },
      {
        "latitude": 15.37395,
        "longitude": 79.67661
      },
      {
        "latitude": 15.39564,
        "longitude": 79.68495
      },
      {
        "latitude": 15.41467,
        "longitude": 79.67551
      },
      {
        "latitude": 15.41702,
        "longitude": 79.66209
      },
      {
        "latitude": 15.39923,
        "longitude": 79.65053
      },
      {
        "latitude": 15.42367,
        "longitude": 79.6148
      },
      {
        "latitude": 15.38531,
        "longitude": 79.57753
      },
      {
        "latitude": 15.39443,
        "longitude": 79.56686
      },
      {
        "latitude": 15.44201,
        "longitude": 79.59446
      },
      {
        "latitude": 15.44216,
        "longitude": 79.57212
      },
      {
        "latitude": 15.45824,
        "longitude": 79.58249
      },
      {
        "latitude": 15.4645,
        "longitude": 79.57183
      },
      {
        "latitude": 15.48027,
        "longitude": 79.57919
      },
      {
        "latitude": 15.48726,
        "longitude": 79.59278
      },
      {
        "latitude": 15.49744,
        "longitude": 79.59046
      },
      {
        "latitude": 15.50622,
        "longitude": 79.56783
      },
      {
        "latitude": 15.48972,
        "longitude": 79.56377
      },
      {
        "latitude": 15.52965,
        "longitude": 79.56273
      },
      {
        "latitude": 15.537,
        "longitude": 79.56889
      },
      {
        "latitude": 15.54989,
        "longitude": 79.56282
      },
      {
        "latitude": 15.55452,
        "longitude": 79.57095
      },
      {
        "latitude": 15.54044,
        "longitude": 79.57309
      },
      {
        "latitude": 15.53615,
        "longitude": 79.5833
      },
      {
        "latitude": 15.55215,
        "longitude": 79.60448
      },
      {
        "latitude": 15.56399,
        "longitude": 79.59831
      },
      {
        "latitude": 15.58963,
        "longitude": 79.61137
      },
      {
        "latitude": 15.57224,
        "longitude": 79.63001
      },
      {
        "latitude": 15.57902,
        "longitude": 79.63998
      },
      {
        "latitude": 15.57428,
        "longitude": 79.65867
      },
      {
        "latitude": 15.59324,
        "longitude": 79.66374
      },
      {
        "latitude": 15.59838,
        "longitude": 79.67254
      },
      {
        "latitude": 15.59192,
        "longitude": 79.6985
      },
      {
        "latitude": 15.57465,
        "longitude": 79.69367
      },
      {
        "latitude": 15.54248,
        "longitude": 79.77443
      },
      {
        "latitude": 15.53106,
        "longitude": 79.777
      },
      {
        "latitude": 15.53076,
        "longitude": 79.79648
      },
      {
        "latitude": 15.55763,
        "longitude": 79.79412
      },
      {
        "latitude": 15.58622,
        "longitude": 79.76656
      },
      {
        "latitude": 15.61045,
        "longitude": 79.71857
      },
      {
        "latitude": 15.66398,
        "longitude": 79.68738
      },
      {
        "latitude": 15.685,
        "longitude": 79.65073
      },
      {
        "latitude": 15.73415,
        "longitude": 79.6204
      },
      {
        "latitude": 15.7403,
        "longitude": 79.60125
      },
      {
        "latitude": 15.72462,
        "longitude": 79.577
      },
      {
        "latitude": 15.70875,
        "longitude": 79.51273
      },
      {
        "latitude": 15.72761,
        "longitude": 79.50185
      },
      {
        "latitude": 15.73371,
        "longitude": 79.50722
      },
      {
        "latitude": 15.74104,
        "longitude": 79.49539
      },
      {
        "latitude": 15.73102,
        "longitude": 79.47976
      },
      {
        "latitude": 15.74379,
        "longitude": 79.44495
      },
      {
        "latitude": 15.73302,
        "longitude": 79.439
      },
      {
        "latitude": 15.73198,
        "longitude": 79.42367
      },
      {
        "latitude": 15.73955,
        "longitude": 79.41781
      },
      {
        "latitude": 15.74831,
        "longitude": 79.42499
      },
      {
        "latitude": 15.77242,
        "longitude": 79.42405
      },
      {
        "latitude": 15.78017,
        "longitude": 79.41217
      },
      {
        "latitude": 15.77553,
        "longitude": 79.40398
      },
      {
        "latitude": 15.79096,
        "longitude": 79.38122
      },
      {
        "latitude": 15.76001,
        "longitude": 79.36513
      },
      {
        "latitude": 15.76224,
        "longitude": 79.35665
      },
      {
        "latitude": 15.7829,
        "longitude": 79.34797
      },
      {
        "latitude": 15.78742,
        "longitude": 79.33549
      },
      {
        "latitude": 15.8071,
        "longitude": 79.32407
      },
      {
        "latitude": 15.80663,
        "longitude": 79.31275
      },
      {
        "latitude": 15.84427,
        "longitude": 79.32246
      },
      {
        "latitude": 15.85953,
        "longitude": 79.35306
      },
      {
        "latitude": 15.89412,
        "longitude": 79.38768
      },
      {
        "latitude": 15.9152,
        "longitude": 79.39523
      },
      {
        "latitude": 15.91872,
        "longitude": 79.41659
      },
      {
        "latitude": 15.94218,
        "longitude": 79.42983
      },
      {
        "latitude": 15.96099,
        "longitude": 79.47425
      },
      {
        "latitude": 15.96148,
        "longitude": 79.5059
      },
      {
        "latitude": 15.96969,
        "longitude": 79.51991
      },
      {
        "latitude": 15.98312,
        "longitude": 79.52442
      },
      {
        "latitude": 16.00436,
        "longitude": 79.57226
      },
      {
        "latitude": 16.01226,
        "longitude": 79.5628
      },
      {
        "latitude": 16.03294,
        "longitude": 79.56374
      },
      {
        "latitude": 16.07451,
        "longitude": 79.54614
      },
      {
        "latitude": 16.11221,
        "longitude": 79.55414
      },
      {
        "latitude": 16.14282,
        "longitude": 79.53654
      },
      {
        "latitude": 16.16413,
        "longitude": 79.53605
      },
      {
        "latitude": 16.19967,
        "longitude": 79.56014
      },
      {
        "latitude": 16.27749,
        "longitude": 79.566
      },
      {
        "latitude": 16.28457,
        "longitude": 79.54996
      },
      {
        "latitude": 16.30703,
        "longitude": 79.53536
      },
      {
        "latitude": 16.29152,
        "longitude": 79.49615
      },
      {
        "latitude": 16.29164,
        "longitude": 79.47222
      },
      {
        "latitude": 16.30385,
        "longitude": 79.44644
      },
      {
        "latitude": 16.23379,
        "longitude": 79.36994
      },
      {
        "latitude": 16.22943,
        "longitude": 79.32449
      },
      {
        "latitude": 16.19477,
        "longitude": 79.25761
      },
      {
        "latitude": 16.16397,
        "longitude": 79.22063
      },
      {
        "latitude": 16.22768,
        "longitude": 79.21463
      },
      {
        "latitude": 16.21009,
        "longitude": 79.1595
      },
      {
        "latitude": 16.23272,
        "longitude": 79.12224
      },
      {
        "latitude": 16.22395,
        "longitude": 79.09927
      },
      {
        "latitude": 16.24331,
        "longitude": 79.02827
      },
      {
        "latitude": 16.24169,
        "longitude": 79.0111
      },
      {
        "latitude": 16.21247,
        "longitude": 78.98803
      },
      {
        "latitude": 16.19965,
        "longitude": 78.93086
      },
      {
        "latitude": 16.18417,
        "longitude": 78.90605
      },
      {
        "latitude": 16.13831,
        "longitude": 78.92399
      },
      {
        "latitude": 16.09307,
        "longitude": 78.92914
      },
      {
        "latitude": 15.96836,
        "longitude": 78.90955
      },
      {
        "latitude": 15.90806,
        "longitude": 78.83761
      },
      {
        "latitude": 15.86778,
        "longitude": 78.81019
      },
      {
        "latitude": 15.66064,
        "longitude": 78.77122
      },
      {
        "latitude": 15.53342,
        "longitude": 78.77611
      },
      {
        "latitude": 15.41788,
        "longitude": 78.77075
      },
      {
        "latitude": 15.3264,
        "longitude": 78.73673
      },
      {
        "latitude": 15.20121,
        "longitude": 78.73658
      }
    ],
    "polygons": [
      [
        {
          "latitude": 15.20121,
          "longitude": 78.73658
        },
        {
          "latitude": 15.18375,
          "longitude": 78.74186
        },
        {
          "latitude": 15.20043,
          "longitude": 78.77776
        },
        {
          "latitude": 15.19816,
          "longitude": 78.8718
        },
        {
          "latitude": 15.18751,
          "longitude": 78.91959
        },
        {
          "latitude": 15.2288,
          "longitude": 78.92726
        },
        {
          "latitude": 15.22875,
          "longitude": 78.94786
        },
        {
          "latitude": 15.17639,
          "longitude": 78.95766
        },
        {
          "latitude": 15.16513,
          "longitude": 78.98173
        },
        {
          "latitude": 15.16856,
          "longitude": 79.00938
        },
        {
          "latitude": 15.17955,
          "longitude": 79.01709
        },
        {
          "latitude": 15.17358,
          "longitude": 79.08208
        },
        {
          "latitude": 15.16499,
          "longitude": 79.07338
        },
        {
          "latitude": 15.14051,
          "longitude": 79.07234
        },
        {
          "latitude": 15.0514,
          "longitude": 79.08953
        },
        {
          "latitude": 15.08632,
          "longitude": 79.10019
        },
        {
          "latitude": 15.08838,
          "longitude": 79.12958
        },
        {
          "latitude": 15.10211,
          "longitude": 79.12904
        },
        {
          "latitude": 15.08714,
          "longitude": 79.21437
        },
        {
          "latitude": 15.10779,
          "longitude": 79.26207
        },
        {
          "latitude": 15.0982,
          "longitude": 79.26556
        },
        {
          "latitude": 15.09947,
          "longitude": 79.29211
        },
        {
          "latitude": 15.09504,
          "longitude": 79.30909
        },
        {
          "latitude": 15.08872,
          "longitude": 79.30729
        },
        {
          "latitude": 15.11785,
          "longitude": 79.33537
        },
        {
          "latitude": 15.10084,
          "longitude": 79.33579
        },
        {
          "latitude": 15.09446,
          "longitude": 79.32726
        },
        {
          "latitude": 15.08634,
          "longitude": 79.34386
        },
        {
          "latitude": 15.11772,
          "longitude": 79.3521
        },
        {
          "latitude": 15.08631,
          "longitude": 79.36783
        },
        {
          "latitude": 15.09239,
          "longitude": 79.39254
        },
        {
          "latitude": 15.07607,
          "longitude": 79.39087
        },
        {
          "latitude": 15.07402,
          "longitude": 79.4198
        },
        {
          "latitude": 15.05719,
          "longitude": 79.42248
        },
        {
          "latitude": 15.0682,
          "longitude": 79.4677
        },
        {
          "latitude": 15.05756,
          "longitude": 79.47613
        },
        {
          "latitude": 15.05712,
          "longitude": 79.50169
        },
        {
          "latitude": 15.03861,
          "longitude": 79.51852
        },
        {
          "latitude": 15.02224,
          "longitude": 79.55835
        },
        {
          "latitude": 15.04388,
          "longitude": 79.56429
        },
        {
          "latitude": 15.03509,
          "longitude": 79.62813
        },
        {
          "latitude": 15.0437,
          "longitude": 79.62913
        },
        {
          "latitude": 15.05764,
          "longitude": 79.60794
        },
        {
          "latitude": 15.10025,
          "longitude": 79.63303
        },
        {
          "latitude": 15.14878,
          "longitude": 79.62375
        },
        {
          "latitude": 15.15468,
          "longitude": 79.6497
        },
        {
          "latitude": 15.17232,
          "longitude": 79.64566
        },
        {
          "latitude": 15.17677,
          "longitude": 79.63383
        },
        {
          "latitude": 15.16559,
          "longitude": 79.62253
        },
        {
          "latitude": 15.1727,
          "longitude": 79.6217
        },
        {
          "latitude": 15.24583,
          "longitude": 79.65363
        },
        {
          "latitude": 15.26487,
          "longitude": 79.65039
        },
        {
          "latitude": 15.26506,
          "longitude": 79.66097
        },
        {
          "latitude": 15.32409,
          "longitude": 79.66794
        },
        {
          "latitude": 15.32721,
          "longitude": 79.65642
        },
        {
          "latitude": 15.36674,
          "longitude": 79.65711
        },
        {
          "latitude": 15.37679,
          "longitude": 79.66283
        },
        {
          "latitude": 15.37395,
          "longitude": 79.67661
        },
        {
          "latitude": 15.39564,
          "longitude": 79.68495
        },
        {
          "latitude": 15.41467,
          "longitude": 79.67551
        },
        {
          "latitude": 15.41702,
          "longitude": 79.66209
        },
        {
          "latitude": 15.39923,
          "longitude": 79.65053
        },
        {
          "latitude": 15.42367,
          "longitude": 79.6148
        },
        {
          "latitude": 15.38531,
          "longitude": 79.57753
        },
        {
          "latitude": 15.39443,
          "longitude": 79.56686
        },
        {
          "latitude": 15.44201,
          "longitude": 79.59446
        },
        {
          "latitude": 15.44216,
          "longitude": 79.57212
        },
        {
          "latitude": 15.45824,
          "longitude": 79.58249
        },
        {
          "latitude": 15.4645,
          "longitude": 79.57183
        },
        {
          "latitude": 15.48027,
          "longitude": 79.57919
        },
        {
          "latitude": 15.48726,
          "longitude": 79.59278
        },
        {
          "latitude": 15.49744,
          "longitude": 79.59046
        },
        {
          "latitude": 15.50622,
          "longitude": 79.56783
        },
        {
          "latitude": 15.48972,
          "longitude": 79.56377
        },
        {
          "latitude": 15.52965,
          "longitude": 79.56273
        },
        {
          "latitude": 15.537,
          "longitude": 79.56889
        },
        {
          "latitude": 15.54989,
          "longitude": 79.56282
        },
        {
          "latitude": 15.55452,
          "longitude": 79.57095
        },
        {
          "latitude": 15.54044,
          "longitude": 79.57309
        },
        {
          "latitude": 15.53615,
          "longitude": 79.5833
        },
        {
          "latitude": 15.55215,
          "longitude": 79.60448
        },
        {
          "latitude": 15.56399,
          "longitude": 79.59831
        },
        {
          "latitude": 15.58963,
          "longitude": 79.61137
        },
        {
          "latitude": 15.57224,
          "longitude": 79.63001
        },
        {
          "latitude": 15.57902,
          "longitude": 79.63998
        },
        {
          "latitude": 15.57428,
          "longitude": 79.65867
        },
        {
          "latitude": 15.59324,
          "longitude": 79.66374
        },
        {
          "latitude": 15.59838,
          "longitude": 79.67254
        },
        {
          "latitude": 15.59192,
          "longitude": 79.6985
        },
        {
          "latitude": 15.57465,
          "longitude": 79.69367
        },
        {
          "latitude": 15.54248,
          "longitude": 79.77443
        },
        {
          "latitude": 15.53106,
          "longitude": 79.777
        },
        {
          "latitude": 15.53076,
          "longitude": 79.79648
        },
        {
          "latitude": 15.55763,
          "longitude": 79.79412
        },
        {
          "latitude": 15.58622,
          "longitude": 79.76656
        },
        {
          "latitude": 15.61045,
          "longitude": 79.71857
        },
        {
          "latitude": 15.66398,
          "longitude": 79.68738
        },
        {
          "latitude": 15.685,
          "longitude": 79.65073
        },
        {
          "latitude": 15.73415,
          "longitude": 79.6204
        },
        {
          "latitude": 15.7403,
          "longitude": 79.60125
        },
        {
          "latitude": 15.72462,
          "longitude": 79.577
        },
        {
          "latitude": 15.70875,
          "longitude": 79.51273
        },
        {
          "latitude": 15.72761,
          "longitude": 79.50185
        },
        {
          "latitude": 15.73371,
          "longitude": 79.50722
        },
        {
          "latitude": 15.74104,
          "longitude": 79.49539
        },
        {
          "latitude": 15.73102,
          "longitude": 79.47976
        },
        {
          "latitude": 15.74379,
          "longitude": 79.44495
        },
        {
          "latitude": 15.73302,
          "longitude": 79.439
        },
        {
          "latitude": 15.73198,
          "longitude": 79.42367
        },
        {
          "latitude": 15.73955,
          "longitude": 79.41781
        },
        {
          "latitude": 15.74831,
          "longitude": 79.42499
        },
        {
          "latitude": 15.77242,
          "longitude": 79.42405
        },
        {
          "latitude": 15.78017,
          "longitude": 79.41217
        },
        {
          "latitude": 15.77553,
          "longitude": 79.40398
        },
        {
          "latitude": 15.79096,
          "longitude": 79.38122
        },
        {
          "latitude": 15.76001,
          "longitude": 79.36513
        },
        {
          "latitude": 15.76224,
          "longitude": 79.35665
        },
        {
          "latitude": 15.7829,
          "longitude": 79.34797
        },
        {
          "latitude": 15.78742,
          "longitude": 79.33549
        },
        {
          "latitude": 15.8071,
          "longitude": 79.32407
        },
        {
          "latitude": 15.80663,
          "longitude": 79.31275
        },
        {
          "latitude": 15.84427,
          "longitude": 79.32246
        },
        {
          "latitude": 15.85953,
          "longitude": 79.35306
        },
        {
          "latitude": 15.89412,
          "longitude": 79.38768
        },
        {
          "latitude": 15.9152,
          "longitude": 79.39523
        },
        {
          "latitude": 15.91872,
          "longitude": 79.41659
        },
        {
          "latitude": 15.94218,
          "longitude": 79.42983
        },
        {
          "latitude": 15.96099,
          "longitude": 79.47425
        },
        {
          "latitude": 15.96148,
          "longitude": 79.5059
        },
        {
          "latitude": 15.96969,
          "longitude": 79.51991
        },
        {
          "latitude": 15.98312,
          "longitude": 79.52442
        },
        {
          "latitude": 16.00436,
          "longitude": 79.57226
        },
        {
          "latitude": 16.01226,
          "longitude": 79.5628
        },
        {
          "latitude": 16.03294,
          "longitude": 79.56374
        },
        {
          "latitude": 16.07451,
          "longitude": 79.54614
        },
        {
          "latitude": 16.11221,
          "longitude": 79.55414
        },
        {
          "latitude": 16.14282,
          "longitude": 79.53654
        },
        {
          "latitude": 16.16413,
          "longitude": 79.53605
        },
        {
          "latitude": 16.19967,
          "longitude": 79.56014
        },
        {
          "latitude": 16.27749,
          "longitude": 79.566
        },
        {
          "latitude": 16.28457,
          "longitude": 79.54996
        },
        {
          "latitude": 16.30703,
          "longitude": 79.53536
        },
        {
          "latitude": 16.29152,
          "longitude": 79.49615
        },
        {
          "latitude": 16.29164,
          "longitude": 79.47222
        },
        {
          "latitude": 16.30385,
          "longitude": 79.44644
        },
        {
          "latitude": 16.23379,
          "longitude": 79.36994
        },
        {
          "latitude": 16.22943,
          "longitude": 79.32449
        },
        {
          "latitude": 16.19477,
          "longitude": 79.25761
        },
        {
          "latitude": 16.16397,
          "longitude": 79.22063
        },
        {
          "latitude": 16.22768,
          "longitude": 79.21463
        },
        {
          "latitude": 16.21009,
          "longitude": 79.1595
        },
        {
          "latitude": 16.23272,
          "longitude": 79.12224
        },
        {
          "latitude": 16.22395,
          "longitude": 79.09927
        },
        {
          "latitude": 16.24331,
          "longitude": 79.02827
        },
        {
          "latitude": 16.24169,
          "longitude": 79.0111
        },
        {
          "latitude": 16.21247,
          "longitude": 78.98803
        },
        {
          "latitude": 16.19965,
          "longitude": 78.93086
        },
        {
          "latitude": 16.18417,
          "longitude": 78.90605
        },
        {
          "latitude": 16.13831,
          "longitude": 78.92399
        },
        {
          "latitude": 16.09307,
          "longitude": 78.92914
        },
        {
          "latitude": 15.96836,
          "longitude": 78.90955
        },
        {
          "latitude": 15.90806,
          "longitude": 78.83761
        },
        {
          "latitude": 15.86778,
          "longitude": 78.81019
        },
        {
          "latitude": 15.66064,
          "longitude": 78.77122
        },
        {
          "latitude": 15.53342,
          "longitude": 78.77611
        },
        {
          "latitude": 15.41788,
          "longitude": 78.77075
        },
        {
          "latitude": 15.3264,
          "longitude": 78.73673
        },
        {
          "latitude": 15.20121,
          "longitude": 78.73658
        }
      ]
    ]
  },
  {
    "id": "polavaram",
    "name": "Polavaram",
    "headquarters": "Rampachodavaram",
    "center": {
      "latitude": 17.6095,
      "longitude": 81.6845
    },
    "region": "Coastal Andhra",
    "polygon": [
      {
        "latitude": 17.67308,
        "longitude": 80.87584
      },
      {
        "latitude": 17.67846,
        "longitude": 80.89845
      },
      {
        "latitude": 17.67058,
        "longitude": 80.9138
      },
      {
        "latitude": 17.6399,
        "longitude": 80.90965
      },
      {
        "latitude": 17.63432,
        "longitude": 80.94384
      },
      {
        "latitude": 17.64756,
        "longitude": 80.96556
      },
      {
        "latitude": 17.65002,
        "longitude": 81.00104
      },
      {
        "latitude": 17.63604,
        "longitude": 81.00906
      },
      {
        "latitude": 17.60975,
        "longitude": 81.00601
      },
      {
        "latitude": 17.59859,
        "longitude": 81.01616
      },
      {
        "latitude": 17.61756,
        "longitude": 81.0744
      },
      {
        "latitude": 17.61646,
        "longitude": 81.09905
      },
      {
        "latitude": 17.58658,
        "longitude": 81.13493
      },
      {
        "latitude": 17.56432,
        "longitude": 81.18609
      },
      {
        "latitude": 17.55953,
        "longitude": 81.25902
      },
      {
        "latitude": 17.48292,
        "longitude": 81.30096
      },
      {
        "latitude": 17.48509,
        "longitude": 81.3681
      },
      {
        "latitude": 17.45557,
        "longitude": 81.40131
      },
      {
        "latitude": 17.45154,
        "longitude": 81.42386
      },
      {
        "latitude": 17.46128,
        "longitude": 81.5021
      },
      {
        "latitude": 17.47644,
        "longitude": 81.49488
      },
      {
        "latitude": 17.47775,
        "longitude": 81.50585
      },
      {
        "latitude": 17.43962,
        "longitude": 81.53157
      },
      {
        "latitude": 17.43983,
        "longitude": 81.56351
      },
      {
        "latitude": 17.43277,
        "longitude": 81.57562
      },
      {
        "latitude": 17.40568,
        "longitude": 81.5858
      },
      {
        "latitude": 17.40682,
        "longitude": 81.6139
      },
      {
        "latitude": 17.37561,
        "longitude": 81.60425
      },
      {
        "latitude": 17.33122,
        "longitude": 81.61428
      },
      {
        "latitude": 17.3237,
        "longitude": 81.64238
      },
      {
        "latitude": 17.30147,
        "longitude": 81.67808
      },
      {
        "latitude": 17.29024,
        "longitude": 81.67856
      },
      {
        "latitude": 17.28274,
        "longitude": 81.66241
      },
      {
        "latitude": 17.26816,
        "longitude": 81.65876
      },
      {
        "latitude": 17.2643,
        "longitude": 81.67397
      },
      {
        "latitude": 17.26492,
        "longitude": 81.66178
      },
      {
        "latitude": 17.25531,
        "longitude": 81.66595
      },
      {
        "latitude": 17.2525,
        "longitude": 81.67693
      },
      {
        "latitude": 17.25962,
        "longitude": 81.67817
      },
      {
        "latitude": 17.24843,
        "longitude": 81.68692
      },
      {
        "latitude": 17.23297,
        "longitude": 81.68134
      },
      {
        "latitude": 17.22259,
        "longitude": 81.71489
      },
      {
        "latitude": 17.22237,
        "longitude": 81.72001
      },
      {
        "latitude": 17.23749,
        "longitude": 81.71669
      },
      {
        "latitude": 17.23342,
        "longitude": 81.75441
      },
      {
        "latitude": 17.24982,
        "longitude": 81.76653
      },
      {
        "latitude": 17.24342,
        "longitude": 81.7967
      },
      {
        "latitude": 17.24618,
        "longitude": 81.80643
      },
      {
        "latitude": 17.2599,
        "longitude": 81.80752
      },
      {
        "latitude": 17.25822,
        "longitude": 81.82662
      },
      {
        "latitude": 17.28834,
        "longitude": 81.82275
      },
      {
        "latitude": 17.30946,
        "longitude": 81.82883
      },
      {
        "latitude": 17.30946,
        "longitude": 81.8418
      },
      {
        "latitude": 17.28784,
        "longitude": 81.86708
      },
      {
        "latitude": 17.29633,
        "longitude": 81.88178
      },
      {
        "latitude": 17.31365,
        "longitude": 81.88067
      },
      {
        "latitude": 17.31794,
        "longitude": 81.89074
      },
      {
        "latitude": 17.30402,
        "longitude": 81.91193
      },
      {
        "latitude": 17.31338,
        "longitude": 81.92421
      },
      {
        "latitude": 17.27698,
        "longitude": 81.91391
      },
      {
        "latitude": 17.27573,
        "longitude": 81.92366
      },
      {
        "latitude": 17.292,
        "longitude": 81.96431
      },
      {
        "latitude": 17.29949,
        "longitude": 81.96295
      },
      {
        "latitude": 17.30266,
        "longitude": 81.97605
      },
      {
        "latitude": 17.31484,
        "longitude": 81.97393
      },
      {
        "latitude": 17.31114,
        "longitude": 82.02441
      },
      {
        "latitude": 17.30562,
        "longitude": 82.03562
      },
      {
        "latitude": 17.29494,
        "longitude": 82.03795
      },
      {
        "latitude": 17.2944,
        "longitude": 82.05911
      },
      {
        "latitude": 17.30213,
        "longitude": 82.07093
      },
      {
        "latitude": 17.29615,
        "longitude": 82.09034
      },
      {
        "latitude": 17.30342,
        "longitude": 82.06381
      },
      {
        "latitude": 17.31609,
        "longitude": 82.05365
      },
      {
        "latitude": 17.33133,
        "longitude": 82.06207
      },
      {
        "latitude": 17.34461,
        "longitude": 82.05489
      },
      {
        "latitude": 17.36064,
        "longitude": 82.06205
      },
      {
        "latitude": 17.3751,
        "longitude": 82.05151
      },
      {
        "latitude": 17.39016,
        "longitude": 82.0677
      },
      {
        "latitude": 17.38466,
        "longitude": 82.07487
      },
      {
        "latitude": 17.39459,
        "longitude": 82.08108
      },
      {
        "latitude": 17.39712,
        "longitude": 82.07123
      },
      {
        "latitude": 17.40172,
        "longitude": 82.07425
      },
      {
        "latitude": 17.40259,
        "longitude": 82.08217
      },
      {
        "latitude": 17.38804,
        "longitude": 82.08762
      },
      {
        "latitude": 17.40076,
        "longitude": 82.09847
      },
      {
        "latitude": 17.3848,
        "longitude": 82.10176
      },
      {
        "latitude": 17.3919,
        "longitude": 82.11358
      },
      {
        "latitude": 17.38597,
        "longitude": 82.12084
      },
      {
        "latitude": 17.366,
        "longitude": 82.11221
      },
      {
        "latitude": 17.34697,
        "longitude": 82.09158
      },
      {
        "latitude": 17.33885,
        "longitude": 82.10771
      },
      {
        "latitude": 17.32562,
        "longitude": 82.09932
      },
      {
        "latitude": 17.3288,
        "longitude": 82.11507
      },
      {
        "latitude": 17.32286,
        "longitude": 82.12269
      },
      {
        "latitude": 17.34504,
        "longitude": 82.12503
      },
      {
        "latitude": 17.34165,
        "longitude": 82.14266
      },
      {
        "latitude": 17.34883,
        "longitude": 82.15414
      },
      {
        "latitude": 17.35214,
        "longitude": 82.14498
      },
      {
        "latitude": 17.36306,
        "longitude": 82.14945
      },
      {
        "latitude": 17.3666,
        "longitude": 82.13909
      },
      {
        "latitude": 17.38674,
        "longitude": 82.1856
      },
      {
        "latitude": 17.3792,
        "longitude": 82.19806
      },
      {
        "latitude": 17.38921,
        "longitude": 82.21801
      },
      {
        "latitude": 17.39691,
        "longitude": 82.21718
      },
      {
        "latitude": 17.43099,
        "longitude": 82.25317
      },
      {
        "latitude": 17.44598,
        "longitude": 82.28474
      },
      {
        "latitude": 17.48008,
        "longitude": 82.2913
      },
      {
        "latitude": 17.51101,
        "longitude": 82.33358
      },
      {
        "latitude": 17.52323,
        "longitude": 82.33733
      },
      {
        "latitude": 17.5534,
        "longitude": 82.32907
      },
      {
        "latitude": 17.58563,
        "longitude": 82.3408
      },
      {
        "latitude": 17.58891,
        "longitude": 82.30361
      },
      {
        "latitude": 17.61068,
        "longitude": 82.2744
      },
      {
        "latitude": 17.62325,
        "longitude": 82.27588
      },
      {
        "latitude": 17.61831,
        "longitude": 82.24822
      },
      {
        "latitude": 17.63763,
        "longitude": 82.22638
      },
      {
        "latitude": 17.62149,
        "longitude": 82.19114
      },
      {
        "latitude": 17.60815,
        "longitude": 82.18098
      },
      {
        "latitude": 17.60944,
        "longitude": 82.16334
      },
      {
        "latitude": 17.63451,
        "longitude": 82.138
      },
      {
        "latitude": 17.64861,
        "longitude": 82.13544
      },
      {
        "latitude": 17.6563,
        "longitude": 82.09177
      },
      {
        "latitude": 17.63535,
        "longitude": 82.05857
      },
      {
        "latitude": 17.64274,
        "longitude": 82.05232
      },
      {
        "latitude": 17.63157,
        "longitude": 82.02354
      },
      {
        "latitude": 17.61802,
        "longitude": 82.01632
      },
      {
        "latitude": 17.63906,
        "longitude": 82.00201
      },
      {
        "latitude": 17.64578,
        "longitude": 82.01042
      },
      {
        "latitude": 17.65873,
        "longitude": 82.00637
      },
      {
        "latitude": 17.66875,
        "longitude": 82.02245
      },
      {
        "latitude": 17.70268,
        "longitude": 82.02486
      },
      {
        "latitude": 17.71399,
        "longitude": 82.03349
      },
      {
        "latitude": 17.72761,
        "longitude": 82.02806
      },
      {
        "latitude": 17.73747,
        "longitude": 82.01135
      },
      {
        "latitude": 17.75285,
        "longitude": 82.01627
      },
      {
        "latitude": 17.76387,
        "longitude": 81.9982
      },
      {
        "latitude": 17.76757,
        "longitude": 81.97839
      },
      {
        "latitude": 17.75737,
        "longitude": 81.96059
      },
      {
        "latitude": 17.74623,
        "longitude": 81.97171
      },
      {
        "latitude": 17.738,
        "longitude": 81.93517
      },
      {
        "latitude": 17.74477,
        "longitude": 81.898
      },
      {
        "latitude": 17.74063,
        "longitude": 81.87883
      },
      {
        "latitude": 17.75174,
        "longitude": 81.86115
      },
      {
        "latitude": 17.78795,
        "longitude": 81.90071
      },
      {
        "latitude": 17.80002,
        "longitude": 81.92581
      },
      {
        "latitude": 17.80713,
        "longitude": 81.9245
      },
      {
        "latitude": 17.81624,
        "longitude": 81.96175
      },
      {
        "latitude": 17.85172,
        "longitude": 81.98854
      },
      {
        "latitude": 17.8447,
        "longitude": 82.00773
      },
      {
        "latitude": 17.82709,
        "longitude": 82.00945
      },
      {
        "latitude": 17.83911,
        "longitude": 82.0196
      },
      {
        "latitude": 17.86144,
        "longitude": 82.01733
      },
      {
        "latitude": 17.87119,
        "longitude": 82.00418
      },
      {
        "latitude": 17.88548,
        "longitude": 82.00069
      },
      {
        "latitude": 17.89982,
        "longitude": 82.00231
      },
      {
        "latitude": 17.93923,
        "longitude": 82.02956
      },
      {
        "latitude": 17.95697,
        "longitude": 82.02195
      },
      {
        "latitude": 17.96527,
        "longitude": 82.00689
      },
      {
        "latitude": 17.9799,
        "longitude": 82.00965
      },
      {
        "latitude": 18.01322,
        "longitude": 81.98008
      },
      {
        "latitude": 17.99877,
        "longitude": 81.96188
      },
      {
        "latitude": 17.99037,
        "longitude": 81.91814
      },
      {
        "latitude": 17.97666,
        "longitude": 81.90372
      },
      {
        "latitude": 17.95098,
        "longitude": 81.80989
      },
      {
        "latitude": 17.92081,
        "longitude": 81.79013
      },
      {
        "latitude": 17.87194,
        "longitude": 81.71039
      },
      {
        "latitude": 17.90097,
        "longitude": 81.69965
      },
      {
        "latitude": 17.8853,
        "longitude": 81.6861
      },
      {
        "latitude": 17.88724,
        "longitude": 81.67091
      },
      {
        "latitude": 17.84019,
        "longitude": 81.64077
      },
      {
        "latitude": 17.83345,
        "longitude": 81.62235
      },
      {
        "latitude": 17.82209,
        "longitude": 81.61668
      },
      {
        "latitude": 17.83717,
        "longitude": 81.57432
      },
      {
        "latitude": 17.82571,
        "longitude": 81.56369
      },
      {
        "latitude": 17.8127,
        "longitude": 81.49004
      },
      {
        "latitude": 17.83797,
        "longitude": 81.47392
      },
      {
        "latitude": 17.82497,
        "longitude": 81.44419
      },
      {
        "latitude": 17.83193,
        "longitude": 81.43412
      },
      {
        "latitude": 17.81342,
        "longitude": 81.4156
      },
      {
        "latitude": 17.82023,
        "longitude": 81.39655
      },
      {
        "latitude": 17.79414,
        "longitude": 81.3923
      },
      {
        "latitude": 17.81225,
        "longitude": 81.35405
      },
      {
        "latitude": 17.80968,
        "longitude": 81.26532
      },
      {
        "latitude": 17.85762,
        "longitude": 81.16613
      },
      {
        "latitude": 17.79457,
        "longitude": 81.08159
      },
      {
        "latitude": 17.77517,
        "longitude": 81.09577
      },
      {
        "latitude": 17.77386,
        "longitude": 81.08223
      },
      {
        "latitude": 17.76018,
        "longitude": 81.08472
      },
      {
        "latitude": 17.76005,
        "longitude": 81.07505
      },
      {
        "latitude": 17.72154,
        "longitude": 81.08915
      },
      {
        "latitude": 17.71842,
        "longitude": 81.08201
      },
      {
        "latitude": 17.73294,
        "longitude": 81.06711
      },
      {
        "latitude": 17.72821,
        "longitude": 81.06324
      },
      {
        "latitude": 17.71552,
        "longitude": 81.06656
      },
      {
        "latitude": 17.71419,
        "longitude": 81.07855
      },
      {
        "latitude": 17.69654,
        "longitude": 81.07318
      },
      {
        "latitude": 17.70476,
        "longitude": 81.05901
      },
      {
        "latitude": 17.71522,
        "longitude": 81.06029
      },
      {
        "latitude": 17.72024,
        "longitude": 81.01955
      },
      {
        "latitude": 17.7272,
        "longitude": 81.0424
      },
      {
        "latitude": 17.74454,
        "longitude": 81.03537
      },
      {
        "latitude": 17.75028,
        "longitude": 80.99174
      },
      {
        "latitude": 17.77935,
        "longitude": 80.97427
      },
      {
        "latitude": 17.76004,
        "longitude": 80.94566
      },
      {
        "latitude": 17.74962,
        "longitude": 80.89737
      },
      {
        "latitude": 17.73091,
        "longitude": 80.88077
      },
      {
        "latitude": 17.68759,
        "longitude": 80.88412
      },
      {
        "latitude": 17.67308,
        "longitude": 80.87584
      }
    ],
    "polygons": [
      [
        {
          "latitude": 17.67308,
          "longitude": 80.87584
        },
        {
          "latitude": 17.67846,
          "longitude": 80.89845
        },
        {
          "latitude": 17.67058,
          "longitude": 80.9138
        },
        {
          "latitude": 17.6399,
          "longitude": 80.90965
        },
        {
          "latitude": 17.63432,
          "longitude": 80.94384
        },
        {
          "latitude": 17.64756,
          "longitude": 80.96556
        },
        {
          "latitude": 17.65002,
          "longitude": 81.00104
        },
        {
          "latitude": 17.63604,
          "longitude": 81.00906
        },
        {
          "latitude": 17.60975,
          "longitude": 81.00601
        },
        {
          "latitude": 17.59859,
          "longitude": 81.01616
        },
        {
          "latitude": 17.61756,
          "longitude": 81.0744
        },
        {
          "latitude": 17.61646,
          "longitude": 81.09905
        },
        {
          "latitude": 17.58658,
          "longitude": 81.13493
        },
        {
          "latitude": 17.56432,
          "longitude": 81.18609
        },
        {
          "latitude": 17.55953,
          "longitude": 81.25902
        },
        {
          "latitude": 17.48292,
          "longitude": 81.30096
        },
        {
          "latitude": 17.48509,
          "longitude": 81.3681
        },
        {
          "latitude": 17.45557,
          "longitude": 81.40131
        },
        {
          "latitude": 17.45154,
          "longitude": 81.42386
        },
        {
          "latitude": 17.46128,
          "longitude": 81.5021
        },
        {
          "latitude": 17.47644,
          "longitude": 81.49488
        },
        {
          "latitude": 17.47775,
          "longitude": 81.50585
        },
        {
          "latitude": 17.43962,
          "longitude": 81.53157
        },
        {
          "latitude": 17.43983,
          "longitude": 81.56351
        },
        {
          "latitude": 17.43277,
          "longitude": 81.57562
        },
        {
          "latitude": 17.40568,
          "longitude": 81.5858
        },
        {
          "latitude": 17.40682,
          "longitude": 81.6139
        },
        {
          "latitude": 17.37561,
          "longitude": 81.60425
        },
        {
          "latitude": 17.33122,
          "longitude": 81.61428
        },
        {
          "latitude": 17.3237,
          "longitude": 81.64238
        },
        {
          "latitude": 17.30147,
          "longitude": 81.67808
        },
        {
          "latitude": 17.29024,
          "longitude": 81.67856
        },
        {
          "latitude": 17.28274,
          "longitude": 81.66241
        },
        {
          "latitude": 17.26816,
          "longitude": 81.65876
        },
        {
          "latitude": 17.2643,
          "longitude": 81.67397
        },
        {
          "latitude": 17.26492,
          "longitude": 81.66178
        },
        {
          "latitude": 17.25531,
          "longitude": 81.66595
        },
        {
          "latitude": 17.2525,
          "longitude": 81.67693
        },
        {
          "latitude": 17.25962,
          "longitude": 81.67817
        },
        {
          "latitude": 17.24843,
          "longitude": 81.68692
        },
        {
          "latitude": 17.23297,
          "longitude": 81.68134
        },
        {
          "latitude": 17.22259,
          "longitude": 81.71489
        },
        {
          "latitude": 17.22237,
          "longitude": 81.72001
        },
        {
          "latitude": 17.23749,
          "longitude": 81.71669
        },
        {
          "latitude": 17.23342,
          "longitude": 81.75441
        },
        {
          "latitude": 17.24982,
          "longitude": 81.76653
        },
        {
          "latitude": 17.24342,
          "longitude": 81.7967
        },
        {
          "latitude": 17.24618,
          "longitude": 81.80643
        },
        {
          "latitude": 17.2599,
          "longitude": 81.80752
        },
        {
          "latitude": 17.25822,
          "longitude": 81.82662
        },
        {
          "latitude": 17.28834,
          "longitude": 81.82275
        },
        {
          "latitude": 17.30946,
          "longitude": 81.82883
        },
        {
          "latitude": 17.30946,
          "longitude": 81.8418
        },
        {
          "latitude": 17.28784,
          "longitude": 81.86708
        },
        {
          "latitude": 17.29633,
          "longitude": 81.88178
        },
        {
          "latitude": 17.31365,
          "longitude": 81.88067
        },
        {
          "latitude": 17.31794,
          "longitude": 81.89074
        },
        {
          "latitude": 17.30402,
          "longitude": 81.91193
        },
        {
          "latitude": 17.31338,
          "longitude": 81.92421
        },
        {
          "latitude": 17.27698,
          "longitude": 81.91391
        },
        {
          "latitude": 17.27573,
          "longitude": 81.92366
        },
        {
          "latitude": 17.292,
          "longitude": 81.96431
        },
        {
          "latitude": 17.29949,
          "longitude": 81.96295
        },
        {
          "latitude": 17.30266,
          "longitude": 81.97605
        },
        {
          "latitude": 17.31484,
          "longitude": 81.97393
        },
        {
          "latitude": 17.31114,
          "longitude": 82.02441
        },
        {
          "latitude": 17.30562,
          "longitude": 82.03562
        },
        {
          "latitude": 17.29494,
          "longitude": 82.03795
        },
        {
          "latitude": 17.2944,
          "longitude": 82.05911
        },
        {
          "latitude": 17.30213,
          "longitude": 82.07093
        },
        {
          "latitude": 17.29615,
          "longitude": 82.09034
        },
        {
          "latitude": 17.30342,
          "longitude": 82.06381
        },
        {
          "latitude": 17.31609,
          "longitude": 82.05365
        },
        {
          "latitude": 17.33133,
          "longitude": 82.06207
        },
        {
          "latitude": 17.34461,
          "longitude": 82.05489
        },
        {
          "latitude": 17.36064,
          "longitude": 82.06205
        },
        {
          "latitude": 17.3751,
          "longitude": 82.05151
        },
        {
          "latitude": 17.39016,
          "longitude": 82.0677
        },
        {
          "latitude": 17.38466,
          "longitude": 82.07487
        },
        {
          "latitude": 17.39459,
          "longitude": 82.08108
        },
        {
          "latitude": 17.39712,
          "longitude": 82.07123
        },
        {
          "latitude": 17.40172,
          "longitude": 82.07425
        },
        {
          "latitude": 17.40259,
          "longitude": 82.08217
        },
        {
          "latitude": 17.38804,
          "longitude": 82.08762
        },
        {
          "latitude": 17.40076,
          "longitude": 82.09847
        },
        {
          "latitude": 17.3848,
          "longitude": 82.10176
        },
        {
          "latitude": 17.3919,
          "longitude": 82.11358
        },
        {
          "latitude": 17.38597,
          "longitude": 82.12084
        },
        {
          "latitude": 17.366,
          "longitude": 82.11221
        },
        {
          "latitude": 17.34697,
          "longitude": 82.09158
        },
        {
          "latitude": 17.33885,
          "longitude": 82.10771
        },
        {
          "latitude": 17.32562,
          "longitude": 82.09932
        },
        {
          "latitude": 17.3288,
          "longitude": 82.11507
        },
        {
          "latitude": 17.32286,
          "longitude": 82.12269
        },
        {
          "latitude": 17.34504,
          "longitude": 82.12503
        },
        {
          "latitude": 17.34165,
          "longitude": 82.14266
        },
        {
          "latitude": 17.34883,
          "longitude": 82.15414
        },
        {
          "latitude": 17.35214,
          "longitude": 82.14498
        },
        {
          "latitude": 17.36306,
          "longitude": 82.14945
        },
        {
          "latitude": 17.3666,
          "longitude": 82.13909
        },
        {
          "latitude": 17.38674,
          "longitude": 82.1856
        },
        {
          "latitude": 17.3792,
          "longitude": 82.19806
        },
        {
          "latitude": 17.38921,
          "longitude": 82.21801
        },
        {
          "latitude": 17.39691,
          "longitude": 82.21718
        },
        {
          "latitude": 17.43099,
          "longitude": 82.25317
        },
        {
          "latitude": 17.44598,
          "longitude": 82.28474
        },
        {
          "latitude": 17.48008,
          "longitude": 82.2913
        },
        {
          "latitude": 17.51101,
          "longitude": 82.33358
        },
        {
          "latitude": 17.52323,
          "longitude": 82.33733
        },
        {
          "latitude": 17.5534,
          "longitude": 82.32907
        },
        {
          "latitude": 17.58563,
          "longitude": 82.3408
        },
        {
          "latitude": 17.58891,
          "longitude": 82.30361
        },
        {
          "latitude": 17.61068,
          "longitude": 82.2744
        },
        {
          "latitude": 17.62325,
          "longitude": 82.27588
        },
        {
          "latitude": 17.61831,
          "longitude": 82.24822
        },
        {
          "latitude": 17.63763,
          "longitude": 82.22638
        },
        {
          "latitude": 17.62149,
          "longitude": 82.19114
        },
        {
          "latitude": 17.60815,
          "longitude": 82.18098
        },
        {
          "latitude": 17.60944,
          "longitude": 82.16334
        },
        {
          "latitude": 17.63451,
          "longitude": 82.138
        },
        {
          "latitude": 17.64861,
          "longitude": 82.13544
        },
        {
          "latitude": 17.6563,
          "longitude": 82.09177
        },
        {
          "latitude": 17.63535,
          "longitude": 82.05857
        },
        {
          "latitude": 17.64274,
          "longitude": 82.05232
        },
        {
          "latitude": 17.63157,
          "longitude": 82.02354
        },
        {
          "latitude": 17.61802,
          "longitude": 82.01632
        },
        {
          "latitude": 17.63906,
          "longitude": 82.00201
        },
        {
          "latitude": 17.64578,
          "longitude": 82.01042
        },
        {
          "latitude": 17.65873,
          "longitude": 82.00637
        },
        {
          "latitude": 17.66875,
          "longitude": 82.02245
        },
        {
          "latitude": 17.70268,
          "longitude": 82.02486
        },
        {
          "latitude": 17.71399,
          "longitude": 82.03349
        },
        {
          "latitude": 17.72761,
          "longitude": 82.02806
        },
        {
          "latitude": 17.73747,
          "longitude": 82.01135
        },
        {
          "latitude": 17.75285,
          "longitude": 82.01627
        },
        {
          "latitude": 17.76387,
          "longitude": 81.9982
        },
        {
          "latitude": 17.76757,
          "longitude": 81.97839
        },
        {
          "latitude": 17.75737,
          "longitude": 81.96059
        },
        {
          "latitude": 17.74623,
          "longitude": 81.97171
        },
        {
          "latitude": 17.738,
          "longitude": 81.93517
        },
        {
          "latitude": 17.74477,
          "longitude": 81.898
        },
        {
          "latitude": 17.74063,
          "longitude": 81.87883
        },
        {
          "latitude": 17.75174,
          "longitude": 81.86115
        },
        {
          "latitude": 17.78795,
          "longitude": 81.90071
        },
        {
          "latitude": 17.80002,
          "longitude": 81.92581
        },
        {
          "latitude": 17.80713,
          "longitude": 81.9245
        },
        {
          "latitude": 17.81624,
          "longitude": 81.96175
        },
        {
          "latitude": 17.85172,
          "longitude": 81.98854
        },
        {
          "latitude": 17.8447,
          "longitude": 82.00773
        },
        {
          "latitude": 17.82709,
          "longitude": 82.00945
        },
        {
          "latitude": 17.83911,
          "longitude": 82.0196
        },
        {
          "latitude": 17.86144,
          "longitude": 82.01733
        },
        {
          "latitude": 17.87119,
          "longitude": 82.00418
        },
        {
          "latitude": 17.88548,
          "longitude": 82.00069
        },
        {
          "latitude": 17.89982,
          "longitude": 82.00231
        },
        {
          "latitude": 17.93923,
          "longitude": 82.02956
        },
        {
          "latitude": 17.95697,
          "longitude": 82.02195
        },
        {
          "latitude": 17.96527,
          "longitude": 82.00689
        },
        {
          "latitude": 17.9799,
          "longitude": 82.00965
        },
        {
          "latitude": 18.01322,
          "longitude": 81.98008
        },
        {
          "latitude": 17.99877,
          "longitude": 81.96188
        },
        {
          "latitude": 17.99037,
          "longitude": 81.91814
        },
        {
          "latitude": 17.97666,
          "longitude": 81.90372
        },
        {
          "latitude": 17.95098,
          "longitude": 81.80989
        },
        {
          "latitude": 17.92081,
          "longitude": 81.79013
        },
        {
          "latitude": 17.87194,
          "longitude": 81.71039
        },
        {
          "latitude": 17.90097,
          "longitude": 81.69965
        },
        {
          "latitude": 17.8853,
          "longitude": 81.6861
        },
        {
          "latitude": 17.88724,
          "longitude": 81.67091
        },
        {
          "latitude": 17.84019,
          "longitude": 81.64077
        },
        {
          "latitude": 17.83345,
          "longitude": 81.62235
        },
        {
          "latitude": 17.82209,
          "longitude": 81.61668
        },
        {
          "latitude": 17.83717,
          "longitude": 81.57432
        },
        {
          "latitude": 17.82571,
          "longitude": 81.56369
        },
        {
          "latitude": 17.8127,
          "longitude": 81.49004
        },
        {
          "latitude": 17.83797,
          "longitude": 81.47392
        },
        {
          "latitude": 17.82497,
          "longitude": 81.44419
        },
        {
          "latitude": 17.83193,
          "longitude": 81.43412
        },
        {
          "latitude": 17.81342,
          "longitude": 81.4156
        },
        {
          "latitude": 17.82023,
          "longitude": 81.39655
        },
        {
          "latitude": 17.79414,
          "longitude": 81.3923
        },
        {
          "latitude": 17.81225,
          "longitude": 81.35405
        },
        {
          "latitude": 17.80968,
          "longitude": 81.26532
        },
        {
          "latitude": 17.85762,
          "longitude": 81.16613
        },
        {
          "latitude": 17.79457,
          "longitude": 81.08159
        },
        {
          "latitude": 17.77517,
          "longitude": 81.09577
        },
        {
          "latitude": 17.77386,
          "longitude": 81.08223
        },
        {
          "latitude": 17.76018,
          "longitude": 81.08472
        },
        {
          "latitude": 17.76005,
          "longitude": 81.07505
        },
        {
          "latitude": 17.72154,
          "longitude": 81.08915
        },
        {
          "latitude": 17.71842,
          "longitude": 81.08201
        },
        {
          "latitude": 17.73294,
          "longitude": 81.06711
        },
        {
          "latitude": 17.72821,
          "longitude": 81.06324
        },
        {
          "latitude": 17.71552,
          "longitude": 81.06656
        },
        {
          "latitude": 17.71419,
          "longitude": 81.07855
        },
        {
          "latitude": 17.69654,
          "longitude": 81.07318
        },
        {
          "latitude": 17.70476,
          "longitude": 81.05901
        },
        {
          "latitude": 17.71522,
          "longitude": 81.06029
        },
        {
          "latitude": 17.72024,
          "longitude": 81.01955
        },
        {
          "latitude": 17.7272,
          "longitude": 81.0424
        },
        {
          "latitude": 17.74454,
          "longitude": 81.03537
        },
        {
          "latitude": 17.75028,
          "longitude": 80.99174
        },
        {
          "latitude": 17.77935,
          "longitude": 80.97427
        },
        {
          "latitude": 17.76004,
          "longitude": 80.94566
        },
        {
          "latitude": 17.74962,
          "longitude": 80.89737
        },
        {
          "latitude": 17.73091,
          "longitude": 80.88077
        },
        {
          "latitude": 17.68759,
          "longitude": 80.88412
        },
        {
          "latitude": 17.67308,
          "longitude": 80.87584
        }
      ],
      [
        {
          "latitude": 17.64168,
          "longitude": 80.90182
        },
        {
          "latitude": 17.6399,
          "longitude": 80.90965
        },
        {
          "latitude": 17.64168,
          "longitude": 80.90182
        }
      ]
    ]
  },
  {
    "id": "prakasam",
    "name": "Prakasam",
    "headquarters": "Ongole",
    "center": {
      "latitude": 15.5888,
      "longitude": 79.8189
    },
    "region": "Coastal Andhra",
    "polygon": [
      {
        "latitude": 15.80663,
        "longitude": 79.31275
      },
      {
        "latitude": 15.8071,
        "longitude": 79.32407
      },
      {
        "latitude": 15.78742,
        "longitude": 79.33549
      },
      {
        "latitude": 15.7829,
        "longitude": 79.34797
      },
      {
        "latitude": 15.76224,
        "longitude": 79.35665
      },
      {
        "latitude": 15.76001,
        "longitude": 79.36513
      },
      {
        "latitude": 15.79096,
        "longitude": 79.38122
      },
      {
        "latitude": 15.77553,
        "longitude": 79.40398
      },
      {
        "latitude": 15.78017,
        "longitude": 79.41217
      },
      {
        "latitude": 15.77242,
        "longitude": 79.42405
      },
      {
        "latitude": 15.74831,
        "longitude": 79.42499
      },
      {
        "latitude": 15.73955,
        "longitude": 79.41781
      },
      {
        "latitude": 15.73198,
        "longitude": 79.42367
      },
      {
        "latitude": 15.73302,
        "longitude": 79.439
      },
      {
        "latitude": 15.74379,
        "longitude": 79.44495
      },
      {
        "latitude": 15.73102,
        "longitude": 79.47976
      },
      {
        "latitude": 15.74104,
        "longitude": 79.49539
      },
      {
        "latitude": 15.73371,
        "longitude": 79.50722
      },
      {
        "latitude": 15.72761,
        "longitude": 79.50185
      },
      {
        "latitude": 15.70875,
        "longitude": 79.51273
      },
      {
        "latitude": 15.72462,
        "longitude": 79.577
      },
      {
        "latitude": 15.7403,
        "longitude": 79.60125
      },
      {
        "latitude": 15.73415,
        "longitude": 79.6204
      },
      {
        "latitude": 15.685,
        "longitude": 79.65073
      },
      {
        "latitude": 15.66398,
        "longitude": 79.68738
      },
      {
        "latitude": 15.61045,
        "longitude": 79.71857
      },
      {
        "latitude": 15.58622,
        "longitude": 79.76656
      },
      {
        "latitude": 15.55763,
        "longitude": 79.79412
      },
      {
        "latitude": 15.53076,
        "longitude": 79.79648
      },
      {
        "latitude": 15.53106,
        "longitude": 79.777
      },
      {
        "latitude": 15.54248,
        "longitude": 79.77443
      },
      {
        "latitude": 15.57465,
        "longitude": 79.69367
      },
      {
        "latitude": 15.59192,
        "longitude": 79.6985
      },
      {
        "latitude": 15.59838,
        "longitude": 79.67254
      },
      {
        "latitude": 15.59324,
        "longitude": 79.66374
      },
      {
        "latitude": 15.57428,
        "longitude": 79.65867
      },
      {
        "latitude": 15.57902,
        "longitude": 79.63998
      },
      {
        "latitude": 15.57224,
        "longitude": 79.63001
      },
      {
        "latitude": 15.58963,
        "longitude": 79.61137
      },
      {
        "latitude": 15.56399,
        "longitude": 79.59831
      },
      {
        "latitude": 15.55215,
        "longitude": 79.60448
      },
      {
        "latitude": 15.53615,
        "longitude": 79.5833
      },
      {
        "latitude": 15.54044,
        "longitude": 79.57309
      },
      {
        "latitude": 15.55452,
        "longitude": 79.57095
      },
      {
        "latitude": 15.54989,
        "longitude": 79.56282
      },
      {
        "latitude": 15.537,
        "longitude": 79.56889
      },
      {
        "latitude": 15.52965,
        "longitude": 79.56273
      },
      {
        "latitude": 15.48972,
        "longitude": 79.56377
      },
      {
        "latitude": 15.50622,
        "longitude": 79.56783
      },
      {
        "latitude": 15.49744,
        "longitude": 79.59046
      },
      {
        "latitude": 15.48726,
        "longitude": 79.59278
      },
      {
        "latitude": 15.48027,
        "longitude": 79.57919
      },
      {
        "latitude": 15.4645,
        "longitude": 79.57183
      },
      {
        "latitude": 15.45824,
        "longitude": 79.58249
      },
      {
        "latitude": 15.44216,
        "longitude": 79.57212
      },
      {
        "latitude": 15.44201,
        "longitude": 79.59446
      },
      {
        "latitude": 15.39443,
        "longitude": 79.56686
      },
      {
        "latitude": 15.38531,
        "longitude": 79.57753
      },
      {
        "latitude": 15.42367,
        "longitude": 79.6148
      },
      {
        "latitude": 15.39923,
        "longitude": 79.65053
      },
      {
        "latitude": 15.41702,
        "longitude": 79.66209
      },
      {
        "latitude": 15.41467,
        "longitude": 79.67551
      },
      {
        "latitude": 15.39564,
        "longitude": 79.68495
      },
      {
        "latitude": 15.37395,
        "longitude": 79.67661
      },
      {
        "latitude": 15.37679,
        "longitude": 79.66283
      },
      {
        "latitude": 15.36674,
        "longitude": 79.65711
      },
      {
        "latitude": 15.32721,
        "longitude": 79.65642
      },
      {
        "latitude": 15.32409,
        "longitude": 79.66794
      },
      {
        "latitude": 15.26506,
        "longitude": 79.66097
      },
      {
        "latitude": 15.26487,
        "longitude": 79.65039
      },
      {
        "latitude": 15.24583,
        "longitude": 79.65363
      },
      {
        "latitude": 15.24912,
        "longitude": 79.68055
      },
      {
        "latitude": 15.23459,
        "longitude": 79.68944
      },
      {
        "latitude": 15.19476,
        "longitude": 79.77289
      },
      {
        "latitude": 15.20703,
        "longitude": 79.81139
      },
      {
        "latitude": 15.21678,
        "longitude": 79.81365
      },
      {
        "latitude": 15.21084,
        "longitude": 79.83854
      },
      {
        "latitude": 15.27628,
        "longitude": 79.85735
      },
      {
        "latitude": 15.28078,
        "longitude": 79.86745
      },
      {
        "latitude": 15.3093,
        "longitude": 79.86472
      },
      {
        "latitude": 15.31376,
        "longitude": 79.88184
      },
      {
        "latitude": 15.30258,
        "longitude": 79.89522
      },
      {
        "latitude": 15.33164,
        "longitude": 79.90879
      },
      {
        "latitude": 15.30018,
        "longitude": 79.91771
      },
      {
        "latitude": 15.30002,
        "longitude": 79.93136
      },
      {
        "latitude": 15.31643,
        "longitude": 79.94254
      },
      {
        "latitude": 15.31617,
        "longitude": 79.95601
      },
      {
        "latitude": 15.29015,
        "longitude": 79.95444
      },
      {
        "latitude": 15.2733,
        "longitude": 79.98394
      },
      {
        "latitude": 15.21906,
        "longitude": 79.97093
      },
      {
        "latitude": 15.19846,
        "longitude": 79.97629
      },
      {
        "latitude": 15.19831,
        "longitude": 80.00685
      },
      {
        "latitude": 15.21528,
        "longitude": 80.01349
      },
      {
        "latitude": 15.21457,
        "longitude": 80.04011
      },
      {
        "latitude": 15.20036,
        "longitude": 80.06882
      },
      {
        "latitude": 15.21356,
        "longitude": 80.06938
      },
      {
        "latitude": 15.21893,
        "longitude": 80.08951
      },
      {
        "latitude": 15.26869,
        "longitude": 80.08306
      },
      {
        "latitude": 15.34261,
        "longitude": 80.1094
      },
      {
        "latitude": 15.3794,
        "longitude": 80.12942
      },
      {
        "latitude": 15.46729,
        "longitude": 80.20128
      },
      {
        "latitude": 15.53793,
        "longitude": 80.22673
      },
      {
        "latitude": 15.61121,
        "longitude": 80.24116
      },
      {
        "latitude": 15.62012,
        "longitude": 80.18069
      },
      {
        "latitude": 15.6501,
        "longitude": 80.17127
      },
      {
        "latitude": 15.68761,
        "longitude": 80.1807
      },
      {
        "latitude": 15.70132,
        "longitude": 80.19504
      },
      {
        "latitude": 15.70971,
        "longitude": 80.18844
      },
      {
        "latitude": 15.75195,
        "longitude": 80.2114
      },
      {
        "latitude": 15.76412,
        "longitude": 80.20633
      },
      {
        "latitude": 15.76883,
        "longitude": 80.19734
      },
      {
        "latitude": 15.75903,
        "longitude": 80.18688
      },
      {
        "latitude": 15.73667,
        "longitude": 80.18583
      },
      {
        "latitude": 15.72643,
        "longitude": 80.1656
      },
      {
        "latitude": 15.69891,
        "longitude": 80.15139
      },
      {
        "latitude": 15.69932,
        "longitude": 80.14077
      },
      {
        "latitude": 15.69027,
        "longitude": 80.13758
      },
      {
        "latitude": 15.70048,
        "longitude": 80.12595
      },
      {
        "latitude": 15.70025,
        "longitude": 80.11173
      },
      {
        "latitude": 15.68955,
        "longitude": 80.11222
      },
      {
        "latitude": 15.68257,
        "longitude": 80.12841
      },
      {
        "latitude": 15.66891,
        "longitude": 80.12065
      },
      {
        "latitude": 15.67574,
        "longitude": 80.09755
      },
      {
        "latitude": 15.6812,
        "longitude": 80.10026
      },
      {
        "latitude": 15.68721,
        "longitude": 80.08729
      },
      {
        "latitude": 15.68221,
        "longitude": 80.06923
      },
      {
        "latitude": 15.69576,
        "longitude": 80.0638
      },
      {
        "latitude": 15.70914,
        "longitude": 80.03596
      },
      {
        "latitude": 15.68458,
        "longitude": 80.02378
      },
      {
        "latitude": 15.69143,
        "longitude": 80.01983
      },
      {
        "latitude": 15.70092,
        "longitude": 79.97935
      },
      {
        "latitude": 15.71508,
        "longitude": 79.97128
      },
      {
        "latitude": 15.69944,
        "longitude": 79.95129
      },
      {
        "latitude": 15.70118,
        "longitude": 79.94242
      },
      {
        "latitude": 15.68702,
        "longitude": 79.93936
      },
      {
        "latitude": 15.70051,
        "longitude": 79.89974
      },
      {
        "latitude": 15.71421,
        "longitude": 79.89152
      },
      {
        "latitude": 15.7223,
        "longitude": 79.90597
      },
      {
        "latitude": 15.74492,
        "longitude": 79.92019
      },
      {
        "latitude": 15.76343,
        "longitude": 79.90793
      },
      {
        "latitude": 15.82443,
        "longitude": 79.91847
      },
      {
        "latitude": 15.8316,
        "longitude": 79.94442
      },
      {
        "latitude": 15.85341,
        "longitude": 79.94817
      },
      {
        "latitude": 15.8714,
        "longitude": 79.90585
      },
      {
        "latitude": 15.87836,
        "longitude": 79.90962
      },
      {
        "latitude": 15.88849,
        "longitude": 79.89475
      },
      {
        "latitude": 15.90327,
        "longitude": 79.89469
      },
      {
        "latitude": 15.92482,
        "longitude": 79.87762
      },
      {
        "latitude": 15.91762,
        "longitude": 79.86387
      },
      {
        "latitude": 15.92289,
        "longitude": 79.84679
      },
      {
        "latitude": 15.92875,
        "longitude": 79.84893
      },
      {
        "latitude": 15.9415,
        "longitude": 79.79146
      },
      {
        "latitude": 15.91661,
        "longitude": 79.78466
      },
      {
        "latitude": 15.89955,
        "longitude": 79.75501
      },
      {
        "latitude": 15.8592,
        "longitude": 79.74708
      },
      {
        "latitude": 15.84736,
        "longitude": 79.75374
      },
      {
        "latitude": 15.84203,
        "longitude": 79.77299
      },
      {
        "latitude": 15.82524,
        "longitude": 79.77096
      },
      {
        "latitude": 15.82572,
        "longitude": 79.74323
      },
      {
        "latitude": 15.83506,
        "longitude": 79.73325
      },
      {
        "latitude": 15.83704,
        "longitude": 79.71
      },
      {
        "latitude": 15.85895,
        "longitude": 79.71974
      },
      {
        "latitude": 15.87604,
        "longitude": 79.68898
      },
      {
        "latitude": 15.89819,
        "longitude": 79.69326
      },
      {
        "latitude": 15.921,
        "longitude": 79.65547
      },
      {
        "latitude": 15.9071,
        "longitude": 79.63551
      },
      {
        "latitude": 15.92236,
        "longitude": 79.6118
      },
      {
        "latitude": 15.93327,
        "longitude": 79.6145
      },
      {
        "latitude": 15.94084,
        "longitude": 79.59028
      },
      {
        "latitude": 15.93728,
        "longitude": 79.57204
      },
      {
        "latitude": 15.94848,
        "longitude": 79.55885
      },
      {
        "latitude": 16.00436,
        "longitude": 79.57226
      },
      {
        "latitude": 15.98312,
        "longitude": 79.52442
      },
      {
        "latitude": 15.96969,
        "longitude": 79.51991
      },
      {
        "latitude": 15.96148,
        "longitude": 79.5059
      },
      {
        "latitude": 15.96099,
        "longitude": 79.47425
      },
      {
        "latitude": 15.94218,
        "longitude": 79.42983
      },
      {
        "latitude": 15.91872,
        "longitude": 79.41659
      },
      {
        "latitude": 15.9152,
        "longitude": 79.39523
      },
      {
        "latitude": 15.89412,
        "longitude": 79.38768
      },
      {
        "latitude": 15.85953,
        "longitude": 79.35306
      },
      {
        "latitude": 15.84427,
        "longitude": 79.32246
      },
      {
        "latitude": 15.80663,
        "longitude": 79.31275
      }
    ],
    "polygons": [
      [
        {
          "latitude": 15.80663,
          "longitude": 79.31275
        },
        {
          "latitude": 15.8071,
          "longitude": 79.32407
        },
        {
          "latitude": 15.78742,
          "longitude": 79.33549
        },
        {
          "latitude": 15.7829,
          "longitude": 79.34797
        },
        {
          "latitude": 15.76224,
          "longitude": 79.35665
        },
        {
          "latitude": 15.76001,
          "longitude": 79.36513
        },
        {
          "latitude": 15.79096,
          "longitude": 79.38122
        },
        {
          "latitude": 15.77553,
          "longitude": 79.40398
        },
        {
          "latitude": 15.78017,
          "longitude": 79.41217
        },
        {
          "latitude": 15.77242,
          "longitude": 79.42405
        },
        {
          "latitude": 15.74831,
          "longitude": 79.42499
        },
        {
          "latitude": 15.73955,
          "longitude": 79.41781
        },
        {
          "latitude": 15.73198,
          "longitude": 79.42367
        },
        {
          "latitude": 15.73302,
          "longitude": 79.439
        },
        {
          "latitude": 15.74379,
          "longitude": 79.44495
        },
        {
          "latitude": 15.73102,
          "longitude": 79.47976
        },
        {
          "latitude": 15.74104,
          "longitude": 79.49539
        },
        {
          "latitude": 15.73371,
          "longitude": 79.50722
        },
        {
          "latitude": 15.72761,
          "longitude": 79.50185
        },
        {
          "latitude": 15.70875,
          "longitude": 79.51273
        },
        {
          "latitude": 15.72462,
          "longitude": 79.577
        },
        {
          "latitude": 15.7403,
          "longitude": 79.60125
        },
        {
          "latitude": 15.73415,
          "longitude": 79.6204
        },
        {
          "latitude": 15.685,
          "longitude": 79.65073
        },
        {
          "latitude": 15.66398,
          "longitude": 79.68738
        },
        {
          "latitude": 15.61045,
          "longitude": 79.71857
        },
        {
          "latitude": 15.58622,
          "longitude": 79.76656
        },
        {
          "latitude": 15.55763,
          "longitude": 79.79412
        },
        {
          "latitude": 15.53076,
          "longitude": 79.79648
        },
        {
          "latitude": 15.53106,
          "longitude": 79.777
        },
        {
          "latitude": 15.54248,
          "longitude": 79.77443
        },
        {
          "latitude": 15.57465,
          "longitude": 79.69367
        },
        {
          "latitude": 15.59192,
          "longitude": 79.6985
        },
        {
          "latitude": 15.59838,
          "longitude": 79.67254
        },
        {
          "latitude": 15.59324,
          "longitude": 79.66374
        },
        {
          "latitude": 15.57428,
          "longitude": 79.65867
        },
        {
          "latitude": 15.57902,
          "longitude": 79.63998
        },
        {
          "latitude": 15.57224,
          "longitude": 79.63001
        },
        {
          "latitude": 15.58963,
          "longitude": 79.61137
        },
        {
          "latitude": 15.56399,
          "longitude": 79.59831
        },
        {
          "latitude": 15.55215,
          "longitude": 79.60448
        },
        {
          "latitude": 15.53615,
          "longitude": 79.5833
        },
        {
          "latitude": 15.54044,
          "longitude": 79.57309
        },
        {
          "latitude": 15.55452,
          "longitude": 79.57095
        },
        {
          "latitude": 15.54989,
          "longitude": 79.56282
        },
        {
          "latitude": 15.537,
          "longitude": 79.56889
        },
        {
          "latitude": 15.52965,
          "longitude": 79.56273
        },
        {
          "latitude": 15.48972,
          "longitude": 79.56377
        },
        {
          "latitude": 15.50622,
          "longitude": 79.56783
        },
        {
          "latitude": 15.49744,
          "longitude": 79.59046
        },
        {
          "latitude": 15.48726,
          "longitude": 79.59278
        },
        {
          "latitude": 15.48027,
          "longitude": 79.57919
        },
        {
          "latitude": 15.4645,
          "longitude": 79.57183
        },
        {
          "latitude": 15.45824,
          "longitude": 79.58249
        },
        {
          "latitude": 15.44216,
          "longitude": 79.57212
        },
        {
          "latitude": 15.44201,
          "longitude": 79.59446
        },
        {
          "latitude": 15.39443,
          "longitude": 79.56686
        },
        {
          "latitude": 15.38531,
          "longitude": 79.57753
        },
        {
          "latitude": 15.42367,
          "longitude": 79.6148
        },
        {
          "latitude": 15.39923,
          "longitude": 79.65053
        },
        {
          "latitude": 15.41702,
          "longitude": 79.66209
        },
        {
          "latitude": 15.41467,
          "longitude": 79.67551
        },
        {
          "latitude": 15.39564,
          "longitude": 79.68495
        },
        {
          "latitude": 15.37395,
          "longitude": 79.67661
        },
        {
          "latitude": 15.37679,
          "longitude": 79.66283
        },
        {
          "latitude": 15.36674,
          "longitude": 79.65711
        },
        {
          "latitude": 15.32721,
          "longitude": 79.65642
        },
        {
          "latitude": 15.32409,
          "longitude": 79.66794
        },
        {
          "latitude": 15.26506,
          "longitude": 79.66097
        },
        {
          "latitude": 15.26487,
          "longitude": 79.65039
        },
        {
          "latitude": 15.24583,
          "longitude": 79.65363
        },
        {
          "latitude": 15.24912,
          "longitude": 79.68055
        },
        {
          "latitude": 15.23459,
          "longitude": 79.68944
        },
        {
          "latitude": 15.19476,
          "longitude": 79.77289
        },
        {
          "latitude": 15.20703,
          "longitude": 79.81139
        },
        {
          "latitude": 15.21678,
          "longitude": 79.81365
        },
        {
          "latitude": 15.21084,
          "longitude": 79.83854
        },
        {
          "latitude": 15.27628,
          "longitude": 79.85735
        },
        {
          "latitude": 15.28078,
          "longitude": 79.86745
        },
        {
          "latitude": 15.3093,
          "longitude": 79.86472
        },
        {
          "latitude": 15.31376,
          "longitude": 79.88184
        },
        {
          "latitude": 15.30258,
          "longitude": 79.89522
        },
        {
          "latitude": 15.33164,
          "longitude": 79.90879
        },
        {
          "latitude": 15.30018,
          "longitude": 79.91771
        },
        {
          "latitude": 15.30002,
          "longitude": 79.93136
        },
        {
          "latitude": 15.31643,
          "longitude": 79.94254
        },
        {
          "latitude": 15.31617,
          "longitude": 79.95601
        },
        {
          "latitude": 15.29015,
          "longitude": 79.95444
        },
        {
          "latitude": 15.2733,
          "longitude": 79.98394
        },
        {
          "latitude": 15.21906,
          "longitude": 79.97093
        },
        {
          "latitude": 15.19846,
          "longitude": 79.97629
        },
        {
          "latitude": 15.19831,
          "longitude": 80.00685
        },
        {
          "latitude": 15.21528,
          "longitude": 80.01349
        },
        {
          "latitude": 15.21457,
          "longitude": 80.04011
        },
        {
          "latitude": 15.20036,
          "longitude": 80.06882
        },
        {
          "latitude": 15.21356,
          "longitude": 80.06938
        },
        {
          "latitude": 15.21893,
          "longitude": 80.08951
        },
        {
          "latitude": 15.26869,
          "longitude": 80.08306
        },
        {
          "latitude": 15.34261,
          "longitude": 80.1094
        },
        {
          "latitude": 15.3794,
          "longitude": 80.12942
        },
        {
          "latitude": 15.46729,
          "longitude": 80.20128
        },
        {
          "latitude": 15.53793,
          "longitude": 80.22673
        },
        {
          "latitude": 15.61121,
          "longitude": 80.24116
        },
        {
          "latitude": 15.62012,
          "longitude": 80.18069
        },
        {
          "latitude": 15.6501,
          "longitude": 80.17127
        },
        {
          "latitude": 15.68761,
          "longitude": 80.1807
        },
        {
          "latitude": 15.70132,
          "longitude": 80.19504
        },
        {
          "latitude": 15.70971,
          "longitude": 80.18844
        },
        {
          "latitude": 15.75195,
          "longitude": 80.2114
        },
        {
          "latitude": 15.76412,
          "longitude": 80.20633
        },
        {
          "latitude": 15.76883,
          "longitude": 80.19734
        },
        {
          "latitude": 15.75903,
          "longitude": 80.18688
        },
        {
          "latitude": 15.73667,
          "longitude": 80.18583
        },
        {
          "latitude": 15.72643,
          "longitude": 80.1656
        },
        {
          "latitude": 15.69891,
          "longitude": 80.15139
        },
        {
          "latitude": 15.69932,
          "longitude": 80.14077
        },
        {
          "latitude": 15.69027,
          "longitude": 80.13758
        },
        {
          "latitude": 15.70048,
          "longitude": 80.12595
        },
        {
          "latitude": 15.70025,
          "longitude": 80.11173
        },
        {
          "latitude": 15.68955,
          "longitude": 80.11222
        },
        {
          "latitude": 15.68257,
          "longitude": 80.12841
        },
        {
          "latitude": 15.66891,
          "longitude": 80.12065
        },
        {
          "latitude": 15.67574,
          "longitude": 80.09755
        },
        {
          "latitude": 15.6812,
          "longitude": 80.10026
        },
        {
          "latitude": 15.68721,
          "longitude": 80.08729
        },
        {
          "latitude": 15.68221,
          "longitude": 80.06923
        },
        {
          "latitude": 15.69576,
          "longitude": 80.0638
        },
        {
          "latitude": 15.70914,
          "longitude": 80.03596
        },
        {
          "latitude": 15.68458,
          "longitude": 80.02378
        },
        {
          "latitude": 15.69143,
          "longitude": 80.01983
        },
        {
          "latitude": 15.70092,
          "longitude": 79.97935
        },
        {
          "latitude": 15.71508,
          "longitude": 79.97128
        },
        {
          "latitude": 15.69944,
          "longitude": 79.95129
        },
        {
          "latitude": 15.70118,
          "longitude": 79.94242
        },
        {
          "latitude": 15.68702,
          "longitude": 79.93936
        },
        {
          "latitude": 15.70051,
          "longitude": 79.89974
        },
        {
          "latitude": 15.71421,
          "longitude": 79.89152
        },
        {
          "latitude": 15.7223,
          "longitude": 79.90597
        },
        {
          "latitude": 15.74492,
          "longitude": 79.92019
        },
        {
          "latitude": 15.76343,
          "longitude": 79.90793
        },
        {
          "latitude": 15.82443,
          "longitude": 79.91847
        },
        {
          "latitude": 15.8316,
          "longitude": 79.94442
        },
        {
          "latitude": 15.85341,
          "longitude": 79.94817
        },
        {
          "latitude": 15.8714,
          "longitude": 79.90585
        },
        {
          "latitude": 15.87836,
          "longitude": 79.90962
        },
        {
          "latitude": 15.88849,
          "longitude": 79.89475
        },
        {
          "latitude": 15.90327,
          "longitude": 79.89469
        },
        {
          "latitude": 15.92482,
          "longitude": 79.87762
        },
        {
          "latitude": 15.91762,
          "longitude": 79.86387
        },
        {
          "latitude": 15.92289,
          "longitude": 79.84679
        },
        {
          "latitude": 15.92875,
          "longitude": 79.84893
        },
        {
          "latitude": 15.9415,
          "longitude": 79.79146
        },
        {
          "latitude": 15.91661,
          "longitude": 79.78466
        },
        {
          "latitude": 15.89955,
          "longitude": 79.75501
        },
        {
          "latitude": 15.8592,
          "longitude": 79.74708
        },
        {
          "latitude": 15.84736,
          "longitude": 79.75374
        },
        {
          "latitude": 15.84203,
          "longitude": 79.77299
        },
        {
          "latitude": 15.82524,
          "longitude": 79.77096
        },
        {
          "latitude": 15.82572,
          "longitude": 79.74323
        },
        {
          "latitude": 15.83506,
          "longitude": 79.73325
        },
        {
          "latitude": 15.83704,
          "longitude": 79.71
        },
        {
          "latitude": 15.85895,
          "longitude": 79.71974
        },
        {
          "latitude": 15.87604,
          "longitude": 79.68898
        },
        {
          "latitude": 15.89819,
          "longitude": 79.69326
        },
        {
          "latitude": 15.921,
          "longitude": 79.65547
        },
        {
          "latitude": 15.9071,
          "longitude": 79.63551
        },
        {
          "latitude": 15.92236,
          "longitude": 79.6118
        },
        {
          "latitude": 15.93327,
          "longitude": 79.6145
        },
        {
          "latitude": 15.94084,
          "longitude": 79.59028
        },
        {
          "latitude": 15.93728,
          "longitude": 79.57204
        },
        {
          "latitude": 15.94848,
          "longitude": 79.55885
        },
        {
          "latitude": 16.00436,
          "longitude": 79.57226
        },
        {
          "latitude": 15.98312,
          "longitude": 79.52442
        },
        {
          "latitude": 15.96969,
          "longitude": 79.51991
        },
        {
          "latitude": 15.96148,
          "longitude": 79.5059
        },
        {
          "latitude": 15.96099,
          "longitude": 79.47425
        },
        {
          "latitude": 15.94218,
          "longitude": 79.42983
        },
        {
          "latitude": 15.91872,
          "longitude": 79.41659
        },
        {
          "latitude": 15.9152,
          "longitude": 79.39523
        },
        {
          "latitude": 15.89412,
          "longitude": 79.38768
        },
        {
          "latitude": 15.85953,
          "longitude": 79.35306
        },
        {
          "latitude": 15.84427,
          "longitude": 79.32246
        },
        {
          "latitude": 15.80663,
          "longitude": 79.31275
        }
      ],
      [
        {
          "latitude": 15.28116,
          "longitude": 79.8834
        },
        {
          "latitude": 15.27294,
          "longitude": 79.89562
        },
        {
          "latitude": 15.27729,
          "longitude": 79.90666
        },
        {
          "latitude": 15.28116,
          "longitude": 79.8834
        }
      ],
      [
        {
          "latitude": 15.77934,
          "longitude": 80.22211
        },
        {
          "latitude": 15.75528,
          "longitude": 80.25737
        },
        {
          "latitude": 15.77959,
          "longitude": 80.27316
        },
        {
          "latitude": 15.8068,
          "longitude": 80.22491
        },
        {
          "latitude": 15.77934,
          "longitude": 80.22211
        }
      ]
    ]
  },
  {
    "id": "alluri_sitharama_raju",
    "name": "Alluri Sitharama Raju",
    "headquarters": "Paderu",
    "center": {
      "latitude": 18.0445,
      "longitude": 82.5412
    },
    "region": "North Coastal",
    "polygon": [
      {
        "latitude": 17.75174,
        "longitude": 81.86115
      },
      {
        "latitude": 17.74063,
        "longitude": 81.87883
      },
      {
        "latitude": 17.74477,
        "longitude": 81.898
      },
      {
        "latitude": 17.738,
        "longitude": 81.93517
      },
      {
        "latitude": 17.74623,
        "longitude": 81.97171
      },
      {
        "latitude": 17.75737,
        "longitude": 81.96059
      },
      {
        "latitude": 17.76757,
        "longitude": 81.97839
      },
      {
        "latitude": 17.76387,
        "longitude": 81.9982
      },
      {
        "latitude": 17.75285,
        "longitude": 82.01627
      },
      {
        "latitude": 17.73747,
        "longitude": 82.01135
      },
      {
        "latitude": 17.72761,
        "longitude": 82.02806
      },
      {
        "latitude": 17.71399,
        "longitude": 82.03349
      },
      {
        "latitude": 17.70268,
        "longitude": 82.02486
      },
      {
        "latitude": 17.66875,
        "longitude": 82.02245
      },
      {
        "latitude": 17.65873,
        "longitude": 82.00637
      },
      {
        "latitude": 17.64578,
        "longitude": 82.01042
      },
      {
        "latitude": 17.63906,
        "longitude": 82.00201
      },
      {
        "latitude": 17.61802,
        "longitude": 82.01632
      },
      {
        "latitude": 17.63157,
        "longitude": 82.02354
      },
      {
        "latitude": 17.64274,
        "longitude": 82.05232
      },
      {
        "latitude": 17.63535,
        "longitude": 82.05857
      },
      {
        "latitude": 17.6563,
        "longitude": 82.09177
      },
      {
        "latitude": 17.64861,
        "longitude": 82.13544
      },
      {
        "latitude": 17.63451,
        "longitude": 82.138
      },
      {
        "latitude": 17.60944,
        "longitude": 82.16334
      },
      {
        "latitude": 17.60815,
        "longitude": 82.18098
      },
      {
        "latitude": 17.62149,
        "longitude": 82.19114
      },
      {
        "latitude": 17.63763,
        "longitude": 82.22638
      },
      {
        "latitude": 17.61831,
        "longitude": 82.24822
      },
      {
        "latitude": 17.62325,
        "longitude": 82.27588
      },
      {
        "latitude": 17.61068,
        "longitude": 82.2744
      },
      {
        "latitude": 17.58891,
        "longitude": 82.30361
      },
      {
        "latitude": 17.58563,
        "longitude": 82.3408
      },
      {
        "latitude": 17.5534,
        "longitude": 82.32907
      },
      {
        "latitude": 17.54419,
        "longitude": 82.35813
      },
      {
        "latitude": 17.55722,
        "longitude": 82.35172
      },
      {
        "latitude": 17.57443,
        "longitude": 82.36784
      },
      {
        "latitude": 17.60618,
        "longitude": 82.46188
      },
      {
        "latitude": 17.61669,
        "longitude": 82.46452
      },
      {
        "latitude": 17.63149,
        "longitude": 82.46293
      },
      {
        "latitude": 17.63524,
        "longitude": 82.43589
      },
      {
        "latitude": 17.65217,
        "longitude": 82.42951
      },
      {
        "latitude": 17.63611,
        "longitude": 82.39083
      },
      {
        "latitude": 17.63621,
        "longitude": 82.35828
      },
      {
        "latitude": 17.6504,
        "longitude": 82.34421
      },
      {
        "latitude": 17.66087,
        "longitude": 82.35201
      },
      {
        "latitude": 17.66807,
        "longitude": 82.34456
      },
      {
        "latitude": 17.67678,
        "longitude": 82.34753
      },
      {
        "latitude": 17.67565,
        "longitude": 82.3596
      },
      {
        "latitude": 17.68661,
        "longitude": 82.37467
      },
      {
        "latitude": 17.67754,
        "longitude": 82.38503
      },
      {
        "latitude": 17.69029,
        "longitude": 82.41546
      },
      {
        "latitude": 17.70465,
        "longitude": 82.42814
      },
      {
        "latitude": 17.7143,
        "longitude": 82.42492
      },
      {
        "latitude": 17.7235,
        "longitude": 82.43847
      },
      {
        "latitude": 17.72135,
        "longitude": 82.45125
      },
      {
        "latitude": 17.73531,
        "longitude": 82.46192
      },
      {
        "latitude": 17.71419,
        "longitude": 82.50159
      },
      {
        "latitude": 17.72247,
        "longitude": 82.51236
      },
      {
        "latitude": 17.70409,
        "longitude": 82.49528
      },
      {
        "latitude": 17.69251,
        "longitude": 82.49784
      },
      {
        "latitude": 17.70302,
        "longitude": 82.52879
      },
      {
        "latitude": 17.71603,
        "longitude": 82.54505
      },
      {
        "latitude": 17.74576,
        "longitude": 82.55407
      },
      {
        "latitude": 17.74621,
        "longitude": 82.56207
      },
      {
        "latitude": 17.76935,
        "longitude": 82.56395
      },
      {
        "latitude": 17.76741,
        "longitude": 82.60653
      },
      {
        "latitude": 17.77852,
        "longitude": 82.59493
      },
      {
        "latitude": 17.78758,
        "longitude": 82.61696
      },
      {
        "latitude": 17.77876,
        "longitude": 82.61526
      },
      {
        "latitude": 17.77271,
        "longitude": 82.63382
      },
      {
        "latitude": 17.79405,
        "longitude": 82.64248
      },
      {
        "latitude": 17.84098,
        "longitude": 82.62315
      },
      {
        "latitude": 17.83181,
        "longitude": 82.63438
      },
      {
        "latitude": 17.85576,
        "longitude": 82.68031
      },
      {
        "latitude": 17.84876,
        "longitude": 82.69331
      },
      {
        "latitude": 17.86388,
        "longitude": 82.69883
      },
      {
        "latitude": 17.8675,
        "longitude": 82.71676
      },
      {
        "latitude": 17.89474,
        "longitude": 82.6886
      },
      {
        "latitude": 17.90291,
        "longitude": 82.66571
      },
      {
        "latitude": 17.8984,
        "longitude": 82.70202
      },
      {
        "latitude": 17.91301,
        "longitude": 82.71131
      },
      {
        "latitude": 17.92002,
        "longitude": 82.70544
      },
      {
        "latitude": 17.93066,
        "longitude": 82.72611
      },
      {
        "latitude": 17.93896,
        "longitude": 82.72648
      },
      {
        "latitude": 17.94537,
        "longitude": 82.7088
      },
      {
        "latitude": 17.95337,
        "longitude": 82.7152
      },
      {
        "latitude": 17.94467,
        "longitude": 82.73195
      },
      {
        "latitude": 17.94767,
        "longitude": 82.74524
      },
      {
        "latitude": 17.9355,
        "longitude": 82.74712
      },
      {
        "latitude": 17.93704,
        "longitude": 82.76027
      },
      {
        "latitude": 17.94749,
        "longitude": 82.7494
      },
      {
        "latitude": 17.9577,
        "longitude": 82.75024
      },
      {
        "latitude": 17.9276,
        "longitude": 82.78243
      },
      {
        "latitude": 17.93338,
        "longitude": 82.78319
      },
      {
        "latitude": 17.92077,
        "longitude": 82.80118
      },
      {
        "latitude": 17.93522,
        "longitude": 82.81214
      },
      {
        "latitude": 17.93287,
        "longitude": 82.82688
      },
      {
        "latitude": 17.95486,
        "longitude": 82.83703
      },
      {
        "latitude": 17.96005,
        "longitude": 82.85054
      },
      {
        "latitude": 17.98755,
        "longitude": 82.84071
      },
      {
        "latitude": 18.00994,
        "longitude": 82.86991
      },
      {
        "latitude": 18.01114,
        "longitude": 82.90404
      },
      {
        "latitude": 17.984,
        "longitude": 82.91882
      },
      {
        "latitude": 17.98941,
        "longitude": 82.94602
      },
      {
        "latitude": 18.00487,
        "longitude": 82.95763
      },
      {
        "latitude": 18.01374,
        "longitude": 82.98298
      },
      {
        "latitude": 18.02814,
        "longitude": 82.98043
      },
      {
        "latitude": 18.08947,
        "longitude": 83.02445
      },
      {
        "latitude": 18.08685,
        "longitude": 83.00279
      },
      {
        "latitude": 18.09328,
        "longitude": 83.01136
      },
      {
        "latitude": 18.11664,
        "longitude": 83.00478
      },
      {
        "latitude": 18.13823,
        "longitude": 82.98746
      },
      {
        "latitude": 18.15133,
        "longitude": 83.01473
      },
      {
        "latitude": 18.13815,
        "longitude": 83.03071
      },
      {
        "latitude": 18.1156,
        "longitude": 83.03833
      },
      {
        "latitude": 18.11175,
        "longitude": 83.05986
      },
      {
        "latitude": 18.10378,
        "longitude": 83.06178
      },
      {
        "latitude": 18.11833,
        "longitude": 83.07516
      },
      {
        "latitude": 18.09772,
        "longitude": 83.07055
      },
      {
        "latitude": 18.08618,
        "longitude": 83.05097
      },
      {
        "latitude": 18.06394,
        "longitude": 83.0504
      },
      {
        "latitude": 18.08247,
        "longitude": 83.05144
      },
      {
        "latitude": 18.07572,
        "longitude": 83.06741
      },
      {
        "latitude": 18.08947,
        "longitude": 83.08423
      },
      {
        "latitude": 18.1048,
        "longitude": 83.13027
      },
      {
        "latitude": 18.11227,
        "longitude": 83.1316
      },
      {
        "latitude": 18.11523,
        "longitude": 83.1191
      },
      {
        "latitude": 18.14946,
        "longitude": 83.12891
      },
      {
        "latitude": 18.14392,
        "longitude": 83.16826
      },
      {
        "latitude": 18.16324,
        "longitude": 83.14852
      },
      {
        "latitude": 18.16283,
        "longitude": 83.12241
      },
      {
        "latitude": 18.18845,
        "longitude": 83.10399
      },
      {
        "latitude": 18.20151,
        "longitude": 83.10414
      },
      {
        "latitude": 18.20783,
        "longitude": 83.1236
      },
      {
        "latitude": 18.19907,
        "longitude": 83.13713
      },
      {
        "latitude": 18.18093,
        "longitude": 83.13764
      },
      {
        "latitude": 18.17657,
        "longitude": 83.16227
      },
      {
        "latitude": 18.1891,
        "longitude": 83.17034
      },
      {
        "latitude": 18.18995,
        "longitude": 83.16252
      },
      {
        "latitude": 18.21406,
        "longitude": 83.15757
      },
      {
        "latitude": 18.2249,
        "longitude": 83.17527
      },
      {
        "latitude": 18.19673,
        "longitude": 83.19122
      },
      {
        "latitude": 18.18883,
        "longitude": 83.21499
      },
      {
        "latitude": 18.19278,
        "longitude": 83.22383
      },
      {
        "latitude": 18.20164,
        "longitude": 83.21481
      },
      {
        "latitude": 18.21055,
        "longitude": 83.22164
      },
      {
        "latitude": 18.22512,
        "longitude": 83.21797
      },
      {
        "latitude": 18.2067,
        "longitude": 83.22633
      },
      {
        "latitude": 18.20281,
        "longitude": 83.24003
      },
      {
        "latitude": 18.23012,
        "longitude": 83.24799
      },
      {
        "latitude": 18.21589,
        "longitude": 83.26619
      },
      {
        "latitude": 18.24009,
        "longitude": 83.26031
      },
      {
        "latitude": 18.2681,
        "longitude": 83.26546
      },
      {
        "latitude": 18.29811,
        "longitude": 83.21805
      },
      {
        "latitude": 18.31721,
        "longitude": 83.2291
      },
      {
        "latitude": 18.32891,
        "longitude": 83.22556
      },
      {
        "latitude": 18.32299,
        "longitude": 83.1951
      },
      {
        "latitude": 18.30831,
        "longitude": 83.17236
      },
      {
        "latitude": 18.33929,
        "longitude": 83.1585
      },
      {
        "latitude": 18.34904,
        "longitude": 83.13441
      },
      {
        "latitude": 18.34771,
        "longitude": 83.11329
      },
      {
        "latitude": 18.35636,
        "longitude": 83.10604
      },
      {
        "latitude": 18.35208,
        "longitude": 83.09546
      },
      {
        "latitude": 18.34164,
        "longitude": 83.09359
      },
      {
        "latitude": 18.34602,
        "longitude": 83.08068
      },
      {
        "latitude": 18.36977,
        "longitude": 83.07691
      },
      {
        "latitude": 18.41201,
        "longitude": 83.10552
      },
      {
        "latitude": 18.41163,
        "longitude": 83.08843
      },
      {
        "latitude": 18.37999,
        "longitude": 83.05449
      },
      {
        "latitude": 18.3917,
        "longitude": 83.02192
      },
      {
        "latitude": 18.38552,
        "longitude": 82.99683
      },
      {
        "latitude": 18.36001,
        "longitude": 82.97047
      },
      {
        "latitude": 18.36641,
        "longitude": 82.96011
      },
      {
        "latitude": 18.36082,
        "longitude": 82.93973
      },
      {
        "latitude": 18.37542,
        "longitude": 82.9222
      },
      {
        "latitude": 18.36848,
        "longitude": 82.91308
      },
      {
        "latitude": 18.38157,
        "longitude": 82.89419
      },
      {
        "latitude": 18.4241,
        "longitude": 82.895
      },
      {
        "latitude": 18.41846,
        "longitude": 82.8713
      },
      {
        "latitude": 18.42544,
        "longitude": 82.85641
      },
      {
        "latitude": 18.4192,
        "longitude": 82.85242
      },
      {
        "latitude": 18.43346,
        "longitude": 82.84588
      },
      {
        "latitude": 18.4509,
        "longitude": 82.81564
      },
      {
        "latitude": 18.44925,
        "longitude": 82.80314
      },
      {
        "latitude": 18.43079,
        "longitude": 82.78216
      },
      {
        "latitude": 18.41071,
        "longitude": 82.78688
      },
      {
        "latitude": 18.40675,
        "longitude": 82.79954
      },
      {
        "latitude": 18.38602,
        "longitude": 82.79386
      },
      {
        "latitude": 18.38189,
        "longitude": 82.78265
      },
      {
        "latitude": 18.36319,
        "longitude": 82.79056
      },
      {
        "latitude": 18.34043,
        "longitude": 82.77427
      },
      {
        "latitude": 18.33961,
        "longitude": 82.75969
      },
      {
        "latitude": 18.32024,
        "longitude": 82.73427
      },
      {
        "latitude": 18.32252,
        "longitude": 82.71502
      },
      {
        "latitude": 18.31318,
        "longitude": 82.70937
      },
      {
        "latitude": 18.29803,
        "longitude": 82.66677
      },
      {
        "latitude": 18.30203,
        "longitude": 82.64265
      },
      {
        "latitude": 18.28114,
        "longitude": 82.65224
      },
      {
        "latitude": 18.26377,
        "longitude": 82.64228
      },
      {
        "latitude": 18.25001,
        "longitude": 82.65249
      },
      {
        "latitude": 18.2367,
        "longitude": 82.63768
      },
      {
        "latitude": 18.27606,
        "longitude": 82.58778
      },
      {
        "latitude": 18.30419,
        "longitude": 82.59865
      },
      {
        "latitude": 18.31517,
        "longitude": 82.58131
      },
      {
        "latitude": 18.32888,
        "longitude": 82.59489
      },
      {
        "latitude": 18.32713,
        "longitude": 82.60894
      },
      {
        "latitude": 18.35228,
        "longitude": 82.60205
      },
      {
        "latitude": 18.35091,
        "longitude": 82.61452
      },
      {
        "latitude": 18.35971,
        "longitude": 82.62123
      },
      {
        "latitude": 18.36606,
        "longitude": 82.60599
      },
      {
        "latitude": 18.38203,
        "longitude": 82.60529
      },
      {
        "latitude": 18.37979,
        "longitude": 82.59952
      },
      {
        "latitude": 18.38923,
        "longitude": 82.5948
      },
      {
        "latitude": 18.38673,
        "longitude": 82.58388
      },
      {
        "latitude": 18.39996,
        "longitude": 82.56243
      },
      {
        "latitude": 18.39363,
        "longitude": 82.55533
      },
      {
        "latitude": 18.40617,
        "longitude": 82.53553
      },
      {
        "latitude": 18.4126,
        "longitude": 82.54709
      },
      {
        "latitude": 18.42191,
        "longitude": 82.54141
      },
      {
        "latitude": 18.44849,
        "longitude": 82.5614
      },
      {
        "latitude": 18.45763,
        "longitude": 82.54237
      },
      {
        "latitude": 18.4436,
        "longitude": 82.53956
      },
      {
        "latitude": 18.46421,
        "longitude": 82.52834
      },
      {
        "latitude": 18.4656,
        "longitude": 82.51942
      },
      {
        "latitude": 18.47773,
        "longitude": 82.53419
      },
      {
        "latitude": 18.49629,
        "longitude": 82.52649
      },
      {
        "latitude": 18.5112,
        "longitude": 82.53212
      },
      {
        "latitude": 18.51768,
        "longitude": 82.52043
      },
      {
        "latitude": 18.5146,
        "longitude": 82.50384
      },
      {
        "latitude": 18.52752,
        "longitude": 82.48684
      },
      {
        "latitude": 18.54061,
        "longitude": 82.48134
      },
      {
        "latitude": 18.54364,
        "longitude": 82.4935
      },
      {
        "latitude": 18.54872,
        "longitude": 82.48275
      },
      {
        "latitude": 18.51409,
        "longitude": 82.44475
      },
      {
        "latitude": 18.49381,
        "longitude": 82.43743
      },
      {
        "latitude": 18.46422,
        "longitude": 82.40352
      },
      {
        "latitude": 18.43258,
        "longitude": 82.38199
      },
      {
        "latitude": 18.42154,
        "longitude": 82.36421
      },
      {
        "latitude": 18.4038,
        "longitude": 82.37963
      },
      {
        "latitude": 18.36751,
        "longitude": 82.38555
      },
      {
        "latitude": 18.32671,
        "longitude": 82.33822
      },
      {
        "latitude": 18.31592,
        "longitude": 82.35587
      },
      {
        "latitude": 18.32869,
        "longitude": 82.37509
      },
      {
        "latitude": 18.32624,
        "longitude": 82.39265
      },
      {
        "latitude": 18.29795,
        "longitude": 82.39234
      },
      {
        "latitude": 18.28068,
        "longitude": 82.3765
      },
      {
        "latitude": 18.28055,
        "longitude": 82.34467
      },
      {
        "latitude": 18.25291,
        "longitude": 82.33336
      },
      {
        "latitude": 18.24077,
        "longitude": 82.33653
      },
      {
        "latitude": 18.23121,
        "longitude": 82.32441
      },
      {
        "latitude": 18.22431,
        "longitude": 82.33706
      },
      {
        "latitude": 18.20409,
        "longitude": 82.31084
      },
      {
        "latitude": 18.18403,
        "longitude": 82.31545
      },
      {
        "latitude": 18.17169,
        "longitude": 82.35337
      },
      {
        "latitude": 18.14816,
        "longitude": 82.37232
      },
      {
        "latitude": 18.13481,
        "longitude": 82.36325
      },
      {
        "latitude": 18.15057,
        "longitude": 82.34018
      },
      {
        "latitude": 18.11925,
        "longitude": 82.33377
      },
      {
        "latitude": 18.07659,
        "longitude": 82.35178
      },
      {
        "latitude": 18.05799,
        "longitude": 82.34388
      },
      {
        "latitude": 18.05207,
        "longitude": 82.33664
      },
      {
        "latitude": 18.05991,
        "longitude": 82.32225
      },
      {
        "latitude": 18.04498,
        "longitude": 82.32036
      },
      {
        "latitude": 18.04511,
        "longitude": 82.30774
      },
      {
        "latitude": 18.05393,
        "longitude": 82.31033
      },
      {
        "latitude": 18.05557,
        "longitude": 82.29865
      },
      {
        "latitude": 18.06746,
        "longitude": 82.3046
      },
      {
        "latitude": 18.0645,
        "longitude": 82.28349
      },
      {
        "latitude": 18.04185,
        "longitude": 82.26161
      },
      {
        "latitude": 18.02134,
        "longitude": 82.27355
      },
      {
        "latitude": 17.99582,
        "longitude": 82.26448
      },
      {
        "latitude": 17.99313,
        "longitude": 82.24826
      },
      {
        "latitude": 18.00111,
        "longitude": 82.22311
      },
      {
        "latitude": 18.01804,
        "longitude": 82.20495
      },
      {
        "latitude": 18.02074,
        "longitude": 82.1789
      },
      {
        "latitude": 18.02982,
        "longitude": 82.18347
      },
      {
        "latitude": 18.05138,
        "longitude": 82.16885
      },
      {
        "latitude": 18.04615,
        "longitude": 82.13698
      },
      {
        "latitude": 18.05953,
        "longitude": 82.13301
      },
      {
        "latitude": 18.05949,
        "longitude": 82.10246
      },
      {
        "latitude": 18.07454,
        "longitude": 82.07647
      },
      {
        "latitude": 18.05515,
        "longitude": 82.06392
      },
      {
        "latitude": 18.05756,
        "longitude": 82.03977
      },
      {
        "latitude": 18.06846,
        "longitude": 82.03529
      },
      {
        "latitude": 18.05648,
        "longitude": 82.00798
      },
      {
        "latitude": 18.02928,
        "longitude": 82.00924
      },
      {
        "latitude": 18.01322,
        "longitude": 81.98008
      },
      {
        "latitude": 17.9799,
        "longitude": 82.00965
      },
      {
        "latitude": 17.96527,
        "longitude": 82.00689
      },
      {
        "latitude": 17.95697,
        "longitude": 82.02195
      },
      {
        "latitude": 17.93923,
        "longitude": 82.02956
      },
      {
        "latitude": 17.89982,
        "longitude": 82.00231
      },
      {
        "latitude": 17.88548,
        "longitude": 82.00069
      },
      {
        "latitude": 17.87119,
        "longitude": 82.00418
      },
      {
        "latitude": 17.86144,
        "longitude": 82.01733
      },
      {
        "latitude": 17.83911,
        "longitude": 82.0196
      },
      {
        "latitude": 17.82709,
        "longitude": 82.00945
      },
      {
        "latitude": 17.8447,
        "longitude": 82.00773
      },
      {
        "latitude": 17.85172,
        "longitude": 81.98854
      },
      {
        "latitude": 17.81624,
        "longitude": 81.96175
      },
      {
        "latitude": 17.80713,
        "longitude": 81.9245
      },
      {
        "latitude": 17.80002,
        "longitude": 81.92581
      },
      {
        "latitude": 17.78795,
        "longitude": 81.90071
      },
      {
        "latitude": 17.75174,
        "longitude": 81.86115
      }
    ],
    "polygons": [
      [
        {
          "latitude": 17.75174,
          "longitude": 81.86115
        },
        {
          "latitude": 17.74063,
          "longitude": 81.87883
        },
        {
          "latitude": 17.74477,
          "longitude": 81.898
        },
        {
          "latitude": 17.738,
          "longitude": 81.93517
        },
        {
          "latitude": 17.74623,
          "longitude": 81.97171
        },
        {
          "latitude": 17.75737,
          "longitude": 81.96059
        },
        {
          "latitude": 17.76757,
          "longitude": 81.97839
        },
        {
          "latitude": 17.76387,
          "longitude": 81.9982
        },
        {
          "latitude": 17.75285,
          "longitude": 82.01627
        },
        {
          "latitude": 17.73747,
          "longitude": 82.01135
        },
        {
          "latitude": 17.72761,
          "longitude": 82.02806
        },
        {
          "latitude": 17.71399,
          "longitude": 82.03349
        },
        {
          "latitude": 17.70268,
          "longitude": 82.02486
        },
        {
          "latitude": 17.66875,
          "longitude": 82.02245
        },
        {
          "latitude": 17.65873,
          "longitude": 82.00637
        },
        {
          "latitude": 17.64578,
          "longitude": 82.01042
        },
        {
          "latitude": 17.63906,
          "longitude": 82.00201
        },
        {
          "latitude": 17.61802,
          "longitude": 82.01632
        },
        {
          "latitude": 17.63157,
          "longitude": 82.02354
        },
        {
          "latitude": 17.64274,
          "longitude": 82.05232
        },
        {
          "latitude": 17.63535,
          "longitude": 82.05857
        },
        {
          "latitude": 17.6563,
          "longitude": 82.09177
        },
        {
          "latitude": 17.64861,
          "longitude": 82.13544
        },
        {
          "latitude": 17.63451,
          "longitude": 82.138
        },
        {
          "latitude": 17.60944,
          "longitude": 82.16334
        },
        {
          "latitude": 17.60815,
          "longitude": 82.18098
        },
        {
          "latitude": 17.62149,
          "longitude": 82.19114
        },
        {
          "latitude": 17.63763,
          "longitude": 82.22638
        },
        {
          "latitude": 17.61831,
          "longitude": 82.24822
        },
        {
          "latitude": 17.62325,
          "longitude": 82.27588
        },
        {
          "latitude": 17.61068,
          "longitude": 82.2744
        },
        {
          "latitude": 17.58891,
          "longitude": 82.30361
        },
        {
          "latitude": 17.58563,
          "longitude": 82.3408
        },
        {
          "latitude": 17.5534,
          "longitude": 82.32907
        },
        {
          "latitude": 17.54419,
          "longitude": 82.35813
        },
        {
          "latitude": 17.55722,
          "longitude": 82.35172
        },
        {
          "latitude": 17.57443,
          "longitude": 82.36784
        },
        {
          "latitude": 17.60618,
          "longitude": 82.46188
        },
        {
          "latitude": 17.61669,
          "longitude": 82.46452
        },
        {
          "latitude": 17.63149,
          "longitude": 82.46293
        },
        {
          "latitude": 17.63524,
          "longitude": 82.43589
        },
        {
          "latitude": 17.65217,
          "longitude": 82.42951
        },
        {
          "latitude": 17.63611,
          "longitude": 82.39083
        },
        {
          "latitude": 17.63621,
          "longitude": 82.35828
        },
        {
          "latitude": 17.6504,
          "longitude": 82.34421
        },
        {
          "latitude": 17.66087,
          "longitude": 82.35201
        },
        {
          "latitude": 17.66807,
          "longitude": 82.34456
        },
        {
          "latitude": 17.67678,
          "longitude": 82.34753
        },
        {
          "latitude": 17.67565,
          "longitude": 82.3596
        },
        {
          "latitude": 17.68661,
          "longitude": 82.37467
        },
        {
          "latitude": 17.67754,
          "longitude": 82.38503
        },
        {
          "latitude": 17.69029,
          "longitude": 82.41546
        },
        {
          "latitude": 17.70465,
          "longitude": 82.42814
        },
        {
          "latitude": 17.7143,
          "longitude": 82.42492
        },
        {
          "latitude": 17.7235,
          "longitude": 82.43847
        },
        {
          "latitude": 17.72135,
          "longitude": 82.45125
        },
        {
          "latitude": 17.73531,
          "longitude": 82.46192
        },
        {
          "latitude": 17.71419,
          "longitude": 82.50159
        },
        {
          "latitude": 17.72247,
          "longitude": 82.51236
        },
        {
          "latitude": 17.70409,
          "longitude": 82.49528
        },
        {
          "latitude": 17.69251,
          "longitude": 82.49784
        },
        {
          "latitude": 17.70302,
          "longitude": 82.52879
        },
        {
          "latitude": 17.71603,
          "longitude": 82.54505
        },
        {
          "latitude": 17.74576,
          "longitude": 82.55407
        },
        {
          "latitude": 17.74621,
          "longitude": 82.56207
        },
        {
          "latitude": 17.76935,
          "longitude": 82.56395
        },
        {
          "latitude": 17.76741,
          "longitude": 82.60653
        },
        {
          "latitude": 17.77852,
          "longitude": 82.59493
        },
        {
          "latitude": 17.78758,
          "longitude": 82.61696
        },
        {
          "latitude": 17.77876,
          "longitude": 82.61526
        },
        {
          "latitude": 17.77271,
          "longitude": 82.63382
        },
        {
          "latitude": 17.79405,
          "longitude": 82.64248
        },
        {
          "latitude": 17.84098,
          "longitude": 82.62315
        },
        {
          "latitude": 17.83181,
          "longitude": 82.63438
        },
        {
          "latitude": 17.85576,
          "longitude": 82.68031
        },
        {
          "latitude": 17.84876,
          "longitude": 82.69331
        },
        {
          "latitude": 17.86388,
          "longitude": 82.69883
        },
        {
          "latitude": 17.8675,
          "longitude": 82.71676
        },
        {
          "latitude": 17.89474,
          "longitude": 82.6886
        },
        {
          "latitude": 17.90291,
          "longitude": 82.66571
        },
        {
          "latitude": 17.8984,
          "longitude": 82.70202
        },
        {
          "latitude": 17.91301,
          "longitude": 82.71131
        },
        {
          "latitude": 17.92002,
          "longitude": 82.70544
        },
        {
          "latitude": 17.93066,
          "longitude": 82.72611
        },
        {
          "latitude": 17.93896,
          "longitude": 82.72648
        },
        {
          "latitude": 17.94537,
          "longitude": 82.7088
        },
        {
          "latitude": 17.95337,
          "longitude": 82.7152
        },
        {
          "latitude": 17.94467,
          "longitude": 82.73195
        },
        {
          "latitude": 17.94767,
          "longitude": 82.74524
        },
        {
          "latitude": 17.9355,
          "longitude": 82.74712
        },
        {
          "latitude": 17.93704,
          "longitude": 82.76027
        },
        {
          "latitude": 17.94749,
          "longitude": 82.7494
        },
        {
          "latitude": 17.9577,
          "longitude": 82.75024
        },
        {
          "latitude": 17.9276,
          "longitude": 82.78243
        },
        {
          "latitude": 17.93338,
          "longitude": 82.78319
        },
        {
          "latitude": 17.92077,
          "longitude": 82.80118
        },
        {
          "latitude": 17.93522,
          "longitude": 82.81214
        },
        {
          "latitude": 17.93287,
          "longitude": 82.82688
        },
        {
          "latitude": 17.95486,
          "longitude": 82.83703
        },
        {
          "latitude": 17.96005,
          "longitude": 82.85054
        },
        {
          "latitude": 17.98755,
          "longitude": 82.84071
        },
        {
          "latitude": 18.00994,
          "longitude": 82.86991
        },
        {
          "latitude": 18.01114,
          "longitude": 82.90404
        },
        {
          "latitude": 17.984,
          "longitude": 82.91882
        },
        {
          "latitude": 17.98941,
          "longitude": 82.94602
        },
        {
          "latitude": 18.00487,
          "longitude": 82.95763
        },
        {
          "latitude": 18.01374,
          "longitude": 82.98298
        },
        {
          "latitude": 18.02814,
          "longitude": 82.98043
        },
        {
          "latitude": 18.08947,
          "longitude": 83.02445
        },
        {
          "latitude": 18.08685,
          "longitude": 83.00279
        },
        {
          "latitude": 18.09328,
          "longitude": 83.01136
        },
        {
          "latitude": 18.11664,
          "longitude": 83.00478
        },
        {
          "latitude": 18.13823,
          "longitude": 82.98746
        },
        {
          "latitude": 18.15133,
          "longitude": 83.01473
        },
        {
          "latitude": 18.13815,
          "longitude": 83.03071
        },
        {
          "latitude": 18.1156,
          "longitude": 83.03833
        },
        {
          "latitude": 18.11175,
          "longitude": 83.05986
        },
        {
          "latitude": 18.10378,
          "longitude": 83.06178
        },
        {
          "latitude": 18.11833,
          "longitude": 83.07516
        },
        {
          "latitude": 18.09772,
          "longitude": 83.07055
        },
        {
          "latitude": 18.08618,
          "longitude": 83.05097
        },
        {
          "latitude": 18.06394,
          "longitude": 83.0504
        },
        {
          "latitude": 18.08247,
          "longitude": 83.05144
        },
        {
          "latitude": 18.07572,
          "longitude": 83.06741
        },
        {
          "latitude": 18.08947,
          "longitude": 83.08423
        },
        {
          "latitude": 18.1048,
          "longitude": 83.13027
        },
        {
          "latitude": 18.11227,
          "longitude": 83.1316
        },
        {
          "latitude": 18.11523,
          "longitude": 83.1191
        },
        {
          "latitude": 18.14946,
          "longitude": 83.12891
        },
        {
          "latitude": 18.14392,
          "longitude": 83.16826
        },
        {
          "latitude": 18.16324,
          "longitude": 83.14852
        },
        {
          "latitude": 18.16283,
          "longitude": 83.12241
        },
        {
          "latitude": 18.18845,
          "longitude": 83.10399
        },
        {
          "latitude": 18.20151,
          "longitude": 83.10414
        },
        {
          "latitude": 18.20783,
          "longitude": 83.1236
        },
        {
          "latitude": 18.19907,
          "longitude": 83.13713
        },
        {
          "latitude": 18.18093,
          "longitude": 83.13764
        },
        {
          "latitude": 18.17657,
          "longitude": 83.16227
        },
        {
          "latitude": 18.1891,
          "longitude": 83.17034
        },
        {
          "latitude": 18.18995,
          "longitude": 83.16252
        },
        {
          "latitude": 18.21406,
          "longitude": 83.15757
        },
        {
          "latitude": 18.2249,
          "longitude": 83.17527
        },
        {
          "latitude": 18.19673,
          "longitude": 83.19122
        },
        {
          "latitude": 18.18883,
          "longitude": 83.21499
        },
        {
          "latitude": 18.19278,
          "longitude": 83.22383
        },
        {
          "latitude": 18.20164,
          "longitude": 83.21481
        },
        {
          "latitude": 18.21055,
          "longitude": 83.22164
        },
        {
          "latitude": 18.22512,
          "longitude": 83.21797
        },
        {
          "latitude": 18.2067,
          "longitude": 83.22633
        },
        {
          "latitude": 18.20281,
          "longitude": 83.24003
        },
        {
          "latitude": 18.23012,
          "longitude": 83.24799
        },
        {
          "latitude": 18.21589,
          "longitude": 83.26619
        },
        {
          "latitude": 18.24009,
          "longitude": 83.26031
        },
        {
          "latitude": 18.2681,
          "longitude": 83.26546
        },
        {
          "latitude": 18.29811,
          "longitude": 83.21805
        },
        {
          "latitude": 18.31721,
          "longitude": 83.2291
        },
        {
          "latitude": 18.32891,
          "longitude": 83.22556
        },
        {
          "latitude": 18.32299,
          "longitude": 83.1951
        },
        {
          "latitude": 18.30831,
          "longitude": 83.17236
        },
        {
          "latitude": 18.33929,
          "longitude": 83.1585
        },
        {
          "latitude": 18.34904,
          "longitude": 83.13441
        },
        {
          "latitude": 18.34771,
          "longitude": 83.11329
        },
        {
          "latitude": 18.35636,
          "longitude": 83.10604
        },
        {
          "latitude": 18.35208,
          "longitude": 83.09546
        },
        {
          "latitude": 18.34164,
          "longitude": 83.09359
        },
        {
          "latitude": 18.34602,
          "longitude": 83.08068
        },
        {
          "latitude": 18.36977,
          "longitude": 83.07691
        },
        {
          "latitude": 18.41201,
          "longitude": 83.10552
        },
        {
          "latitude": 18.41163,
          "longitude": 83.08843
        },
        {
          "latitude": 18.37999,
          "longitude": 83.05449
        },
        {
          "latitude": 18.3917,
          "longitude": 83.02192
        },
        {
          "latitude": 18.38552,
          "longitude": 82.99683
        },
        {
          "latitude": 18.36001,
          "longitude": 82.97047
        },
        {
          "latitude": 18.36641,
          "longitude": 82.96011
        },
        {
          "latitude": 18.36082,
          "longitude": 82.93973
        },
        {
          "latitude": 18.37542,
          "longitude": 82.9222
        },
        {
          "latitude": 18.36848,
          "longitude": 82.91308
        },
        {
          "latitude": 18.38157,
          "longitude": 82.89419
        },
        {
          "latitude": 18.4241,
          "longitude": 82.895
        },
        {
          "latitude": 18.41846,
          "longitude": 82.8713
        },
        {
          "latitude": 18.42544,
          "longitude": 82.85641
        },
        {
          "latitude": 18.4192,
          "longitude": 82.85242
        },
        {
          "latitude": 18.43346,
          "longitude": 82.84588
        },
        {
          "latitude": 18.4509,
          "longitude": 82.81564
        },
        {
          "latitude": 18.44925,
          "longitude": 82.80314
        },
        {
          "latitude": 18.43079,
          "longitude": 82.78216
        },
        {
          "latitude": 18.41071,
          "longitude": 82.78688
        },
        {
          "latitude": 18.40675,
          "longitude": 82.79954
        },
        {
          "latitude": 18.38602,
          "longitude": 82.79386
        },
        {
          "latitude": 18.38189,
          "longitude": 82.78265
        },
        {
          "latitude": 18.36319,
          "longitude": 82.79056
        },
        {
          "latitude": 18.34043,
          "longitude": 82.77427
        },
        {
          "latitude": 18.33961,
          "longitude": 82.75969
        },
        {
          "latitude": 18.32024,
          "longitude": 82.73427
        },
        {
          "latitude": 18.32252,
          "longitude": 82.71502
        },
        {
          "latitude": 18.31318,
          "longitude": 82.70937
        },
        {
          "latitude": 18.29803,
          "longitude": 82.66677
        },
        {
          "latitude": 18.30203,
          "longitude": 82.64265
        },
        {
          "latitude": 18.28114,
          "longitude": 82.65224
        },
        {
          "latitude": 18.26377,
          "longitude": 82.64228
        },
        {
          "latitude": 18.25001,
          "longitude": 82.65249
        },
        {
          "latitude": 18.2367,
          "longitude": 82.63768
        },
        {
          "latitude": 18.27606,
          "longitude": 82.58778
        },
        {
          "latitude": 18.30419,
          "longitude": 82.59865
        },
        {
          "latitude": 18.31517,
          "longitude": 82.58131
        },
        {
          "latitude": 18.32888,
          "longitude": 82.59489
        },
        {
          "latitude": 18.32713,
          "longitude": 82.60894
        },
        {
          "latitude": 18.35228,
          "longitude": 82.60205
        },
        {
          "latitude": 18.35091,
          "longitude": 82.61452
        },
        {
          "latitude": 18.35971,
          "longitude": 82.62123
        },
        {
          "latitude": 18.36606,
          "longitude": 82.60599
        },
        {
          "latitude": 18.38203,
          "longitude": 82.60529
        },
        {
          "latitude": 18.37979,
          "longitude": 82.59952
        },
        {
          "latitude": 18.38923,
          "longitude": 82.5948
        },
        {
          "latitude": 18.38673,
          "longitude": 82.58388
        },
        {
          "latitude": 18.39996,
          "longitude": 82.56243
        },
        {
          "latitude": 18.39363,
          "longitude": 82.55533
        },
        {
          "latitude": 18.40617,
          "longitude": 82.53553
        },
        {
          "latitude": 18.4126,
          "longitude": 82.54709
        },
        {
          "latitude": 18.42191,
          "longitude": 82.54141
        },
        {
          "latitude": 18.44849,
          "longitude": 82.5614
        },
        {
          "latitude": 18.45763,
          "longitude": 82.54237
        },
        {
          "latitude": 18.4436,
          "longitude": 82.53956
        },
        {
          "latitude": 18.46421,
          "longitude": 82.52834
        },
        {
          "latitude": 18.4656,
          "longitude": 82.51942
        },
        {
          "latitude": 18.47773,
          "longitude": 82.53419
        },
        {
          "latitude": 18.49629,
          "longitude": 82.52649
        },
        {
          "latitude": 18.5112,
          "longitude": 82.53212
        },
        {
          "latitude": 18.51768,
          "longitude": 82.52043
        },
        {
          "latitude": 18.5146,
          "longitude": 82.50384
        },
        {
          "latitude": 18.52752,
          "longitude": 82.48684
        },
        {
          "latitude": 18.54061,
          "longitude": 82.48134
        },
        {
          "latitude": 18.54364,
          "longitude": 82.4935
        },
        {
          "latitude": 18.54872,
          "longitude": 82.48275
        },
        {
          "latitude": 18.51409,
          "longitude": 82.44475
        },
        {
          "latitude": 18.49381,
          "longitude": 82.43743
        },
        {
          "latitude": 18.46422,
          "longitude": 82.40352
        },
        {
          "latitude": 18.43258,
          "longitude": 82.38199
        },
        {
          "latitude": 18.42154,
          "longitude": 82.36421
        },
        {
          "latitude": 18.4038,
          "longitude": 82.37963
        },
        {
          "latitude": 18.36751,
          "longitude": 82.38555
        },
        {
          "latitude": 18.32671,
          "longitude": 82.33822
        },
        {
          "latitude": 18.31592,
          "longitude": 82.35587
        },
        {
          "latitude": 18.32869,
          "longitude": 82.37509
        },
        {
          "latitude": 18.32624,
          "longitude": 82.39265
        },
        {
          "latitude": 18.29795,
          "longitude": 82.39234
        },
        {
          "latitude": 18.28068,
          "longitude": 82.3765
        },
        {
          "latitude": 18.28055,
          "longitude": 82.34467
        },
        {
          "latitude": 18.25291,
          "longitude": 82.33336
        },
        {
          "latitude": 18.24077,
          "longitude": 82.33653
        },
        {
          "latitude": 18.23121,
          "longitude": 82.32441
        },
        {
          "latitude": 18.22431,
          "longitude": 82.33706
        },
        {
          "latitude": 18.20409,
          "longitude": 82.31084
        },
        {
          "latitude": 18.18403,
          "longitude": 82.31545
        },
        {
          "latitude": 18.17169,
          "longitude": 82.35337
        },
        {
          "latitude": 18.14816,
          "longitude": 82.37232
        },
        {
          "latitude": 18.13481,
          "longitude": 82.36325
        },
        {
          "latitude": 18.15057,
          "longitude": 82.34018
        },
        {
          "latitude": 18.11925,
          "longitude": 82.33377
        },
        {
          "latitude": 18.07659,
          "longitude": 82.35178
        },
        {
          "latitude": 18.05799,
          "longitude": 82.34388
        },
        {
          "latitude": 18.05207,
          "longitude": 82.33664
        },
        {
          "latitude": 18.05991,
          "longitude": 82.32225
        },
        {
          "latitude": 18.04498,
          "longitude": 82.32036
        },
        {
          "latitude": 18.04511,
          "longitude": 82.30774
        },
        {
          "latitude": 18.05393,
          "longitude": 82.31033
        },
        {
          "latitude": 18.05557,
          "longitude": 82.29865
        },
        {
          "latitude": 18.06746,
          "longitude": 82.3046
        },
        {
          "latitude": 18.0645,
          "longitude": 82.28349
        },
        {
          "latitude": 18.04185,
          "longitude": 82.26161
        },
        {
          "latitude": 18.02134,
          "longitude": 82.27355
        },
        {
          "latitude": 17.99582,
          "longitude": 82.26448
        },
        {
          "latitude": 17.99313,
          "longitude": 82.24826
        },
        {
          "latitude": 18.00111,
          "longitude": 82.22311
        },
        {
          "latitude": 18.01804,
          "longitude": 82.20495
        },
        {
          "latitude": 18.02074,
          "longitude": 82.1789
        },
        {
          "latitude": 18.02982,
          "longitude": 82.18347
        },
        {
          "latitude": 18.05138,
          "longitude": 82.16885
        },
        {
          "latitude": 18.04615,
          "longitude": 82.13698
        },
        {
          "latitude": 18.05953,
          "longitude": 82.13301
        },
        {
          "latitude": 18.05949,
          "longitude": 82.10246
        },
        {
          "latitude": 18.07454,
          "longitude": 82.07647
        },
        {
          "latitude": 18.05515,
          "longitude": 82.06392
        },
        {
          "latitude": 18.05756,
          "longitude": 82.03977
        },
        {
          "latitude": 18.06846,
          "longitude": 82.03529
        },
        {
          "latitude": 18.05648,
          "longitude": 82.00798
        },
        {
          "latitude": 18.02928,
          "longitude": 82.00924
        },
        {
          "latitude": 18.01322,
          "longitude": 81.98008
        },
        {
          "latitude": 17.9799,
          "longitude": 82.00965
        },
        {
          "latitude": 17.96527,
          "longitude": 82.00689
        },
        {
          "latitude": 17.95697,
          "longitude": 82.02195
        },
        {
          "latitude": 17.93923,
          "longitude": 82.02956
        },
        {
          "latitude": 17.89982,
          "longitude": 82.00231
        },
        {
          "latitude": 17.88548,
          "longitude": 82.00069
        },
        {
          "latitude": 17.87119,
          "longitude": 82.00418
        },
        {
          "latitude": 17.86144,
          "longitude": 82.01733
        },
        {
          "latitude": 17.83911,
          "longitude": 82.0196
        },
        {
          "latitude": 17.82709,
          "longitude": 82.00945
        },
        {
          "latitude": 17.8447,
          "longitude": 82.00773
        },
        {
          "latitude": 17.85172,
          "longitude": 81.98854
        },
        {
          "latitude": 17.81624,
          "longitude": 81.96175
        },
        {
          "latitude": 17.80713,
          "longitude": 81.9245
        },
        {
          "latitude": 17.80002,
          "longitude": 81.92581
        },
        {
          "latitude": 17.78795,
          "longitude": 81.90071
        },
        {
          "latitude": 17.75174,
          "longitude": 81.86115
        }
      ]
    ]
  },
  {
    "id": "anakapalli",
    "name": "Anakapalli",
    "headquarters": "Anakapalli",
    "center": {
      "latitude": 17.6654,
      "longitude": 82.7995
    },
    "region": "North Coastal",
    "polygon": [
      {
        "latitude": 17.5534,
        "longitude": 82.32907
      },
      {
        "latitude": 17.52323,
        "longitude": 82.33733
      },
      {
        "latitude": 17.50293,
        "longitude": 82.33131
      },
      {
        "latitude": 17.49392,
        "longitude": 82.34465
      },
      {
        "latitude": 17.50812,
        "longitude": 82.35935
      },
      {
        "latitude": 17.51016,
        "longitude": 82.3753
      },
      {
        "latitude": 17.48914,
        "longitude": 82.36741
      },
      {
        "latitude": 17.4791,
        "longitude": 82.37282
      },
      {
        "latitude": 17.46652,
        "longitude": 82.41007
      },
      {
        "latitude": 17.47107,
        "longitude": 82.43789
      },
      {
        "latitude": 17.48975,
        "longitude": 82.45414
      },
      {
        "latitude": 17.51099,
        "longitude": 82.44945
      },
      {
        "latitude": 17.51138,
        "longitude": 82.46525
      },
      {
        "latitude": 17.52952,
        "longitude": 82.46055
      },
      {
        "latitude": 17.53486,
        "longitude": 82.46673
      },
      {
        "latitude": 17.52649,
        "longitude": 82.47641
      },
      {
        "latitude": 17.50103,
        "longitude": 82.48039
      },
      {
        "latitude": 17.49919,
        "longitude": 82.48723
      },
      {
        "latitude": 17.509,
        "longitude": 82.50223
      },
      {
        "latitude": 17.50138,
        "longitude": 82.51733
      },
      {
        "latitude": 17.50731,
        "longitude": 82.53903
      },
      {
        "latitude": 17.52705,
        "longitude": 82.55247
      },
      {
        "latitude": 17.49063,
        "longitude": 82.56119
      },
      {
        "latitude": 17.49196,
        "longitude": 82.56812
      },
      {
        "latitude": 17.46917,
        "longitude": 82.58544
      },
      {
        "latitude": 17.46025,
        "longitude": 82.60477
      },
      {
        "latitude": 17.42457,
        "longitude": 82.58323
      },
      {
        "latitude": 17.40847,
        "longitude": 82.56057
      },
      {
        "latitude": 17.37408,
        "longitude": 82.54297
      },
      {
        "latitude": 17.35292,
        "longitude": 82.5553
      },
      {
        "latitude": 17.35067,
        "longitude": 82.56682
      },
      {
        "latitude": 17.33079,
        "longitude": 82.56016
      },
      {
        "latitude": 17.32416,
        "longitude": 82.55555
      },
      {
        "latitude": 17.32705,
        "longitude": 82.53575
      },
      {
        "latitude": 17.30787,
        "longitude": 82.53584
      },
      {
        "latitude": 17.29931,
        "longitude": 82.51816
      },
      {
        "latitude": 17.27659,
        "longitude": 82.5229
      },
      {
        "latitude": 17.26327,
        "longitude": 82.53906
      },
      {
        "latitude": 17.24851,
        "longitude": 82.54136
      },
      {
        "latitude": 17.3437,
        "longitude": 82.70302
      },
      {
        "latitude": 17.47251,
        "longitude": 82.99198
      },
      {
        "latitude": 17.50145,
        "longitude": 83.00671
      },
      {
        "latitude": 17.54669,
        "longitude": 83.11472
      },
      {
        "latitude": 17.61313,
        "longitude": 83.13089
      },
      {
        "latitude": 17.6487,
        "longitude": 83.15279
      },
      {
        "latitude": 17.6588,
        "longitude": 83.12541
      },
      {
        "latitude": 17.6822,
        "longitude": 83.12784
      },
      {
        "latitude": 17.69302,
        "longitude": 83.1121
      },
      {
        "latitude": 17.69689,
        "longitude": 83.12225
      },
      {
        "latitude": 17.71172,
        "longitude": 83.12125
      },
      {
        "latitude": 17.70883,
        "longitude": 83.13565
      },
      {
        "latitude": 17.71791,
        "longitude": 83.15135
      },
      {
        "latitude": 17.73516,
        "longitude": 83.15762
      },
      {
        "latitude": 17.75706,
        "longitude": 83.16449
      },
      {
        "latitude": 17.77252,
        "longitude": 83.15803
      },
      {
        "latitude": 17.78081,
        "longitude": 83.16459
      },
      {
        "latitude": 17.83851,
        "longitude": 83.16207
      },
      {
        "latitude": 17.84612,
        "longitude": 83.1502
      },
      {
        "latitude": 17.86882,
        "longitude": 83.14752
      },
      {
        "latitude": 17.87219,
        "longitude": 83.13069
      },
      {
        "latitude": 17.90434,
        "longitude": 83.1285
      },
      {
        "latitude": 17.92103,
        "longitude": 83.11056
      },
      {
        "latitude": 17.93765,
        "longitude": 83.10995
      },
      {
        "latitude": 17.94442,
        "longitude": 83.07209
      },
      {
        "latitude": 17.96951,
        "longitude": 83.03918
      },
      {
        "latitude": 17.97613,
        "longitude": 83.00931
      },
      {
        "latitude": 17.98573,
        "longitude": 83.00766
      },
      {
        "latitude": 17.9977,
        "longitude": 83.01327
      },
      {
        "latitude": 18.04156,
        "longitude": 83.00967
      },
      {
        "latitude": 18.06073,
        "longitude": 83.02608
      },
      {
        "latitude": 18.06394,
        "longitude": 83.0504
      },
      {
        "latitude": 18.08618,
        "longitude": 83.05097
      },
      {
        "latitude": 18.09772,
        "longitude": 83.07055
      },
      {
        "latitude": 18.11833,
        "longitude": 83.07516
      },
      {
        "latitude": 18.10378,
        "longitude": 83.06178
      },
      {
        "latitude": 18.11175,
        "longitude": 83.05986
      },
      {
        "latitude": 18.11683,
        "longitude": 83.03707
      },
      {
        "latitude": 18.13815,
        "longitude": 83.03071
      },
      {
        "latitude": 18.15133,
        "longitude": 83.01473
      },
      {
        "latitude": 18.1453,
        "longitude": 82.99653
      },
      {
        "latitude": 18.13823,
        "longitude": 82.98746
      },
      {
        "latitude": 18.11664,
        "longitude": 83.00478
      },
      {
        "latitude": 18.09328,
        "longitude": 83.01136
      },
      {
        "latitude": 18.08685,
        "longitude": 83.00279
      },
      {
        "latitude": 18.08947,
        "longitude": 83.02445
      },
      {
        "latitude": 18.02814,
        "longitude": 82.98043
      },
      {
        "latitude": 18.01374,
        "longitude": 82.98298
      },
      {
        "latitude": 18.00487,
        "longitude": 82.95763
      },
      {
        "latitude": 17.98658,
        "longitude": 82.94113
      },
      {
        "latitude": 17.984,
        "longitude": 82.91882
      },
      {
        "latitude": 17.98861,
        "longitude": 82.91075
      },
      {
        "latitude": 17.99301,
        "longitude": 82.91522
      },
      {
        "latitude": 18.0109,
        "longitude": 82.90472
      },
      {
        "latitude": 18.00994,
        "longitude": 82.86991
      },
      {
        "latitude": 17.98755,
        "longitude": 82.84071
      },
      {
        "latitude": 17.96005,
        "longitude": 82.85054
      },
      {
        "latitude": 17.95486,
        "longitude": 82.83703
      },
      {
        "latitude": 17.93287,
        "longitude": 82.82688
      },
      {
        "latitude": 17.93404,
        "longitude": 82.81038
      },
      {
        "latitude": 17.92363,
        "longitude": 82.8085
      },
      {
        "latitude": 17.92136,
        "longitude": 82.79824
      },
      {
        "latitude": 17.93338,
        "longitude": 82.78319
      },
      {
        "latitude": 17.9276,
        "longitude": 82.78243
      },
      {
        "latitude": 17.9577,
        "longitude": 82.75024
      },
      {
        "latitude": 17.94749,
        "longitude": 82.7494
      },
      {
        "latitude": 17.93704,
        "longitude": 82.76027
      },
      {
        "latitude": 17.9355,
        "longitude": 82.74712
      },
      {
        "latitude": 17.94767,
        "longitude": 82.74524
      },
      {
        "latitude": 17.94467,
        "longitude": 82.73195
      },
      {
        "latitude": 17.95337,
        "longitude": 82.7152
      },
      {
        "latitude": 17.94537,
        "longitude": 82.7088
      },
      {
        "latitude": 17.93896,
        "longitude": 82.72648
      },
      {
        "latitude": 17.93066,
        "longitude": 82.72611
      },
      {
        "latitude": 17.92002,
        "longitude": 82.70544
      },
      {
        "latitude": 17.91301,
        "longitude": 82.71131
      },
      {
        "latitude": 17.8984,
        "longitude": 82.70202
      },
      {
        "latitude": 17.90291,
        "longitude": 82.66571
      },
      {
        "latitude": 17.89474,
        "longitude": 82.6886
      },
      {
        "latitude": 17.86616,
        "longitude": 82.71591
      },
      {
        "latitude": 17.86388,
        "longitude": 82.69883
      },
      {
        "latitude": 17.84876,
        "longitude": 82.69331
      },
      {
        "latitude": 17.85576,
        "longitude": 82.68031
      },
      {
        "latitude": 17.83181,
        "longitude": 82.63438
      },
      {
        "latitude": 17.84102,
        "longitude": 82.62244
      },
      {
        "latitude": 17.79405,
        "longitude": 82.64248
      },
      {
        "latitude": 17.77415,
        "longitude": 82.63525
      },
      {
        "latitude": 17.77876,
        "longitude": 82.61526
      },
      {
        "latitude": 17.78758,
        "longitude": 82.61696
      },
      {
        "latitude": 17.77852,
        "longitude": 82.59493
      },
      {
        "latitude": 17.76741,
        "longitude": 82.60653
      },
      {
        "latitude": 17.76935,
        "longitude": 82.56395
      },
      {
        "latitude": 17.74621,
        "longitude": 82.56207
      },
      {
        "latitude": 17.74576,
        "longitude": 82.55407
      },
      {
        "latitude": 17.71603,
        "longitude": 82.54505
      },
      {
        "latitude": 17.70302,
        "longitude": 82.52879
      },
      {
        "latitude": 17.69251,
        "longitude": 82.49784
      },
      {
        "latitude": 17.70796,
        "longitude": 82.49655
      },
      {
        "latitude": 17.72247,
        "longitude": 82.51236
      },
      {
        "latitude": 17.71419,
        "longitude": 82.50159
      },
      {
        "latitude": 17.73531,
        "longitude": 82.46192
      },
      {
        "latitude": 17.72135,
        "longitude": 82.45125
      },
      {
        "latitude": 17.7235,
        "longitude": 82.43847
      },
      {
        "latitude": 17.7143,
        "longitude": 82.42492
      },
      {
        "latitude": 17.70465,
        "longitude": 82.42814
      },
      {
        "latitude": 17.69029,
        "longitude": 82.41546
      },
      {
        "latitude": 17.67754,
        "longitude": 82.38503
      },
      {
        "latitude": 17.68661,
        "longitude": 82.37467
      },
      {
        "latitude": 17.67565,
        "longitude": 82.3596
      },
      {
        "latitude": 17.67678,
        "longitude": 82.34753
      },
      {
        "latitude": 17.66807,
        "longitude": 82.34456
      },
      {
        "latitude": 17.66087,
        "longitude": 82.35201
      },
      {
        "latitude": 17.6504,
        "longitude": 82.34421
      },
      {
        "latitude": 17.63621,
        "longitude": 82.35828
      },
      {
        "latitude": 17.63611,
        "longitude": 82.39083
      },
      {
        "latitude": 17.65217,
        "longitude": 82.42951
      },
      {
        "latitude": 17.63524,
        "longitude": 82.43589
      },
      {
        "latitude": 17.63149,
        "longitude": 82.46293
      },
      {
        "latitude": 17.61669,
        "longitude": 82.46452
      },
      {
        "latitude": 17.60618,
        "longitude": 82.46188
      },
      {
        "latitude": 17.57443,
        "longitude": 82.36784
      },
      {
        "latitude": 17.55722,
        "longitude": 82.35172
      },
      {
        "latitude": 17.54419,
        "longitude": 82.35813
      },
      {
        "latitude": 17.5534,
        "longitude": 82.32907
      }
    ],
    "polygons": [
      [
        {
          "latitude": 17.5534,
          "longitude": 82.32907
        },
        {
          "latitude": 17.52323,
          "longitude": 82.33733
        },
        {
          "latitude": 17.50293,
          "longitude": 82.33131
        },
        {
          "latitude": 17.49392,
          "longitude": 82.34465
        },
        {
          "latitude": 17.50812,
          "longitude": 82.35935
        },
        {
          "latitude": 17.51016,
          "longitude": 82.3753
        },
        {
          "latitude": 17.48914,
          "longitude": 82.36741
        },
        {
          "latitude": 17.4791,
          "longitude": 82.37282
        },
        {
          "latitude": 17.46652,
          "longitude": 82.41007
        },
        {
          "latitude": 17.47107,
          "longitude": 82.43789
        },
        {
          "latitude": 17.48975,
          "longitude": 82.45414
        },
        {
          "latitude": 17.51099,
          "longitude": 82.44945
        },
        {
          "latitude": 17.51138,
          "longitude": 82.46525
        },
        {
          "latitude": 17.52952,
          "longitude": 82.46055
        },
        {
          "latitude": 17.53486,
          "longitude": 82.46673
        },
        {
          "latitude": 17.52649,
          "longitude": 82.47641
        },
        {
          "latitude": 17.50103,
          "longitude": 82.48039
        },
        {
          "latitude": 17.49919,
          "longitude": 82.48723
        },
        {
          "latitude": 17.509,
          "longitude": 82.50223
        },
        {
          "latitude": 17.50138,
          "longitude": 82.51733
        },
        {
          "latitude": 17.50731,
          "longitude": 82.53903
        },
        {
          "latitude": 17.52705,
          "longitude": 82.55247
        },
        {
          "latitude": 17.49063,
          "longitude": 82.56119
        },
        {
          "latitude": 17.49196,
          "longitude": 82.56812
        },
        {
          "latitude": 17.46917,
          "longitude": 82.58544
        },
        {
          "latitude": 17.46025,
          "longitude": 82.60477
        },
        {
          "latitude": 17.42457,
          "longitude": 82.58323
        },
        {
          "latitude": 17.40847,
          "longitude": 82.56057
        },
        {
          "latitude": 17.37408,
          "longitude": 82.54297
        },
        {
          "latitude": 17.35292,
          "longitude": 82.5553
        },
        {
          "latitude": 17.35067,
          "longitude": 82.56682
        },
        {
          "latitude": 17.33079,
          "longitude": 82.56016
        },
        {
          "latitude": 17.32416,
          "longitude": 82.55555
        },
        {
          "latitude": 17.32705,
          "longitude": 82.53575
        },
        {
          "latitude": 17.30787,
          "longitude": 82.53584
        },
        {
          "latitude": 17.29931,
          "longitude": 82.51816
        },
        {
          "latitude": 17.27659,
          "longitude": 82.5229
        },
        {
          "latitude": 17.26327,
          "longitude": 82.53906
        },
        {
          "latitude": 17.24851,
          "longitude": 82.54136
        },
        {
          "latitude": 17.3437,
          "longitude": 82.70302
        },
        {
          "latitude": 17.47251,
          "longitude": 82.99198
        },
        {
          "latitude": 17.50145,
          "longitude": 83.00671
        },
        {
          "latitude": 17.54669,
          "longitude": 83.11472
        },
        {
          "latitude": 17.61313,
          "longitude": 83.13089
        },
        {
          "latitude": 17.6487,
          "longitude": 83.15279
        },
        {
          "latitude": 17.6588,
          "longitude": 83.12541
        },
        {
          "latitude": 17.6822,
          "longitude": 83.12784
        },
        {
          "latitude": 17.69302,
          "longitude": 83.1121
        },
        {
          "latitude": 17.69689,
          "longitude": 83.12225
        },
        {
          "latitude": 17.71172,
          "longitude": 83.12125
        },
        {
          "latitude": 17.70883,
          "longitude": 83.13565
        },
        {
          "latitude": 17.71791,
          "longitude": 83.15135
        },
        {
          "latitude": 17.73516,
          "longitude": 83.15762
        },
        {
          "latitude": 17.75706,
          "longitude": 83.16449
        },
        {
          "latitude": 17.77252,
          "longitude": 83.15803
        },
        {
          "latitude": 17.78081,
          "longitude": 83.16459
        },
        {
          "latitude": 17.83851,
          "longitude": 83.16207
        },
        {
          "latitude": 17.84612,
          "longitude": 83.1502
        },
        {
          "latitude": 17.86882,
          "longitude": 83.14752
        },
        {
          "latitude": 17.87219,
          "longitude": 83.13069
        },
        {
          "latitude": 17.90434,
          "longitude": 83.1285
        },
        {
          "latitude": 17.92103,
          "longitude": 83.11056
        },
        {
          "latitude": 17.93765,
          "longitude": 83.10995
        },
        {
          "latitude": 17.94442,
          "longitude": 83.07209
        },
        {
          "latitude": 17.96951,
          "longitude": 83.03918
        },
        {
          "latitude": 17.97613,
          "longitude": 83.00931
        },
        {
          "latitude": 17.98573,
          "longitude": 83.00766
        },
        {
          "latitude": 17.9977,
          "longitude": 83.01327
        },
        {
          "latitude": 18.04156,
          "longitude": 83.00967
        },
        {
          "latitude": 18.06073,
          "longitude": 83.02608
        },
        {
          "latitude": 18.06394,
          "longitude": 83.0504
        },
        {
          "latitude": 18.08618,
          "longitude": 83.05097
        },
        {
          "latitude": 18.09772,
          "longitude": 83.07055
        },
        {
          "latitude": 18.11833,
          "longitude": 83.07516
        },
        {
          "latitude": 18.10378,
          "longitude": 83.06178
        },
        {
          "latitude": 18.11175,
          "longitude": 83.05986
        },
        {
          "latitude": 18.11683,
          "longitude": 83.03707
        },
        {
          "latitude": 18.13815,
          "longitude": 83.03071
        },
        {
          "latitude": 18.15133,
          "longitude": 83.01473
        },
        {
          "latitude": 18.1453,
          "longitude": 82.99653
        },
        {
          "latitude": 18.13823,
          "longitude": 82.98746
        },
        {
          "latitude": 18.11664,
          "longitude": 83.00478
        },
        {
          "latitude": 18.09328,
          "longitude": 83.01136
        },
        {
          "latitude": 18.08685,
          "longitude": 83.00279
        },
        {
          "latitude": 18.08947,
          "longitude": 83.02445
        },
        {
          "latitude": 18.02814,
          "longitude": 82.98043
        },
        {
          "latitude": 18.01374,
          "longitude": 82.98298
        },
        {
          "latitude": 18.00487,
          "longitude": 82.95763
        },
        {
          "latitude": 17.98658,
          "longitude": 82.94113
        },
        {
          "latitude": 17.984,
          "longitude": 82.91882
        },
        {
          "latitude": 17.98861,
          "longitude": 82.91075
        },
        {
          "latitude": 17.99301,
          "longitude": 82.91522
        },
        {
          "latitude": 18.0109,
          "longitude": 82.90472
        },
        {
          "latitude": 18.00994,
          "longitude": 82.86991
        },
        {
          "latitude": 17.98755,
          "longitude": 82.84071
        },
        {
          "latitude": 17.96005,
          "longitude": 82.85054
        },
        {
          "latitude": 17.95486,
          "longitude": 82.83703
        },
        {
          "latitude": 17.93287,
          "longitude": 82.82688
        },
        {
          "latitude": 17.93404,
          "longitude": 82.81038
        },
        {
          "latitude": 17.92363,
          "longitude": 82.8085
        },
        {
          "latitude": 17.92136,
          "longitude": 82.79824
        },
        {
          "latitude": 17.93338,
          "longitude": 82.78319
        },
        {
          "latitude": 17.9276,
          "longitude": 82.78243
        },
        {
          "latitude": 17.9577,
          "longitude": 82.75024
        },
        {
          "latitude": 17.94749,
          "longitude": 82.7494
        },
        {
          "latitude": 17.93704,
          "longitude": 82.76027
        },
        {
          "latitude": 17.9355,
          "longitude": 82.74712
        },
        {
          "latitude": 17.94767,
          "longitude": 82.74524
        },
        {
          "latitude": 17.94467,
          "longitude": 82.73195
        },
        {
          "latitude": 17.95337,
          "longitude": 82.7152
        },
        {
          "latitude": 17.94537,
          "longitude": 82.7088
        },
        {
          "latitude": 17.93896,
          "longitude": 82.72648
        },
        {
          "latitude": 17.93066,
          "longitude": 82.72611
        },
        {
          "latitude": 17.92002,
          "longitude": 82.70544
        },
        {
          "latitude": 17.91301,
          "longitude": 82.71131
        },
        {
          "latitude": 17.8984,
          "longitude": 82.70202
        },
        {
          "latitude": 17.90291,
          "longitude": 82.66571
        },
        {
          "latitude": 17.89474,
          "longitude": 82.6886
        },
        {
          "latitude": 17.86616,
          "longitude": 82.71591
        },
        {
          "latitude": 17.86388,
          "longitude": 82.69883
        },
        {
          "latitude": 17.84876,
          "longitude": 82.69331
        },
        {
          "latitude": 17.85576,
          "longitude": 82.68031
        },
        {
          "latitude": 17.83181,
          "longitude": 82.63438
        },
        {
          "latitude": 17.84102,
          "longitude": 82.62244
        },
        {
          "latitude": 17.79405,
          "longitude": 82.64248
        },
        {
          "latitude": 17.77415,
          "longitude": 82.63525
        },
        {
          "latitude": 17.77876,
          "longitude": 82.61526
        },
        {
          "latitude": 17.78758,
          "longitude": 82.61696
        },
        {
          "latitude": 17.77852,
          "longitude": 82.59493
        },
        {
          "latitude": 17.76741,
          "longitude": 82.60653
        },
        {
          "latitude": 17.76935,
          "longitude": 82.56395
        },
        {
          "latitude": 17.74621,
          "longitude": 82.56207
        },
        {
          "latitude": 17.74576,
          "longitude": 82.55407
        },
        {
          "latitude": 17.71603,
          "longitude": 82.54505
        },
        {
          "latitude": 17.70302,
          "longitude": 82.52879
        },
        {
          "latitude": 17.69251,
          "longitude": 82.49784
        },
        {
          "latitude": 17.70796,
          "longitude": 82.49655
        },
        {
          "latitude": 17.72247,
          "longitude": 82.51236
        },
        {
          "latitude": 17.71419,
          "longitude": 82.50159
        },
        {
          "latitude": 17.73531,
          "longitude": 82.46192
        },
        {
          "latitude": 17.72135,
          "longitude": 82.45125
        },
        {
          "latitude": 17.7235,
          "longitude": 82.43847
        },
        {
          "latitude": 17.7143,
          "longitude": 82.42492
        },
        {
          "latitude": 17.70465,
          "longitude": 82.42814
        },
        {
          "latitude": 17.69029,
          "longitude": 82.41546
        },
        {
          "latitude": 17.67754,
          "longitude": 82.38503
        },
        {
          "latitude": 17.68661,
          "longitude": 82.37467
        },
        {
          "latitude": 17.67565,
          "longitude": 82.3596
        },
        {
          "latitude": 17.67678,
          "longitude": 82.34753
        },
        {
          "latitude": 17.66807,
          "longitude": 82.34456
        },
        {
          "latitude": 17.66087,
          "longitude": 82.35201
        },
        {
          "latitude": 17.6504,
          "longitude": 82.34421
        },
        {
          "latitude": 17.63621,
          "longitude": 82.35828
        },
        {
          "latitude": 17.63611,
          "longitude": 82.39083
        },
        {
          "latitude": 17.65217,
          "longitude": 82.42951
        },
        {
          "latitude": 17.63524,
          "longitude": 82.43589
        },
        {
          "latitude": 17.63149,
          "longitude": 82.46293
        },
        {
          "latitude": 17.61669,
          "longitude": 82.46452
        },
        {
          "latitude": 17.60618,
          "longitude": 82.46188
        },
        {
          "latitude": 17.57443,
          "longitude": 82.36784
        },
        {
          "latitude": 17.55722,
          "longitude": 82.35172
        },
        {
          "latitude": 17.54419,
          "longitude": 82.35813
        },
        {
          "latitude": 17.5534,
          "longitude": 82.32907
        }
      ]
    ]
  },
  {
    "id": "ananthapuramu",
    "name": "Ananthapuramu",
    "headquarters": "Anantapur",
    "center": {
      "latitude": 14.7836,
      "longitude": 77.4071
    },
    "region": "Rayalaseema",
    "polygon": [
      {
        "latitude": 14.98946,
        "longitude": 76.76001
      },
      {
        "latitude": 14.97455,
        "longitude": 76.76663
      },
      {
        "latitude": 14.96914,
        "longitude": 76.81809
      },
      {
        "latitude": 14.95623,
        "longitude": 76.82856
      },
      {
        "latitude": 14.96602,
        "longitude": 76.84163
      },
      {
        "latitude": 14.96954,
        "longitude": 76.86724
      },
      {
        "latitude": 14.89552,
        "longitude": 76.86382
      },
      {
        "latitude": 14.89593,
        "longitude": 76.84743
      },
      {
        "latitude": 14.88936,
        "longitude": 76.84547
      },
      {
        "latitude": 14.88695,
        "longitude": 76.85252
      },
      {
        "latitude": 14.86737,
        "longitude": 76.85705
      },
      {
        "latitude": 14.84284,
        "longitude": 76.85388
      },
      {
        "latitude": 14.83655,
        "longitude": 76.84178
      },
      {
        "latitude": 14.80981,
        "longitude": 76.85416
      },
      {
        "latitude": 14.81109,
        "longitude": 76.83736
      },
      {
        "latitude": 14.79089,
        "longitude": 76.83654
      },
      {
        "latitude": 14.78602,
        "longitude": 76.7824
      },
      {
        "latitude": 14.74189,
        "longitude": 76.80294
      },
      {
        "latitude": 14.68113,
        "longitude": 76.7753
      },
      {
        "latitude": 14.60212,
        "longitude": 76.76499
      },
      {
        "latitude": 14.5965,
        "longitude": 76.78185
      },
      {
        "latitude": 14.55466,
        "longitude": 76.79136
      },
      {
        "latitude": 14.53107,
        "longitude": 76.80628
      },
      {
        "latitude": 14.53036,
        "longitude": 76.83101
      },
      {
        "latitude": 14.50959,
        "longitude": 76.85561
      },
      {
        "latitude": 14.47171,
        "longitude": 76.8684
      },
      {
        "latitude": 14.4871,
        "longitude": 76.90077
      },
      {
        "latitude": 14.48307,
        "longitude": 76.97513
      },
      {
        "latitude": 14.45481,
        "longitude": 76.96569
      },
      {
        "latitude": 14.44768,
        "longitude": 76.94524
      },
      {
        "latitude": 14.40106,
        "longitude": 76.94541
      },
      {
        "latitude": 14.41851,
        "longitude": 76.91619
      },
      {
        "latitude": 14.3978,
        "longitude": 76.90154
      },
      {
        "latitude": 14.39167,
        "longitude": 76.88568
      },
      {
        "latitude": 14.34501,
        "longitude": 76.88559
      },
      {
        "latitude": 14.32037,
        "longitude": 76.90363
      },
      {
        "latitude": 14.31084,
        "longitude": 76.94501
      },
      {
        "latitude": 14.29307,
        "longitude": 76.95646
      },
      {
        "latitude": 14.27089,
        "longitude": 76.92569
      },
      {
        "latitude": 14.24185,
        "longitude": 76.94057
      },
      {
        "latitude": 14.23926,
        "longitude": 76.94891
      },
      {
        "latitude": 14.24484,
        "longitude": 76.98586
      },
      {
        "latitude": 14.23579,
        "longitude": 77.00567
      },
      {
        "latitude": 14.2455,
        "longitude": 77.05247
      },
      {
        "latitude": 14.21415,
        "longitude": 77.08118
      },
      {
        "latitude": 14.22314,
        "longitude": 77.11486
      },
      {
        "latitude": 14.29317,
        "longitude": 77.1171
      },
      {
        "latitude": 14.30646,
        "longitude": 77.13137
      },
      {
        "latitude": 14.33678,
        "longitude": 77.13671
      },
      {
        "latitude": 14.34269,
        "longitude": 77.15525
      },
      {
        "latitude": 14.32099,
        "longitude": 77.19928
      },
      {
        "latitude": 14.31734,
        "longitude": 77.24089
      },
      {
        "latitude": 14.3401,
        "longitude": 77.2866
      },
      {
        "latitude": 14.28274,
        "longitude": 77.28357
      },
      {
        "latitude": 14.27664,
        "longitude": 77.35761
      },
      {
        "latitude": 14.30853,
        "longitude": 77.34962
      },
      {
        "latitude": 14.30253,
        "longitude": 77.34233
      },
      {
        "latitude": 14.31183,
        "longitude": 77.32026
      },
      {
        "latitude": 14.33492,
        "longitude": 77.31664
      },
      {
        "latitude": 14.33776,
        "longitude": 77.32834
      },
      {
        "latitude": 14.35303,
        "longitude": 77.33276
      },
      {
        "latitude": 14.38138,
        "longitude": 77.31661
      },
      {
        "latitude": 14.41098,
        "longitude": 77.31926
      },
      {
        "latitude": 14.45266,
        "longitude": 77.33291
      },
      {
        "latitude": 14.46222,
        "longitude": 77.36319
      },
      {
        "latitude": 14.48391,
        "longitude": 77.35908
      },
      {
        "latitude": 14.49831,
        "longitude": 77.37741
      },
      {
        "latitude": 14.53933,
        "longitude": 77.35631
      },
      {
        "latitude": 14.55413,
        "longitude": 77.39
      },
      {
        "latitude": 14.55313,
        "longitude": 77.42651
      },
      {
        "latitude": 14.5728,
        "longitude": 77.46356
      },
      {
        "latitude": 14.57034,
        "longitude": 77.47151
      },
      {
        "latitude": 14.53356,
        "longitude": 77.4786
      },
      {
        "latitude": 14.51494,
        "longitude": 77.47232
      },
      {
        "latitude": 14.48993,
        "longitude": 77.4848
      },
      {
        "latitude": 14.47963,
        "longitude": 77.47901
      },
      {
        "latitude": 14.47155,
        "longitude": 77.49138
      },
      {
        "latitude": 14.48955,
        "longitude": 77.51806
      },
      {
        "latitude": 14.48607,
        "longitude": 77.53051
      },
      {
        "latitude": 14.4615,
        "longitude": 77.54484
      },
      {
        "latitude": 14.46264,
        "longitude": 77.57112
      },
      {
        "latitude": 14.45288,
        "longitude": 77.57149
      },
      {
        "latitude": 14.46068,
        "longitude": 77.6102
      },
      {
        "latitude": 14.47845,
        "longitude": 77.61633
      },
      {
        "latitude": 14.48958,
        "longitude": 77.63425
      },
      {
        "latitude": 14.4829,
        "longitude": 77.65559
      },
      {
        "latitude": 14.48743,
        "longitude": 77.66756
      },
      {
        "latitude": 14.50566,
        "longitude": 77.67735
      },
      {
        "latitude": 14.51834,
        "longitude": 77.64978
      },
      {
        "latitude": 14.53628,
        "longitude": 77.6545
      },
      {
        "latitude": 14.53748,
        "longitude": 77.69371
      },
      {
        "latitude": 14.54619,
        "longitude": 77.70431
      },
      {
        "latitude": 14.57612,
        "longitude": 77.71481
      },
      {
        "latitude": 14.5767,
        "longitude": 77.73637
      },
      {
        "latitude": 14.59305,
        "longitude": 77.73735
      },
      {
        "latitude": 14.59569,
        "longitude": 77.77357
      },
      {
        "latitude": 14.61605,
        "longitude": 77.80446
      },
      {
        "latitude": 14.6014,
        "longitude": 77.81765
      },
      {
        "latitude": 14.60054,
        "longitude": 77.85213
      },
      {
        "latitude": 14.60913,
        "longitude": 77.85515
      },
      {
        "latitude": 14.61289,
        "longitude": 77.84027
      },
      {
        "latitude": 14.61409,
        "longitude": 77.8558
      },
      {
        "latitude": 14.638,
        "longitude": 77.85025
      },
      {
        "latitude": 14.65438,
        "longitude": 77.87019
      },
      {
        "latitude": 14.64386,
        "longitude": 77.87854
      },
      {
        "latitude": 14.64846,
        "longitude": 77.89392
      },
      {
        "latitude": 14.63533,
        "longitude": 77.95792
      },
      {
        "latitude": 14.62173,
        "longitude": 77.98045
      },
      {
        "latitude": 14.61167,
        "longitude": 77.99103
      },
      {
        "latitude": 14.59547,
        "longitude": 77.98218
      },
      {
        "latitude": 14.56776,
        "longitude": 77.98927
      },
      {
        "latitude": 14.56719,
        "longitude": 77.98232
      },
      {
        "latitude": 14.54534,
        "longitude": 77.98319
      },
      {
        "latitude": 14.53105,
        "longitude": 78.03337
      },
      {
        "latitude": 14.54148,
        "longitude": 78.04366
      },
      {
        "latitude": 14.56717,
        "longitude": 78.03955
      },
      {
        "latitude": 14.573,
        "longitude": 78.0648
      },
      {
        "latitude": 14.63128,
        "longitude": 78.08841
      },
      {
        "latitude": 14.62439,
        "longitude": 78.12224
      },
      {
        "latitude": 14.6349,
        "longitude": 78.11967
      },
      {
        "latitude": 14.64982,
        "longitude": 78.12987
      },
      {
        "latitude": 14.69621,
        "longitude": 78.13503
      },
      {
        "latitude": 14.69311,
        "longitude": 78.10987
      },
      {
        "latitude": 14.70223,
        "longitude": 78.10986
      },
      {
        "latitude": 14.70175,
        "longitude": 78.09679
      },
      {
        "latitude": 14.71412,
        "longitude": 78.09435
      },
      {
        "latitude": 14.71619,
        "longitude": 78.06696
      },
      {
        "latitude": 14.75313,
        "longitude": 78.0765
      },
      {
        "latitude": 14.77284,
        "longitude": 78.04641
      },
      {
        "latitude": 14.82788,
        "longitude": 78.07679
      },
      {
        "latitude": 14.81769,
        "longitude": 78.10141
      },
      {
        "latitude": 14.85144,
        "longitude": 78.11385
      },
      {
        "latitude": 14.85831,
        "longitude": 78.08952
      },
      {
        "latitude": 14.88518,
        "longitude": 78.09467
      },
      {
        "latitude": 14.93196,
        "longitude": 78.11311
      },
      {
        "latitude": 14.94169,
        "longitude": 78.13599
      },
      {
        "latitude": 14.96144,
        "longitude": 78.13406
      },
      {
        "latitude": 14.97305,
        "longitude": 78.08735
      },
      {
        "latitude": 14.98295,
        "longitude": 78.08862
      },
      {
        "latitude": 15.00437,
        "longitude": 78.06034
      },
      {
        "latitude": 14.99295,
        "longitude": 78.05461
      },
      {
        "latitude": 15.00061,
        "longitude": 78.03402
      },
      {
        "latitude": 15.02862,
        "longitude": 78.01091
      },
      {
        "latitude": 15.05238,
        "longitude": 78.011
      },
      {
        "latitude": 15.06532,
        "longitude": 77.9954
      },
      {
        "latitude": 15.11536,
        "longitude": 78.01349
      },
      {
        "latitude": 15.13426,
        "longitude": 77.99379
      },
      {
        "latitude": 15.14009,
        "longitude": 77.97463
      },
      {
        "latitude": 15.10976,
        "longitude": 77.96134
      },
      {
        "latitude": 15.1236,
        "longitude": 77.90642
      },
      {
        "latitude": 15.13174,
        "longitude": 77.90727
      },
      {
        "latitude": 15.12996,
        "longitude": 77.91496
      },
      {
        "latitude": 15.14045,
        "longitude": 77.90946
      },
      {
        "latitude": 15.15341,
        "longitude": 77.92474
      },
      {
        "latitude": 15.17487,
        "longitude": 77.91944
      },
      {
        "latitude": 15.17879,
        "longitude": 77.90481
      },
      {
        "latitude": 15.17941,
        "longitude": 77.88455
      },
      {
        "latitude": 15.13636,
        "longitude": 77.87546
      },
      {
        "latitude": 15.13061,
        "longitude": 77.84267
      },
      {
        "latitude": 15.14599,
        "longitude": 77.839
      },
      {
        "latitude": 15.14396,
        "longitude": 77.81566
      },
      {
        "latitude": 15.10731,
        "longitude": 77.79149
      },
      {
        "latitude": 15.11459,
        "longitude": 77.77129
      },
      {
        "latitude": 15.12547,
        "longitude": 77.77395
      },
      {
        "latitude": 15.12947,
        "longitude": 77.74878
      },
      {
        "latitude": 15.1413,
        "longitude": 77.7467
      },
      {
        "latitude": 15.15286,
        "longitude": 77.72961
      },
      {
        "latitude": 15.1694,
        "longitude": 77.73296
      },
      {
        "latitude": 15.17304,
        "longitude": 77.71654
      },
      {
        "latitude": 15.18759,
        "longitude": 77.7116
      },
      {
        "latitude": 15.18078,
        "longitude": 77.70126
      },
      {
        "latitude": 15.18477,
        "longitude": 77.69291
      },
      {
        "latitude": 15.20682,
        "longitude": 77.69768
      },
      {
        "latitude": 15.21778,
        "longitude": 77.67877
      },
      {
        "latitude": 15.23363,
        "longitude": 77.66987
      },
      {
        "latitude": 15.23382,
        "longitude": 77.65183
      },
      {
        "latitude": 15.22247,
        "longitude": 77.63723
      },
      {
        "latitude": 15.20814,
        "longitude": 77.63518
      },
      {
        "latitude": 15.20773,
        "longitude": 77.61572
      },
      {
        "latitude": 15.18473,
        "longitude": 77.61153
      },
      {
        "latitude": 15.18913,
        "longitude": 77.58262
      },
      {
        "latitude": 15.20054,
        "longitude": 77.57586
      },
      {
        "latitude": 15.21008,
        "longitude": 77.54233
      },
      {
        "latitude": 15.22531,
        "longitude": 77.52747
      },
      {
        "latitude": 15.22297,
        "longitude": 77.50203
      },
      {
        "latitude": 15.20988,
        "longitude": 77.48129
      },
      {
        "latitude": 15.2237,
        "longitude": 77.45152
      },
      {
        "latitude": 15.20685,
        "longitude": 77.45083
      },
      {
        "latitude": 15.21139,
        "longitude": 77.43473
      },
      {
        "latitude": 15.22213,
        "longitude": 77.43324
      },
      {
        "latitude": 15.22506,
        "longitude": 77.42494
      },
      {
        "latitude": 15.22693,
        "longitude": 77.40894
      },
      {
        "latitude": 15.21854,
        "longitude": 77.39459
      },
      {
        "latitude": 15.22424,
        "longitude": 77.3631
      },
      {
        "latitude": 15.17844,
        "longitude": 77.35141
      },
      {
        "latitude": 15.17808,
        "longitude": 77.31625
      },
      {
        "latitude": 15.15558,
        "longitude": 77.31003
      },
      {
        "latitude": 15.15517,
        "longitude": 77.29955
      },
      {
        "latitude": 15.13199,
        "longitude": 77.2917
      },
      {
        "latitude": 15.13171,
        "longitude": 77.27145
      },
      {
        "latitude": 15.14338,
        "longitude": 77.26403
      },
      {
        "latitude": 15.14501,
        "longitude": 77.2301
      },
      {
        "latitude": 15.16067,
        "longitude": 77.20239
      },
      {
        "latitude": 15.15831,
        "longitude": 77.18813
      },
      {
        "latitude": 15.14311,
        "longitude": 77.17655
      },
      {
        "latitude": 15.14511,
        "longitude": 77.1379
      },
      {
        "latitude": 15.14047,
        "longitude": 77.15728
      },
      {
        "latitude": 15.12293,
        "longitude": 77.15633
      },
      {
        "latitude": 15.10077,
        "longitude": 77.13012
      },
      {
        "latitude": 15.07232,
        "longitude": 77.12822
      },
      {
        "latitude": 15.03406,
        "longitude": 77.11293
      },
      {
        "latitude": 15.03071,
        "longitude": 77.08475
      },
      {
        "latitude": 15.00608,
        "longitude": 77.08245
      },
      {
        "latitude": 15.00984,
        "longitude": 77.04412
      },
      {
        "latitude": 15.03308,
        "longitude": 77.04957
      },
      {
        "latitude": 15.03383,
        "longitude": 77.00408
      },
      {
        "latitude": 15.02649,
        "longitude": 76.98604
      },
      {
        "latitude": 15.01555,
        "longitude": 76.98534
      },
      {
        "latitude": 15.03588,
        "longitude": 76.91848
      },
      {
        "latitude": 15.03056,
        "longitude": 76.87728
      },
      {
        "latitude": 15.06004,
        "longitude": 76.86601
      },
      {
        "latitude": 15.09619,
        "longitude": 76.80036
      },
      {
        "latitude": 15.07987,
        "longitude": 76.77787
      },
      {
        "latitude": 15.06565,
        "longitude": 76.77384
      },
      {
        "latitude": 15.02071,
        "longitude": 76.79013
      },
      {
        "latitude": 15.00922,
        "longitude": 76.78781
      },
      {
        "latitude": 14.99053,
        "longitude": 76.77201
      },
      {
        "latitude": 14.98946,
        "longitude": 76.76001
      }
    ],
    "polygons": [
      [
        {
          "latitude": 14.98946,
          "longitude": 76.76001
        },
        {
          "latitude": 14.97455,
          "longitude": 76.76663
        },
        {
          "latitude": 14.96914,
          "longitude": 76.81809
        },
        {
          "latitude": 14.95623,
          "longitude": 76.82856
        },
        {
          "latitude": 14.96602,
          "longitude": 76.84163
        },
        {
          "latitude": 14.96954,
          "longitude": 76.86724
        },
        {
          "latitude": 14.89552,
          "longitude": 76.86382
        },
        {
          "latitude": 14.89593,
          "longitude": 76.84743
        },
        {
          "latitude": 14.88936,
          "longitude": 76.84547
        },
        {
          "latitude": 14.88695,
          "longitude": 76.85252
        },
        {
          "latitude": 14.86737,
          "longitude": 76.85705
        },
        {
          "latitude": 14.84284,
          "longitude": 76.85388
        },
        {
          "latitude": 14.83655,
          "longitude": 76.84178
        },
        {
          "latitude": 14.80981,
          "longitude": 76.85416
        },
        {
          "latitude": 14.81109,
          "longitude": 76.83736
        },
        {
          "latitude": 14.79089,
          "longitude": 76.83654
        },
        {
          "latitude": 14.78602,
          "longitude": 76.7824
        },
        {
          "latitude": 14.74189,
          "longitude": 76.80294
        },
        {
          "latitude": 14.68113,
          "longitude": 76.7753
        },
        {
          "latitude": 14.60212,
          "longitude": 76.76499
        },
        {
          "latitude": 14.5965,
          "longitude": 76.78185
        },
        {
          "latitude": 14.55466,
          "longitude": 76.79136
        },
        {
          "latitude": 14.53107,
          "longitude": 76.80628
        },
        {
          "latitude": 14.53036,
          "longitude": 76.83101
        },
        {
          "latitude": 14.50959,
          "longitude": 76.85561
        },
        {
          "latitude": 14.47171,
          "longitude": 76.8684
        },
        {
          "latitude": 14.4871,
          "longitude": 76.90077
        },
        {
          "latitude": 14.48307,
          "longitude": 76.97513
        },
        {
          "latitude": 14.45481,
          "longitude": 76.96569
        },
        {
          "latitude": 14.44768,
          "longitude": 76.94524
        },
        {
          "latitude": 14.40106,
          "longitude": 76.94541
        },
        {
          "latitude": 14.41851,
          "longitude": 76.91619
        },
        {
          "latitude": 14.3978,
          "longitude": 76.90154
        },
        {
          "latitude": 14.39167,
          "longitude": 76.88568
        },
        {
          "latitude": 14.34501,
          "longitude": 76.88559
        },
        {
          "latitude": 14.32037,
          "longitude": 76.90363
        },
        {
          "latitude": 14.31084,
          "longitude": 76.94501
        },
        {
          "latitude": 14.29307,
          "longitude": 76.95646
        },
        {
          "latitude": 14.27089,
          "longitude": 76.92569
        },
        {
          "latitude": 14.24185,
          "longitude": 76.94057
        },
        {
          "latitude": 14.23926,
          "longitude": 76.94891
        },
        {
          "latitude": 14.24484,
          "longitude": 76.98586
        },
        {
          "latitude": 14.23579,
          "longitude": 77.00567
        },
        {
          "latitude": 14.2455,
          "longitude": 77.05247
        },
        {
          "latitude": 14.21415,
          "longitude": 77.08118
        },
        {
          "latitude": 14.22314,
          "longitude": 77.11486
        },
        {
          "latitude": 14.29317,
          "longitude": 77.1171
        },
        {
          "latitude": 14.30646,
          "longitude": 77.13137
        },
        {
          "latitude": 14.33678,
          "longitude": 77.13671
        },
        {
          "latitude": 14.34269,
          "longitude": 77.15525
        },
        {
          "latitude": 14.32099,
          "longitude": 77.19928
        },
        {
          "latitude": 14.31734,
          "longitude": 77.24089
        },
        {
          "latitude": 14.3401,
          "longitude": 77.2866
        },
        {
          "latitude": 14.28274,
          "longitude": 77.28357
        },
        {
          "latitude": 14.27664,
          "longitude": 77.35761
        },
        {
          "latitude": 14.30853,
          "longitude": 77.34962
        },
        {
          "latitude": 14.30253,
          "longitude": 77.34233
        },
        {
          "latitude": 14.31183,
          "longitude": 77.32026
        },
        {
          "latitude": 14.33492,
          "longitude": 77.31664
        },
        {
          "latitude": 14.33776,
          "longitude": 77.32834
        },
        {
          "latitude": 14.35303,
          "longitude": 77.33276
        },
        {
          "latitude": 14.38138,
          "longitude": 77.31661
        },
        {
          "latitude": 14.41098,
          "longitude": 77.31926
        },
        {
          "latitude": 14.45266,
          "longitude": 77.33291
        },
        {
          "latitude": 14.46222,
          "longitude": 77.36319
        },
        {
          "latitude": 14.48391,
          "longitude": 77.35908
        },
        {
          "latitude": 14.49831,
          "longitude": 77.37741
        },
        {
          "latitude": 14.53933,
          "longitude": 77.35631
        },
        {
          "latitude": 14.55413,
          "longitude": 77.39
        },
        {
          "latitude": 14.55313,
          "longitude": 77.42651
        },
        {
          "latitude": 14.5728,
          "longitude": 77.46356
        },
        {
          "latitude": 14.57034,
          "longitude": 77.47151
        },
        {
          "latitude": 14.53356,
          "longitude": 77.4786
        },
        {
          "latitude": 14.51494,
          "longitude": 77.47232
        },
        {
          "latitude": 14.48993,
          "longitude": 77.4848
        },
        {
          "latitude": 14.47963,
          "longitude": 77.47901
        },
        {
          "latitude": 14.47155,
          "longitude": 77.49138
        },
        {
          "latitude": 14.48955,
          "longitude": 77.51806
        },
        {
          "latitude": 14.48607,
          "longitude": 77.53051
        },
        {
          "latitude": 14.4615,
          "longitude": 77.54484
        },
        {
          "latitude": 14.46264,
          "longitude": 77.57112
        },
        {
          "latitude": 14.45288,
          "longitude": 77.57149
        },
        {
          "latitude": 14.46068,
          "longitude": 77.6102
        },
        {
          "latitude": 14.47845,
          "longitude": 77.61633
        },
        {
          "latitude": 14.48958,
          "longitude": 77.63425
        },
        {
          "latitude": 14.4829,
          "longitude": 77.65559
        },
        {
          "latitude": 14.48743,
          "longitude": 77.66756
        },
        {
          "latitude": 14.50566,
          "longitude": 77.67735
        },
        {
          "latitude": 14.51834,
          "longitude": 77.64978
        },
        {
          "latitude": 14.53628,
          "longitude": 77.6545
        },
        {
          "latitude": 14.53748,
          "longitude": 77.69371
        },
        {
          "latitude": 14.54619,
          "longitude": 77.70431
        },
        {
          "latitude": 14.57612,
          "longitude": 77.71481
        },
        {
          "latitude": 14.5767,
          "longitude": 77.73637
        },
        {
          "latitude": 14.59305,
          "longitude": 77.73735
        },
        {
          "latitude": 14.59569,
          "longitude": 77.77357
        },
        {
          "latitude": 14.61605,
          "longitude": 77.80446
        },
        {
          "latitude": 14.6014,
          "longitude": 77.81765
        },
        {
          "latitude": 14.60054,
          "longitude": 77.85213
        },
        {
          "latitude": 14.60913,
          "longitude": 77.85515
        },
        {
          "latitude": 14.61289,
          "longitude": 77.84027
        },
        {
          "latitude": 14.61409,
          "longitude": 77.8558
        },
        {
          "latitude": 14.638,
          "longitude": 77.85025
        },
        {
          "latitude": 14.65438,
          "longitude": 77.87019
        },
        {
          "latitude": 14.64386,
          "longitude": 77.87854
        },
        {
          "latitude": 14.64846,
          "longitude": 77.89392
        },
        {
          "latitude": 14.63533,
          "longitude": 77.95792
        },
        {
          "latitude": 14.62173,
          "longitude": 77.98045
        },
        {
          "latitude": 14.61167,
          "longitude": 77.99103
        },
        {
          "latitude": 14.59547,
          "longitude": 77.98218
        },
        {
          "latitude": 14.56776,
          "longitude": 77.98927
        },
        {
          "latitude": 14.56719,
          "longitude": 77.98232
        },
        {
          "latitude": 14.54534,
          "longitude": 77.98319
        },
        {
          "latitude": 14.53105,
          "longitude": 78.03337
        },
        {
          "latitude": 14.54148,
          "longitude": 78.04366
        },
        {
          "latitude": 14.56717,
          "longitude": 78.03955
        },
        {
          "latitude": 14.573,
          "longitude": 78.0648
        },
        {
          "latitude": 14.63128,
          "longitude": 78.08841
        },
        {
          "latitude": 14.62439,
          "longitude": 78.12224
        },
        {
          "latitude": 14.6349,
          "longitude": 78.11967
        },
        {
          "latitude": 14.64982,
          "longitude": 78.12987
        },
        {
          "latitude": 14.69621,
          "longitude": 78.13503
        },
        {
          "latitude": 14.69311,
          "longitude": 78.10987
        },
        {
          "latitude": 14.70223,
          "longitude": 78.10986
        },
        {
          "latitude": 14.70175,
          "longitude": 78.09679
        },
        {
          "latitude": 14.71412,
          "longitude": 78.09435
        },
        {
          "latitude": 14.71619,
          "longitude": 78.06696
        },
        {
          "latitude": 14.75313,
          "longitude": 78.0765
        },
        {
          "latitude": 14.77284,
          "longitude": 78.04641
        },
        {
          "latitude": 14.82788,
          "longitude": 78.07679
        },
        {
          "latitude": 14.81769,
          "longitude": 78.10141
        },
        {
          "latitude": 14.85144,
          "longitude": 78.11385
        },
        {
          "latitude": 14.85831,
          "longitude": 78.08952
        },
        {
          "latitude": 14.88518,
          "longitude": 78.09467
        },
        {
          "latitude": 14.93196,
          "longitude": 78.11311
        },
        {
          "latitude": 14.94169,
          "longitude": 78.13599
        },
        {
          "latitude": 14.96144,
          "longitude": 78.13406
        },
        {
          "latitude": 14.97305,
          "longitude": 78.08735
        },
        {
          "latitude": 14.98295,
          "longitude": 78.08862
        },
        {
          "latitude": 15.00437,
          "longitude": 78.06034
        },
        {
          "latitude": 14.99295,
          "longitude": 78.05461
        },
        {
          "latitude": 15.00061,
          "longitude": 78.03402
        },
        {
          "latitude": 15.02862,
          "longitude": 78.01091
        },
        {
          "latitude": 15.05238,
          "longitude": 78.011
        },
        {
          "latitude": 15.06532,
          "longitude": 77.9954
        },
        {
          "latitude": 15.11536,
          "longitude": 78.01349
        },
        {
          "latitude": 15.13426,
          "longitude": 77.99379
        },
        {
          "latitude": 15.14009,
          "longitude": 77.97463
        },
        {
          "latitude": 15.10976,
          "longitude": 77.96134
        },
        {
          "latitude": 15.1236,
          "longitude": 77.90642
        },
        {
          "latitude": 15.13174,
          "longitude": 77.90727
        },
        {
          "latitude": 15.12996,
          "longitude": 77.91496
        },
        {
          "latitude": 15.14045,
          "longitude": 77.90946
        },
        {
          "latitude": 15.15341,
          "longitude": 77.92474
        },
        {
          "latitude": 15.17487,
          "longitude": 77.91944
        },
        {
          "latitude": 15.17879,
          "longitude": 77.90481
        },
        {
          "latitude": 15.17941,
          "longitude": 77.88455
        },
        {
          "latitude": 15.13636,
          "longitude": 77.87546
        },
        {
          "latitude": 15.13061,
          "longitude": 77.84267
        },
        {
          "latitude": 15.14599,
          "longitude": 77.839
        },
        {
          "latitude": 15.14396,
          "longitude": 77.81566
        },
        {
          "latitude": 15.10731,
          "longitude": 77.79149
        },
        {
          "latitude": 15.11459,
          "longitude": 77.77129
        },
        {
          "latitude": 15.12547,
          "longitude": 77.77395
        },
        {
          "latitude": 15.12947,
          "longitude": 77.74878
        },
        {
          "latitude": 15.1413,
          "longitude": 77.7467
        },
        {
          "latitude": 15.15286,
          "longitude": 77.72961
        },
        {
          "latitude": 15.1694,
          "longitude": 77.73296
        },
        {
          "latitude": 15.17304,
          "longitude": 77.71654
        },
        {
          "latitude": 15.18759,
          "longitude": 77.7116
        },
        {
          "latitude": 15.18078,
          "longitude": 77.70126
        },
        {
          "latitude": 15.18477,
          "longitude": 77.69291
        },
        {
          "latitude": 15.20682,
          "longitude": 77.69768
        },
        {
          "latitude": 15.21778,
          "longitude": 77.67877
        },
        {
          "latitude": 15.23363,
          "longitude": 77.66987
        },
        {
          "latitude": 15.23382,
          "longitude": 77.65183
        },
        {
          "latitude": 15.22247,
          "longitude": 77.63723
        },
        {
          "latitude": 15.20814,
          "longitude": 77.63518
        },
        {
          "latitude": 15.20773,
          "longitude": 77.61572
        },
        {
          "latitude": 15.18473,
          "longitude": 77.61153
        },
        {
          "latitude": 15.18913,
          "longitude": 77.58262
        },
        {
          "latitude": 15.20054,
          "longitude": 77.57586
        },
        {
          "latitude": 15.21008,
          "longitude": 77.54233
        },
        {
          "latitude": 15.22531,
          "longitude": 77.52747
        },
        {
          "latitude": 15.22297,
          "longitude": 77.50203
        },
        {
          "latitude": 15.20988,
          "longitude": 77.48129
        },
        {
          "latitude": 15.2237,
          "longitude": 77.45152
        },
        {
          "latitude": 15.20685,
          "longitude": 77.45083
        },
        {
          "latitude": 15.21139,
          "longitude": 77.43473
        },
        {
          "latitude": 15.22213,
          "longitude": 77.43324
        },
        {
          "latitude": 15.22506,
          "longitude": 77.42494
        },
        {
          "latitude": 15.22693,
          "longitude": 77.40894
        },
        {
          "latitude": 15.21854,
          "longitude": 77.39459
        },
        {
          "latitude": 15.22424,
          "longitude": 77.3631
        },
        {
          "latitude": 15.17844,
          "longitude": 77.35141
        },
        {
          "latitude": 15.17808,
          "longitude": 77.31625
        },
        {
          "latitude": 15.15558,
          "longitude": 77.31003
        },
        {
          "latitude": 15.15517,
          "longitude": 77.29955
        },
        {
          "latitude": 15.13199,
          "longitude": 77.2917
        },
        {
          "latitude": 15.13171,
          "longitude": 77.27145
        },
        {
          "latitude": 15.14338,
          "longitude": 77.26403
        },
        {
          "latitude": 15.14501,
          "longitude": 77.2301
        },
        {
          "latitude": 15.16067,
          "longitude": 77.20239
        },
        {
          "latitude": 15.15831,
          "longitude": 77.18813
        },
        {
          "latitude": 15.14311,
          "longitude": 77.17655
        },
        {
          "latitude": 15.14511,
          "longitude": 77.1379
        },
        {
          "latitude": 15.14047,
          "longitude": 77.15728
        },
        {
          "latitude": 15.12293,
          "longitude": 77.15633
        },
        {
          "latitude": 15.10077,
          "longitude": 77.13012
        },
        {
          "latitude": 15.07232,
          "longitude": 77.12822
        },
        {
          "latitude": 15.03406,
          "longitude": 77.11293
        },
        {
          "latitude": 15.03071,
          "longitude": 77.08475
        },
        {
          "latitude": 15.00608,
          "longitude": 77.08245
        },
        {
          "latitude": 15.00984,
          "longitude": 77.04412
        },
        {
          "latitude": 15.03308,
          "longitude": 77.04957
        },
        {
          "latitude": 15.03383,
          "longitude": 77.00408
        },
        {
          "latitude": 15.02649,
          "longitude": 76.98604
        },
        {
          "latitude": 15.01555,
          "longitude": 76.98534
        },
        {
          "latitude": 15.03588,
          "longitude": 76.91848
        },
        {
          "latitude": 15.03056,
          "longitude": 76.87728
        },
        {
          "latitude": 15.06004,
          "longitude": 76.86601
        },
        {
          "latitude": 15.09619,
          "longitude": 76.80036
        },
        {
          "latitude": 15.07987,
          "longitude": 76.77787
        },
        {
          "latitude": 15.06565,
          "longitude": 76.77384
        },
        {
          "latitude": 15.02071,
          "longitude": 76.79013
        },
        {
          "latitude": 15.00922,
          "longitude": 76.78781
        },
        {
          "latitude": 14.99053,
          "longitude": 76.77201
        },
        {
          "latitude": 14.98946,
          "longitude": 76.76001
        }
      ]
    ]
  },
  {
    "id": "annamayya",
    "name": "Annamayya",
    "headquarters": "Rayachoti",
    "center": {
      "latitude": 13.9216,
      "longitude": 78.8299
    },
    "region": "Rayalaseema",
    "polygon": [
      {
        "latitude": 13.67693,
        "longitude": 78.06606
      },
      {
        "latitude": 13.65977,
        "longitude": 78.08955
      },
      {
        "latitude": 13.64306,
        "longitude": 78.08732
      },
      {
        "latitude": 13.64306,
        "longitude": 78.09919
      },
      {
        "latitude": 13.65747,
        "longitude": 78.11411
      },
      {
        "latitude": 13.65847,
        "longitude": 78.15608
      },
      {
        "latitude": 13.65378,
        "longitude": 78.16927
      },
      {
        "latitude": 13.63264,
        "longitude": 78.16838
      },
      {
        "latitude": 13.62835,
        "longitude": 78.20395
      },
      {
        "latitude": 13.60509,
        "longitude": 78.20288
      },
      {
        "latitude": 13.58945,
        "longitude": 78.19003
      },
      {
        "latitude": 13.5644,
        "longitude": 78.19325
      },
      {
        "latitude": 13.59268,
        "longitude": 78.21962
      },
      {
        "latitude": 13.58597,
        "longitude": 78.23267
      },
      {
        "latitude": 13.59858,
        "longitude": 78.23619
      },
      {
        "latitude": 13.58293,
        "longitude": 78.25855
      },
      {
        "latitude": 13.59488,
        "longitude": 78.32506
      },
      {
        "latitude": 13.58684,
        "longitude": 78.3486
      },
      {
        "latitude": 13.58798,
        "longitude": 78.40204
      },
      {
        "latitude": 13.57701,
        "longitude": 78.40671
      },
      {
        "latitude": 13.51553,
        "longitude": 78.38557
      },
      {
        "latitude": 13.50898,
        "longitude": 78.37534
      },
      {
        "latitude": 13.48204,
        "longitude": 78.37879
      },
      {
        "latitude": 13.46952,
        "longitude": 78.37083
      },
      {
        "latitude": 13.3975,
        "longitude": 78.38177
      },
      {
        "latitude": 13.3618,
        "longitude": 78.36508
      },
      {
        "latitude": 13.36314,
        "longitude": 78.37764
      },
      {
        "latitude": 13.34568,
        "longitude": 78.4084
      },
      {
        "latitude": 13.33606,
        "longitude": 78.4035
      },
      {
        "latitude": 13.33488,
        "longitude": 78.38487
      },
      {
        "latitude": 13.34358,
        "longitude": 78.38303
      },
      {
        "latitude": 13.33718,
        "longitude": 78.37825
      },
      {
        "latitude": 13.31547,
        "longitude": 78.40111
      },
      {
        "latitude": 13.3305,
        "longitude": 78.4334
      },
      {
        "latitude": 13.32843,
        "longitude": 78.44039
      },
      {
        "latitude": 13.30811,
        "longitude": 78.44421
      },
      {
        "latitude": 13.32602,
        "longitude": 78.48928
      },
      {
        "latitude": 13.33837,
        "longitude": 78.49669
      },
      {
        "latitude": 13.3411,
        "longitude": 78.51733
      },
      {
        "latitude": 13.35487,
        "longitude": 78.52523
      },
      {
        "latitude": 13.36395,
        "longitude": 78.52137
      },
      {
        "latitude": 13.36788,
        "longitude": 78.50576
      },
      {
        "latitude": 13.38062,
        "longitude": 78.52158
      },
      {
        "latitude": 13.411,
        "longitude": 78.51841
      },
      {
        "latitude": 13.42622,
        "longitude": 78.4999
      },
      {
        "latitude": 13.44322,
        "longitude": 78.50515
      },
      {
        "latitude": 13.44321,
        "longitude": 78.47947
      },
      {
        "latitude": 13.45096,
        "longitude": 78.48544
      },
      {
        "latitude": 13.45518,
        "longitude": 78.47694
      },
      {
        "latitude": 13.48313,
        "longitude": 78.49929
      },
      {
        "latitude": 13.49014,
        "longitude": 78.53977
      },
      {
        "latitude": 13.48332,
        "longitude": 78.54344
      },
      {
        "latitude": 13.51581,
        "longitude": 78.56769
      },
      {
        "latitude": 13.48727,
        "longitude": 78.60084
      },
      {
        "latitude": 13.48391,
        "longitude": 78.6593
      },
      {
        "latitude": 13.49926,
        "longitude": 78.66339
      },
      {
        "latitude": 13.51682,
        "longitude": 78.62785
      },
      {
        "latitude": 13.52665,
        "longitude": 78.65905
      },
      {
        "latitude": 13.51962,
        "longitude": 78.67487
      },
      {
        "latitude": 13.50601,
        "longitude": 78.67173
      },
      {
        "latitude": 13.5042,
        "longitude": 78.67759
      },
      {
        "latitude": 13.5354,
        "longitude": 78.69222
      },
      {
        "latitude": 13.5382,
        "longitude": 78.72153
      },
      {
        "latitude": 13.51394,
        "longitude": 78.71385
      },
      {
        "latitude": 13.5301,
        "longitude": 78.73927
      },
      {
        "latitude": 13.56719,
        "longitude": 78.73893
      },
      {
        "latitude": 13.58677,
        "longitude": 78.75066
      },
      {
        "latitude": 13.58185,
        "longitude": 78.80274
      },
      {
        "latitude": 13.61139,
        "longitude": 78.79484
      },
      {
        "latitude": 13.61241,
        "longitude": 78.81823
      },
      {
        "latitude": 13.64928,
        "longitude": 78.85136
      },
      {
        "latitude": 13.67812,
        "longitude": 78.85263
      },
      {
        "latitude": 13.65838,
        "longitude": 78.86266
      },
      {
        "latitude": 13.65979,
        "longitude": 78.88205
      },
      {
        "latitude": 13.62515,
        "longitude": 78.88661
      },
      {
        "latitude": 13.60587,
        "longitude": 78.87182
      },
      {
        "latitude": 13.59279,
        "longitude": 78.87937
      },
      {
        "latitude": 13.59413,
        "longitude": 78.89795
      },
      {
        "latitude": 13.58105,
        "longitude": 78.91005
      },
      {
        "latitude": 13.58015,
        "longitude": 78.92184
      },
      {
        "latitude": 13.59342,
        "longitude": 78.93499
      },
      {
        "latitude": 13.58226,
        "longitude": 78.95514
      },
      {
        "latitude": 13.59382,
        "longitude": 78.9597
      },
      {
        "latitude": 13.59385,
        "longitude": 78.96973
      },
      {
        "latitude": 13.61017,
        "longitude": 78.97423
      },
      {
        "latitude": 13.62469,
        "longitude": 78.96726
      },
      {
        "latitude": 13.6313,
        "longitude": 78.99668
      },
      {
        "latitude": 13.63953,
        "longitude": 78.9974
      },
      {
        "latitude": 13.65393,
        "longitude": 78.99111
      },
      {
        "latitude": 13.65415,
        "longitude": 78.97668
      },
      {
        "latitude": 13.6683,
        "longitude": 78.99595
      },
      {
        "latitude": 13.69209,
        "longitude": 78.97853
      },
      {
        "latitude": 13.72082,
        "longitude": 78.97822
      },
      {
        "latitude": 13.7259,
        "longitude": 79.0034
      },
      {
        "latitude": 13.74116,
        "longitude": 79.01676
      },
      {
        "latitude": 13.74657,
        "longitude": 79.03873
      },
      {
        "latitude": 13.77202,
        "longitude": 79.03943
      },
      {
        "latitude": 13.77401,
        "longitude": 79.02637
      },
      {
        "latitude": 13.78482,
        "longitude": 79.02122
      },
      {
        "latitude": 13.80159,
        "longitude": 79.02422
      },
      {
        "latitude": 13.80385,
        "longitude": 79.04089
      },
      {
        "latitude": 13.81451,
        "longitude": 79.04235
      },
      {
        "latitude": 13.82592,
        "longitude": 79.01414
      },
      {
        "latitude": 13.84414,
        "longitude": 79.01079
      },
      {
        "latitude": 13.84963,
        "longitude": 79.02558
      },
      {
        "latitude": 13.8579,
        "longitude": 79.02087
      },
      {
        "latitude": 13.85606,
        "longitude": 79.04684
      },
      {
        "latitude": 13.86404,
        "longitude": 79.04983
      },
      {
        "latitude": 13.88002,
        "longitude": 79.02196
      },
      {
        "latitude": 13.89406,
        "longitude": 79.02356
      },
      {
        "latitude": 13.90318,
        "longitude": 79.00519
      },
      {
        "latitude": 13.90765,
        "longitude": 79.0082
      },
      {
        "latitude": 13.90298,
        "longitude": 79.02368
      },
      {
        "latitude": 13.88908,
        "longitude": 79.02929
      },
      {
        "latitude": 13.8788,
        "longitude": 79.08282
      },
      {
        "latitude": 13.84995,
        "longitude": 79.09636
      },
      {
        "latitude": 13.84962,
        "longitude": 79.12632
      },
      {
        "latitude": 13.86562,
        "longitude": 79.14842
      },
      {
        "latitude": 13.81206,
        "longitude": 79.21574
      },
      {
        "latitude": 13.80316,
        "longitude": 79.19426
      },
      {
        "latitude": 13.793,
        "longitude": 79.19115
      },
      {
        "latitude": 13.77235,
        "longitude": 79.21783
      },
      {
        "latitude": 13.75726,
        "longitude": 79.22379
      },
      {
        "latitude": 13.75054,
        "longitude": 79.24097
      },
      {
        "latitude": 13.75994,
        "longitude": 79.24125
      },
      {
        "latitude": 13.75857,
        "longitude": 79.29239
      },
      {
        "latitude": 13.72297,
        "longitude": 79.30537
      },
      {
        "latitude": 13.75531,
        "longitude": 79.3722
      },
      {
        "latitude": 13.76278,
        "longitude": 79.41397
      },
      {
        "latitude": 13.78509,
        "longitude": 79.42002
      },
      {
        "latitude": 13.78275,
        "longitude": 79.45556
      },
      {
        "latitude": 13.79695,
        "longitude": 79.47099
      },
      {
        "latitude": 13.79928,
        "longitude": 79.45799
      },
      {
        "latitude": 13.87516,
        "longitude": 79.43395
      },
      {
        "latitude": 13.94727,
        "longitude": 79.45867
      },
      {
        "latitude": 13.97272,
        "longitude": 79.45034
      },
      {
        "latitude": 13.9885,
        "longitude": 79.45568
      },
      {
        "latitude": 13.99809,
        "longitude": 79.44317
      },
      {
        "latitude": 14.02507,
        "longitude": 79.437
      },
      {
        "latitude": 14.10181,
        "longitude": 79.45441
      },
      {
        "latitude": 14.20727,
        "longitude": 79.4227
      },
      {
        "latitude": 14.24445,
        "longitude": 79.43572
      },
      {
        "latitude": 14.26589,
        "longitude": 79.41977
      },
      {
        "latitude": 14.27955,
        "longitude": 79.42235
      },
      {
        "latitude": 14.34215,
        "longitude": 79.38949
      },
      {
        "latitude": 14.3526,
        "longitude": 79.36617
      },
      {
        "latitude": 14.37969,
        "longitude": 79.36433
      },
      {
        "latitude": 14.42728,
        "longitude": 79.3301
      },
      {
        "latitude": 14.47828,
        "longitude": 79.31656
      },
      {
        "latitude": 14.48599,
        "longitude": 79.30387
      },
      {
        "latitude": 14.47982,
        "longitude": 79.28926
      },
      {
        "latitude": 14.47112,
        "longitude": 79.3
      },
      {
        "latitude": 14.46161,
        "longitude": 79.29797
      },
      {
        "latitude": 14.44076,
        "longitude": 79.31055
      },
      {
        "latitude": 14.41021,
        "longitude": 79.31168
      },
      {
        "latitude": 14.40608,
        "longitude": 79.29988
      },
      {
        "latitude": 14.38137,
        "longitude": 79.31408
      },
      {
        "latitude": 14.36049,
        "longitude": 79.30624
      },
      {
        "latitude": 14.39639,
        "longitude": 79.2782
      },
      {
        "latitude": 14.39263,
        "longitude": 79.26444
      },
      {
        "latitude": 14.41416,
        "longitude": 79.23241
      },
      {
        "latitude": 14.39693,
        "longitude": 79.20778
      },
      {
        "latitude": 14.36586,
        "longitude": 79.23854
      },
      {
        "latitude": 14.37792,
        "longitude": 79.21182
      },
      {
        "latitude": 14.35586,
        "longitude": 79.216
      },
      {
        "latitude": 14.35589,
        "longitude": 79.20633
      },
      {
        "latitude": 14.34541,
        "longitude": 79.20719
      },
      {
        "latitude": 14.37263,
        "longitude": 79.19432
      },
      {
        "latitude": 14.37929,
        "longitude": 79.18062
      },
      {
        "latitude": 14.35592,
        "longitude": 79.16237
      },
      {
        "latitude": 14.37136,
        "longitude": 79.1409
      },
      {
        "latitude": 14.37058,
        "longitude": 79.12078
      },
      {
        "latitude": 14.33674,
        "longitude": 79.13222
      },
      {
        "latitude": 14.3277,
        "longitude": 79.15483
      },
      {
        "latitude": 14.29514,
        "longitude": 79.14641
      },
      {
        "latitude": 14.30651,
        "longitude": 79.09836
      },
      {
        "latitude": 14.29664,
        "longitude": 79.08143
      },
      {
        "latitude": 14.27839,
        "longitude": 79.07118
      },
      {
        "latitude": 14.29035,
        "longitude": 79.02606
      },
      {
        "latitude": 14.27039,
        "longitude": 78.99386
      },
      {
        "latitude": 14.28318,
        "longitude": 78.96977
      },
      {
        "latitude": 14.2709,
        "longitude": 78.93895
      },
      {
        "latitude": 14.29673,
        "longitude": 78.91147
      },
      {
        "latitude": 14.32185,
        "longitude": 78.90219
      },
      {
        "latitude": 14.32306,
        "longitude": 78.88007
      },
      {
        "latitude": 14.29767,
        "longitude": 78.87157
      },
      {
        "latitude": 14.29113,
        "longitude": 78.81404
      },
      {
        "latitude": 14.31652,
        "longitude": 78.7695
      },
      {
        "latitude": 14.30701,
        "longitude": 78.75516
      },
      {
        "latitude": 14.3097,
        "longitude": 78.7444
      },
      {
        "latitude": 14.29983,
        "longitude": 78.74859
      },
      {
        "latitude": 14.29363,
        "longitude": 78.73371
      },
      {
        "latitude": 14.29642,
        "longitude": 78.66589
      },
      {
        "latitude": 14.27835,
        "longitude": 78.66688
      },
      {
        "latitude": 14.26403,
        "longitude": 78.68147
      },
      {
        "latitude": 14.24725,
        "longitude": 78.6745
      },
      {
        "latitude": 14.24611,
        "longitude": 78.6666
      },
      {
        "latitude": 14.25011,
        "longitude": 78.65204
      },
      {
        "latitude": 14.26548,
        "longitude": 78.65972
      },
      {
        "latitude": 14.27393,
        "longitude": 78.64985
      },
      {
        "latitude": 14.28255,
        "longitude": 78.60215
      },
      {
        "latitude": 14.27323,
        "longitude": 78.59336
      },
      {
        "latitude": 14.25005,
        "longitude": 78.59858
      },
      {
        "latitude": 14.21108,
        "longitude": 78.62677
      },
      {
        "latitude": 14.19026,
        "longitude": 78.59072
      },
      {
        "latitude": 14.17753,
        "longitude": 78.58763
      },
      {
        "latitude": 14.18291,
        "longitude": 78.5755
      },
      {
        "latitude": 14.17445,
        "longitude": 78.56518
      },
      {
        "latitude": 14.16008,
        "longitude": 78.56483
      },
      {
        "latitude": 14.16523,
        "longitude": 78.57151
      },
      {
        "latitude": 14.15984,
        "longitude": 78.57512
      },
      {
        "latitude": 14.14349,
        "longitude": 78.56298
      },
      {
        "latitude": 14.13331,
        "longitude": 78.58153
      },
      {
        "latitude": 14.11521,
        "longitude": 78.56808
      },
      {
        "latitude": 14.11711,
        "longitude": 78.5496
      },
      {
        "latitude": 14.13287,
        "longitude": 78.54716
      },
      {
        "latitude": 14.1363,
        "longitude": 78.56485
      },
      {
        "latitude": 14.15533,
        "longitude": 78.54822
      },
      {
        "latitude": 14.15327,
        "longitude": 78.52885
      },
      {
        "latitude": 14.16928,
        "longitude": 78.5251
      },
      {
        "latitude": 14.16413,
        "longitude": 78.4791
      },
      {
        "latitude": 14.13885,
        "longitude": 78.44365
      },
      {
        "latitude": 14.10721,
        "longitude": 78.46171
      },
      {
        "latitude": 14.08484,
        "longitude": 78.45464
      },
      {
        "latitude": 14.0811,
        "longitude": 78.44292
      },
      {
        "latitude": 14.05277,
        "longitude": 78.44933
      },
      {
        "latitude": 14.04371,
        "longitude": 78.44035
      },
      {
        "latitude": 14.019,
        "longitude": 78.44087
      },
      {
        "latitude": 14.00769,
        "longitude": 78.47007
      },
      {
        "latitude": 13.98761,
        "longitude": 78.46075
      },
      {
        "latitude": 13.97944,
        "longitude": 78.4277
      },
      {
        "latitude": 13.96387,
        "longitude": 78.42074
      },
      {
        "latitude": 13.93928,
        "longitude": 78.38692
      },
      {
        "latitude": 13.94517,
        "longitude": 78.37253
      },
      {
        "latitude": 13.95701,
        "longitude": 78.3706
      },
      {
        "latitude": 13.93549,
        "longitude": 78.3472
      },
      {
        "latitude": 13.93712,
        "longitude": 78.33768
      },
      {
        "latitude": 13.91814,
        "longitude": 78.33191
      },
      {
        "latitude": 13.92118,
        "longitude": 78.31854
      },
      {
        "latitude": 13.90826,
        "longitude": 78.30101
      },
      {
        "latitude": 13.89385,
        "longitude": 78.29873
      },
      {
        "latitude": 13.8956,
        "longitude": 78.27309
      },
      {
        "latitude": 13.88965,
        "longitude": 78.27853
      },
      {
        "latitude": 13.85782,
        "longitude": 78.26526
      },
      {
        "latitude": 13.846,
        "longitude": 78.24116
      },
      {
        "latitude": 13.83465,
        "longitude": 78.25687
      },
      {
        "latitude": 13.79144,
        "longitude": 78.26187
      },
      {
        "latitude": 13.77996,
        "longitude": 78.23622
      },
      {
        "latitude": 13.78959,
        "longitude": 78.18912
      },
      {
        "latitude": 13.78216,
        "longitude": 78.1479
      },
      {
        "latitude": 13.78668,
        "longitude": 78.12518
      },
      {
        "latitude": 13.74228,
        "longitude": 78.09174
      },
      {
        "latitude": 13.7154,
        "longitude": 78.12099
      },
      {
        "latitude": 13.69246,
        "longitude": 78.1135
      },
      {
        "latitude": 13.69844,
        "longitude": 78.07089
      },
      {
        "latitude": 13.68747,
        "longitude": 78.07368
      },
      {
        "latitude": 13.67693,
        "longitude": 78.06606
      }
    ],
    "polygons": [
      [
        {
          "latitude": 13.67693,
          "longitude": 78.06606
        },
        {
          "latitude": 13.65977,
          "longitude": 78.08955
        },
        {
          "latitude": 13.64306,
          "longitude": 78.08732
        },
        {
          "latitude": 13.64306,
          "longitude": 78.09919
        },
        {
          "latitude": 13.65747,
          "longitude": 78.11411
        },
        {
          "latitude": 13.65847,
          "longitude": 78.15608
        },
        {
          "latitude": 13.65378,
          "longitude": 78.16927
        },
        {
          "latitude": 13.63264,
          "longitude": 78.16838
        },
        {
          "latitude": 13.62835,
          "longitude": 78.20395
        },
        {
          "latitude": 13.60509,
          "longitude": 78.20288
        },
        {
          "latitude": 13.58945,
          "longitude": 78.19003
        },
        {
          "latitude": 13.5644,
          "longitude": 78.19325
        },
        {
          "latitude": 13.59268,
          "longitude": 78.21962
        },
        {
          "latitude": 13.58597,
          "longitude": 78.23267
        },
        {
          "latitude": 13.59858,
          "longitude": 78.23619
        },
        {
          "latitude": 13.58293,
          "longitude": 78.25855
        },
        {
          "latitude": 13.59488,
          "longitude": 78.32506
        },
        {
          "latitude": 13.58684,
          "longitude": 78.3486
        },
        {
          "latitude": 13.58798,
          "longitude": 78.40204
        },
        {
          "latitude": 13.57701,
          "longitude": 78.40671
        },
        {
          "latitude": 13.51553,
          "longitude": 78.38557
        },
        {
          "latitude": 13.50898,
          "longitude": 78.37534
        },
        {
          "latitude": 13.48204,
          "longitude": 78.37879
        },
        {
          "latitude": 13.46952,
          "longitude": 78.37083
        },
        {
          "latitude": 13.3975,
          "longitude": 78.38177
        },
        {
          "latitude": 13.3618,
          "longitude": 78.36508
        },
        {
          "latitude": 13.36314,
          "longitude": 78.37764
        },
        {
          "latitude": 13.34568,
          "longitude": 78.4084
        },
        {
          "latitude": 13.33606,
          "longitude": 78.4035
        },
        {
          "latitude": 13.33488,
          "longitude": 78.38487
        },
        {
          "latitude": 13.34358,
          "longitude": 78.38303
        },
        {
          "latitude": 13.33718,
          "longitude": 78.37825
        },
        {
          "latitude": 13.31547,
          "longitude": 78.40111
        },
        {
          "latitude": 13.3305,
          "longitude": 78.4334
        },
        {
          "latitude": 13.32843,
          "longitude": 78.44039
        },
        {
          "latitude": 13.30811,
          "longitude": 78.44421
        },
        {
          "latitude": 13.32602,
          "longitude": 78.48928
        },
        {
          "latitude": 13.33837,
          "longitude": 78.49669
        },
        {
          "latitude": 13.3411,
          "longitude": 78.51733
        },
        {
          "latitude": 13.35487,
          "longitude": 78.52523
        },
        {
          "latitude": 13.36395,
          "longitude": 78.52137
        },
        {
          "latitude": 13.36788,
          "longitude": 78.50576
        },
        {
          "latitude": 13.38062,
          "longitude": 78.52158
        },
        {
          "latitude": 13.411,
          "longitude": 78.51841
        },
        {
          "latitude": 13.42622,
          "longitude": 78.4999
        },
        {
          "latitude": 13.44322,
          "longitude": 78.50515
        },
        {
          "latitude": 13.44321,
          "longitude": 78.47947
        },
        {
          "latitude": 13.45096,
          "longitude": 78.48544
        },
        {
          "latitude": 13.45518,
          "longitude": 78.47694
        },
        {
          "latitude": 13.48313,
          "longitude": 78.49929
        },
        {
          "latitude": 13.49014,
          "longitude": 78.53977
        },
        {
          "latitude": 13.48332,
          "longitude": 78.54344
        },
        {
          "latitude": 13.51581,
          "longitude": 78.56769
        },
        {
          "latitude": 13.48727,
          "longitude": 78.60084
        },
        {
          "latitude": 13.48391,
          "longitude": 78.6593
        },
        {
          "latitude": 13.49926,
          "longitude": 78.66339
        },
        {
          "latitude": 13.51682,
          "longitude": 78.62785
        },
        {
          "latitude": 13.52665,
          "longitude": 78.65905
        },
        {
          "latitude": 13.51962,
          "longitude": 78.67487
        },
        {
          "latitude": 13.50601,
          "longitude": 78.67173
        },
        {
          "latitude": 13.5042,
          "longitude": 78.67759
        },
        {
          "latitude": 13.5354,
          "longitude": 78.69222
        },
        {
          "latitude": 13.5382,
          "longitude": 78.72153
        },
        {
          "latitude": 13.51394,
          "longitude": 78.71385
        },
        {
          "latitude": 13.5301,
          "longitude": 78.73927
        },
        {
          "latitude": 13.56719,
          "longitude": 78.73893
        },
        {
          "latitude": 13.58677,
          "longitude": 78.75066
        },
        {
          "latitude": 13.58185,
          "longitude": 78.80274
        },
        {
          "latitude": 13.61139,
          "longitude": 78.79484
        },
        {
          "latitude": 13.61241,
          "longitude": 78.81823
        },
        {
          "latitude": 13.64928,
          "longitude": 78.85136
        },
        {
          "latitude": 13.67812,
          "longitude": 78.85263
        },
        {
          "latitude": 13.65838,
          "longitude": 78.86266
        },
        {
          "latitude": 13.65979,
          "longitude": 78.88205
        },
        {
          "latitude": 13.62515,
          "longitude": 78.88661
        },
        {
          "latitude": 13.60587,
          "longitude": 78.87182
        },
        {
          "latitude": 13.59279,
          "longitude": 78.87937
        },
        {
          "latitude": 13.59413,
          "longitude": 78.89795
        },
        {
          "latitude": 13.58105,
          "longitude": 78.91005
        },
        {
          "latitude": 13.58015,
          "longitude": 78.92184
        },
        {
          "latitude": 13.59342,
          "longitude": 78.93499
        },
        {
          "latitude": 13.58226,
          "longitude": 78.95514
        },
        {
          "latitude": 13.59382,
          "longitude": 78.9597
        },
        {
          "latitude": 13.59385,
          "longitude": 78.96973
        },
        {
          "latitude": 13.61017,
          "longitude": 78.97423
        },
        {
          "latitude": 13.62469,
          "longitude": 78.96726
        },
        {
          "latitude": 13.6313,
          "longitude": 78.99668
        },
        {
          "latitude": 13.63953,
          "longitude": 78.9974
        },
        {
          "latitude": 13.65393,
          "longitude": 78.99111
        },
        {
          "latitude": 13.65415,
          "longitude": 78.97668
        },
        {
          "latitude": 13.6683,
          "longitude": 78.99595
        },
        {
          "latitude": 13.69209,
          "longitude": 78.97853
        },
        {
          "latitude": 13.72082,
          "longitude": 78.97822
        },
        {
          "latitude": 13.7259,
          "longitude": 79.0034
        },
        {
          "latitude": 13.74116,
          "longitude": 79.01676
        },
        {
          "latitude": 13.74657,
          "longitude": 79.03873
        },
        {
          "latitude": 13.77202,
          "longitude": 79.03943
        },
        {
          "latitude": 13.77401,
          "longitude": 79.02637
        },
        {
          "latitude": 13.78482,
          "longitude": 79.02122
        },
        {
          "latitude": 13.80159,
          "longitude": 79.02422
        },
        {
          "latitude": 13.80385,
          "longitude": 79.04089
        },
        {
          "latitude": 13.81451,
          "longitude": 79.04235
        },
        {
          "latitude": 13.82592,
          "longitude": 79.01414
        },
        {
          "latitude": 13.84414,
          "longitude": 79.01079
        },
        {
          "latitude": 13.84963,
          "longitude": 79.02558
        },
        {
          "latitude": 13.8579,
          "longitude": 79.02087
        },
        {
          "latitude": 13.85606,
          "longitude": 79.04684
        },
        {
          "latitude": 13.86404,
          "longitude": 79.04983
        },
        {
          "latitude": 13.88002,
          "longitude": 79.02196
        },
        {
          "latitude": 13.89406,
          "longitude": 79.02356
        },
        {
          "latitude": 13.90318,
          "longitude": 79.00519
        },
        {
          "latitude": 13.90765,
          "longitude": 79.0082
        },
        {
          "latitude": 13.90298,
          "longitude": 79.02368
        },
        {
          "latitude": 13.88908,
          "longitude": 79.02929
        },
        {
          "latitude": 13.8788,
          "longitude": 79.08282
        },
        {
          "latitude": 13.84995,
          "longitude": 79.09636
        },
        {
          "latitude": 13.84962,
          "longitude": 79.12632
        },
        {
          "latitude": 13.86562,
          "longitude": 79.14842
        },
        {
          "latitude": 13.81206,
          "longitude": 79.21574
        },
        {
          "latitude": 13.80316,
          "longitude": 79.19426
        },
        {
          "latitude": 13.793,
          "longitude": 79.19115
        },
        {
          "latitude": 13.77235,
          "longitude": 79.21783
        },
        {
          "latitude": 13.75726,
          "longitude": 79.22379
        },
        {
          "latitude": 13.75054,
          "longitude": 79.24097
        },
        {
          "latitude": 13.75994,
          "longitude": 79.24125
        },
        {
          "latitude": 13.75857,
          "longitude": 79.29239
        },
        {
          "latitude": 13.72297,
          "longitude": 79.30537
        },
        {
          "latitude": 13.75531,
          "longitude": 79.3722
        },
        {
          "latitude": 13.76278,
          "longitude": 79.41397
        },
        {
          "latitude": 13.78509,
          "longitude": 79.42002
        },
        {
          "latitude": 13.78275,
          "longitude": 79.45556
        },
        {
          "latitude": 13.79695,
          "longitude": 79.47099
        },
        {
          "latitude": 13.79928,
          "longitude": 79.45799
        },
        {
          "latitude": 13.87516,
          "longitude": 79.43395
        },
        {
          "latitude": 13.94727,
          "longitude": 79.45867
        },
        {
          "latitude": 13.97272,
          "longitude": 79.45034
        },
        {
          "latitude": 13.9885,
          "longitude": 79.45568
        },
        {
          "latitude": 13.99809,
          "longitude": 79.44317
        },
        {
          "latitude": 14.02507,
          "longitude": 79.437
        },
        {
          "latitude": 14.10181,
          "longitude": 79.45441
        },
        {
          "latitude": 14.20727,
          "longitude": 79.4227
        },
        {
          "latitude": 14.24445,
          "longitude": 79.43572
        },
        {
          "latitude": 14.26589,
          "longitude": 79.41977
        },
        {
          "latitude": 14.27955,
          "longitude": 79.42235
        },
        {
          "latitude": 14.34215,
          "longitude": 79.38949
        },
        {
          "latitude": 14.3526,
          "longitude": 79.36617
        },
        {
          "latitude": 14.37969,
          "longitude": 79.36433
        },
        {
          "latitude": 14.42728,
          "longitude": 79.3301
        },
        {
          "latitude": 14.47828,
          "longitude": 79.31656
        },
        {
          "latitude": 14.48599,
          "longitude": 79.30387
        },
        {
          "latitude": 14.47982,
          "longitude": 79.28926
        },
        {
          "latitude": 14.47112,
          "longitude": 79.3
        },
        {
          "latitude": 14.46161,
          "longitude": 79.29797
        },
        {
          "latitude": 14.44076,
          "longitude": 79.31055
        },
        {
          "latitude": 14.41021,
          "longitude": 79.31168
        },
        {
          "latitude": 14.40608,
          "longitude": 79.29988
        },
        {
          "latitude": 14.38137,
          "longitude": 79.31408
        },
        {
          "latitude": 14.36049,
          "longitude": 79.30624
        },
        {
          "latitude": 14.39639,
          "longitude": 79.2782
        },
        {
          "latitude": 14.39263,
          "longitude": 79.26444
        },
        {
          "latitude": 14.41416,
          "longitude": 79.23241
        },
        {
          "latitude": 14.39693,
          "longitude": 79.20778
        },
        {
          "latitude": 14.36586,
          "longitude": 79.23854
        },
        {
          "latitude": 14.37792,
          "longitude": 79.21182
        },
        {
          "latitude": 14.35586,
          "longitude": 79.216
        },
        {
          "latitude": 14.35589,
          "longitude": 79.20633
        },
        {
          "latitude": 14.34541,
          "longitude": 79.20719
        },
        {
          "latitude": 14.37263,
          "longitude": 79.19432
        },
        {
          "latitude": 14.37929,
          "longitude": 79.18062
        },
        {
          "latitude": 14.35592,
          "longitude": 79.16237
        },
        {
          "latitude": 14.37136,
          "longitude": 79.1409
        },
        {
          "latitude": 14.37058,
          "longitude": 79.12078
        },
        {
          "latitude": 14.33674,
          "longitude": 79.13222
        },
        {
          "latitude": 14.3277,
          "longitude": 79.15483
        },
        {
          "latitude": 14.29514,
          "longitude": 79.14641
        },
        {
          "latitude": 14.30651,
          "longitude": 79.09836
        },
        {
          "latitude": 14.29664,
          "longitude": 79.08143
        },
        {
          "latitude": 14.27839,
          "longitude": 79.07118
        },
        {
          "latitude": 14.29035,
          "longitude": 79.02606
        },
        {
          "latitude": 14.27039,
          "longitude": 78.99386
        },
        {
          "latitude": 14.28318,
          "longitude": 78.96977
        },
        {
          "latitude": 14.2709,
          "longitude": 78.93895
        },
        {
          "latitude": 14.29673,
          "longitude": 78.91147
        },
        {
          "latitude": 14.32185,
          "longitude": 78.90219
        },
        {
          "latitude": 14.32306,
          "longitude": 78.88007
        },
        {
          "latitude": 14.29767,
          "longitude": 78.87157
        },
        {
          "latitude": 14.29113,
          "longitude": 78.81404
        },
        {
          "latitude": 14.31652,
          "longitude": 78.7695
        },
        {
          "latitude": 14.30701,
          "longitude": 78.75516
        },
        {
          "latitude": 14.3097,
          "longitude": 78.7444
        },
        {
          "latitude": 14.29983,
          "longitude": 78.74859
        },
        {
          "latitude": 14.29363,
          "longitude": 78.73371
        },
        {
          "latitude": 14.29642,
          "longitude": 78.66589
        },
        {
          "latitude": 14.27835,
          "longitude": 78.66688
        },
        {
          "latitude": 14.26403,
          "longitude": 78.68147
        },
        {
          "latitude": 14.24725,
          "longitude": 78.6745
        },
        {
          "latitude": 14.24611,
          "longitude": 78.6666
        },
        {
          "latitude": 14.25011,
          "longitude": 78.65204
        },
        {
          "latitude": 14.26548,
          "longitude": 78.65972
        },
        {
          "latitude": 14.27393,
          "longitude": 78.64985
        },
        {
          "latitude": 14.28255,
          "longitude": 78.60215
        },
        {
          "latitude": 14.27323,
          "longitude": 78.59336
        },
        {
          "latitude": 14.25005,
          "longitude": 78.59858
        },
        {
          "latitude": 14.21108,
          "longitude": 78.62677
        },
        {
          "latitude": 14.19026,
          "longitude": 78.59072
        },
        {
          "latitude": 14.17753,
          "longitude": 78.58763
        },
        {
          "latitude": 14.18291,
          "longitude": 78.5755
        },
        {
          "latitude": 14.17445,
          "longitude": 78.56518
        },
        {
          "latitude": 14.16008,
          "longitude": 78.56483
        },
        {
          "latitude": 14.16523,
          "longitude": 78.57151
        },
        {
          "latitude": 14.15984,
          "longitude": 78.57512
        },
        {
          "latitude": 14.14349,
          "longitude": 78.56298
        },
        {
          "latitude": 14.13331,
          "longitude": 78.58153
        },
        {
          "latitude": 14.11521,
          "longitude": 78.56808
        },
        {
          "latitude": 14.11711,
          "longitude": 78.5496
        },
        {
          "latitude": 14.13287,
          "longitude": 78.54716
        },
        {
          "latitude": 14.1363,
          "longitude": 78.56485
        },
        {
          "latitude": 14.15533,
          "longitude": 78.54822
        },
        {
          "latitude": 14.15327,
          "longitude": 78.52885
        },
        {
          "latitude": 14.16928,
          "longitude": 78.5251
        },
        {
          "latitude": 14.16413,
          "longitude": 78.4791
        },
        {
          "latitude": 14.13885,
          "longitude": 78.44365
        },
        {
          "latitude": 14.10721,
          "longitude": 78.46171
        },
        {
          "latitude": 14.08484,
          "longitude": 78.45464
        },
        {
          "latitude": 14.0811,
          "longitude": 78.44292
        },
        {
          "latitude": 14.05277,
          "longitude": 78.44933
        },
        {
          "latitude": 14.04371,
          "longitude": 78.44035
        },
        {
          "latitude": 14.019,
          "longitude": 78.44087
        },
        {
          "latitude": 14.00769,
          "longitude": 78.47007
        },
        {
          "latitude": 13.98761,
          "longitude": 78.46075
        },
        {
          "latitude": 13.97944,
          "longitude": 78.4277
        },
        {
          "latitude": 13.96387,
          "longitude": 78.42074
        },
        {
          "latitude": 13.93928,
          "longitude": 78.38692
        },
        {
          "latitude": 13.94517,
          "longitude": 78.37253
        },
        {
          "latitude": 13.95701,
          "longitude": 78.3706
        },
        {
          "latitude": 13.93549,
          "longitude": 78.3472
        },
        {
          "latitude": 13.93712,
          "longitude": 78.33768
        },
        {
          "latitude": 13.91814,
          "longitude": 78.33191
        },
        {
          "latitude": 13.92118,
          "longitude": 78.31854
        },
        {
          "latitude": 13.90826,
          "longitude": 78.30101
        },
        {
          "latitude": 13.89385,
          "longitude": 78.29873
        },
        {
          "latitude": 13.8956,
          "longitude": 78.27309
        },
        {
          "latitude": 13.88965,
          "longitude": 78.27853
        },
        {
          "latitude": 13.85782,
          "longitude": 78.26526
        },
        {
          "latitude": 13.846,
          "longitude": 78.24116
        },
        {
          "latitude": 13.83465,
          "longitude": 78.25687
        },
        {
          "latitude": 13.79144,
          "longitude": 78.26187
        },
        {
          "latitude": 13.77996,
          "longitude": 78.23622
        },
        {
          "latitude": 13.78959,
          "longitude": 78.18912
        },
        {
          "latitude": 13.78216,
          "longitude": 78.1479
        },
        {
          "latitude": 13.78668,
          "longitude": 78.12518
        },
        {
          "latitude": 13.74228,
          "longitude": 78.09174
        },
        {
          "latitude": 13.7154,
          "longitude": 78.12099
        },
        {
          "latitude": 13.69246,
          "longitude": 78.1135
        },
        {
          "latitude": 13.69844,
          "longitude": 78.07089
        },
        {
          "latitude": 13.68747,
          "longitude": 78.07368
        },
        {
          "latitude": 13.67693,
          "longitude": 78.06606
        }
      ]
    ]
  },
  {
    "id": "bapatla",
    "name": "Bapatla",
    "headquarters": "Bapatla",
    "center": {
      "latitude": 15.9382,
      "longitude": 80.3703
    },
    "region": "Coastal Andhra",
    "polygon": [
      {
        "latitude": 15.99363,
        "longitude": 79.86271
      },
      {
        "latitude": 15.99977,
        "longitude": 79.87926
      },
      {
        "latitude": 15.98335,
        "longitude": 79.9034
      },
      {
        "latitude": 15.97158,
        "longitude": 79.89805
      },
      {
        "latitude": 15.96746,
        "longitude": 79.91174
      },
      {
        "latitude": 15.94248,
        "longitude": 79.90311
      },
      {
        "latitude": 15.94697,
        "longitude": 79.89651
      },
      {
        "latitude": 15.93931,
        "longitude": 79.89397
      },
      {
        "latitude": 15.94048,
        "longitude": 79.88109
      },
      {
        "latitude": 15.92753,
        "longitude": 79.87664
      },
      {
        "latitude": 15.90327,
        "longitude": 79.89469
      },
      {
        "latitude": 15.88849,
        "longitude": 79.89475
      },
      {
        "latitude": 15.87836,
        "longitude": 79.90962
      },
      {
        "latitude": 15.8714,
        "longitude": 79.90585
      },
      {
        "latitude": 15.85341,
        "longitude": 79.94817
      },
      {
        "latitude": 15.8316,
        "longitude": 79.94442
      },
      {
        "latitude": 15.82443,
        "longitude": 79.91847
      },
      {
        "latitude": 15.76343,
        "longitude": 79.90793
      },
      {
        "latitude": 15.74492,
        "longitude": 79.92019
      },
      {
        "latitude": 15.7223,
        "longitude": 79.90597
      },
      {
        "latitude": 15.71421,
        "longitude": 79.89152
      },
      {
        "latitude": 15.70617,
        "longitude": 79.89392
      },
      {
        "latitude": 15.68702,
        "longitude": 79.93936
      },
      {
        "latitude": 15.70118,
        "longitude": 79.94242
      },
      {
        "latitude": 15.69944,
        "longitude": 79.95129
      },
      {
        "latitude": 15.71508,
        "longitude": 79.97128
      },
      {
        "latitude": 15.70092,
        "longitude": 79.97935
      },
      {
        "latitude": 15.69143,
        "longitude": 80.01983
      },
      {
        "latitude": 15.68458,
        "longitude": 80.02378
      },
      {
        "latitude": 15.70914,
        "longitude": 80.03596
      },
      {
        "latitude": 15.69576,
        "longitude": 80.0638
      },
      {
        "latitude": 15.68221,
        "longitude": 80.06923
      },
      {
        "latitude": 15.68721,
        "longitude": 80.08729
      },
      {
        "latitude": 15.6812,
        "longitude": 80.10026
      },
      {
        "latitude": 15.67574,
        "longitude": 80.09755
      },
      {
        "latitude": 15.66936,
        "longitude": 80.12338
      },
      {
        "latitude": 15.68257,
        "longitude": 80.12841
      },
      {
        "latitude": 15.68955,
        "longitude": 80.11222
      },
      {
        "latitude": 15.70025,
        "longitude": 80.11173
      },
      {
        "latitude": 15.70048,
        "longitude": 80.12595
      },
      {
        "latitude": 15.6902,
        "longitude": 80.13741
      },
      {
        "latitude": 15.69932,
        "longitude": 80.14077
      },
      {
        "latitude": 15.69866,
        "longitude": 80.15114
      },
      {
        "latitude": 15.72643,
        "longitude": 80.1656
      },
      {
        "latitude": 15.73667,
        "longitude": 80.18583
      },
      {
        "latitude": 15.75903,
        "longitude": 80.18688
      },
      {
        "latitude": 15.76883,
        "longitude": 80.19734
      },
      {
        "latitude": 15.75186,
        "longitude": 80.2114
      },
      {
        "latitude": 15.70971,
        "longitude": 80.18844
      },
      {
        "latitude": 15.69426,
        "longitude": 80.19263
      },
      {
        "latitude": 15.68343,
        "longitude": 80.17926
      },
      {
        "latitude": 15.6501,
        "longitude": 80.17127
      },
      {
        "latitude": 15.63781,
        "longitude": 80.17957
      },
      {
        "latitude": 15.62399,
        "longitude": 80.17456
      },
      {
        "latitude": 15.61142,
        "longitude": 80.23809
      },
      {
        "latitude": 15.69374,
        "longitude": 80.28868
      },
      {
        "latitude": 15.76371,
        "longitude": 80.36192
      },
      {
        "latitude": 15.83618,
        "longitude": 80.4968
      },
      {
        "latitude": 15.87759,
        "longitude": 80.64024
      },
      {
        "latitude": 15.87931,
        "longitude": 80.72674
      },
      {
        "latitude": 15.85397,
        "longitude": 80.79405
      },
      {
        "latitude": 15.83448,
        "longitude": 80.81138
      },
      {
        "latitude": 15.81536,
        "longitude": 80.81344
      },
      {
        "latitude": 15.80618,
        "longitude": 80.80076
      },
      {
        "latitude": 15.842,
        "longitude": 80.78016
      },
      {
        "latitude": 15.83451,
        "longitude": 80.77985
      },
      {
        "latitude": 15.76461,
        "longitude": 80.81106
      },
      {
        "latitude": 15.71399,
        "longitude": 80.81988
      },
      {
        "latitude": 15.70702,
        "longitude": 80.83349
      },
      {
        "latitude": 15.76176,
        "longitude": 80.83805
      },
      {
        "latitude": 15.8453,
        "longitude": 80.87223
      },
      {
        "latitude": 15.85637,
        "longitude": 80.8862
      },
      {
        "latitude": 15.91725,
        "longitude": 80.90273
      },
      {
        "latitude": 15.9231,
        "longitude": 80.89461
      },
      {
        "latitude": 15.95362,
        "longitude": 80.89775
      },
      {
        "latitude": 15.96543,
        "longitude": 80.89648
      },
      {
        "latitude": 15.96085,
        "longitude": 80.88996
      },
      {
        "latitude": 16.00246,
        "longitude": 80.89103
      },
      {
        "latitude": 16.05317,
        "longitude": 80.87669
      },
      {
        "latitude": 16.06868,
        "longitude": 80.88066
      },
      {
        "latitude": 16.06852,
        "longitude": 80.87122
      },
      {
        "latitude": 16.07997,
        "longitude": 80.87546
      },
      {
        "latitude": 16.09099,
        "longitude": 80.86661
      },
      {
        "latitude": 16.10563,
        "longitude": 80.86773
      },
      {
        "latitude": 16.10389,
        "longitude": 80.85509
      },
      {
        "latitude": 16.13143,
        "longitude": 80.86412
      },
      {
        "latitude": 16.19885,
        "longitude": 80.82838
      },
      {
        "latitude": 16.21559,
        "longitude": 80.84129
      },
      {
        "latitude": 16.21787,
        "longitude": 80.82058
      },
      {
        "latitude": 16.24095,
        "longitude": 80.81751
      },
      {
        "latitude": 16.24532,
        "longitude": 80.78236
      },
      {
        "latitude": 16.2565,
        "longitude": 80.78173
      },
      {
        "latitude": 16.25004,
        "longitude": 80.77485
      },
      {
        "latitude": 16.25477,
        "longitude": 80.75858
      },
      {
        "latitude": 16.24817,
        "longitude": 80.75001
      },
      {
        "latitude": 16.23161,
        "longitude": 80.74845
      },
      {
        "latitude": 16.24494,
        "longitude": 80.71962
      },
      {
        "latitude": 16.23131,
        "longitude": 80.71542
      },
      {
        "latitude": 16.22849,
        "longitude": 80.69207
      },
      {
        "latitude": 16.19986,
        "longitude": 80.68577
      },
      {
        "latitude": 16.19408,
        "longitude": 80.67287
      },
      {
        "latitude": 16.19479,
        "longitude": 80.64944
      },
      {
        "latitude": 16.21435,
        "longitude": 80.64307
      },
      {
        "latitude": 16.21274,
        "longitude": 80.63357
      },
      {
        "latitude": 16.2263,
        "longitude": 80.621
      },
      {
        "latitude": 16.22326,
        "longitude": 80.60816
      },
      {
        "latitude": 16.23467,
        "longitude": 80.60533
      },
      {
        "latitude": 16.23745,
        "longitude": 80.59161
      },
      {
        "latitude": 16.20411,
        "longitude": 80.57111
      },
      {
        "latitude": 16.20312,
        "longitude": 80.55692
      },
      {
        "latitude": 16.17563,
        "longitude": 80.56324
      },
      {
        "latitude": 16.17875,
        "longitude": 80.55352
      },
      {
        "latitude": 16.16715,
        "longitude": 80.54498
      },
      {
        "latitude": 16.16278,
        "longitude": 80.55305
      },
      {
        "latitude": 16.13962,
        "longitude": 80.54313
      },
      {
        "latitude": 16.13372,
        "longitude": 80.55307
      },
      {
        "latitude": 16.15186,
        "longitude": 80.56212
      },
      {
        "latitude": 16.15072,
        "longitude": 80.57184
      },
      {
        "latitude": 16.12163,
        "longitude": 80.56937
      },
      {
        "latitude": 16.10244,
        "longitude": 80.59625
      },
      {
        "latitude": 16.0608,
        "longitude": 80.59059
      },
      {
        "latitude": 16.04817,
        "longitude": 80.59836
      },
      {
        "latitude": 16.04148,
        "longitude": 80.58306
      },
      {
        "latitude": 16.02468,
        "longitude": 80.58074
      },
      {
        "latitude": 16.03158,
        "longitude": 80.56262
      },
      {
        "latitude": 16.01337,
        "longitude": 80.5607
      },
      {
        "latitude": 16.00637,
        "longitude": 80.54653
      },
      {
        "latitude": 16.01046,
        "longitude": 80.53837
      },
      {
        "latitude": 15.9967,
        "longitude": 80.53527
      },
      {
        "latitude": 16.00017,
        "longitude": 80.52474
      },
      {
        "latitude": 16.01463,
        "longitude": 80.52912
      },
      {
        "latitude": 15.99674,
        "longitude": 80.4973
      },
      {
        "latitude": 16.00551,
        "longitude": 80.49961
      },
      {
        "latitude": 16.00967,
        "longitude": 80.49072
      },
      {
        "latitude": 16.01099,
        "longitude": 80.45857
      },
      {
        "latitude": 15.98156,
        "longitude": 80.45154
      },
      {
        "latitude": 15.98086,
        "longitude": 80.42568
      },
      {
        "latitude": 15.99977,
        "longitude": 80.42519
      },
      {
        "latitude": 16.01297,
        "longitude": 80.37127
      },
      {
        "latitude": 16.02704,
        "longitude": 80.3586
      },
      {
        "latitude": 16.02895,
        "longitude": 80.34501
      },
      {
        "latitude": 16.01513,
        "longitude": 80.33549
      },
      {
        "latitude": 16.01865,
        "longitude": 80.32507
      },
      {
        "latitude": 16.02561,
        "longitude": 80.32774
      },
      {
        "latitude": 16.02915,
        "longitude": 80.31361
      },
      {
        "latitude": 16.04506,
        "longitude": 80.31806
      },
      {
        "latitude": 16.05552,
        "longitude": 80.30177
      },
      {
        "latitude": 16.04981,
        "longitude": 80.30085
      },
      {
        "latitude": 16.05337,
        "longitude": 80.26238
      },
      {
        "latitude": 16.04597,
        "longitude": 80.26122
      },
      {
        "latitude": 16.05258,
        "longitude": 80.24001
      },
      {
        "latitude": 16.03221,
        "longitude": 80.22969
      },
      {
        "latitude": 16.0386,
        "longitude": 80.1897
      },
      {
        "latitude": 16.02562,
        "longitude": 80.18746
      },
      {
        "latitude": 16.04586,
        "longitude": 80.15492
      },
      {
        "latitude": 16.04573,
        "longitude": 80.13719
      },
      {
        "latitude": 16.01996,
        "longitude": 80.13283
      },
      {
        "latitude": 16.01585,
        "longitude": 80.13957
      },
      {
        "latitude": 16.02069,
        "longitude": 80.11995
      },
      {
        "latitude": 16.0115,
        "longitude": 80.09644
      },
      {
        "latitude": 16.02086,
        "longitude": 80.08607
      },
      {
        "latitude": 16.06301,
        "longitude": 80.08228
      },
      {
        "latitude": 16.07613,
        "longitude": 80.07054
      },
      {
        "latitude": 16.0923,
        "longitude": 80.07404
      },
      {
        "latitude": 16.08554,
        "longitude": 80.04722
      },
      {
        "latitude": 16.09269,
        "longitude": 80.04038
      },
      {
        "latitude": 16.13013,
        "longitude": 80.05131
      },
      {
        "latitude": 16.11643,
        "longitude": 80.02803
      },
      {
        "latitude": 16.11698,
        "longitude": 80.01253
      },
      {
        "latitude": 16.14017,
        "longitude": 80.00057
      },
      {
        "latitude": 16.14577,
        "longitude": 79.97398
      },
      {
        "latitude": 16.1544,
        "longitude": 79.97215
      },
      {
        "latitude": 16.16398,
        "longitude": 79.9512
      },
      {
        "latitude": 16.15162,
        "longitude": 79.95367
      },
      {
        "latitude": 16.13215,
        "longitude": 79.93267
      },
      {
        "latitude": 16.15467,
        "longitude": 79.87841
      },
      {
        "latitude": 16.13981,
        "longitude": 79.86748
      },
      {
        "latitude": 16.12887,
        "longitude": 79.87492
      },
      {
        "latitude": 16.09649,
        "longitude": 79.86819
      },
      {
        "latitude": 16.0861,
        "longitude": 79.88331
      },
      {
        "latitude": 16.08747,
        "longitude": 79.89489
      },
      {
        "latitude": 16.0774,
        "longitude": 79.89521
      },
      {
        "latitude": 16.07507,
        "longitude": 79.9155
      },
      {
        "latitude": 16.06138,
        "longitude": 79.92031
      },
      {
        "latitude": 16.04734,
        "longitude": 79.91682
      },
      {
        "latitude": 16.0306,
        "longitude": 79.86957
      },
      {
        "latitude": 15.99363,
        "longitude": 79.86271
      }
    ],
    "polygons": [
      [
        {
          "latitude": 15.99363,
          "longitude": 79.86271
        },
        {
          "latitude": 15.99977,
          "longitude": 79.87926
        },
        {
          "latitude": 15.98335,
          "longitude": 79.9034
        },
        {
          "latitude": 15.97158,
          "longitude": 79.89805
        },
        {
          "latitude": 15.96746,
          "longitude": 79.91174
        },
        {
          "latitude": 15.94248,
          "longitude": 79.90311
        },
        {
          "latitude": 15.94697,
          "longitude": 79.89651
        },
        {
          "latitude": 15.93931,
          "longitude": 79.89397
        },
        {
          "latitude": 15.94048,
          "longitude": 79.88109
        },
        {
          "latitude": 15.92753,
          "longitude": 79.87664
        },
        {
          "latitude": 15.90327,
          "longitude": 79.89469
        },
        {
          "latitude": 15.88849,
          "longitude": 79.89475
        },
        {
          "latitude": 15.87836,
          "longitude": 79.90962
        },
        {
          "latitude": 15.8714,
          "longitude": 79.90585
        },
        {
          "latitude": 15.85341,
          "longitude": 79.94817
        },
        {
          "latitude": 15.8316,
          "longitude": 79.94442
        },
        {
          "latitude": 15.82443,
          "longitude": 79.91847
        },
        {
          "latitude": 15.76343,
          "longitude": 79.90793
        },
        {
          "latitude": 15.74492,
          "longitude": 79.92019
        },
        {
          "latitude": 15.7223,
          "longitude": 79.90597
        },
        {
          "latitude": 15.71421,
          "longitude": 79.89152
        },
        {
          "latitude": 15.70617,
          "longitude": 79.89392
        },
        {
          "latitude": 15.68702,
          "longitude": 79.93936
        },
        {
          "latitude": 15.70118,
          "longitude": 79.94242
        },
        {
          "latitude": 15.69944,
          "longitude": 79.95129
        },
        {
          "latitude": 15.71508,
          "longitude": 79.97128
        },
        {
          "latitude": 15.70092,
          "longitude": 79.97935
        },
        {
          "latitude": 15.69143,
          "longitude": 80.01983
        },
        {
          "latitude": 15.68458,
          "longitude": 80.02378
        },
        {
          "latitude": 15.70914,
          "longitude": 80.03596
        },
        {
          "latitude": 15.69576,
          "longitude": 80.0638
        },
        {
          "latitude": 15.68221,
          "longitude": 80.06923
        },
        {
          "latitude": 15.68721,
          "longitude": 80.08729
        },
        {
          "latitude": 15.6812,
          "longitude": 80.10026
        },
        {
          "latitude": 15.67574,
          "longitude": 80.09755
        },
        {
          "latitude": 15.66936,
          "longitude": 80.12338
        },
        {
          "latitude": 15.68257,
          "longitude": 80.12841
        },
        {
          "latitude": 15.68955,
          "longitude": 80.11222
        },
        {
          "latitude": 15.70025,
          "longitude": 80.11173
        },
        {
          "latitude": 15.70048,
          "longitude": 80.12595
        },
        {
          "latitude": 15.6902,
          "longitude": 80.13741
        },
        {
          "latitude": 15.69932,
          "longitude": 80.14077
        },
        {
          "latitude": 15.69866,
          "longitude": 80.15114
        },
        {
          "latitude": 15.72643,
          "longitude": 80.1656
        },
        {
          "latitude": 15.73667,
          "longitude": 80.18583
        },
        {
          "latitude": 15.75903,
          "longitude": 80.18688
        },
        {
          "latitude": 15.76883,
          "longitude": 80.19734
        },
        {
          "latitude": 15.75186,
          "longitude": 80.2114
        },
        {
          "latitude": 15.70971,
          "longitude": 80.18844
        },
        {
          "latitude": 15.69426,
          "longitude": 80.19263
        },
        {
          "latitude": 15.68343,
          "longitude": 80.17926
        },
        {
          "latitude": 15.6501,
          "longitude": 80.17127
        },
        {
          "latitude": 15.63781,
          "longitude": 80.17957
        },
        {
          "latitude": 15.62399,
          "longitude": 80.17456
        },
        {
          "latitude": 15.61142,
          "longitude": 80.23809
        },
        {
          "latitude": 15.69374,
          "longitude": 80.28868
        },
        {
          "latitude": 15.76371,
          "longitude": 80.36192
        },
        {
          "latitude": 15.83618,
          "longitude": 80.4968
        },
        {
          "latitude": 15.87759,
          "longitude": 80.64024
        },
        {
          "latitude": 15.87931,
          "longitude": 80.72674
        },
        {
          "latitude": 15.85397,
          "longitude": 80.79405
        },
        {
          "latitude": 15.83448,
          "longitude": 80.81138
        },
        {
          "latitude": 15.81536,
          "longitude": 80.81344
        },
        {
          "latitude": 15.80618,
          "longitude": 80.80076
        },
        {
          "latitude": 15.842,
          "longitude": 80.78016
        },
        {
          "latitude": 15.83451,
          "longitude": 80.77985
        },
        {
          "latitude": 15.76461,
          "longitude": 80.81106
        },
        {
          "latitude": 15.71399,
          "longitude": 80.81988
        },
        {
          "latitude": 15.70702,
          "longitude": 80.83349
        },
        {
          "latitude": 15.76176,
          "longitude": 80.83805
        },
        {
          "latitude": 15.8453,
          "longitude": 80.87223
        },
        {
          "latitude": 15.85637,
          "longitude": 80.8862
        },
        {
          "latitude": 15.91725,
          "longitude": 80.90273
        },
        {
          "latitude": 15.9231,
          "longitude": 80.89461
        },
        {
          "latitude": 15.95362,
          "longitude": 80.89775
        },
        {
          "latitude": 15.96543,
          "longitude": 80.89648
        },
        {
          "latitude": 15.96085,
          "longitude": 80.88996
        },
        {
          "latitude": 16.00246,
          "longitude": 80.89103
        },
        {
          "latitude": 16.05317,
          "longitude": 80.87669
        },
        {
          "latitude": 16.06868,
          "longitude": 80.88066
        },
        {
          "latitude": 16.06852,
          "longitude": 80.87122
        },
        {
          "latitude": 16.07997,
          "longitude": 80.87546
        },
        {
          "latitude": 16.09099,
          "longitude": 80.86661
        },
        {
          "latitude": 16.10563,
          "longitude": 80.86773
        },
        {
          "latitude": 16.10389,
          "longitude": 80.85509
        },
        {
          "latitude": 16.13143,
          "longitude": 80.86412
        },
        {
          "latitude": 16.19885,
          "longitude": 80.82838
        },
        {
          "latitude": 16.21559,
          "longitude": 80.84129
        },
        {
          "latitude": 16.21787,
          "longitude": 80.82058
        },
        {
          "latitude": 16.24095,
          "longitude": 80.81751
        },
        {
          "latitude": 16.24532,
          "longitude": 80.78236
        },
        {
          "latitude": 16.2565,
          "longitude": 80.78173
        },
        {
          "latitude": 16.25004,
          "longitude": 80.77485
        },
        {
          "latitude": 16.25477,
          "longitude": 80.75858
        },
        {
          "latitude": 16.24817,
          "longitude": 80.75001
        },
        {
          "latitude": 16.23161,
          "longitude": 80.74845
        },
        {
          "latitude": 16.24494,
          "longitude": 80.71962
        },
        {
          "latitude": 16.23131,
          "longitude": 80.71542
        },
        {
          "latitude": 16.22849,
          "longitude": 80.69207
        },
        {
          "latitude": 16.19986,
          "longitude": 80.68577
        },
        {
          "latitude": 16.19408,
          "longitude": 80.67287
        },
        {
          "latitude": 16.19479,
          "longitude": 80.64944
        },
        {
          "latitude": 16.21435,
          "longitude": 80.64307
        },
        {
          "latitude": 16.21274,
          "longitude": 80.63357
        },
        {
          "latitude": 16.2263,
          "longitude": 80.621
        },
        {
          "latitude": 16.22326,
          "longitude": 80.60816
        },
        {
          "latitude": 16.23467,
          "longitude": 80.60533
        },
        {
          "latitude": 16.23745,
          "longitude": 80.59161
        },
        {
          "latitude": 16.20411,
          "longitude": 80.57111
        },
        {
          "latitude": 16.20312,
          "longitude": 80.55692
        },
        {
          "latitude": 16.17563,
          "longitude": 80.56324
        },
        {
          "latitude": 16.17875,
          "longitude": 80.55352
        },
        {
          "latitude": 16.16715,
          "longitude": 80.54498
        },
        {
          "latitude": 16.16278,
          "longitude": 80.55305
        },
        {
          "latitude": 16.13962,
          "longitude": 80.54313
        },
        {
          "latitude": 16.13372,
          "longitude": 80.55307
        },
        {
          "latitude": 16.15186,
          "longitude": 80.56212
        },
        {
          "latitude": 16.15072,
          "longitude": 80.57184
        },
        {
          "latitude": 16.12163,
          "longitude": 80.56937
        },
        {
          "latitude": 16.10244,
          "longitude": 80.59625
        },
        {
          "latitude": 16.0608,
          "longitude": 80.59059
        },
        {
          "latitude": 16.04817,
          "longitude": 80.59836
        },
        {
          "latitude": 16.04148,
          "longitude": 80.58306
        },
        {
          "latitude": 16.02468,
          "longitude": 80.58074
        },
        {
          "latitude": 16.03158,
          "longitude": 80.56262
        },
        {
          "latitude": 16.01337,
          "longitude": 80.5607
        },
        {
          "latitude": 16.00637,
          "longitude": 80.54653
        },
        {
          "latitude": 16.01046,
          "longitude": 80.53837
        },
        {
          "latitude": 15.9967,
          "longitude": 80.53527
        },
        {
          "latitude": 16.00017,
          "longitude": 80.52474
        },
        {
          "latitude": 16.01463,
          "longitude": 80.52912
        },
        {
          "latitude": 15.99674,
          "longitude": 80.4973
        },
        {
          "latitude": 16.00551,
          "longitude": 80.49961
        },
        {
          "latitude": 16.00967,
          "longitude": 80.49072
        },
        {
          "latitude": 16.01099,
          "longitude": 80.45857
        },
        {
          "latitude": 15.98156,
          "longitude": 80.45154
        },
        {
          "latitude": 15.98086,
          "longitude": 80.42568
        },
        {
          "latitude": 15.99977,
          "longitude": 80.42519
        },
        {
          "latitude": 16.01297,
          "longitude": 80.37127
        },
        {
          "latitude": 16.02704,
          "longitude": 80.3586
        },
        {
          "latitude": 16.02895,
          "longitude": 80.34501
        },
        {
          "latitude": 16.01513,
          "longitude": 80.33549
        },
        {
          "latitude": 16.01865,
          "longitude": 80.32507
        },
        {
          "latitude": 16.02561,
          "longitude": 80.32774
        },
        {
          "latitude": 16.02915,
          "longitude": 80.31361
        },
        {
          "latitude": 16.04506,
          "longitude": 80.31806
        },
        {
          "latitude": 16.05552,
          "longitude": 80.30177
        },
        {
          "latitude": 16.04981,
          "longitude": 80.30085
        },
        {
          "latitude": 16.05337,
          "longitude": 80.26238
        },
        {
          "latitude": 16.04597,
          "longitude": 80.26122
        },
        {
          "latitude": 16.05258,
          "longitude": 80.24001
        },
        {
          "latitude": 16.03221,
          "longitude": 80.22969
        },
        {
          "latitude": 16.0386,
          "longitude": 80.1897
        },
        {
          "latitude": 16.02562,
          "longitude": 80.18746
        },
        {
          "latitude": 16.04586,
          "longitude": 80.15492
        },
        {
          "latitude": 16.04573,
          "longitude": 80.13719
        },
        {
          "latitude": 16.01996,
          "longitude": 80.13283
        },
        {
          "latitude": 16.01585,
          "longitude": 80.13957
        },
        {
          "latitude": 16.02069,
          "longitude": 80.11995
        },
        {
          "latitude": 16.0115,
          "longitude": 80.09644
        },
        {
          "latitude": 16.02086,
          "longitude": 80.08607
        },
        {
          "latitude": 16.06301,
          "longitude": 80.08228
        },
        {
          "latitude": 16.07613,
          "longitude": 80.07054
        },
        {
          "latitude": 16.0923,
          "longitude": 80.07404
        },
        {
          "latitude": 16.08554,
          "longitude": 80.04722
        },
        {
          "latitude": 16.09269,
          "longitude": 80.04038
        },
        {
          "latitude": 16.13013,
          "longitude": 80.05131
        },
        {
          "latitude": 16.11643,
          "longitude": 80.02803
        },
        {
          "latitude": 16.11698,
          "longitude": 80.01253
        },
        {
          "latitude": 16.14017,
          "longitude": 80.00057
        },
        {
          "latitude": 16.14577,
          "longitude": 79.97398
        },
        {
          "latitude": 16.1544,
          "longitude": 79.97215
        },
        {
          "latitude": 16.16398,
          "longitude": 79.9512
        },
        {
          "latitude": 16.15162,
          "longitude": 79.95367
        },
        {
          "latitude": 16.13215,
          "longitude": 79.93267
        },
        {
          "latitude": 16.15467,
          "longitude": 79.87841
        },
        {
          "latitude": 16.13981,
          "longitude": 79.86748
        },
        {
          "latitude": 16.12887,
          "longitude": 79.87492
        },
        {
          "latitude": 16.09649,
          "longitude": 79.86819
        },
        {
          "latitude": 16.0861,
          "longitude": 79.88331
        },
        {
          "latitude": 16.08747,
          "longitude": 79.89489
        },
        {
          "latitude": 16.0774,
          "longitude": 79.89521
        },
        {
          "latitude": 16.07507,
          "longitude": 79.9155
        },
        {
          "latitude": 16.06138,
          "longitude": 79.92031
        },
        {
          "latitude": 16.04734,
          "longitude": 79.91682
        },
        {
          "latitude": 16.0306,
          "longitude": 79.86957
        },
        {
          "latitude": 15.99363,
          "longitude": 79.86271
        }
      ],
      [
        {
          "latitude": 15.78183,
          "longitude": 80.22147
        },
        {
          "latitude": 15.8068,
          "longitude": 80.22491
        },
        {
          "latitude": 15.77904,
          "longitude": 80.27339
        },
        {
          "latitude": 15.75501,
          "longitude": 80.25697
        },
        {
          "latitude": 15.78183,
          "longitude": 80.22147
        }
      ]
    ]
  },
  {
    "id": "chittoor",
    "name": "Chittoor",
    "headquarters": "Chittoor",
    "center": {
      "latitude": 13.2236,
      "longitude": 78.8587
    },
    "region": "Rayalaseema",
    "polygon": [
      {
        "latitude": 12.69437,
        "longitude": 78.19931
      },
      {
        "latitude": 12.68634,
        "longitude": 78.21098
      },
      {
        "latitude": 12.68643,
        "longitude": 78.23527
      },
      {
        "latitude": 12.70542,
        "longitude": 78.24409
      },
      {
        "latitude": 12.70506,
        "longitude": 78.27109
      },
      {
        "latitude": 12.66587,
        "longitude": 78.30099
      },
      {
        "latitude": 12.64874,
        "longitude": 78.34359
      },
      {
        "latitude": 12.62711,
        "longitude": 78.37143
      },
      {
        "latitude": 12.62686,
        "longitude": 78.41261
      },
      {
        "latitude": 12.63524,
        "longitude": 78.42707
      },
      {
        "latitude": 12.62403,
        "longitude": 78.46497
      },
      {
        "latitude": 12.64763,
        "longitude": 78.47478
      },
      {
        "latitude": 12.67589,
        "longitude": 78.4679
      },
      {
        "latitude": 12.67665,
        "longitude": 78.49982
      },
      {
        "latitude": 12.69141,
        "longitude": 78.50744
      },
      {
        "latitude": 12.70325,
        "longitude": 78.49658
      },
      {
        "latitude": 12.71677,
        "longitude": 78.50307
      },
      {
        "latitude": 12.7077,
        "longitude": 78.51178
      },
      {
        "latitude": 12.71201,
        "longitude": 78.52001
      },
      {
        "latitude": 12.74198,
        "longitude": 78.48909
      },
      {
        "latitude": 12.74715,
        "longitude": 78.49317
      },
      {
        "latitude": 12.74128,
        "longitude": 78.50583
      },
      {
        "latitude": 12.72576,
        "longitude": 78.51242
      },
      {
        "latitude": 12.72765,
        "longitude": 78.52058
      },
      {
        "latitude": 12.71406,
        "longitude": 78.527
      },
      {
        "latitude": 12.70852,
        "longitude": 78.54315
      },
      {
        "latitude": 12.70986,
        "longitude": 78.53007
      },
      {
        "latitude": 12.69055,
        "longitude": 78.53501
      },
      {
        "latitude": 12.70033,
        "longitude": 78.55724
      },
      {
        "latitude": 12.70922,
        "longitude": 78.56173
      },
      {
        "latitude": 12.71919,
        "longitude": 78.55536
      },
      {
        "latitude": 12.73676,
        "longitude": 78.56418
      },
      {
        "latitude": 12.739,
        "longitude": 78.55632
      },
      {
        "latitude": 12.75193,
        "longitude": 78.56319
      },
      {
        "latitude": 12.7558,
        "longitude": 78.55562
      },
      {
        "latitude": 12.7827,
        "longitude": 78.59251
      },
      {
        "latitude": 12.81845,
        "longitude": 78.60037
      },
      {
        "latitude": 12.82193,
        "longitude": 78.60774
      },
      {
        "latitude": 12.85083,
        "longitude": 78.60154
      },
      {
        "latitude": 12.93176,
        "longitude": 78.63343
      },
      {
        "latitude": 12.93212,
        "longitude": 78.657
      },
      {
        "latitude": 12.96477,
        "longitude": 78.63805
      },
      {
        "latitude": 12.96625,
        "longitude": 78.64716
      },
      {
        "latitude": 12.99124,
        "longitude": 78.6209
      },
      {
        "latitude": 13.0153,
        "longitude": 78.65583
      },
      {
        "latitude": 13.03115,
        "longitude": 78.65635
      },
      {
        "latitude": 13.0155,
        "longitude": 78.70518
      },
      {
        "latitude": 13.06866,
        "longitude": 78.71395
      },
      {
        "latitude": 13.05494,
        "longitude": 78.75178
      },
      {
        "latitude": 13.06658,
        "longitude": 78.7943
      },
      {
        "latitude": 13.08914,
        "longitude": 78.81314
      },
      {
        "latitude": 13.07861,
        "longitude": 78.84204
      },
      {
        "latitude": 13.08188,
        "longitude": 78.87097
      },
      {
        "latitude": 13.09681,
        "longitude": 78.87509
      },
      {
        "latitude": 13.09708,
        "longitude": 78.89158
      },
      {
        "latitude": 13.03305,
        "longitude": 78.89164
      },
      {
        "latitude": 13.03649,
        "longitude": 78.92912
      },
      {
        "latitude": 13.03042,
        "longitude": 78.9371
      },
      {
        "latitude": 13.0364,
        "longitude": 78.9408
      },
      {
        "latitude": 13.04575,
        "longitude": 78.92916
      },
      {
        "latitude": 13.0477,
        "longitude": 78.90367
      },
      {
        "latitude": 13.06593,
        "longitude": 78.91259
      },
      {
        "latitude": 13.06609,
        "longitude": 78.92173
      },
      {
        "latitude": 13.0808,
        "longitude": 78.92394
      },
      {
        "latitude": 13.08399,
        "longitude": 78.94919
      },
      {
        "latitude": 13.07471,
        "longitude": 78.97028
      },
      {
        "latitude": 13.0838,
        "longitude": 78.9723
      },
      {
        "latitude": 13.0866,
        "longitude": 78.995
      },
      {
        "latitude": 13.05311,
        "longitude": 79.0634
      },
      {
        "latitude": 13.04064,
        "longitude": 79.06287
      },
      {
        "latitude": 13.02573,
        "longitude": 79.08091
      },
      {
        "latitude": 13.02606,
        "longitude": 79.09831
      },
      {
        "latitude": 13.03927,
        "longitude": 79.11448
      },
      {
        "latitude": 13.02027,
        "longitude": 79.16312
      },
      {
        "latitude": 13.02985,
        "longitude": 79.18483
      },
      {
        "latitude": 13.04669,
        "longitude": 79.193
      },
      {
        "latitude": 13.04885,
        "longitude": 79.18044
      },
      {
        "latitude": 13.0545,
        "longitude": 79.17966
      },
      {
        "latitude": 13.05615,
        "longitude": 79.1921
      },
      {
        "latitude": 13.05919,
        "longitude": 79.1783
      },
      {
        "latitude": 13.06743,
        "longitude": 79.19212
      },
      {
        "latitude": 13.08424,
        "longitude": 79.18066
      },
      {
        "latitude": 13.08873,
        "longitude": 79.19069
      },
      {
        "latitude": 13.08134,
        "longitude": 79.19829
      },
      {
        "latitude": 13.10523,
        "longitude": 79.23443
      },
      {
        "latitude": 13.13937,
        "longitude": 79.23287
      },
      {
        "latitude": 13.14846,
        "longitude": 79.21003
      },
      {
        "latitude": 13.15696,
        "longitude": 79.21469
      },
      {
        "latitude": 13.15561,
        "longitude": 79.22732
      },
      {
        "latitude": 13.17123,
        "longitude": 79.23564
      },
      {
        "latitude": 13.171,
        "longitude": 79.24269
      },
      {
        "latitude": 13.13828,
        "longitude": 79.24527
      },
      {
        "latitude": 13.16074,
        "longitude": 79.25745
      },
      {
        "latitude": 13.14904,
        "longitude": 79.26209
      },
      {
        "latitude": 13.15287,
        "longitude": 79.28034
      },
      {
        "latitude": 13.12277,
        "longitude": 79.28402
      },
      {
        "latitude": 13.1259,
        "longitude": 79.31271
      },
      {
        "latitude": 13.11866,
        "longitude": 79.29926
      },
      {
        "latitude": 13.10696,
        "longitude": 79.29815
      },
      {
        "latitude": 13.11347,
        "longitude": 79.31889
      },
      {
        "latitude": 13.11636,
        "longitude": 79.31178
      },
      {
        "latitude": 13.11837,
        "longitude": 79.32406
      },
      {
        "latitude": 13.12347,
        "longitude": 79.31867
      },
      {
        "latitude": 13.13684,
        "longitude": 79.34117
      },
      {
        "latitude": 13.1214,
        "longitude": 79.34525
      },
      {
        "latitude": 13.12172,
        "longitude": 79.3581
      },
      {
        "latitude": 13.13393,
        "longitude": 79.36552
      },
      {
        "latitude": 13.16458,
        "longitude": 79.35612
      },
      {
        "latitude": 13.16292,
        "longitude": 79.37999
      },
      {
        "latitude": 13.17151,
        "longitude": 79.37923
      },
      {
        "latitude": 13.17428,
        "longitude": 79.37024
      },
      {
        "latitude": 13.17753,
        "longitude": 79.38773
      },
      {
        "latitude": 13.18926,
        "longitude": 79.37403
      },
      {
        "latitude": 13.19404,
        "longitude": 79.40918
      },
      {
        "latitude": 13.18818,
        "longitude": 79.43843
      },
      {
        "latitude": 13.19697,
        "longitude": 79.43238
      },
      {
        "latitude": 13.20777,
        "longitude": 79.44385
      },
      {
        "latitude": 13.21955,
        "longitude": 79.43738
      },
      {
        "latitude": 13.21694,
        "longitude": 79.4538
      },
      {
        "latitude": 13.23835,
        "longitude": 79.45315
      },
      {
        "latitude": 13.22972,
        "longitude": 79.43101
      },
      {
        "latitude": 13.23586,
        "longitude": 79.43979
      },
      {
        "latitude": 13.23606,
        "longitude": 79.43149
      },
      {
        "latitude": 13.24289,
        "longitude": 79.43768
      },
      {
        "latitude": 13.24296,
        "longitude": 79.4185
      },
      {
        "latitude": 13.25002,
        "longitude": 79.42371
      },
      {
        "latitude": 13.26391,
        "longitude": 79.40847
      },
      {
        "latitude": 13.27499,
        "longitude": 79.43373
      },
      {
        "latitude": 13.29128,
        "longitude": 79.43576
      },
      {
        "latitude": 13.29162,
        "longitude": 79.44631
      },
      {
        "latitude": 13.30172,
        "longitude": 79.44518
      },
      {
        "latitude": 13.30025,
        "longitude": 79.43054
      },
      {
        "latitude": 13.28955,
        "longitude": 79.42003
      },
      {
        "latitude": 13.30015,
        "longitude": 79.4138
      },
      {
        "latitude": 13.29743,
        "longitude": 79.38984
      },
      {
        "latitude": 13.31208,
        "longitude": 79.38289
      },
      {
        "latitude": 13.31735,
        "longitude": 79.40202
      },
      {
        "latitude": 13.3302,
        "longitude": 79.39836
      },
      {
        "latitude": 13.33504,
        "longitude": 79.40536
      },
      {
        "latitude": 13.33003,
        "longitude": 79.41472
      },
      {
        "latitude": 13.33671,
        "longitude": 79.43167
      },
      {
        "latitude": 13.35171,
        "longitude": 79.43543
      },
      {
        "latitude": 13.33857,
        "longitude": 79.45625
      },
      {
        "latitude": 13.34685,
        "longitude": 79.4981
      },
      {
        "latitude": 13.36945,
        "longitude": 79.50941
      },
      {
        "latitude": 13.44222,
        "longitude": 79.50988
      },
      {
        "latitude": 13.44429,
        "longitude": 79.52049
      },
      {
        "latitude": 13.45481,
        "longitude": 79.51955
      },
      {
        "latitude": 13.46562,
        "longitude": 79.50287
      },
      {
        "latitude": 13.45485,
        "longitude": 79.4863
      },
      {
        "latitude": 13.4723,
        "longitude": 79.4746
      },
      {
        "latitude": 13.47138,
        "longitude": 79.50026
      },
      {
        "latitude": 13.48405,
        "longitude": 79.50251
      },
      {
        "latitude": 13.493,
        "longitude": 79.51859
      },
      {
        "latitude": 13.49506,
        "longitude": 79.49146
      },
      {
        "latitude": 13.51053,
        "longitude": 79.48944
      },
      {
        "latitude": 13.50669,
        "longitude": 79.45756
      },
      {
        "latitude": 13.48591,
        "longitude": 79.41992
      },
      {
        "latitude": 13.49205,
        "longitude": 79.41231
      },
      {
        "latitude": 13.5025,
        "longitude": 79.41508
      },
      {
        "latitude": 13.50299,
        "longitude": 79.40449
      },
      {
        "latitude": 13.48908,
        "longitude": 79.38616
      },
      {
        "latitude": 13.48243,
        "longitude": 79.2898
      },
      {
        "latitude": 13.47012,
        "longitude": 79.26009
      },
      {
        "latitude": 13.44112,
        "longitude": 79.2398
      },
      {
        "latitude": 13.44887,
        "longitude": 79.22808
      },
      {
        "latitude": 13.43714,
        "longitude": 79.21707
      },
      {
        "latitude": 13.43739,
        "longitude": 79.2398
      },
      {
        "latitude": 13.42634,
        "longitude": 79.24202
      },
      {
        "latitude": 13.4207,
        "longitude": 79.25485
      },
      {
        "latitude": 13.41732,
        "longitude": 79.23332
      },
      {
        "latitude": 13.42348,
        "longitude": 79.22901
      },
      {
        "latitude": 13.41723,
        "longitude": 79.22123
      },
      {
        "latitude": 13.42766,
        "longitude": 79.21161
      },
      {
        "latitude": 13.42142,
        "longitude": 79.20536
      },
      {
        "latitude": 13.41282,
        "longitude": 79.20726
      },
      {
        "latitude": 13.41083,
        "longitude": 79.22804
      },
      {
        "latitude": 13.3965,
        "longitude": 79.22135
      },
      {
        "latitude": 13.39992,
        "longitude": 79.2495
      },
      {
        "latitude": 13.37566,
        "longitude": 79.25038
      },
      {
        "latitude": 13.37772,
        "longitude": 79.23931
      },
      {
        "latitude": 13.39399,
        "longitude": 79.23598
      },
      {
        "latitude": 13.38066,
        "longitude": 79.21752
      },
      {
        "latitude": 13.39942,
        "longitude": 79.19958
      },
      {
        "latitude": 13.3937,
        "longitude": 79.18079
      },
      {
        "latitude": 13.37899,
        "longitude": 79.18095
      },
      {
        "latitude": 13.38514,
        "longitude": 79.15688
      },
      {
        "latitude": 13.37866,
        "longitude": 79.145
      },
      {
        "latitude": 13.40096,
        "longitude": 79.16156
      },
      {
        "latitude": 13.41382,
        "longitude": 79.15392
      },
      {
        "latitude": 13.40976,
        "longitude": 79.14257
      },
      {
        "latitude": 13.42178,
        "longitude": 79.14206
      },
      {
        "latitude": 13.42514,
        "longitude": 79.09211
      },
      {
        "latitude": 13.44036,
        "longitude": 79.09122
      },
      {
        "latitude": 13.45047,
        "longitude": 79.07151
      },
      {
        "latitude": 13.44885,
        "longitude": 79.05526
      },
      {
        "latitude": 13.47074,
        "longitude": 79.03642
      },
      {
        "latitude": 13.49223,
        "longitude": 78.99947
      },
      {
        "latitude": 13.49134,
        "longitude": 78.9813
      },
      {
        "latitude": 13.51595,
        "longitude": 78.9842
      },
      {
        "latitude": 13.52894,
        "longitude": 78.97768
      },
      {
        "latitude": 13.54156,
        "longitude": 78.95125
      },
      {
        "latitude": 13.54006,
        "longitude": 79.00414
      },
      {
        "latitude": 13.54364,
        "longitude": 79.01534
      },
      {
        "latitude": 13.56243,
        "longitude": 79.02145
      },
      {
        "latitude": 13.56257,
        "longitude": 79.03656
      },
      {
        "latitude": 13.5412,
        "longitude": 79.04304
      },
      {
        "latitude": 13.52953,
        "longitude": 79.06417
      },
      {
        "latitude": 13.53237,
        "longitude": 79.08201
      },
      {
        "latitude": 13.51798,
        "longitude": 79.0841
      },
      {
        "latitude": 13.5132,
        "longitude": 79.0987
      },
      {
        "latitude": 13.52174,
        "longitude": 79.11104
      },
      {
        "latitude": 13.52181,
        "longitude": 79.14392
      },
      {
        "latitude": 13.54428,
        "longitude": 79.17992
      },
      {
        "latitude": 13.56527,
        "longitude": 79.17017
      },
      {
        "latitude": 13.60334,
        "longitude": 79.1724
      },
      {
        "latitude": 13.61228,
        "longitude": 79.05495
      },
      {
        "latitude": 13.61837,
        "longitude": 79.04924
      },
      {
        "latitude": 13.64521,
        "longitude": 79.05261
      },
      {
        "latitude": 13.65894,
        "longitude": 79.07362
      },
      {
        "latitude": 13.72195,
        "longitude": 79.09292
      },
      {
        "latitude": 13.73869,
        "longitude": 79.08216
      },
      {
        "latitude": 13.77126,
        "longitude": 79.0911
      },
      {
        "latitude": 13.78263,
        "longitude": 79.0856
      },
      {
        "latitude": 13.77622,
        "longitude": 79.04547
      },
      {
        "latitude": 13.77189,
        "longitude": 79.03883
      },
      {
        "latitude": 13.74657,
        "longitude": 79.03873
      },
      {
        "latitude": 13.74116,
        "longitude": 79.01676
      },
      {
        "latitude": 13.7259,
        "longitude": 79.0034
      },
      {
        "latitude": 13.72082,
        "longitude": 78.97822
      },
      {
        "latitude": 13.69209,
        "longitude": 78.97853
      },
      {
        "latitude": 13.6683,
        "longitude": 78.99595
      },
      {
        "latitude": 13.65415,
        "longitude": 78.97668
      },
      {
        "latitude": 13.65393,
        "longitude": 78.99111
      },
      {
        "latitude": 13.6313,
        "longitude": 78.99668
      },
      {
        "latitude": 13.62469,
        "longitude": 78.96726
      },
      {
        "latitude": 13.60349,
        "longitude": 78.97351
      },
      {
        "latitude": 13.58226,
        "longitude": 78.95514
      },
      {
        "latitude": 13.59342,
        "longitude": 78.93499
      },
      {
        "latitude": 13.58198,
        "longitude": 78.92789
      },
      {
        "latitude": 13.58015,
        "longitude": 78.91219
      },
      {
        "latitude": 13.59301,
        "longitude": 78.90044
      },
      {
        "latitude": 13.59829,
        "longitude": 78.87314
      },
      {
        "latitude": 13.62515,
        "longitude": 78.88661
      },
      {
        "latitude": 13.65979,
        "longitude": 78.88205
      },
      {
        "latitude": 13.65838,
        "longitude": 78.86266
      },
      {
        "latitude": 13.67812,
        "longitude": 78.85263
      },
      {
        "latitude": 13.64928,
        "longitude": 78.85136
      },
      {
        "latitude": 13.61241,
        "longitude": 78.81823
      },
      {
        "latitude": 13.61139,
        "longitude": 78.79484
      },
      {
        "latitude": 13.58185,
        "longitude": 78.80274
      },
      {
        "latitude": 13.58677,
        "longitude": 78.75066
      },
      {
        "latitude": 13.56719,
        "longitude": 78.73893
      },
      {
        "latitude": 13.5301,
        "longitude": 78.73927
      },
      {
        "latitude": 13.51394,
        "longitude": 78.71385
      },
      {
        "latitude": 13.5382,
        "longitude": 78.72153
      },
      {
        "latitude": 13.5354,
        "longitude": 78.69222
      },
      {
        "latitude": 13.5042,
        "longitude": 78.67759
      },
      {
        "latitude": 13.50601,
        "longitude": 78.67173
      },
      {
        "latitude": 13.51962,
        "longitude": 78.67487
      },
      {
        "latitude": 13.52665,
        "longitude": 78.65905
      },
      {
        "latitude": 13.51682,
        "longitude": 78.62785
      },
      {
        "latitude": 13.49926,
        "longitude": 78.66339
      },
      {
        "latitude": 13.48391,
        "longitude": 78.6593
      },
      {
        "latitude": 13.48727,
        "longitude": 78.60084
      },
      {
        "latitude": 13.51581,
        "longitude": 78.56769
      },
      {
        "latitude": 13.48332,
        "longitude": 78.54344
      },
      {
        "latitude": 13.49014,
        "longitude": 78.53977
      },
      {
        "latitude": 13.48313,
        "longitude": 78.49929
      },
      {
        "latitude": 13.45518,
        "longitude": 78.47694
      },
      {
        "latitude": 13.45096,
        "longitude": 78.48544
      },
      {
        "latitude": 13.44321,
        "longitude": 78.47947
      },
      {
        "latitude": 13.44322,
        "longitude": 78.50515
      },
      {
        "latitude": 13.42622,
        "longitude": 78.4999
      },
      {
        "latitude": 13.411,
        "longitude": 78.51841
      },
      {
        "latitude": 13.38062,
        "longitude": 78.52158
      },
      {
        "latitude": 13.36788,
        "longitude": 78.50576
      },
      {
        "latitude": 13.36395,
        "longitude": 78.52137
      },
      {
        "latitude": 13.35487,
        "longitude": 78.52523
      },
      {
        "latitude": 13.3411,
        "longitude": 78.51733
      },
      {
        "latitude": 13.33837,
        "longitude": 78.49669
      },
      {
        "latitude": 13.32198,
        "longitude": 78.47888
      },
      {
        "latitude": 13.30129,
        "longitude": 78.47931
      },
      {
        "latitude": 13.29043,
        "longitude": 78.51378
      },
      {
        "latitude": 13.26682,
        "longitude": 78.53194
      },
      {
        "latitude": 13.28781,
        "longitude": 78.53924
      },
      {
        "latitude": 13.28382,
        "longitude": 78.55603
      },
      {
        "latitude": 13.29417,
        "longitude": 78.56451
      },
      {
        "latitude": 13.3093,
        "longitude": 78.56305
      },
      {
        "latitude": 13.30906,
        "longitude": 78.56931
      },
      {
        "latitude": 13.28016,
        "longitude": 78.57861
      },
      {
        "latitude": 13.28043,
        "longitude": 78.58723
      },
      {
        "latitude": 13.22395,
        "longitude": 78.56712
      },
      {
        "latitude": 13.21547,
        "longitude": 78.57977
      },
      {
        "latitude": 13.20121,
        "longitude": 78.56786
      },
      {
        "latitude": 13.19994,
        "longitude": 78.55049
      },
      {
        "latitude": 13.18958,
        "longitude": 78.55031
      },
      {
        "latitude": 13.19296,
        "longitude": 78.56788
      },
      {
        "latitude": 13.16719,
        "longitude": 78.58003
      },
      {
        "latitude": 13.1638,
        "longitude": 78.55036
      },
      {
        "latitude": 13.15323,
        "longitude": 78.54111
      },
      {
        "latitude": 13.14827,
        "longitude": 78.54881
      },
      {
        "latitude": 13.14202,
        "longitude": 78.54532
      },
      {
        "latitude": 13.13134,
        "longitude": 78.51763
      },
      {
        "latitude": 13.11983,
        "longitude": 78.51898
      },
      {
        "latitude": 13.10569,
        "longitude": 78.53861
      },
      {
        "latitude": 13.09144,
        "longitude": 78.5099
      },
      {
        "latitude": 13.06187,
        "longitude": 78.51425
      },
      {
        "latitude": 13.06179,
        "longitude": 78.49147
      },
      {
        "latitude": 13.04398,
        "longitude": 78.47124
      },
      {
        "latitude": 12.9985,
        "longitude": 78.46762
      },
      {
        "latitude": 12.99141,
        "longitude": 78.47473
      },
      {
        "latitude": 12.97499,
        "longitude": 78.46739
      },
      {
        "latitude": 12.98101,
        "longitude": 78.43526
      },
      {
        "latitude": 12.96395,
        "longitude": 78.43791
      },
      {
        "latitude": 12.95865,
        "longitude": 78.41921
      },
      {
        "latitude": 12.94771,
        "longitude": 78.42033
      },
      {
        "latitude": 12.94545,
        "longitude": 78.4111
      },
      {
        "latitude": 12.9217,
        "longitude": 78.41877
      },
      {
        "latitude": 12.93206,
        "longitude": 78.42813
      },
      {
        "latitude": 12.92899,
        "longitude": 78.43796
      },
      {
        "latitude": 12.90538,
        "longitude": 78.46664
      },
      {
        "latitude": 12.86674,
        "longitude": 78.46472
      },
      {
        "latitude": 12.87767,
        "longitude": 78.46406
      },
      {
        "latitude": 12.89218,
        "longitude": 78.44719
      },
      {
        "latitude": 12.91177,
        "longitude": 78.44553
      },
      {
        "latitude": 12.91181,
        "longitude": 78.4349
      },
      {
        "latitude": 12.90205,
        "longitude": 78.4286
      },
      {
        "latitude": 12.90321,
        "longitude": 78.41217
      },
      {
        "latitude": 12.91729,
        "longitude": 78.39862
      },
      {
        "latitude": 12.90696,
        "longitude": 78.3961
      },
      {
        "latitude": 12.90684,
        "longitude": 78.38866
      },
      {
        "latitude": 12.93967,
        "longitude": 78.35406
      },
      {
        "latitude": 12.90791,
        "longitude": 78.34418
      },
      {
        "latitude": 12.90177,
        "longitude": 78.32351
      },
      {
        "latitude": 12.88725,
        "longitude": 78.32031
      },
      {
        "latitude": 12.8892,
        "longitude": 78.3345
      },
      {
        "latitude": 12.88235,
        "longitude": 78.33706
      },
      {
        "latitude": 12.87557,
        "longitude": 78.33101
      },
      {
        "latitude": 12.87621,
        "longitude": 78.31368
      },
      {
        "latitude": 12.85851,
        "longitude": 78.31244
      },
      {
        "latitude": 12.85941,
        "longitude": 78.28225
      },
      {
        "latitude": 12.86769,
        "longitude": 78.2684
      },
      {
        "latitude": 12.86102,
        "longitude": 78.25262
      },
      {
        "latitude": 12.78827,
        "longitude": 78.24564
      },
      {
        "latitude": 12.76066,
        "longitude": 78.23095
      },
      {
        "latitude": 12.72968,
        "longitude": 78.24027
      },
      {
        "latitude": 12.71341,
        "longitude": 78.23073
      },
      {
        "latitude": 12.70806,
        "longitude": 78.20687
      },
      {
        "latitude": 12.69971,
        "longitude": 78.20852
      },
      {
        "latitude": 12.69437,
        "longitude": 78.19931
      }
    ],
    "polygons": [
      [
        {
          "latitude": 12.69437,
          "longitude": 78.19931
        },
        {
          "latitude": 12.68634,
          "longitude": 78.21098
        },
        {
          "latitude": 12.68643,
          "longitude": 78.23527
        },
        {
          "latitude": 12.70542,
          "longitude": 78.24409
        },
        {
          "latitude": 12.70506,
          "longitude": 78.27109
        },
        {
          "latitude": 12.66587,
          "longitude": 78.30099
        },
        {
          "latitude": 12.64874,
          "longitude": 78.34359
        },
        {
          "latitude": 12.62711,
          "longitude": 78.37143
        },
        {
          "latitude": 12.62686,
          "longitude": 78.41261
        },
        {
          "latitude": 12.63524,
          "longitude": 78.42707
        },
        {
          "latitude": 12.62403,
          "longitude": 78.46497
        },
        {
          "latitude": 12.64763,
          "longitude": 78.47478
        },
        {
          "latitude": 12.67589,
          "longitude": 78.4679
        },
        {
          "latitude": 12.67665,
          "longitude": 78.49982
        },
        {
          "latitude": 12.69141,
          "longitude": 78.50744
        },
        {
          "latitude": 12.70325,
          "longitude": 78.49658
        },
        {
          "latitude": 12.71677,
          "longitude": 78.50307
        },
        {
          "latitude": 12.7077,
          "longitude": 78.51178
        },
        {
          "latitude": 12.71201,
          "longitude": 78.52001
        },
        {
          "latitude": 12.74198,
          "longitude": 78.48909
        },
        {
          "latitude": 12.74715,
          "longitude": 78.49317
        },
        {
          "latitude": 12.74128,
          "longitude": 78.50583
        },
        {
          "latitude": 12.72576,
          "longitude": 78.51242
        },
        {
          "latitude": 12.72765,
          "longitude": 78.52058
        },
        {
          "latitude": 12.71406,
          "longitude": 78.527
        },
        {
          "latitude": 12.70852,
          "longitude": 78.54315
        },
        {
          "latitude": 12.70986,
          "longitude": 78.53007
        },
        {
          "latitude": 12.69055,
          "longitude": 78.53501
        },
        {
          "latitude": 12.70033,
          "longitude": 78.55724
        },
        {
          "latitude": 12.70922,
          "longitude": 78.56173
        },
        {
          "latitude": 12.71919,
          "longitude": 78.55536
        },
        {
          "latitude": 12.73676,
          "longitude": 78.56418
        },
        {
          "latitude": 12.739,
          "longitude": 78.55632
        },
        {
          "latitude": 12.75193,
          "longitude": 78.56319
        },
        {
          "latitude": 12.7558,
          "longitude": 78.55562
        },
        {
          "latitude": 12.7827,
          "longitude": 78.59251
        },
        {
          "latitude": 12.81845,
          "longitude": 78.60037
        },
        {
          "latitude": 12.82193,
          "longitude": 78.60774
        },
        {
          "latitude": 12.85083,
          "longitude": 78.60154
        },
        {
          "latitude": 12.93176,
          "longitude": 78.63343
        },
        {
          "latitude": 12.93212,
          "longitude": 78.657
        },
        {
          "latitude": 12.96477,
          "longitude": 78.63805
        },
        {
          "latitude": 12.96625,
          "longitude": 78.64716
        },
        {
          "latitude": 12.99124,
          "longitude": 78.6209
        },
        {
          "latitude": 13.0153,
          "longitude": 78.65583
        },
        {
          "latitude": 13.03115,
          "longitude": 78.65635
        },
        {
          "latitude": 13.0155,
          "longitude": 78.70518
        },
        {
          "latitude": 13.06866,
          "longitude": 78.71395
        },
        {
          "latitude": 13.05494,
          "longitude": 78.75178
        },
        {
          "latitude": 13.06658,
          "longitude": 78.7943
        },
        {
          "latitude": 13.08914,
          "longitude": 78.81314
        },
        {
          "latitude": 13.07861,
          "longitude": 78.84204
        },
        {
          "latitude": 13.08188,
          "longitude": 78.87097
        },
        {
          "latitude": 13.09681,
          "longitude": 78.87509
        },
        {
          "latitude": 13.09708,
          "longitude": 78.89158
        },
        {
          "latitude": 13.03305,
          "longitude": 78.89164
        },
        {
          "latitude": 13.03649,
          "longitude": 78.92912
        },
        {
          "latitude": 13.03042,
          "longitude": 78.9371
        },
        {
          "latitude": 13.0364,
          "longitude": 78.9408
        },
        {
          "latitude": 13.04575,
          "longitude": 78.92916
        },
        {
          "latitude": 13.0477,
          "longitude": 78.90367
        },
        {
          "latitude": 13.06593,
          "longitude": 78.91259
        },
        {
          "latitude": 13.06609,
          "longitude": 78.92173
        },
        {
          "latitude": 13.0808,
          "longitude": 78.92394
        },
        {
          "latitude": 13.08399,
          "longitude": 78.94919
        },
        {
          "latitude": 13.07471,
          "longitude": 78.97028
        },
        {
          "latitude": 13.0838,
          "longitude": 78.9723
        },
        {
          "latitude": 13.0866,
          "longitude": 78.995
        },
        {
          "latitude": 13.05311,
          "longitude": 79.0634
        },
        {
          "latitude": 13.04064,
          "longitude": 79.06287
        },
        {
          "latitude": 13.02573,
          "longitude": 79.08091
        },
        {
          "latitude": 13.02606,
          "longitude": 79.09831
        },
        {
          "latitude": 13.03927,
          "longitude": 79.11448
        },
        {
          "latitude": 13.02027,
          "longitude": 79.16312
        },
        {
          "latitude": 13.02985,
          "longitude": 79.18483
        },
        {
          "latitude": 13.04669,
          "longitude": 79.193
        },
        {
          "latitude": 13.04885,
          "longitude": 79.18044
        },
        {
          "latitude": 13.0545,
          "longitude": 79.17966
        },
        {
          "latitude": 13.05615,
          "longitude": 79.1921
        },
        {
          "latitude": 13.05919,
          "longitude": 79.1783
        },
        {
          "latitude": 13.06743,
          "longitude": 79.19212
        },
        {
          "latitude": 13.08424,
          "longitude": 79.18066
        },
        {
          "latitude": 13.08873,
          "longitude": 79.19069
        },
        {
          "latitude": 13.08134,
          "longitude": 79.19829
        },
        {
          "latitude": 13.10523,
          "longitude": 79.23443
        },
        {
          "latitude": 13.13937,
          "longitude": 79.23287
        },
        {
          "latitude": 13.14846,
          "longitude": 79.21003
        },
        {
          "latitude": 13.15696,
          "longitude": 79.21469
        },
        {
          "latitude": 13.15561,
          "longitude": 79.22732
        },
        {
          "latitude": 13.17123,
          "longitude": 79.23564
        },
        {
          "latitude": 13.171,
          "longitude": 79.24269
        },
        {
          "latitude": 13.13828,
          "longitude": 79.24527
        },
        {
          "latitude": 13.16074,
          "longitude": 79.25745
        },
        {
          "latitude": 13.14904,
          "longitude": 79.26209
        },
        {
          "latitude": 13.15287,
          "longitude": 79.28034
        },
        {
          "latitude": 13.12277,
          "longitude": 79.28402
        },
        {
          "latitude": 13.1259,
          "longitude": 79.31271
        },
        {
          "latitude": 13.11866,
          "longitude": 79.29926
        },
        {
          "latitude": 13.10696,
          "longitude": 79.29815
        },
        {
          "latitude": 13.11347,
          "longitude": 79.31889
        },
        {
          "latitude": 13.11636,
          "longitude": 79.31178
        },
        {
          "latitude": 13.11837,
          "longitude": 79.32406
        },
        {
          "latitude": 13.12347,
          "longitude": 79.31867
        },
        {
          "latitude": 13.13684,
          "longitude": 79.34117
        },
        {
          "latitude": 13.1214,
          "longitude": 79.34525
        },
        {
          "latitude": 13.12172,
          "longitude": 79.3581
        },
        {
          "latitude": 13.13393,
          "longitude": 79.36552
        },
        {
          "latitude": 13.16458,
          "longitude": 79.35612
        },
        {
          "latitude": 13.16292,
          "longitude": 79.37999
        },
        {
          "latitude": 13.17151,
          "longitude": 79.37923
        },
        {
          "latitude": 13.17428,
          "longitude": 79.37024
        },
        {
          "latitude": 13.17753,
          "longitude": 79.38773
        },
        {
          "latitude": 13.18926,
          "longitude": 79.37403
        },
        {
          "latitude": 13.19404,
          "longitude": 79.40918
        },
        {
          "latitude": 13.18818,
          "longitude": 79.43843
        },
        {
          "latitude": 13.19697,
          "longitude": 79.43238
        },
        {
          "latitude": 13.20777,
          "longitude": 79.44385
        },
        {
          "latitude": 13.21955,
          "longitude": 79.43738
        },
        {
          "latitude": 13.21694,
          "longitude": 79.4538
        },
        {
          "latitude": 13.23835,
          "longitude": 79.45315
        },
        {
          "latitude": 13.22972,
          "longitude": 79.43101
        },
        {
          "latitude": 13.23586,
          "longitude": 79.43979
        },
        {
          "latitude": 13.23606,
          "longitude": 79.43149
        },
        {
          "latitude": 13.24289,
          "longitude": 79.43768
        },
        {
          "latitude": 13.24296,
          "longitude": 79.4185
        },
        {
          "latitude": 13.25002,
          "longitude": 79.42371
        },
        {
          "latitude": 13.26391,
          "longitude": 79.40847
        },
        {
          "latitude": 13.27499,
          "longitude": 79.43373
        },
        {
          "latitude": 13.29128,
          "longitude": 79.43576
        },
        {
          "latitude": 13.29162,
          "longitude": 79.44631
        },
        {
          "latitude": 13.30172,
          "longitude": 79.44518
        },
        {
          "latitude": 13.30025,
          "longitude": 79.43054
        },
        {
          "latitude": 13.28955,
          "longitude": 79.42003
        },
        {
          "latitude": 13.30015,
          "longitude": 79.4138
        },
        {
          "latitude": 13.29743,
          "longitude": 79.38984
        },
        {
          "latitude": 13.31208,
          "longitude": 79.38289
        },
        {
          "latitude": 13.31735,
          "longitude": 79.40202
        },
        {
          "latitude": 13.3302,
          "longitude": 79.39836
        },
        {
          "latitude": 13.33504,
          "longitude": 79.40536
        },
        {
          "latitude": 13.33003,
          "longitude": 79.41472
        },
        {
          "latitude": 13.33671,
          "longitude": 79.43167
        },
        {
          "latitude": 13.35171,
          "longitude": 79.43543
        },
        {
          "latitude": 13.33857,
          "longitude": 79.45625
        },
        {
          "latitude": 13.34685,
          "longitude": 79.4981
        },
        {
          "latitude": 13.36945,
          "longitude": 79.50941
        },
        {
          "latitude": 13.44222,
          "longitude": 79.50988
        },
        {
          "latitude": 13.44429,
          "longitude": 79.52049
        },
        {
          "latitude": 13.45481,
          "longitude": 79.51955
        },
        {
          "latitude": 13.46562,
          "longitude": 79.50287
        },
        {
          "latitude": 13.45485,
          "longitude": 79.4863
        },
        {
          "latitude": 13.4723,
          "longitude": 79.4746
        },
        {
          "latitude": 13.47138,
          "longitude": 79.50026
        },
        {
          "latitude": 13.48405,
          "longitude": 79.50251
        },
        {
          "latitude": 13.493,
          "longitude": 79.51859
        },
        {
          "latitude": 13.49506,
          "longitude": 79.49146
        },
        {
          "latitude": 13.51053,
          "longitude": 79.48944
        },
        {
          "latitude": 13.50669,
          "longitude": 79.45756
        },
        {
          "latitude": 13.48591,
          "longitude": 79.41992
        },
        {
          "latitude": 13.49205,
          "longitude": 79.41231
        },
        {
          "latitude": 13.5025,
          "longitude": 79.41508
        },
        {
          "latitude": 13.50299,
          "longitude": 79.40449
        },
        {
          "latitude": 13.48908,
          "longitude": 79.38616
        },
        {
          "latitude": 13.48243,
          "longitude": 79.2898
        },
        {
          "latitude": 13.47012,
          "longitude": 79.26009
        },
        {
          "latitude": 13.44112,
          "longitude": 79.2398
        },
        {
          "latitude": 13.44887,
          "longitude": 79.22808
        },
        {
          "latitude": 13.43714,
          "longitude": 79.21707
        },
        {
          "latitude": 13.43739,
          "longitude": 79.2398
        },
        {
          "latitude": 13.42634,
          "longitude": 79.24202
        },
        {
          "latitude": 13.4207,
          "longitude": 79.25485
        },
        {
          "latitude": 13.41732,
          "longitude": 79.23332
        },
        {
          "latitude": 13.42348,
          "longitude": 79.22901
        },
        {
          "latitude": 13.41723,
          "longitude": 79.22123
        },
        {
          "latitude": 13.42766,
          "longitude": 79.21161
        },
        {
          "latitude": 13.42142,
          "longitude": 79.20536
        },
        {
          "latitude": 13.41282,
          "longitude": 79.20726
        },
        {
          "latitude": 13.41083,
          "longitude": 79.22804
        },
        {
          "latitude": 13.3965,
          "longitude": 79.22135
        },
        {
          "latitude": 13.39992,
          "longitude": 79.2495
        },
        {
          "latitude": 13.37566,
          "longitude": 79.25038
        },
        {
          "latitude": 13.37772,
          "longitude": 79.23931
        },
        {
          "latitude": 13.39399,
          "longitude": 79.23598
        },
        {
          "latitude": 13.38066,
          "longitude": 79.21752
        },
        {
          "latitude": 13.39942,
          "longitude": 79.19958
        },
        {
          "latitude": 13.3937,
          "longitude": 79.18079
        },
        {
          "latitude": 13.37899,
          "longitude": 79.18095
        },
        {
          "latitude": 13.38514,
          "longitude": 79.15688
        },
        {
          "latitude": 13.37866,
          "longitude": 79.145
        },
        {
          "latitude": 13.40096,
          "longitude": 79.16156
        },
        {
          "latitude": 13.41382,
          "longitude": 79.15392
        },
        {
          "latitude": 13.40976,
          "longitude": 79.14257
        },
        {
          "latitude": 13.42178,
          "longitude": 79.14206
        },
        {
          "latitude": 13.42514,
          "longitude": 79.09211
        },
        {
          "latitude": 13.44036,
          "longitude": 79.09122
        },
        {
          "latitude": 13.45047,
          "longitude": 79.07151
        },
        {
          "latitude": 13.44885,
          "longitude": 79.05526
        },
        {
          "latitude": 13.47074,
          "longitude": 79.03642
        },
        {
          "latitude": 13.49223,
          "longitude": 78.99947
        },
        {
          "latitude": 13.49134,
          "longitude": 78.9813
        },
        {
          "latitude": 13.51595,
          "longitude": 78.9842
        },
        {
          "latitude": 13.52894,
          "longitude": 78.97768
        },
        {
          "latitude": 13.54156,
          "longitude": 78.95125
        },
        {
          "latitude": 13.54006,
          "longitude": 79.00414
        },
        {
          "latitude": 13.54364,
          "longitude": 79.01534
        },
        {
          "latitude": 13.56243,
          "longitude": 79.02145
        },
        {
          "latitude": 13.56257,
          "longitude": 79.03656
        },
        {
          "latitude": 13.5412,
          "longitude": 79.04304
        },
        {
          "latitude": 13.52953,
          "longitude": 79.06417
        },
        {
          "latitude": 13.53237,
          "longitude": 79.08201
        },
        {
          "latitude": 13.51798,
          "longitude": 79.0841
        },
        {
          "latitude": 13.5132,
          "longitude": 79.0987
        },
        {
          "latitude": 13.52174,
          "longitude": 79.11104
        },
        {
          "latitude": 13.52181,
          "longitude": 79.14392
        },
        {
          "latitude": 13.54428,
          "longitude": 79.17992
        },
        {
          "latitude": 13.56527,
          "longitude": 79.17017
        },
        {
          "latitude": 13.60334,
          "longitude": 79.1724
        },
        {
          "latitude": 13.61228,
          "longitude": 79.05495
        },
        {
          "latitude": 13.61837,
          "longitude": 79.04924
        },
        {
          "latitude": 13.64521,
          "longitude": 79.05261
        },
        {
          "latitude": 13.65894,
          "longitude": 79.07362
        },
        {
          "latitude": 13.72195,
          "longitude": 79.09292
        },
        {
          "latitude": 13.73869,
          "longitude": 79.08216
        },
        {
          "latitude": 13.77126,
          "longitude": 79.0911
        },
        {
          "latitude": 13.78263,
          "longitude": 79.0856
        },
        {
          "latitude": 13.77622,
          "longitude": 79.04547
        },
        {
          "latitude": 13.77189,
          "longitude": 79.03883
        },
        {
          "latitude": 13.74657,
          "longitude": 79.03873
        },
        {
          "latitude": 13.74116,
          "longitude": 79.01676
        },
        {
          "latitude": 13.7259,
          "longitude": 79.0034
        },
        {
          "latitude": 13.72082,
          "longitude": 78.97822
        },
        {
          "latitude": 13.69209,
          "longitude": 78.97853
        },
        {
          "latitude": 13.6683,
          "longitude": 78.99595
        },
        {
          "latitude": 13.65415,
          "longitude": 78.97668
        },
        {
          "latitude": 13.65393,
          "longitude": 78.99111
        },
        {
          "latitude": 13.6313,
          "longitude": 78.99668
        },
        {
          "latitude": 13.62469,
          "longitude": 78.96726
        },
        {
          "latitude": 13.60349,
          "longitude": 78.97351
        },
        {
          "latitude": 13.58226,
          "longitude": 78.95514
        },
        {
          "latitude": 13.59342,
          "longitude": 78.93499
        },
        {
          "latitude": 13.58198,
          "longitude": 78.92789
        },
        {
          "latitude": 13.58015,
          "longitude": 78.91219
        },
        {
          "latitude": 13.59301,
          "longitude": 78.90044
        },
        {
          "latitude": 13.59829,
          "longitude": 78.87314
        },
        {
          "latitude": 13.62515,
          "longitude": 78.88661
        },
        {
          "latitude": 13.65979,
          "longitude": 78.88205
        },
        {
          "latitude": 13.65838,
          "longitude": 78.86266
        },
        {
          "latitude": 13.67812,
          "longitude": 78.85263
        },
        {
          "latitude": 13.64928,
          "longitude": 78.85136
        },
        {
          "latitude": 13.61241,
          "longitude": 78.81823
        },
        {
          "latitude": 13.61139,
          "longitude": 78.79484
        },
        {
          "latitude": 13.58185,
          "longitude": 78.80274
        },
        {
          "latitude": 13.58677,
          "longitude": 78.75066
        },
        {
          "latitude": 13.56719,
          "longitude": 78.73893
        },
        {
          "latitude": 13.5301,
          "longitude": 78.73927
        },
        {
          "latitude": 13.51394,
          "longitude": 78.71385
        },
        {
          "latitude": 13.5382,
          "longitude": 78.72153
        },
        {
          "latitude": 13.5354,
          "longitude": 78.69222
        },
        {
          "latitude": 13.5042,
          "longitude": 78.67759
        },
        {
          "latitude": 13.50601,
          "longitude": 78.67173
        },
        {
          "latitude": 13.51962,
          "longitude": 78.67487
        },
        {
          "latitude": 13.52665,
          "longitude": 78.65905
        },
        {
          "latitude": 13.51682,
          "longitude": 78.62785
        },
        {
          "latitude": 13.49926,
          "longitude": 78.66339
        },
        {
          "latitude": 13.48391,
          "longitude": 78.6593
        },
        {
          "latitude": 13.48727,
          "longitude": 78.60084
        },
        {
          "latitude": 13.51581,
          "longitude": 78.56769
        },
        {
          "latitude": 13.48332,
          "longitude": 78.54344
        },
        {
          "latitude": 13.49014,
          "longitude": 78.53977
        },
        {
          "latitude": 13.48313,
          "longitude": 78.49929
        },
        {
          "latitude": 13.45518,
          "longitude": 78.47694
        },
        {
          "latitude": 13.45096,
          "longitude": 78.48544
        },
        {
          "latitude": 13.44321,
          "longitude": 78.47947
        },
        {
          "latitude": 13.44322,
          "longitude": 78.50515
        },
        {
          "latitude": 13.42622,
          "longitude": 78.4999
        },
        {
          "latitude": 13.411,
          "longitude": 78.51841
        },
        {
          "latitude": 13.38062,
          "longitude": 78.52158
        },
        {
          "latitude": 13.36788,
          "longitude": 78.50576
        },
        {
          "latitude": 13.36395,
          "longitude": 78.52137
        },
        {
          "latitude": 13.35487,
          "longitude": 78.52523
        },
        {
          "latitude": 13.3411,
          "longitude": 78.51733
        },
        {
          "latitude": 13.33837,
          "longitude": 78.49669
        },
        {
          "latitude": 13.32198,
          "longitude": 78.47888
        },
        {
          "latitude": 13.30129,
          "longitude": 78.47931
        },
        {
          "latitude": 13.29043,
          "longitude": 78.51378
        },
        {
          "latitude": 13.26682,
          "longitude": 78.53194
        },
        {
          "latitude": 13.28781,
          "longitude": 78.53924
        },
        {
          "latitude": 13.28382,
          "longitude": 78.55603
        },
        {
          "latitude": 13.29417,
          "longitude": 78.56451
        },
        {
          "latitude": 13.3093,
          "longitude": 78.56305
        },
        {
          "latitude": 13.30906,
          "longitude": 78.56931
        },
        {
          "latitude": 13.28016,
          "longitude": 78.57861
        },
        {
          "latitude": 13.28043,
          "longitude": 78.58723
        },
        {
          "latitude": 13.22395,
          "longitude": 78.56712
        },
        {
          "latitude": 13.21547,
          "longitude": 78.57977
        },
        {
          "latitude": 13.20121,
          "longitude": 78.56786
        },
        {
          "latitude": 13.19994,
          "longitude": 78.55049
        },
        {
          "latitude": 13.18958,
          "longitude": 78.55031
        },
        {
          "latitude": 13.19296,
          "longitude": 78.56788
        },
        {
          "latitude": 13.16719,
          "longitude": 78.58003
        },
        {
          "latitude": 13.1638,
          "longitude": 78.55036
        },
        {
          "latitude": 13.15323,
          "longitude": 78.54111
        },
        {
          "latitude": 13.14827,
          "longitude": 78.54881
        },
        {
          "latitude": 13.14202,
          "longitude": 78.54532
        },
        {
          "latitude": 13.13134,
          "longitude": 78.51763
        },
        {
          "latitude": 13.11983,
          "longitude": 78.51898
        },
        {
          "latitude": 13.10569,
          "longitude": 78.53861
        },
        {
          "latitude": 13.09144,
          "longitude": 78.5099
        },
        {
          "latitude": 13.06187,
          "longitude": 78.51425
        },
        {
          "latitude": 13.06179,
          "longitude": 78.49147
        },
        {
          "latitude": 13.04398,
          "longitude": 78.47124
        },
        {
          "latitude": 12.9985,
          "longitude": 78.46762
        },
        {
          "latitude": 12.99141,
          "longitude": 78.47473
        },
        {
          "latitude": 12.97499,
          "longitude": 78.46739
        },
        {
          "latitude": 12.98101,
          "longitude": 78.43526
        },
        {
          "latitude": 12.96395,
          "longitude": 78.43791
        },
        {
          "latitude": 12.95865,
          "longitude": 78.41921
        },
        {
          "latitude": 12.94771,
          "longitude": 78.42033
        },
        {
          "latitude": 12.94545,
          "longitude": 78.4111
        },
        {
          "latitude": 12.9217,
          "longitude": 78.41877
        },
        {
          "latitude": 12.93206,
          "longitude": 78.42813
        },
        {
          "latitude": 12.92899,
          "longitude": 78.43796
        },
        {
          "latitude": 12.90538,
          "longitude": 78.46664
        },
        {
          "latitude": 12.86674,
          "longitude": 78.46472
        },
        {
          "latitude": 12.87767,
          "longitude": 78.46406
        },
        {
          "latitude": 12.89218,
          "longitude": 78.44719
        },
        {
          "latitude": 12.91177,
          "longitude": 78.44553
        },
        {
          "latitude": 12.91181,
          "longitude": 78.4349
        },
        {
          "latitude": 12.90205,
          "longitude": 78.4286
        },
        {
          "latitude": 12.90321,
          "longitude": 78.41217
        },
        {
          "latitude": 12.91729,
          "longitude": 78.39862
        },
        {
          "latitude": 12.90696,
          "longitude": 78.3961
        },
        {
          "latitude": 12.90684,
          "longitude": 78.38866
        },
        {
          "latitude": 12.93967,
          "longitude": 78.35406
        },
        {
          "latitude": 12.90791,
          "longitude": 78.34418
        },
        {
          "latitude": 12.90177,
          "longitude": 78.32351
        },
        {
          "latitude": 12.88725,
          "longitude": 78.32031
        },
        {
          "latitude": 12.8892,
          "longitude": 78.3345
        },
        {
          "latitude": 12.88235,
          "longitude": 78.33706
        },
        {
          "latitude": 12.87557,
          "longitude": 78.33101
        },
        {
          "latitude": 12.87621,
          "longitude": 78.31368
        },
        {
          "latitude": 12.85851,
          "longitude": 78.31244
        },
        {
          "latitude": 12.85941,
          "longitude": 78.28225
        },
        {
          "latitude": 12.86769,
          "longitude": 78.2684
        },
        {
          "latitude": 12.86102,
          "longitude": 78.25262
        },
        {
          "latitude": 12.78827,
          "longitude": 78.24564
        },
        {
          "latitude": 12.76066,
          "longitude": 78.23095
        },
        {
          "latitude": 12.72968,
          "longitude": 78.24027
        },
        {
          "latitude": 12.71341,
          "longitude": 78.23073
        },
        {
          "latitude": 12.70806,
          "longitude": 78.20687
        },
        {
          "latitude": 12.69971,
          "longitude": 78.20852
        },
        {
          "latitude": 12.69437,
          "longitude": 78.19931
        }
      ],
      [
        {
          "latitude": 13.27908,
          "longitude": 79.53366
        },
        {
          "latitude": 13.25734,
          "longitude": 79.58257
        },
        {
          "latitude": 13.26469,
          "longitude": 79.59318
        },
        {
          "latitude": 13.28466,
          "longitude": 79.59559
        },
        {
          "latitude": 13.28749,
          "longitude": 79.60869
        },
        {
          "latitude": 13.27955,
          "longitude": 79.60609
        },
        {
          "latitude": 13.2827,
          "longitude": 79.61412
        },
        {
          "latitude": 13.2697,
          "longitude": 79.63164
        },
        {
          "latitude": 13.28749,
          "longitude": 79.63847
        },
        {
          "latitude": 13.27559,
          "longitude": 79.64127
        },
        {
          "latitude": 13.29015,
          "longitude": 79.64248
        },
        {
          "latitude": 13.29183,
          "longitude": 79.65179
        },
        {
          "latitude": 13.28385,
          "longitude": 79.65783
        },
        {
          "latitude": 13.28977,
          "longitude": 79.66387
        },
        {
          "latitude": 13.27872,
          "longitude": 79.66539
        },
        {
          "latitude": 13.28177,
          "longitude": 79.67425
        },
        {
          "latitude": 13.29743,
          "longitude": 79.67829
        },
        {
          "latitude": 13.26728,
          "longitude": 79.69575
        },
        {
          "latitude": 13.26165,
          "longitude": 79.67829
        },
        {
          "latitude": 13.24443,
          "longitude": 79.68427
        },
        {
          "latitude": 13.23855,
          "longitude": 79.69594
        },
        {
          "latitude": 13.25302,
          "longitude": 79.70098
        },
        {
          "latitude": 13.24466,
          "longitude": 79.71255
        },
        {
          "latitude": 13.2224,
          "longitude": 79.70271
        },
        {
          "latitude": 13.21651,
          "longitude": 79.71839
        },
        {
          "latitude": 13.22245,
          "longitude": 79.7314
        },
        {
          "latitude": 13.23653,
          "longitude": 79.73732
        },
        {
          "latitude": 13.20595,
          "longitude": 79.75719
        },
        {
          "latitude": 13.21829,
          "longitude": 79.76323
        },
        {
          "latitude": 13.21516,
          "longitude": 79.77522
        },
        {
          "latitude": 13.2301,
          "longitude": 79.78607
        },
        {
          "latitude": 13.22621,
          "longitude": 79.79344
        },
        {
          "latitude": 13.24561,
          "longitude": 79.79243
        },
        {
          "latitude": 13.25752,
          "longitude": 79.7612
        },
        {
          "latitude": 13.28287,
          "longitude": 79.73065
        },
        {
          "latitude": 13.29529,
          "longitude": 79.75675
        },
        {
          "latitude": 13.31848,
          "longitude": 79.76084
        },
        {
          "latitude": 13.30629,
          "longitude": 79.77951
        },
        {
          "latitude": 13.32142,
          "longitude": 79.76683
        },
        {
          "latitude": 13.32217,
          "longitude": 79.75652
        },
        {
          "latitude": 13.35564,
          "longitude": 79.7386
        },
        {
          "latitude": 13.36725,
          "longitude": 79.72188
        },
        {
          "latitude": 13.3855,
          "longitude": 79.71953
        },
        {
          "latitude": 13.38664,
          "longitude": 79.70237
        },
        {
          "latitude": 13.39882,
          "longitude": 79.70137
        },
        {
          "latitude": 13.42114,
          "longitude": 79.71499
        },
        {
          "latitude": 13.43988,
          "longitude": 79.71246
        },
        {
          "latitude": 13.44478,
          "longitude": 79.69522
        },
        {
          "latitude": 13.43838,
          "longitude": 79.67375
        },
        {
          "latitude": 13.41185,
          "longitude": 79.67215
        },
        {
          "latitude": 13.41048,
          "longitude": 79.6502
        },
        {
          "latitude": 13.38893,
          "longitude": 79.63688
        },
        {
          "latitude": 13.39803,
          "longitude": 79.62439
        },
        {
          "latitude": 13.39433,
          "longitude": 79.58098
        },
        {
          "latitude": 13.37986,
          "longitude": 79.57918
        },
        {
          "latitude": 13.36205,
          "longitude": 79.5434
        },
        {
          "latitude": 13.33821,
          "longitude": 79.53587
        },
        {
          "latitude": 13.31678,
          "longitude": 79.54411
        },
        {
          "latitude": 13.30137,
          "longitude": 79.53486
        },
        {
          "latitude": 13.29212,
          "longitude": 79.54121
        },
        {
          "latitude": 13.27908,
          "longitude": 79.53366
        }
      ]
    ]
  },
  {
    "id": "east_godavari",
    "name": "East Godavari",
    "headquarters": "Rajahmundry",
    "center": {
      "latitude": 17.04,
      "longitude": 81.727
    },
    "region": "Coastal Andhra",
    "polygon": [
      {
        "latitude": 16.93791,
        "longitude": 81.2913
      },
      {
        "latitude": 16.92716,
        "longitude": 81.33198
      },
      {
        "latitude": 16.91697,
        "longitude": 81.32568
      },
      {
        "latitude": 16.89767,
        "longitude": 81.33905
      },
      {
        "latitude": 16.90686,
        "longitude": 81.38989
      },
      {
        "latitude": 16.87153,
        "longitude": 81.38928
      },
      {
        "latitude": 16.86381,
        "longitude": 81.39562
      },
      {
        "latitude": 16.87091,
        "longitude": 81.40035
      },
      {
        "latitude": 16.86854,
        "longitude": 81.42181
      },
      {
        "latitude": 16.87642,
        "longitude": 81.44058
      },
      {
        "latitude": 16.88696,
        "longitude": 81.44787
      },
      {
        "latitude": 16.9001,
        "longitude": 81.44362
      },
      {
        "latitude": 16.89687,
        "longitude": 81.473
      },
      {
        "latitude": 16.90899,
        "longitude": 81.48608
      },
      {
        "latitude": 16.97237,
        "longitude": 81.49174
      },
      {
        "latitude": 16.95601,
        "longitude": 81.50469
      },
      {
        "latitude": 16.94286,
        "longitude": 81.53027
      },
      {
        "latitude": 16.9474,
        "longitude": 81.54011
      },
      {
        "latitude": 16.93651,
        "longitude": 81.55217
      },
      {
        "latitude": 16.91862,
        "longitude": 81.55334
      },
      {
        "latitude": 16.90194,
        "longitude": 81.57357
      },
      {
        "latitude": 16.90427,
        "longitude": 81.60761
      },
      {
        "latitude": 16.8916,
        "longitude": 81.62478
      },
      {
        "latitude": 16.85411,
        "longitude": 81.63699
      },
      {
        "latitude": 16.85152,
        "longitude": 81.65744
      },
      {
        "latitude": 16.79546,
        "longitude": 81.62493
      },
      {
        "latitude": 16.78431,
        "longitude": 81.64637
      },
      {
        "latitude": 16.77859,
        "longitude": 81.64527
      },
      {
        "latitude": 16.77502,
        "longitude": 81.66853
      },
      {
        "latitude": 16.76132,
        "longitude": 81.68055
      },
      {
        "latitude": 16.76758,
        "longitude": 81.68215
      },
      {
        "latitude": 16.76142,
        "longitude": 81.68745
      },
      {
        "latitude": 16.76671,
        "longitude": 81.68998
      },
      {
        "latitude": 16.76406,
        "longitude": 81.72172
      },
      {
        "latitude": 16.77073,
        "longitude": 81.72573
      },
      {
        "latitude": 16.72817,
        "longitude": 81.72019
      },
      {
        "latitude": 16.72798,
        "longitude": 81.75252
      },
      {
        "latitude": 16.70487,
        "longitude": 81.74893
      },
      {
        "latitude": 16.69411,
        "longitude": 81.75916
      },
      {
        "latitude": 16.67529,
        "longitude": 81.75861
      },
      {
        "latitude": 16.67425,
        "longitude": 81.76766
      },
      {
        "latitude": 16.68138,
        "longitude": 81.76824
      },
      {
        "latitude": 16.68576,
        "longitude": 81.78853
      },
      {
        "latitude": 16.69502,
        "longitude": 81.78796
      },
      {
        "latitude": 16.69501,
        "longitude": 81.80114
      },
      {
        "latitude": 16.70928,
        "longitude": 81.78522
      },
      {
        "latitude": 16.73271,
        "longitude": 81.79509
      },
      {
        "latitude": 16.74579,
        "longitude": 81.79075
      },
      {
        "latitude": 16.76196,
        "longitude": 81.76396
      },
      {
        "latitude": 16.79287,
        "longitude": 81.74477
      },
      {
        "latitude": 16.85179,
        "longitude": 81.75153
      },
      {
        "latitude": 16.87941,
        "longitude": 81.73416
      },
      {
        "latitude": 16.9138,
        "longitude": 81.73219
      },
      {
        "latitude": 16.91397,
        "longitude": 81.72416
      },
      {
        "latitude": 16.94457,
        "longitude": 81.7308
      },
      {
        "latitude": 16.94495,
        "longitude": 81.77813
      },
      {
        "latitude": 16.88039,
        "longitude": 81.80353
      },
      {
        "latitude": 16.85811,
        "longitude": 81.80419
      },
      {
        "latitude": 16.86506,
        "longitude": 81.8294
      },
      {
        "latitude": 16.8741,
        "longitude": 81.83197
      },
      {
        "latitude": 16.87044,
        "longitude": 81.84726
      },
      {
        "latitude": 16.84763,
        "longitude": 81.85116
      },
      {
        "latitude": 16.84516,
        "longitude": 81.86279
      },
      {
        "latitude": 16.84937,
        "longitude": 81.87037
      },
      {
        "latitude": 16.8777,
        "longitude": 81.86951
      },
      {
        "latitude": 16.88184,
        "longitude": 81.8814
      },
      {
        "latitude": 16.89029,
        "longitude": 81.88246
      },
      {
        "latitude": 16.90285,
        "longitude": 81.88143
      },
      {
        "latitude": 16.90603,
        "longitude": 81.86302
      },
      {
        "latitude": 16.9321,
        "longitude": 81.86919
      },
      {
        "latitude": 16.94064,
        "longitude": 81.86264
      },
      {
        "latitude": 16.95023,
        "longitude": 81.90023
      },
      {
        "latitude": 16.98101,
        "longitude": 81.91955
      },
      {
        "latitude": 16.96544,
        "longitude": 81.93957
      },
      {
        "latitude": 16.91429,
        "longitude": 81.93675
      },
      {
        "latitude": 16.89945,
        "longitude": 81.95646
      },
      {
        "latitude": 16.87622,
        "longitude": 81.9497
      },
      {
        "latitude": 16.87015,
        "longitude": 81.9597
      },
      {
        "latitude": 16.8382,
        "longitude": 81.9517
      },
      {
        "latitude": 16.83554,
        "longitude": 81.95821
      },
      {
        "latitude": 16.82493,
        "longitude": 81.95593
      },
      {
        "latitude": 16.82323,
        "longitude": 81.96434
      },
      {
        "latitude": 16.85588,
        "longitude": 81.97878
      },
      {
        "latitude": 16.8651,
        "longitude": 81.97487
      },
      {
        "latitude": 16.86561,
        "longitude": 81.98351
      },
      {
        "latitude": 16.87824,
        "longitude": 81.98799
      },
      {
        "latitude": 16.89573,
        "longitude": 81.98331
      },
      {
        "latitude": 16.89561,
        "longitude": 81.9943
      },
      {
        "latitude": 16.91712,
        "longitude": 82.00329
      },
      {
        "latitude": 16.90415,
        "longitude": 82.03077
      },
      {
        "latitude": 16.89654,
        "longitude": 82.02923
      },
      {
        "latitude": 16.90489,
        "longitude": 82.03917
      },
      {
        "latitude": 16.89609,
        "longitude": 82.04769
      },
      {
        "latitude": 16.87663,
        "longitude": 82.0472
      },
      {
        "latitude": 16.8792,
        "longitude": 82.07257
      },
      {
        "latitude": 16.89783,
        "longitude": 82.07464
      },
      {
        "latitude": 16.89464,
        "longitude": 82.05738
      },
      {
        "latitude": 16.9009,
        "longitude": 82.05573
      },
      {
        "latitude": 16.92868,
        "longitude": 82.06588
      },
      {
        "latitude": 16.94425,
        "longitude": 82.06227
      },
      {
        "latitude": 16.95669,
        "longitude": 82.07305
      },
      {
        "latitude": 16.99278,
        "longitude": 82.06496
      },
      {
        "latitude": 16.9936,
        "longitude": 82.05859
      },
      {
        "latitude": 17.03863,
        "longitude": 82.07751
      },
      {
        "latitude": 17.03743,
        "longitude": 82.03132
      },
      {
        "latitude": 17.06337,
        "longitude": 82.03186
      },
      {
        "latitude": 17.07272,
        "longitude": 82.0473
      },
      {
        "latitude": 17.09171,
        "longitude": 82.04724
      },
      {
        "latitude": 17.11974,
        "longitude": 81.9992
      },
      {
        "latitude": 17.11819,
        "longitude": 81.95814
      },
      {
        "latitude": 17.10227,
        "longitude": 81.92388
      },
      {
        "latitude": 17.1402,
        "longitude": 81.91505
      },
      {
        "latitude": 17.16407,
        "longitude": 81.91875
      },
      {
        "latitude": 17.18462,
        "longitude": 81.90312
      },
      {
        "latitude": 17.1986,
        "longitude": 81.92031
      },
      {
        "latitude": 17.20018,
        "longitude": 81.93702
      },
      {
        "latitude": 17.23865,
        "longitude": 81.95491
      },
      {
        "latitude": 17.24933,
        "longitude": 81.95101
      },
      {
        "latitude": 17.2617,
        "longitude": 81.96648
      },
      {
        "latitude": 17.26043,
        "longitude": 82.00493
      },
      {
        "latitude": 17.2768,
        "longitude": 82.05991
      },
      {
        "latitude": 17.29368,
        "longitude": 82.06364
      },
      {
        "latitude": 17.28476,
        "longitude": 82.08158
      },
      {
        "latitude": 17.29282,
        "longitude": 82.0933
      },
      {
        "latitude": 17.30213,
        "longitude": 82.07129
      },
      {
        "latitude": 17.29494,
        "longitude": 82.03795
      },
      {
        "latitude": 17.30562,
        "longitude": 82.03562
      },
      {
        "latitude": 17.31114,
        "longitude": 82.02441
      },
      {
        "latitude": 17.31484,
        "longitude": 81.97393
      },
      {
        "latitude": 17.30266,
        "longitude": 81.97605
      },
      {
        "latitude": 17.29949,
        "longitude": 81.96295
      },
      {
        "latitude": 17.292,
        "longitude": 81.96431
      },
      {
        "latitude": 17.27573,
        "longitude": 81.92366
      },
      {
        "latitude": 17.27698,
        "longitude": 81.91391
      },
      {
        "latitude": 17.31338,
        "longitude": 81.92421
      },
      {
        "latitude": 17.30402,
        "longitude": 81.91193
      },
      {
        "latitude": 17.31794,
        "longitude": 81.89074
      },
      {
        "latitude": 17.31365,
        "longitude": 81.88067
      },
      {
        "latitude": 17.29633,
        "longitude": 81.88178
      },
      {
        "latitude": 17.28784,
        "longitude": 81.86708
      },
      {
        "latitude": 17.30946,
        "longitude": 81.8418
      },
      {
        "latitude": 17.30946,
        "longitude": 81.82883
      },
      {
        "latitude": 17.28834,
        "longitude": 81.82275
      },
      {
        "latitude": 17.25822,
        "longitude": 81.82662
      },
      {
        "latitude": 17.2599,
        "longitude": 81.80752
      },
      {
        "latitude": 17.24618,
        "longitude": 81.80643
      },
      {
        "latitude": 17.24342,
        "longitude": 81.7967
      },
      {
        "latitude": 17.24982,
        "longitude": 81.76653
      },
      {
        "latitude": 17.23342,
        "longitude": 81.75441
      },
      {
        "latitude": 17.23779,
        "longitude": 81.71752
      },
      {
        "latitude": 17.22194,
        "longitude": 81.71954
      },
      {
        "latitude": 17.23297,
        "longitude": 81.68134
      },
      {
        "latitude": 17.24843,
        "longitude": 81.68692
      },
      {
        "latitude": 17.25962,
        "longitude": 81.67817
      },
      {
        "latitude": 17.2525,
        "longitude": 81.67693
      },
      {
        "latitude": 17.25531,
        "longitude": 81.66595
      },
      {
        "latitude": 17.26492,
        "longitude": 81.66178
      },
      {
        "latitude": 17.2643,
        "longitude": 81.67397
      },
      {
        "latitude": 17.27135,
        "longitude": 81.65774
      },
      {
        "latitude": 17.22584,
        "longitude": 81.64117
      },
      {
        "latitude": 17.20658,
        "longitude": 81.64076
      },
      {
        "latitude": 17.17134,
        "longitude": 81.65745
      },
      {
        "latitude": 17.16748,
        "longitude": 81.65297
      },
      {
        "latitude": 17.19234,
        "longitude": 81.62434
      },
      {
        "latitude": 17.19236,
        "longitude": 81.60585
      },
      {
        "latitude": 17.20535,
        "longitude": 81.59736
      },
      {
        "latitude": 17.22101,
        "longitude": 81.60187
      },
      {
        "latitude": 17.2155,
        "longitude": 81.57475
      },
      {
        "latitude": 17.22954,
        "longitude": 81.54872
      },
      {
        "latitude": 17.2067,
        "longitude": 81.53184
      },
      {
        "latitude": 17.20267,
        "longitude": 81.49995
      },
      {
        "latitude": 17.1849,
        "longitude": 81.47995
      },
      {
        "latitude": 17.16454,
        "longitude": 81.4772
      },
      {
        "latitude": 17.15508,
        "longitude": 81.48552
      },
      {
        "latitude": 17.1432,
        "longitude": 81.47638
      },
      {
        "latitude": 17.12665,
        "longitude": 81.47812
      },
      {
        "latitude": 17.11269,
        "longitude": 81.46565
      },
      {
        "latitude": 17.11215,
        "longitude": 81.44663
      },
      {
        "latitude": 17.09789,
        "longitude": 81.45011
      },
      {
        "latitude": 17.09585,
        "longitude": 81.45955
      },
      {
        "latitude": 17.08582,
        "longitude": 81.45843
      },
      {
        "latitude": 17.07537,
        "longitude": 81.45188
      },
      {
        "latitude": 17.07834,
        "longitude": 81.44355
      },
      {
        "latitude": 17.06977,
        "longitude": 81.44208
      },
      {
        "latitude": 17.07035,
        "longitude": 81.43339
      },
      {
        "latitude": 17.0602,
        "longitude": 81.4318
      },
      {
        "latitude": 17.04786,
        "longitude": 81.4369
      },
      {
        "latitude": 17.04353,
        "longitude": 81.4561
      },
      {
        "latitude": 17.0071,
        "longitude": 81.45533
      },
      {
        "latitude": 17.01056,
        "longitude": 81.44325
      },
      {
        "latitude": 17.04423,
        "longitude": 81.42998
      },
      {
        "latitude": 17.04581,
        "longitude": 81.39558
      },
      {
        "latitude": 17.02929,
        "longitude": 81.36946
      },
      {
        "latitude": 17.00136,
        "longitude": 81.3746
      },
      {
        "latitude": 16.98672,
        "longitude": 81.36761
      },
      {
        "latitude": 16.98915,
        "longitude": 81.33599
      },
      {
        "latitude": 16.97219,
        "longitude": 81.31297
      },
      {
        "latitude": 16.96579,
        "longitude": 81.33267
      },
      {
        "latitude": 16.96704,
        "longitude": 81.31298
      },
      {
        "latitude": 16.93791,
        "longitude": 81.2913
      }
    ],
    "polygons": [
      [
        {
          "latitude": 16.93791,
          "longitude": 81.2913
        },
        {
          "latitude": 16.92716,
          "longitude": 81.33198
        },
        {
          "latitude": 16.91697,
          "longitude": 81.32568
        },
        {
          "latitude": 16.89767,
          "longitude": 81.33905
        },
        {
          "latitude": 16.90686,
          "longitude": 81.38989
        },
        {
          "latitude": 16.87153,
          "longitude": 81.38928
        },
        {
          "latitude": 16.86381,
          "longitude": 81.39562
        },
        {
          "latitude": 16.87091,
          "longitude": 81.40035
        },
        {
          "latitude": 16.86854,
          "longitude": 81.42181
        },
        {
          "latitude": 16.87642,
          "longitude": 81.44058
        },
        {
          "latitude": 16.88696,
          "longitude": 81.44787
        },
        {
          "latitude": 16.9001,
          "longitude": 81.44362
        },
        {
          "latitude": 16.89687,
          "longitude": 81.473
        },
        {
          "latitude": 16.90899,
          "longitude": 81.48608
        },
        {
          "latitude": 16.97237,
          "longitude": 81.49174
        },
        {
          "latitude": 16.95601,
          "longitude": 81.50469
        },
        {
          "latitude": 16.94286,
          "longitude": 81.53027
        },
        {
          "latitude": 16.9474,
          "longitude": 81.54011
        },
        {
          "latitude": 16.93651,
          "longitude": 81.55217
        },
        {
          "latitude": 16.91862,
          "longitude": 81.55334
        },
        {
          "latitude": 16.90194,
          "longitude": 81.57357
        },
        {
          "latitude": 16.90427,
          "longitude": 81.60761
        },
        {
          "latitude": 16.8916,
          "longitude": 81.62478
        },
        {
          "latitude": 16.85411,
          "longitude": 81.63699
        },
        {
          "latitude": 16.85152,
          "longitude": 81.65744
        },
        {
          "latitude": 16.79546,
          "longitude": 81.62493
        },
        {
          "latitude": 16.78431,
          "longitude": 81.64637
        },
        {
          "latitude": 16.77859,
          "longitude": 81.64527
        },
        {
          "latitude": 16.77502,
          "longitude": 81.66853
        },
        {
          "latitude": 16.76132,
          "longitude": 81.68055
        },
        {
          "latitude": 16.76758,
          "longitude": 81.68215
        },
        {
          "latitude": 16.76142,
          "longitude": 81.68745
        },
        {
          "latitude": 16.76671,
          "longitude": 81.68998
        },
        {
          "latitude": 16.76406,
          "longitude": 81.72172
        },
        {
          "latitude": 16.77073,
          "longitude": 81.72573
        },
        {
          "latitude": 16.72817,
          "longitude": 81.72019
        },
        {
          "latitude": 16.72798,
          "longitude": 81.75252
        },
        {
          "latitude": 16.70487,
          "longitude": 81.74893
        },
        {
          "latitude": 16.69411,
          "longitude": 81.75916
        },
        {
          "latitude": 16.67529,
          "longitude": 81.75861
        },
        {
          "latitude": 16.67425,
          "longitude": 81.76766
        },
        {
          "latitude": 16.68138,
          "longitude": 81.76824
        },
        {
          "latitude": 16.68576,
          "longitude": 81.78853
        },
        {
          "latitude": 16.69502,
          "longitude": 81.78796
        },
        {
          "latitude": 16.69501,
          "longitude": 81.80114
        },
        {
          "latitude": 16.70928,
          "longitude": 81.78522
        },
        {
          "latitude": 16.73271,
          "longitude": 81.79509
        },
        {
          "latitude": 16.74579,
          "longitude": 81.79075
        },
        {
          "latitude": 16.76196,
          "longitude": 81.76396
        },
        {
          "latitude": 16.79287,
          "longitude": 81.74477
        },
        {
          "latitude": 16.85179,
          "longitude": 81.75153
        },
        {
          "latitude": 16.87941,
          "longitude": 81.73416
        },
        {
          "latitude": 16.9138,
          "longitude": 81.73219
        },
        {
          "latitude": 16.91397,
          "longitude": 81.72416
        },
        {
          "latitude": 16.94457,
          "longitude": 81.7308
        },
        {
          "latitude": 16.94495,
          "longitude": 81.77813
        },
        {
          "latitude": 16.88039,
          "longitude": 81.80353
        },
        {
          "latitude": 16.85811,
          "longitude": 81.80419
        },
        {
          "latitude": 16.86506,
          "longitude": 81.8294
        },
        {
          "latitude": 16.8741,
          "longitude": 81.83197
        },
        {
          "latitude": 16.87044,
          "longitude": 81.84726
        },
        {
          "latitude": 16.84763,
          "longitude": 81.85116
        },
        {
          "latitude": 16.84516,
          "longitude": 81.86279
        },
        {
          "latitude": 16.84937,
          "longitude": 81.87037
        },
        {
          "latitude": 16.8777,
          "longitude": 81.86951
        },
        {
          "latitude": 16.88184,
          "longitude": 81.8814
        },
        {
          "latitude": 16.89029,
          "longitude": 81.88246
        },
        {
          "latitude": 16.90285,
          "longitude": 81.88143
        },
        {
          "latitude": 16.90603,
          "longitude": 81.86302
        },
        {
          "latitude": 16.9321,
          "longitude": 81.86919
        },
        {
          "latitude": 16.94064,
          "longitude": 81.86264
        },
        {
          "latitude": 16.95023,
          "longitude": 81.90023
        },
        {
          "latitude": 16.98101,
          "longitude": 81.91955
        },
        {
          "latitude": 16.96544,
          "longitude": 81.93957
        },
        {
          "latitude": 16.91429,
          "longitude": 81.93675
        },
        {
          "latitude": 16.89945,
          "longitude": 81.95646
        },
        {
          "latitude": 16.87622,
          "longitude": 81.9497
        },
        {
          "latitude": 16.87015,
          "longitude": 81.9597
        },
        {
          "latitude": 16.8382,
          "longitude": 81.9517
        },
        {
          "latitude": 16.83554,
          "longitude": 81.95821
        },
        {
          "latitude": 16.82493,
          "longitude": 81.95593
        },
        {
          "latitude": 16.82323,
          "longitude": 81.96434
        },
        {
          "latitude": 16.85588,
          "longitude": 81.97878
        },
        {
          "latitude": 16.8651,
          "longitude": 81.97487
        },
        {
          "latitude": 16.86561,
          "longitude": 81.98351
        },
        {
          "latitude": 16.87824,
          "longitude": 81.98799
        },
        {
          "latitude": 16.89573,
          "longitude": 81.98331
        },
        {
          "latitude": 16.89561,
          "longitude": 81.9943
        },
        {
          "latitude": 16.91712,
          "longitude": 82.00329
        },
        {
          "latitude": 16.90415,
          "longitude": 82.03077
        },
        {
          "latitude": 16.89654,
          "longitude": 82.02923
        },
        {
          "latitude": 16.90489,
          "longitude": 82.03917
        },
        {
          "latitude": 16.89609,
          "longitude": 82.04769
        },
        {
          "latitude": 16.87663,
          "longitude": 82.0472
        },
        {
          "latitude": 16.8792,
          "longitude": 82.07257
        },
        {
          "latitude": 16.89783,
          "longitude": 82.07464
        },
        {
          "latitude": 16.89464,
          "longitude": 82.05738
        },
        {
          "latitude": 16.9009,
          "longitude": 82.05573
        },
        {
          "latitude": 16.92868,
          "longitude": 82.06588
        },
        {
          "latitude": 16.94425,
          "longitude": 82.06227
        },
        {
          "latitude": 16.95669,
          "longitude": 82.07305
        },
        {
          "latitude": 16.99278,
          "longitude": 82.06496
        },
        {
          "latitude": 16.9936,
          "longitude": 82.05859
        },
        {
          "latitude": 17.03863,
          "longitude": 82.07751
        },
        {
          "latitude": 17.03743,
          "longitude": 82.03132
        },
        {
          "latitude": 17.06337,
          "longitude": 82.03186
        },
        {
          "latitude": 17.07272,
          "longitude": 82.0473
        },
        {
          "latitude": 17.09171,
          "longitude": 82.04724
        },
        {
          "latitude": 17.11974,
          "longitude": 81.9992
        },
        {
          "latitude": 17.11819,
          "longitude": 81.95814
        },
        {
          "latitude": 17.10227,
          "longitude": 81.92388
        },
        {
          "latitude": 17.1402,
          "longitude": 81.91505
        },
        {
          "latitude": 17.16407,
          "longitude": 81.91875
        },
        {
          "latitude": 17.18462,
          "longitude": 81.90312
        },
        {
          "latitude": 17.1986,
          "longitude": 81.92031
        },
        {
          "latitude": 17.20018,
          "longitude": 81.93702
        },
        {
          "latitude": 17.23865,
          "longitude": 81.95491
        },
        {
          "latitude": 17.24933,
          "longitude": 81.95101
        },
        {
          "latitude": 17.2617,
          "longitude": 81.96648
        },
        {
          "latitude": 17.26043,
          "longitude": 82.00493
        },
        {
          "latitude": 17.2768,
          "longitude": 82.05991
        },
        {
          "latitude": 17.29368,
          "longitude": 82.06364
        },
        {
          "latitude": 17.28476,
          "longitude": 82.08158
        },
        {
          "latitude": 17.29282,
          "longitude": 82.0933
        },
        {
          "latitude": 17.30213,
          "longitude": 82.07129
        },
        {
          "latitude": 17.29494,
          "longitude": 82.03795
        },
        {
          "latitude": 17.30562,
          "longitude": 82.03562
        },
        {
          "latitude": 17.31114,
          "longitude": 82.02441
        },
        {
          "latitude": 17.31484,
          "longitude": 81.97393
        },
        {
          "latitude": 17.30266,
          "longitude": 81.97605
        },
        {
          "latitude": 17.29949,
          "longitude": 81.96295
        },
        {
          "latitude": 17.292,
          "longitude": 81.96431
        },
        {
          "latitude": 17.27573,
          "longitude": 81.92366
        },
        {
          "latitude": 17.27698,
          "longitude": 81.91391
        },
        {
          "latitude": 17.31338,
          "longitude": 81.92421
        },
        {
          "latitude": 17.30402,
          "longitude": 81.91193
        },
        {
          "latitude": 17.31794,
          "longitude": 81.89074
        },
        {
          "latitude": 17.31365,
          "longitude": 81.88067
        },
        {
          "latitude": 17.29633,
          "longitude": 81.88178
        },
        {
          "latitude": 17.28784,
          "longitude": 81.86708
        },
        {
          "latitude": 17.30946,
          "longitude": 81.8418
        },
        {
          "latitude": 17.30946,
          "longitude": 81.82883
        },
        {
          "latitude": 17.28834,
          "longitude": 81.82275
        },
        {
          "latitude": 17.25822,
          "longitude": 81.82662
        },
        {
          "latitude": 17.2599,
          "longitude": 81.80752
        },
        {
          "latitude": 17.24618,
          "longitude": 81.80643
        },
        {
          "latitude": 17.24342,
          "longitude": 81.7967
        },
        {
          "latitude": 17.24982,
          "longitude": 81.76653
        },
        {
          "latitude": 17.23342,
          "longitude": 81.75441
        },
        {
          "latitude": 17.23779,
          "longitude": 81.71752
        },
        {
          "latitude": 17.22194,
          "longitude": 81.71954
        },
        {
          "latitude": 17.23297,
          "longitude": 81.68134
        },
        {
          "latitude": 17.24843,
          "longitude": 81.68692
        },
        {
          "latitude": 17.25962,
          "longitude": 81.67817
        },
        {
          "latitude": 17.2525,
          "longitude": 81.67693
        },
        {
          "latitude": 17.25531,
          "longitude": 81.66595
        },
        {
          "latitude": 17.26492,
          "longitude": 81.66178
        },
        {
          "latitude": 17.2643,
          "longitude": 81.67397
        },
        {
          "latitude": 17.27135,
          "longitude": 81.65774
        },
        {
          "latitude": 17.22584,
          "longitude": 81.64117
        },
        {
          "latitude": 17.20658,
          "longitude": 81.64076
        },
        {
          "latitude": 17.17134,
          "longitude": 81.65745
        },
        {
          "latitude": 17.16748,
          "longitude": 81.65297
        },
        {
          "latitude": 17.19234,
          "longitude": 81.62434
        },
        {
          "latitude": 17.19236,
          "longitude": 81.60585
        },
        {
          "latitude": 17.20535,
          "longitude": 81.59736
        },
        {
          "latitude": 17.22101,
          "longitude": 81.60187
        },
        {
          "latitude": 17.2155,
          "longitude": 81.57475
        },
        {
          "latitude": 17.22954,
          "longitude": 81.54872
        },
        {
          "latitude": 17.2067,
          "longitude": 81.53184
        },
        {
          "latitude": 17.20267,
          "longitude": 81.49995
        },
        {
          "latitude": 17.1849,
          "longitude": 81.47995
        },
        {
          "latitude": 17.16454,
          "longitude": 81.4772
        },
        {
          "latitude": 17.15508,
          "longitude": 81.48552
        },
        {
          "latitude": 17.1432,
          "longitude": 81.47638
        },
        {
          "latitude": 17.12665,
          "longitude": 81.47812
        },
        {
          "latitude": 17.11269,
          "longitude": 81.46565
        },
        {
          "latitude": 17.11215,
          "longitude": 81.44663
        },
        {
          "latitude": 17.09789,
          "longitude": 81.45011
        },
        {
          "latitude": 17.09585,
          "longitude": 81.45955
        },
        {
          "latitude": 17.08582,
          "longitude": 81.45843
        },
        {
          "latitude": 17.07537,
          "longitude": 81.45188
        },
        {
          "latitude": 17.07834,
          "longitude": 81.44355
        },
        {
          "latitude": 17.06977,
          "longitude": 81.44208
        },
        {
          "latitude": 17.07035,
          "longitude": 81.43339
        },
        {
          "latitude": 17.0602,
          "longitude": 81.4318
        },
        {
          "latitude": 17.04786,
          "longitude": 81.4369
        },
        {
          "latitude": 17.04353,
          "longitude": 81.4561
        },
        {
          "latitude": 17.0071,
          "longitude": 81.45533
        },
        {
          "latitude": 17.01056,
          "longitude": 81.44325
        },
        {
          "latitude": 17.04423,
          "longitude": 81.42998
        },
        {
          "latitude": 17.04581,
          "longitude": 81.39558
        },
        {
          "latitude": 17.02929,
          "longitude": 81.36946
        },
        {
          "latitude": 17.00136,
          "longitude": 81.3746
        },
        {
          "latitude": 16.98672,
          "longitude": 81.36761
        },
        {
          "latitude": 16.98915,
          "longitude": 81.33599
        },
        {
          "latitude": 16.97219,
          "longitude": 81.31297
        },
        {
          "latitude": 16.96579,
          "longitude": 81.33267
        },
        {
          "latitude": 16.96704,
          "longitude": 81.31298
        },
        {
          "latitude": 16.93791,
          "longitude": 81.2913
        }
      ]
    ]
  },
  {
    "id": "eluru",
    "name": "Eluru",
    "headquarters": "Eluru",
    "center": {
      "latitude": 16.9824,
      "longitude": 81.1855
    },
    "region": "Coastal Andhra",
    "polygon": [
      {
        "latitude": 16.65742,
        "longitude": 80.68589
      },
      {
        "latitude": 16.63633,
        "longitude": 80.68659
      },
      {
        "latitude": 16.62652,
        "longitude": 80.69708
      },
      {
        "latitude": 16.61883,
        "longitude": 80.73926
      },
      {
        "latitude": 16.62728,
        "longitude": 80.74333
      },
      {
        "latitude": 16.62962,
        "longitude": 80.7577
      },
      {
        "latitude": 16.62243,
        "longitude": 80.77854
      },
      {
        "latitude": 16.64278,
        "longitude": 80.79268
      },
      {
        "latitude": 16.63493,
        "longitude": 80.79876
      },
      {
        "latitude": 16.6513,
        "longitude": 80.81774
      },
      {
        "latitude": 16.66027,
        "longitude": 80.80842
      },
      {
        "latitude": 16.676,
        "longitude": 80.81894
      },
      {
        "latitude": 16.6527,
        "longitude": 80.82426
      },
      {
        "latitude": 16.64327,
        "longitude": 80.836
      },
      {
        "latitude": 16.6187,
        "longitude": 80.83298
      },
      {
        "latitude": 16.61041,
        "longitude": 80.84797
      },
      {
        "latitude": 16.62476,
        "longitude": 80.86132
      },
      {
        "latitude": 16.61765,
        "longitude": 80.88048
      },
      {
        "latitude": 16.63149,
        "longitude": 80.88558
      },
      {
        "latitude": 16.65407,
        "longitude": 80.88709
      },
      {
        "latitude": 16.67328,
        "longitude": 80.85207
      },
      {
        "latitude": 16.69779,
        "longitude": 80.85647
      },
      {
        "latitude": 16.69149,
        "longitude": 80.87368
      },
      {
        "latitude": 16.71055,
        "longitude": 80.87541
      },
      {
        "latitude": 16.71401,
        "longitude": 80.88371
      },
      {
        "latitude": 16.70931,
        "longitude": 80.91925
      },
      {
        "latitude": 16.70068,
        "longitude": 80.91519
      },
      {
        "latitude": 16.70507,
        "longitude": 80.92687
      },
      {
        "latitude": 16.69544,
        "longitude": 80.92518
      },
      {
        "latitude": 16.68625,
        "longitude": 80.94182
      },
      {
        "latitude": 16.67492,
        "longitude": 80.93856
      },
      {
        "latitude": 16.67077,
        "longitude": 80.95574
      },
      {
        "latitude": 16.6264,
        "longitude": 80.9728
      },
      {
        "latitude": 16.58613,
        "longitude": 81.0075
      },
      {
        "latitude": 16.56133,
        "longitude": 81.01184
      },
      {
        "latitude": 16.56229,
        "longitude": 81.04002
      },
      {
        "latitude": 16.5876,
        "longitude": 81.10031
      },
      {
        "latitude": 16.58079,
        "longitude": 81.10587
      },
      {
        "latitude": 16.55874,
        "longitude": 81.09026
      },
      {
        "latitude": 16.55234,
        "longitude": 81.10584
      },
      {
        "latitude": 16.52119,
        "longitude": 81.10084
      },
      {
        "latitude": 16.51237,
        "longitude": 81.11809
      },
      {
        "latitude": 16.49742,
        "longitude": 81.11164
      },
      {
        "latitude": 16.49002,
        "longitude": 81.09591
      },
      {
        "latitude": 16.49542,
        "longitude": 81.08895
      },
      {
        "latitude": 16.48266,
        "longitude": 81.0827
      },
      {
        "latitude": 16.46787,
        "longitude": 81.0931
      },
      {
        "latitude": 16.45241,
        "longitude": 81.08661
      },
      {
        "latitude": 16.45719,
        "longitude": 81.07555
      },
      {
        "latitude": 16.44937,
        "longitude": 81.08445
      },
      {
        "latitude": 16.43177,
        "longitude": 81.08123
      },
      {
        "latitude": 16.44194,
        "longitude": 81.06747
      },
      {
        "latitude": 16.43462,
        "longitude": 81.04567
      },
      {
        "latitude": 16.4207,
        "longitude": 81.04444
      },
      {
        "latitude": 16.41772,
        "longitude": 81.05677
      },
      {
        "latitude": 16.39845,
        "longitude": 81.06192
      },
      {
        "latitude": 16.39478,
        "longitude": 81.07948
      },
      {
        "latitude": 16.38311,
        "longitude": 81.08308
      },
      {
        "latitude": 16.38072,
        "longitude": 81.10249
      },
      {
        "latitude": 16.38831,
        "longitude": 81.10931
      },
      {
        "latitude": 16.37659,
        "longitude": 81.14019
      },
      {
        "latitude": 16.40469,
        "longitude": 81.15871
      },
      {
        "latitude": 16.40262,
        "longitude": 81.1727
      },
      {
        "latitude": 16.38655,
        "longitude": 81.1722
      },
      {
        "latitude": 16.38145,
        "longitude": 81.20232
      },
      {
        "latitude": 16.41978,
        "longitude": 81.21449
      },
      {
        "latitude": 16.4269,
        "longitude": 81.22892
      },
      {
        "latitude": 16.4125,
        "longitude": 81.23095
      },
      {
        "latitude": 16.40339,
        "longitude": 81.25434
      },
      {
        "latitude": 16.42947,
        "longitude": 81.27858
      },
      {
        "latitude": 16.43886,
        "longitude": 81.30457
      },
      {
        "latitude": 16.45374,
        "longitude": 81.29186
      },
      {
        "latitude": 16.45884,
        "longitude": 81.31467
      },
      {
        "latitude": 16.45912,
        "longitude": 81.32128
      },
      {
        "latitude": 16.44382,
        "longitude": 81.32507
      },
      {
        "latitude": 16.41899,
        "longitude": 81.3198
      },
      {
        "latitude": 16.41705,
        "longitude": 81.33403
      },
      {
        "latitude": 16.4059,
        "longitude": 81.34348
      },
      {
        "latitude": 16.41012,
        "longitude": 81.38649
      },
      {
        "latitude": 16.438,
        "longitude": 81.40209
      },
      {
        "latitude": 16.44271,
        "longitude": 81.38582
      },
      {
        "latitude": 16.45838,
        "longitude": 81.37346
      },
      {
        "latitude": 16.46637,
        "longitude": 81.37906
      },
      {
        "latitude": 16.476,
        "longitude": 81.36837
      },
      {
        "latitude": 16.4971,
        "longitude": 81.37192
      },
      {
        "latitude": 16.50708,
        "longitude": 81.3622
      },
      {
        "latitude": 16.51011,
        "longitude": 81.33207
      },
      {
        "latitude": 16.53034,
        "longitude": 81.34321
      },
      {
        "latitude": 16.59053,
        "longitude": 81.34675
      },
      {
        "latitude": 16.59716,
        "longitude": 81.35774
      },
      {
        "latitude": 16.61056,
        "longitude": 81.3546
      },
      {
        "latitude": 16.6066,
        "longitude": 81.34356
      },
      {
        "latitude": 16.6202,
        "longitude": 81.32671
      },
      {
        "latitude": 16.66951,
        "longitude": 81.33383
      },
      {
        "latitude": 16.68758,
        "longitude": 81.32936
      },
      {
        "latitude": 16.69219,
        "longitude": 81.35308
      },
      {
        "latitude": 16.6784,
        "longitude": 81.35223
      },
      {
        "latitude": 16.67489,
        "longitude": 81.34297
      },
      {
        "latitude": 16.65715,
        "longitude": 81.34459
      },
      {
        "latitude": 16.667,
        "longitude": 81.39404
      },
      {
        "latitude": 16.66044,
        "longitude": 81.43215
      },
      {
        "latitude": 16.67594,
        "longitude": 81.45336
      },
      {
        "latitude": 16.67825,
        "longitude": 81.47233
      },
      {
        "latitude": 16.68809,
        "longitude": 81.47418
      },
      {
        "latitude": 16.68921,
        "longitude": 81.49589
      },
      {
        "latitude": 16.67363,
        "longitude": 81.49197
      },
      {
        "latitude": 16.66435,
        "longitude": 81.49915
      },
      {
        "latitude": 16.6722,
        "longitude": 81.53206
      },
      {
        "latitude": 16.65229,
        "longitude": 81.53901
      },
      {
        "latitude": 16.64269,
        "longitude": 81.55153
      },
      {
        "latitude": 16.65637,
        "longitude": 81.56342
      },
      {
        "latitude": 16.66665,
        "longitude": 81.55362
      },
      {
        "latitude": 16.67905,
        "longitude": 81.55603
      },
      {
        "latitude": 16.68176,
        "longitude": 81.57112
      },
      {
        "latitude": 16.69138,
        "longitude": 81.57081
      },
      {
        "latitude": 16.70849,
        "longitude": 81.59902
      },
      {
        "latitude": 16.7222,
        "longitude": 81.59368
      },
      {
        "latitude": 16.7229,
        "longitude": 81.56847
      },
      {
        "latitude": 16.76058,
        "longitude": 81.56388
      },
      {
        "latitude": 16.76261,
        "longitude": 81.55315
      },
      {
        "latitude": 16.73445,
        "longitude": 81.54283
      },
      {
        "latitude": 16.73827,
        "longitude": 81.53192
      },
      {
        "latitude": 16.73064,
        "longitude": 81.52155
      },
      {
        "latitude": 16.73671,
        "longitude": 81.51615
      },
      {
        "latitude": 16.7263,
        "longitude": 81.50328
      },
      {
        "latitude": 16.73686,
        "longitude": 81.47923
      },
      {
        "latitude": 16.72648,
        "longitude": 81.46997
      },
      {
        "latitude": 16.72349,
        "longitude": 81.44934
      },
      {
        "latitude": 16.75802,
        "longitude": 81.44005
      },
      {
        "latitude": 16.75804,
        "longitude": 81.48049
      },
      {
        "latitude": 16.78032,
        "longitude": 81.4724
      },
      {
        "latitude": 16.81365,
        "longitude": 81.49817
      },
      {
        "latitude": 16.81843,
        "longitude": 81.48606
      },
      {
        "latitude": 16.8642,
        "longitude": 81.47479
      },
      {
        "latitude": 16.8709,
        "longitude": 81.45787
      },
      {
        "latitude": 16.89866,
        "longitude": 81.46181
      },
      {
        "latitude": 16.9001,
        "longitude": 81.44362
      },
      {
        "latitude": 16.88696,
        "longitude": 81.44787
      },
      {
        "latitude": 16.87642,
        "longitude": 81.44058
      },
      {
        "latitude": 16.86854,
        "longitude": 81.42181
      },
      {
        "latitude": 16.87091,
        "longitude": 81.40035
      },
      {
        "latitude": 16.86381,
        "longitude": 81.39562
      },
      {
        "latitude": 16.87153,
        "longitude": 81.38928
      },
      {
        "latitude": 16.90686,
        "longitude": 81.38989
      },
      {
        "latitude": 16.89767,
        "longitude": 81.33905
      },
      {
        "latitude": 16.91697,
        "longitude": 81.32568
      },
      {
        "latitude": 16.92716,
        "longitude": 81.33198
      },
      {
        "latitude": 16.93791,
        "longitude": 81.2913
      },
      {
        "latitude": 16.96704,
        "longitude": 81.31298
      },
      {
        "latitude": 16.96579,
        "longitude": 81.33267
      },
      {
        "latitude": 16.97219,
        "longitude": 81.31297
      },
      {
        "latitude": 16.98915,
        "longitude": 81.33599
      },
      {
        "latitude": 16.98672,
        "longitude": 81.36761
      },
      {
        "latitude": 17.00136,
        "longitude": 81.3746
      },
      {
        "latitude": 17.02929,
        "longitude": 81.36946
      },
      {
        "latitude": 17.04581,
        "longitude": 81.39558
      },
      {
        "latitude": 17.04423,
        "longitude": 81.42998
      },
      {
        "latitude": 17.01056,
        "longitude": 81.44325
      },
      {
        "latitude": 17.0071,
        "longitude": 81.45533
      },
      {
        "latitude": 17.04353,
        "longitude": 81.4561
      },
      {
        "latitude": 17.04786,
        "longitude": 81.4369
      },
      {
        "latitude": 17.06632,
        "longitude": 81.43187
      },
      {
        "latitude": 17.07076,
        "longitude": 81.4433
      },
      {
        "latitude": 17.07834,
        "longitude": 81.44355
      },
      {
        "latitude": 17.07934,
        "longitude": 81.45609
      },
      {
        "latitude": 17.09492,
        "longitude": 81.45996
      },
      {
        "latitude": 17.09789,
        "longitude": 81.45011
      },
      {
        "latitude": 17.11215,
        "longitude": 81.44663
      },
      {
        "latitude": 17.11269,
        "longitude": 81.46565
      },
      {
        "latitude": 17.12665,
        "longitude": 81.47812
      },
      {
        "latitude": 17.1432,
        "longitude": 81.47638
      },
      {
        "latitude": 17.15508,
        "longitude": 81.48552
      },
      {
        "latitude": 17.16454,
        "longitude": 81.4772
      },
      {
        "latitude": 17.18178,
        "longitude": 81.47819
      },
      {
        "latitude": 17.20267,
        "longitude": 81.49995
      },
      {
        "latitude": 17.2067,
        "longitude": 81.53184
      },
      {
        "latitude": 17.22985,
        "longitude": 81.54998
      },
      {
        "latitude": 17.2155,
        "longitude": 81.57475
      },
      {
        "latitude": 17.22101,
        "longitude": 81.60187
      },
      {
        "latitude": 17.20535,
        "longitude": 81.59736
      },
      {
        "latitude": 17.19236,
        "longitude": 81.60585
      },
      {
        "latitude": 17.19234,
        "longitude": 81.62434
      },
      {
        "latitude": 17.17193,
        "longitude": 81.64517
      },
      {
        "latitude": 17.17134,
        "longitude": 81.65745
      },
      {
        "latitude": 17.20658,
        "longitude": 81.64076
      },
      {
        "latitude": 17.22925,
        "longitude": 81.64145
      },
      {
        "latitude": 17.28174,
        "longitude": 81.66163
      },
      {
        "latitude": 17.29006,
        "longitude": 81.67843
      },
      {
        "latitude": 17.30147,
        "longitude": 81.67808
      },
      {
        "latitude": 17.3237,
        "longitude": 81.64238
      },
      {
        "latitude": 17.33122,
        "longitude": 81.61428
      },
      {
        "latitude": 17.37561,
        "longitude": 81.60425
      },
      {
        "latitude": 17.40682,
        "longitude": 81.6139
      },
      {
        "latitude": 17.40568,
        "longitude": 81.5858
      },
      {
        "latitude": 17.43277,
        "longitude": 81.57562
      },
      {
        "latitude": 17.43983,
        "longitude": 81.56351
      },
      {
        "latitude": 17.43893,
        "longitude": 81.53263
      },
      {
        "latitude": 17.47244,
        "longitude": 81.5124
      },
      {
        "latitude": 17.48087,
        "longitude": 81.49874
      },
      {
        "latitude": 17.46128,
        "longitude": 81.5021
      },
      {
        "latitude": 17.45154,
        "longitude": 81.42386
      },
      {
        "latitude": 17.45557,
        "longitude": 81.40131
      },
      {
        "latitude": 17.48509,
        "longitude": 81.3681
      },
      {
        "latitude": 17.48438,
        "longitude": 81.29697
      },
      {
        "latitude": 17.55953,
        "longitude": 81.25902
      },
      {
        "latitude": 17.56432,
        "longitude": 81.18609
      },
      {
        "latitude": 17.58658,
        "longitude": 81.13493
      },
      {
        "latitude": 17.61646,
        "longitude": 81.09905
      },
      {
        "latitude": 17.61756,
        "longitude": 81.0744
      },
      {
        "latitude": 17.59859,
        "longitude": 81.01616
      },
      {
        "latitude": 17.60975,
        "longitude": 81.00601
      },
      {
        "latitude": 17.64334,
        "longitude": 81.00751
      },
      {
        "latitude": 17.6523,
        "longitude": 80.9958
      },
      {
        "latitude": 17.65037,
        "longitude": 80.97318
      },
      {
        "latitude": 17.63432,
        "longitude": 80.94384
      },
      {
        "latitude": 17.64277,
        "longitude": 80.89664
      },
      {
        "latitude": 17.63481,
        "longitude": 80.8891
      },
      {
        "latitude": 17.63808,
        "longitude": 80.84935
      },
      {
        "latitude": 17.62468,
        "longitude": 80.84298
      },
      {
        "latitude": 17.60856,
        "longitude": 80.85218
      },
      {
        "latitude": 17.59108,
        "longitude": 80.89872
      },
      {
        "latitude": 17.58983,
        "longitude": 80.95928
      },
      {
        "latitude": 17.55738,
        "longitude": 80.97027
      },
      {
        "latitude": 17.53002,
        "longitude": 81.00001
      },
      {
        "latitude": 17.49265,
        "longitude": 81.01202
      },
      {
        "latitude": 17.45623,
        "longitude": 81.09842
      },
      {
        "latitude": 17.48571,
        "longitude": 81.12955
      },
      {
        "latitude": 17.47945,
        "longitude": 81.15664
      },
      {
        "latitude": 17.4607,
        "longitude": 81.16981
      },
      {
        "latitude": 17.44727,
        "longitude": 81.1592
      },
      {
        "latitude": 17.43882,
        "longitude": 81.16317
      },
      {
        "latitude": 17.42105,
        "longitude": 81.2044
      },
      {
        "latitude": 17.43475,
        "longitude": 81.21131
      },
      {
        "latitude": 17.43801,
        "longitude": 81.22713
      },
      {
        "latitude": 17.40288,
        "longitude": 81.24507
      },
      {
        "latitude": 17.38371,
        "longitude": 81.29944
      },
      {
        "latitude": 17.3658,
        "longitude": 81.31609
      },
      {
        "latitude": 17.31813,
        "longitude": 81.27393
      },
      {
        "latitude": 17.32614,
        "longitude": 81.2455
      },
      {
        "latitude": 17.32082,
        "longitude": 81.23763
      },
      {
        "latitude": 17.32476,
        "longitude": 81.18974
      },
      {
        "latitude": 17.28588,
        "longitude": 81.1763
      },
      {
        "latitude": 17.25468,
        "longitude": 81.18763
      },
      {
        "latitude": 17.23059,
        "longitude": 81.1737
      },
      {
        "latitude": 17.21493,
        "longitude": 81.07896
      },
      {
        "latitude": 17.22483,
        "longitude": 81.05504
      },
      {
        "latitude": 17.20538,
        "longitude": 81.04768
      },
      {
        "latitude": 17.19039,
        "longitude": 81.03041
      },
      {
        "latitude": 17.19,
        "longitude": 80.99846
      },
      {
        "latitude": 17.19815,
        "longitude": 80.9675
      },
      {
        "latitude": 17.21943,
        "longitude": 80.93983
      },
      {
        "latitude": 17.21897,
        "longitude": 80.91825
      },
      {
        "latitude": 17.1573,
        "longitude": 80.92387
      },
      {
        "latitude": 17.15339,
        "longitude": 80.90977
      },
      {
        "latitude": 17.161,
        "longitude": 80.88045
      },
      {
        "latitude": 17.13415,
        "longitude": 80.87964
      },
      {
        "latitude": 17.12481,
        "longitude": 80.86822
      },
      {
        "latitude": 17.10578,
        "longitude": 80.87622
      },
      {
        "latitude": 17.07997,
        "longitude": 80.86753
      },
      {
        "latitude": 17.06981,
        "longitude": 80.87678
      },
      {
        "latitude": 17.03924,
        "longitude": 80.84486
      },
      {
        "latitude": 17.05072,
        "longitude": 80.83273
      },
      {
        "latitude": 17.06068,
        "longitude": 80.79927
      },
      {
        "latitude": 17.02182,
        "longitude": 80.77949
      },
      {
        "latitude": 17.00074,
        "longitude": 80.79918
      },
      {
        "latitude": 16.98978,
        "longitude": 80.82563
      },
      {
        "latitude": 16.92769,
        "longitude": 80.8238
      },
      {
        "latitude": 16.90853,
        "longitude": 80.8535
      },
      {
        "latitude": 16.88871,
        "longitude": 80.84659
      },
      {
        "latitude": 16.87911,
        "longitude": 80.82725
      },
      {
        "latitude": 16.88207,
        "longitude": 80.79761
      },
      {
        "latitude": 16.85942,
        "longitude": 80.79438
      },
      {
        "latitude": 16.85053,
        "longitude": 80.77204
      },
      {
        "latitude": 16.80991,
        "longitude": 80.77652
      },
      {
        "latitude": 16.65742,
        "longitude": 80.68589
      }
    ],
    "polygons": [
      [
        {
          "latitude": 16.65742,
          "longitude": 80.68589
        },
        {
          "latitude": 16.63633,
          "longitude": 80.68659
        },
        {
          "latitude": 16.62652,
          "longitude": 80.69708
        },
        {
          "latitude": 16.61883,
          "longitude": 80.73926
        },
        {
          "latitude": 16.62728,
          "longitude": 80.74333
        },
        {
          "latitude": 16.62962,
          "longitude": 80.7577
        },
        {
          "latitude": 16.62243,
          "longitude": 80.77854
        },
        {
          "latitude": 16.64278,
          "longitude": 80.79268
        },
        {
          "latitude": 16.63493,
          "longitude": 80.79876
        },
        {
          "latitude": 16.6513,
          "longitude": 80.81774
        },
        {
          "latitude": 16.66027,
          "longitude": 80.80842
        },
        {
          "latitude": 16.676,
          "longitude": 80.81894
        },
        {
          "latitude": 16.6527,
          "longitude": 80.82426
        },
        {
          "latitude": 16.64327,
          "longitude": 80.836
        },
        {
          "latitude": 16.6187,
          "longitude": 80.83298
        },
        {
          "latitude": 16.61041,
          "longitude": 80.84797
        },
        {
          "latitude": 16.62476,
          "longitude": 80.86132
        },
        {
          "latitude": 16.61765,
          "longitude": 80.88048
        },
        {
          "latitude": 16.63149,
          "longitude": 80.88558
        },
        {
          "latitude": 16.65407,
          "longitude": 80.88709
        },
        {
          "latitude": 16.67328,
          "longitude": 80.85207
        },
        {
          "latitude": 16.69779,
          "longitude": 80.85647
        },
        {
          "latitude": 16.69149,
          "longitude": 80.87368
        },
        {
          "latitude": 16.71055,
          "longitude": 80.87541
        },
        {
          "latitude": 16.71401,
          "longitude": 80.88371
        },
        {
          "latitude": 16.70931,
          "longitude": 80.91925
        },
        {
          "latitude": 16.70068,
          "longitude": 80.91519
        },
        {
          "latitude": 16.70507,
          "longitude": 80.92687
        },
        {
          "latitude": 16.69544,
          "longitude": 80.92518
        },
        {
          "latitude": 16.68625,
          "longitude": 80.94182
        },
        {
          "latitude": 16.67492,
          "longitude": 80.93856
        },
        {
          "latitude": 16.67077,
          "longitude": 80.95574
        },
        {
          "latitude": 16.6264,
          "longitude": 80.9728
        },
        {
          "latitude": 16.58613,
          "longitude": 81.0075
        },
        {
          "latitude": 16.56133,
          "longitude": 81.01184
        },
        {
          "latitude": 16.56229,
          "longitude": 81.04002
        },
        {
          "latitude": 16.5876,
          "longitude": 81.10031
        },
        {
          "latitude": 16.58079,
          "longitude": 81.10587
        },
        {
          "latitude": 16.55874,
          "longitude": 81.09026
        },
        {
          "latitude": 16.55234,
          "longitude": 81.10584
        },
        {
          "latitude": 16.52119,
          "longitude": 81.10084
        },
        {
          "latitude": 16.51237,
          "longitude": 81.11809
        },
        {
          "latitude": 16.49742,
          "longitude": 81.11164
        },
        {
          "latitude": 16.49002,
          "longitude": 81.09591
        },
        {
          "latitude": 16.49542,
          "longitude": 81.08895
        },
        {
          "latitude": 16.48266,
          "longitude": 81.0827
        },
        {
          "latitude": 16.46787,
          "longitude": 81.0931
        },
        {
          "latitude": 16.45241,
          "longitude": 81.08661
        },
        {
          "latitude": 16.45719,
          "longitude": 81.07555
        },
        {
          "latitude": 16.44937,
          "longitude": 81.08445
        },
        {
          "latitude": 16.43177,
          "longitude": 81.08123
        },
        {
          "latitude": 16.44194,
          "longitude": 81.06747
        },
        {
          "latitude": 16.43462,
          "longitude": 81.04567
        },
        {
          "latitude": 16.4207,
          "longitude": 81.04444
        },
        {
          "latitude": 16.41772,
          "longitude": 81.05677
        },
        {
          "latitude": 16.39845,
          "longitude": 81.06192
        },
        {
          "latitude": 16.39478,
          "longitude": 81.07948
        },
        {
          "latitude": 16.38311,
          "longitude": 81.08308
        },
        {
          "latitude": 16.38072,
          "longitude": 81.10249
        },
        {
          "latitude": 16.38831,
          "longitude": 81.10931
        },
        {
          "latitude": 16.37659,
          "longitude": 81.14019
        },
        {
          "latitude": 16.40469,
          "longitude": 81.15871
        },
        {
          "latitude": 16.40262,
          "longitude": 81.1727
        },
        {
          "latitude": 16.38655,
          "longitude": 81.1722
        },
        {
          "latitude": 16.38145,
          "longitude": 81.20232
        },
        {
          "latitude": 16.41978,
          "longitude": 81.21449
        },
        {
          "latitude": 16.4269,
          "longitude": 81.22892
        },
        {
          "latitude": 16.4125,
          "longitude": 81.23095
        },
        {
          "latitude": 16.40339,
          "longitude": 81.25434
        },
        {
          "latitude": 16.42947,
          "longitude": 81.27858
        },
        {
          "latitude": 16.43886,
          "longitude": 81.30457
        },
        {
          "latitude": 16.45374,
          "longitude": 81.29186
        },
        {
          "latitude": 16.45884,
          "longitude": 81.31467
        },
        {
          "latitude": 16.45912,
          "longitude": 81.32128
        },
        {
          "latitude": 16.44382,
          "longitude": 81.32507
        },
        {
          "latitude": 16.41899,
          "longitude": 81.3198
        },
        {
          "latitude": 16.41705,
          "longitude": 81.33403
        },
        {
          "latitude": 16.4059,
          "longitude": 81.34348
        },
        {
          "latitude": 16.41012,
          "longitude": 81.38649
        },
        {
          "latitude": 16.438,
          "longitude": 81.40209
        },
        {
          "latitude": 16.44271,
          "longitude": 81.38582
        },
        {
          "latitude": 16.45838,
          "longitude": 81.37346
        },
        {
          "latitude": 16.46637,
          "longitude": 81.37906
        },
        {
          "latitude": 16.476,
          "longitude": 81.36837
        },
        {
          "latitude": 16.4971,
          "longitude": 81.37192
        },
        {
          "latitude": 16.50708,
          "longitude": 81.3622
        },
        {
          "latitude": 16.51011,
          "longitude": 81.33207
        },
        {
          "latitude": 16.53034,
          "longitude": 81.34321
        },
        {
          "latitude": 16.59053,
          "longitude": 81.34675
        },
        {
          "latitude": 16.59716,
          "longitude": 81.35774
        },
        {
          "latitude": 16.61056,
          "longitude": 81.3546
        },
        {
          "latitude": 16.6066,
          "longitude": 81.34356
        },
        {
          "latitude": 16.6202,
          "longitude": 81.32671
        },
        {
          "latitude": 16.66951,
          "longitude": 81.33383
        },
        {
          "latitude": 16.68758,
          "longitude": 81.32936
        },
        {
          "latitude": 16.69219,
          "longitude": 81.35308
        },
        {
          "latitude": 16.6784,
          "longitude": 81.35223
        },
        {
          "latitude": 16.67489,
          "longitude": 81.34297
        },
        {
          "latitude": 16.65715,
          "longitude": 81.34459
        },
        {
          "latitude": 16.667,
          "longitude": 81.39404
        },
        {
          "latitude": 16.66044,
          "longitude": 81.43215
        },
        {
          "latitude": 16.67594,
          "longitude": 81.45336
        },
        {
          "latitude": 16.67825,
          "longitude": 81.47233
        },
        {
          "latitude": 16.68809,
          "longitude": 81.47418
        },
        {
          "latitude": 16.68921,
          "longitude": 81.49589
        },
        {
          "latitude": 16.67363,
          "longitude": 81.49197
        },
        {
          "latitude": 16.66435,
          "longitude": 81.49915
        },
        {
          "latitude": 16.6722,
          "longitude": 81.53206
        },
        {
          "latitude": 16.65229,
          "longitude": 81.53901
        },
        {
          "latitude": 16.64269,
          "longitude": 81.55153
        },
        {
          "latitude": 16.65637,
          "longitude": 81.56342
        },
        {
          "latitude": 16.66665,
          "longitude": 81.55362
        },
        {
          "latitude": 16.67905,
          "longitude": 81.55603
        },
        {
          "latitude": 16.68176,
          "longitude": 81.57112
        },
        {
          "latitude": 16.69138,
          "longitude": 81.57081
        },
        {
          "latitude": 16.70849,
          "longitude": 81.59902
        },
        {
          "latitude": 16.7222,
          "longitude": 81.59368
        },
        {
          "latitude": 16.7229,
          "longitude": 81.56847
        },
        {
          "latitude": 16.76058,
          "longitude": 81.56388
        },
        {
          "latitude": 16.76261,
          "longitude": 81.55315
        },
        {
          "latitude": 16.73445,
          "longitude": 81.54283
        },
        {
          "latitude": 16.73827,
          "longitude": 81.53192
        },
        {
          "latitude": 16.73064,
          "longitude": 81.52155
        },
        {
          "latitude": 16.73671,
          "longitude": 81.51615
        },
        {
          "latitude": 16.7263,
          "longitude": 81.50328
        },
        {
          "latitude": 16.73686,
          "longitude": 81.47923
        },
        {
          "latitude": 16.72648,
          "longitude": 81.46997
        },
        {
          "latitude": 16.72349,
          "longitude": 81.44934
        },
        {
          "latitude": 16.75802,
          "longitude": 81.44005
        },
        {
          "latitude": 16.75804,
          "longitude": 81.48049
        },
        {
          "latitude": 16.78032,
          "longitude": 81.4724
        },
        {
          "latitude": 16.81365,
          "longitude": 81.49817
        },
        {
          "latitude": 16.81843,
          "longitude": 81.48606
        },
        {
          "latitude": 16.8642,
          "longitude": 81.47479
        },
        {
          "latitude": 16.8709,
          "longitude": 81.45787
        },
        {
          "latitude": 16.89866,
          "longitude": 81.46181
        },
        {
          "latitude": 16.9001,
          "longitude": 81.44362
        },
        {
          "latitude": 16.88696,
          "longitude": 81.44787
        },
        {
          "latitude": 16.87642,
          "longitude": 81.44058
        },
        {
          "latitude": 16.86854,
          "longitude": 81.42181
        },
        {
          "latitude": 16.87091,
          "longitude": 81.40035
        },
        {
          "latitude": 16.86381,
          "longitude": 81.39562
        },
        {
          "latitude": 16.87153,
          "longitude": 81.38928
        },
        {
          "latitude": 16.90686,
          "longitude": 81.38989
        },
        {
          "latitude": 16.89767,
          "longitude": 81.33905
        },
        {
          "latitude": 16.91697,
          "longitude": 81.32568
        },
        {
          "latitude": 16.92716,
          "longitude": 81.33198
        },
        {
          "latitude": 16.93791,
          "longitude": 81.2913
        },
        {
          "latitude": 16.96704,
          "longitude": 81.31298
        },
        {
          "latitude": 16.96579,
          "longitude": 81.33267
        },
        {
          "latitude": 16.97219,
          "longitude": 81.31297
        },
        {
          "latitude": 16.98915,
          "longitude": 81.33599
        },
        {
          "latitude": 16.98672,
          "longitude": 81.36761
        },
        {
          "latitude": 17.00136,
          "longitude": 81.3746
        },
        {
          "latitude": 17.02929,
          "longitude": 81.36946
        },
        {
          "latitude": 17.04581,
          "longitude": 81.39558
        },
        {
          "latitude": 17.04423,
          "longitude": 81.42998
        },
        {
          "latitude": 17.01056,
          "longitude": 81.44325
        },
        {
          "latitude": 17.0071,
          "longitude": 81.45533
        },
        {
          "latitude": 17.04353,
          "longitude": 81.4561
        },
        {
          "latitude": 17.04786,
          "longitude": 81.4369
        },
        {
          "latitude": 17.06632,
          "longitude": 81.43187
        },
        {
          "latitude": 17.07076,
          "longitude": 81.4433
        },
        {
          "latitude": 17.07834,
          "longitude": 81.44355
        },
        {
          "latitude": 17.07934,
          "longitude": 81.45609
        },
        {
          "latitude": 17.09492,
          "longitude": 81.45996
        },
        {
          "latitude": 17.09789,
          "longitude": 81.45011
        },
        {
          "latitude": 17.11215,
          "longitude": 81.44663
        },
        {
          "latitude": 17.11269,
          "longitude": 81.46565
        },
        {
          "latitude": 17.12665,
          "longitude": 81.47812
        },
        {
          "latitude": 17.1432,
          "longitude": 81.47638
        },
        {
          "latitude": 17.15508,
          "longitude": 81.48552
        },
        {
          "latitude": 17.16454,
          "longitude": 81.4772
        },
        {
          "latitude": 17.18178,
          "longitude": 81.47819
        },
        {
          "latitude": 17.20267,
          "longitude": 81.49995
        },
        {
          "latitude": 17.2067,
          "longitude": 81.53184
        },
        {
          "latitude": 17.22985,
          "longitude": 81.54998
        },
        {
          "latitude": 17.2155,
          "longitude": 81.57475
        },
        {
          "latitude": 17.22101,
          "longitude": 81.60187
        },
        {
          "latitude": 17.20535,
          "longitude": 81.59736
        },
        {
          "latitude": 17.19236,
          "longitude": 81.60585
        },
        {
          "latitude": 17.19234,
          "longitude": 81.62434
        },
        {
          "latitude": 17.17193,
          "longitude": 81.64517
        },
        {
          "latitude": 17.17134,
          "longitude": 81.65745
        },
        {
          "latitude": 17.20658,
          "longitude": 81.64076
        },
        {
          "latitude": 17.22925,
          "longitude": 81.64145
        },
        {
          "latitude": 17.28174,
          "longitude": 81.66163
        },
        {
          "latitude": 17.29006,
          "longitude": 81.67843
        },
        {
          "latitude": 17.30147,
          "longitude": 81.67808
        },
        {
          "latitude": 17.3237,
          "longitude": 81.64238
        },
        {
          "latitude": 17.33122,
          "longitude": 81.61428
        },
        {
          "latitude": 17.37561,
          "longitude": 81.60425
        },
        {
          "latitude": 17.40682,
          "longitude": 81.6139
        },
        {
          "latitude": 17.40568,
          "longitude": 81.5858
        },
        {
          "latitude": 17.43277,
          "longitude": 81.57562
        },
        {
          "latitude": 17.43983,
          "longitude": 81.56351
        },
        {
          "latitude": 17.43893,
          "longitude": 81.53263
        },
        {
          "latitude": 17.47244,
          "longitude": 81.5124
        },
        {
          "latitude": 17.48087,
          "longitude": 81.49874
        },
        {
          "latitude": 17.46128,
          "longitude": 81.5021
        },
        {
          "latitude": 17.45154,
          "longitude": 81.42386
        },
        {
          "latitude": 17.45557,
          "longitude": 81.40131
        },
        {
          "latitude": 17.48509,
          "longitude": 81.3681
        },
        {
          "latitude": 17.48438,
          "longitude": 81.29697
        },
        {
          "latitude": 17.55953,
          "longitude": 81.25902
        },
        {
          "latitude": 17.56432,
          "longitude": 81.18609
        },
        {
          "latitude": 17.58658,
          "longitude": 81.13493
        },
        {
          "latitude": 17.61646,
          "longitude": 81.09905
        },
        {
          "latitude": 17.61756,
          "longitude": 81.0744
        },
        {
          "latitude": 17.59859,
          "longitude": 81.01616
        },
        {
          "latitude": 17.60975,
          "longitude": 81.00601
        },
        {
          "latitude": 17.64334,
          "longitude": 81.00751
        },
        {
          "latitude": 17.6523,
          "longitude": 80.9958
        },
        {
          "latitude": 17.65037,
          "longitude": 80.97318
        },
        {
          "latitude": 17.63432,
          "longitude": 80.94384
        },
        {
          "latitude": 17.64277,
          "longitude": 80.89664
        },
        {
          "latitude": 17.63481,
          "longitude": 80.8891
        },
        {
          "latitude": 17.63808,
          "longitude": 80.84935
        },
        {
          "latitude": 17.62468,
          "longitude": 80.84298
        },
        {
          "latitude": 17.60856,
          "longitude": 80.85218
        },
        {
          "latitude": 17.59108,
          "longitude": 80.89872
        },
        {
          "latitude": 17.58983,
          "longitude": 80.95928
        },
        {
          "latitude": 17.55738,
          "longitude": 80.97027
        },
        {
          "latitude": 17.53002,
          "longitude": 81.00001
        },
        {
          "latitude": 17.49265,
          "longitude": 81.01202
        },
        {
          "latitude": 17.45623,
          "longitude": 81.09842
        },
        {
          "latitude": 17.48571,
          "longitude": 81.12955
        },
        {
          "latitude": 17.47945,
          "longitude": 81.15664
        },
        {
          "latitude": 17.4607,
          "longitude": 81.16981
        },
        {
          "latitude": 17.44727,
          "longitude": 81.1592
        },
        {
          "latitude": 17.43882,
          "longitude": 81.16317
        },
        {
          "latitude": 17.42105,
          "longitude": 81.2044
        },
        {
          "latitude": 17.43475,
          "longitude": 81.21131
        },
        {
          "latitude": 17.43801,
          "longitude": 81.22713
        },
        {
          "latitude": 17.40288,
          "longitude": 81.24507
        },
        {
          "latitude": 17.38371,
          "longitude": 81.29944
        },
        {
          "latitude": 17.3658,
          "longitude": 81.31609
        },
        {
          "latitude": 17.31813,
          "longitude": 81.27393
        },
        {
          "latitude": 17.32614,
          "longitude": 81.2455
        },
        {
          "latitude": 17.32082,
          "longitude": 81.23763
        },
        {
          "latitude": 17.32476,
          "longitude": 81.18974
        },
        {
          "latitude": 17.28588,
          "longitude": 81.1763
        },
        {
          "latitude": 17.25468,
          "longitude": 81.18763
        },
        {
          "latitude": 17.23059,
          "longitude": 81.1737
        },
        {
          "latitude": 17.21493,
          "longitude": 81.07896
        },
        {
          "latitude": 17.22483,
          "longitude": 81.05504
        },
        {
          "latitude": 17.20538,
          "longitude": 81.04768
        },
        {
          "latitude": 17.19039,
          "longitude": 81.03041
        },
        {
          "latitude": 17.19,
          "longitude": 80.99846
        },
        {
          "latitude": 17.19815,
          "longitude": 80.9675
        },
        {
          "latitude": 17.21943,
          "longitude": 80.93983
        },
        {
          "latitude": 17.21897,
          "longitude": 80.91825
        },
        {
          "latitude": 17.1573,
          "longitude": 80.92387
        },
        {
          "latitude": 17.15339,
          "longitude": 80.90977
        },
        {
          "latitude": 17.161,
          "longitude": 80.88045
        },
        {
          "latitude": 17.13415,
          "longitude": 80.87964
        },
        {
          "latitude": 17.12481,
          "longitude": 80.86822
        },
        {
          "latitude": 17.10578,
          "longitude": 80.87622
        },
        {
          "latitude": 17.07997,
          "longitude": 80.86753
        },
        {
          "latitude": 17.06981,
          "longitude": 80.87678
        },
        {
          "latitude": 17.03924,
          "longitude": 80.84486
        },
        {
          "latitude": 17.05072,
          "longitude": 80.83273
        },
        {
          "latitude": 17.06068,
          "longitude": 80.79927
        },
        {
          "latitude": 17.02182,
          "longitude": 80.77949
        },
        {
          "latitude": 17.00074,
          "longitude": 80.79918
        },
        {
          "latitude": 16.98978,
          "longitude": 80.82563
        },
        {
          "latitude": 16.92769,
          "longitude": 80.8238
        },
        {
          "latitude": 16.90853,
          "longitude": 80.8535
        },
        {
          "latitude": 16.88871,
          "longitude": 80.84659
        },
        {
          "latitude": 16.87911,
          "longitude": 80.82725
        },
        {
          "latitude": 16.88207,
          "longitude": 80.79761
        },
        {
          "latitude": 16.85942,
          "longitude": 80.79438
        },
        {
          "latitude": 16.85053,
          "longitude": 80.77204
        },
        {
          "latitude": 16.80991,
          "longitude": 80.77652
        },
        {
          "latitude": 16.65742,
          "longitude": 80.68589
        }
      ],
      [
        {
          "latitude": 16.71286,
          "longitude": 80.93081
        },
        {
          "latitude": 16.74368,
          "longitude": 80.95067
        },
        {
          "latitude": 16.75351,
          "longitude": 80.94352
        },
        {
          "latitude": 16.76229,
          "longitude": 80.96845
        },
        {
          "latitude": 16.74715,
          "longitude": 80.99984
        },
        {
          "latitude": 16.72236,
          "longitude": 80.98874
        },
        {
          "latitude": 16.72661,
          "longitude": 80.96947
        },
        {
          "latitude": 16.70087,
          "longitude": 80.95422
        },
        {
          "latitude": 16.71286,
          "longitude": 80.93081
        }
      ],
      [
        {
          "latitude": 16.67829,
          "longitude": 80.96782
        },
        {
          "latitude": 16.68002,
          "longitude": 80.99178
        },
        {
          "latitude": 16.67193,
          "longitude": 81.00748
        },
        {
          "latitude": 16.66407,
          "longitude": 80.99914
        },
        {
          "latitude": 16.6511,
          "longitude": 81.01756
        },
        {
          "latitude": 16.63463,
          "longitude": 81.0102
        },
        {
          "latitude": 16.63534,
          "longitude": 80.99533
        },
        {
          "latitude": 16.67829,
          "longitude": 80.96782
        }
      ],
      [
        {
          "latitude": 17.73091,
          "longitude": 80.88077
        },
        {
          "latitude": 17.72496,
          "longitude": 80.88137
        },
        {
          "latitude": 17.73091,
          "longitude": 80.88077
        }
      ],
      [
        {
          "latitude": 17.70086,
          "longitude": 80.88388
        },
        {
          "latitude": 17.70086,
          "longitude": 80.88388
        }
      ],
      [
        {
          "latitude": 17.68759,
          "longitude": 80.88412
        },
        {
          "latitude": 17.69348,
          "longitude": 80.88437
        },
        {
          "latitude": 17.68759,
          "longitude": 80.88412
        }
      ],
      [
        {
          "latitude": 17.69533,
          "longitude": 80.88426
        },
        {
          "latitude": 17.69533,
          "longitude": 80.88426
        }
      ]
    ]
  },
  {
    "id": "guntur",
    "name": "Guntur",
    "headquarters": "Guntur",
    "center": {
      "latitude": 16.2844,
      "longitude": 80.4674
    },
    "region": "Coastal Andhra",
    "polygon": [
      {
        "latitude": 16.29953,
        "longitude": 80.12133
      },
      {
        "latitude": 16.27033,
        "longitude": 80.12734
      },
      {
        "latitude": 16.25858,
        "longitude": 80.15243
      },
      {
        "latitude": 16.27029,
        "longitude": 80.16336
      },
      {
        "latitude": 16.26353,
        "longitude": 80.17834
      },
      {
        "latitude": 16.27852,
        "longitude": 80.17666
      },
      {
        "latitude": 16.27668,
        "longitude": 80.19067
      },
      {
        "latitude": 16.26805,
        "longitude": 80.19213
      },
      {
        "latitude": 16.25804,
        "longitude": 80.22018
      },
      {
        "latitude": 16.24957,
        "longitude": 80.21883
      },
      {
        "latitude": 16.24635,
        "longitude": 80.23076
      },
      {
        "latitude": 16.27383,
        "longitude": 80.24464
      },
      {
        "latitude": 16.26606,
        "longitude": 80.28013
      },
      {
        "latitude": 16.2861,
        "longitude": 80.31041
      },
      {
        "latitude": 16.30019,
        "longitude": 80.3121
      },
      {
        "latitude": 16.3155,
        "longitude": 80.32969
      },
      {
        "latitude": 16.29996,
        "longitude": 80.34121
      },
      {
        "latitude": 16.31511,
        "longitude": 80.34904
      },
      {
        "latitude": 16.29988,
        "longitude": 80.35202
      },
      {
        "latitude": 16.27178,
        "longitude": 80.33954
      },
      {
        "latitude": 16.21538,
        "longitude": 80.28921
      },
      {
        "latitude": 16.21783,
        "longitude": 80.2801
      },
      {
        "latitude": 16.20654,
        "longitude": 80.27625
      },
      {
        "latitude": 16.19941,
        "longitude": 80.27459
      },
      {
        "latitude": 16.18955,
        "longitude": 80.29646
      },
      {
        "latitude": 16.16417,
        "longitude": 80.29142
      },
      {
        "latitude": 16.1559,
        "longitude": 80.27127
      },
      {
        "latitude": 16.1428,
        "longitude": 80.27862
      },
      {
        "latitude": 16.12497,
        "longitude": 80.26606
      },
      {
        "latitude": 16.10344,
        "longitude": 80.28978
      },
      {
        "latitude": 16.09259,
        "longitude": 80.28122
      },
      {
        "latitude": 16.09778,
        "longitude": 80.25662
      },
      {
        "latitude": 16.08356,
        "longitude": 80.23475
      },
      {
        "latitude": 16.08779,
        "longitude": 80.22642
      },
      {
        "latitude": 16.03849,
        "longitude": 80.22945
      },
      {
        "latitude": 16.03727,
        "longitude": 80.23712
      },
      {
        "latitude": 16.05258,
        "longitude": 80.24001
      },
      {
        "latitude": 16.04597,
        "longitude": 80.26122
      },
      {
        "latitude": 16.05337,
        "longitude": 80.26238
      },
      {
        "latitude": 16.04981,
        "longitude": 80.30085
      },
      {
        "latitude": 16.05552,
        "longitude": 80.30177
      },
      {
        "latitude": 16.04506,
        "longitude": 80.31806
      },
      {
        "latitude": 16.02915,
        "longitude": 80.31361
      },
      {
        "latitude": 16.02561,
        "longitude": 80.32774
      },
      {
        "latitude": 16.01865,
        "longitude": 80.32507
      },
      {
        "latitude": 16.01513,
        "longitude": 80.33549
      },
      {
        "latitude": 16.02895,
        "longitude": 80.34501
      },
      {
        "latitude": 16.02704,
        "longitude": 80.3586
      },
      {
        "latitude": 16.01297,
        "longitude": 80.37127
      },
      {
        "latitude": 15.99977,
        "longitude": 80.42519
      },
      {
        "latitude": 15.98086,
        "longitude": 80.42568
      },
      {
        "latitude": 15.98156,
        "longitude": 80.45154
      },
      {
        "latitude": 16.01099,
        "longitude": 80.45857
      },
      {
        "latitude": 16.00967,
        "longitude": 80.49072
      },
      {
        "latitude": 16.00551,
        "longitude": 80.49961
      },
      {
        "latitude": 15.99674,
        "longitude": 80.4973
      },
      {
        "latitude": 16.01463,
        "longitude": 80.52912
      },
      {
        "latitude": 16.00017,
        "longitude": 80.52474
      },
      {
        "latitude": 15.9967,
        "longitude": 80.53527
      },
      {
        "latitude": 16.01046,
        "longitude": 80.53837
      },
      {
        "latitude": 16.00637,
        "longitude": 80.54653
      },
      {
        "latitude": 16.01337,
        "longitude": 80.5607
      },
      {
        "latitude": 16.03158,
        "longitude": 80.56262
      },
      {
        "latitude": 16.02468,
        "longitude": 80.58074
      },
      {
        "latitude": 16.04148,
        "longitude": 80.58306
      },
      {
        "latitude": 16.04817,
        "longitude": 80.59836
      },
      {
        "latitude": 16.0608,
        "longitude": 80.59059
      },
      {
        "latitude": 16.10244,
        "longitude": 80.59625
      },
      {
        "latitude": 16.12163,
        "longitude": 80.56937
      },
      {
        "latitude": 16.15072,
        "longitude": 80.57184
      },
      {
        "latitude": 16.15186,
        "longitude": 80.56212
      },
      {
        "latitude": 16.13372,
        "longitude": 80.55307
      },
      {
        "latitude": 16.14172,
        "longitude": 80.54279
      },
      {
        "latitude": 16.16278,
        "longitude": 80.55305
      },
      {
        "latitude": 16.16488,
        "longitude": 80.54372
      },
      {
        "latitude": 16.17453,
        "longitude": 80.5493
      },
      {
        "latitude": 16.17563,
        "longitude": 80.56324
      },
      {
        "latitude": 16.20312,
        "longitude": 80.55692
      },
      {
        "latitude": 16.20411,
        "longitude": 80.57111
      },
      {
        "latitude": 16.23745,
        "longitude": 80.59161
      },
      {
        "latitude": 16.23467,
        "longitude": 80.60533
      },
      {
        "latitude": 16.22326,
        "longitude": 80.60816
      },
      {
        "latitude": 16.2263,
        "longitude": 80.621
      },
      {
        "latitude": 16.21274,
        "longitude": 80.63357
      },
      {
        "latitude": 16.21435,
        "longitude": 80.64307
      },
      {
        "latitude": 16.19479,
        "longitude": 80.64944
      },
      {
        "latitude": 16.19408,
        "longitude": 80.67287
      },
      {
        "latitude": 16.19986,
        "longitude": 80.68577
      },
      {
        "latitude": 16.22849,
        "longitude": 80.69207
      },
      {
        "latitude": 16.23131,
        "longitude": 80.71542
      },
      {
        "latitude": 16.24494,
        "longitude": 80.71962
      },
      {
        "latitude": 16.23161,
        "longitude": 80.74845
      },
      {
        "latitude": 16.24817,
        "longitude": 80.75001
      },
      {
        "latitude": 16.25477,
        "longitude": 80.75858
      },
      {
        "latitude": 16.25004,
        "longitude": 80.77485
      },
      {
        "latitude": 16.2565,
        "longitude": 80.78173
      },
      {
        "latitude": 16.24708,
        "longitude": 80.7792
      },
      {
        "latitude": 16.24156,
        "longitude": 80.80003
      },
      {
        "latitude": 16.25433,
        "longitude": 80.80393
      },
      {
        "latitude": 16.28306,
        "longitude": 80.79768
      },
      {
        "latitude": 16.28849,
        "longitude": 80.78435
      },
      {
        "latitude": 16.33034,
        "longitude": 80.74778
      },
      {
        "latitude": 16.38109,
        "longitude": 80.72517
      },
      {
        "latitude": 16.42423,
        "longitude": 80.67455
      },
      {
        "latitude": 16.44228,
        "longitude": 80.67454
      },
      {
        "latitude": 16.44055,
        "longitude": 80.66586
      },
      {
        "latitude": 16.44929,
        "longitude": 80.66285
      },
      {
        "latitude": 16.46443,
        "longitude": 80.66978
      },
      {
        "latitude": 16.47167,
        "longitude": 80.66523
      },
      {
        "latitude": 16.53314,
        "longitude": 80.55489
      },
      {
        "latitude": 16.54167,
        "longitude": 80.55442
      },
      {
        "latitude": 16.56267,
        "longitude": 80.52885
      },
      {
        "latitude": 16.59097,
        "longitude": 80.46604
      },
      {
        "latitude": 16.58789,
        "longitude": 80.42732
      },
      {
        "latitude": 16.55862,
        "longitude": 80.42798
      },
      {
        "latitude": 16.52559,
        "longitude": 80.40673
      },
      {
        "latitude": 16.50765,
        "longitude": 80.40728
      },
      {
        "latitude": 16.5057,
        "longitude": 80.4197
      },
      {
        "latitude": 16.47655,
        "longitude": 80.42635
      },
      {
        "latitude": 16.47833,
        "longitude": 80.38121
      },
      {
        "latitude": 16.46427,
        "longitude": 80.3781
      },
      {
        "latitude": 16.45856,
        "longitude": 80.36744
      },
      {
        "latitude": 16.46645,
        "longitude": 80.34093
      },
      {
        "latitude": 16.46319,
        "longitude": 80.3179
      },
      {
        "latitude": 16.45432,
        "longitude": 80.30874
      },
      {
        "latitude": 16.42568,
        "longitude": 80.30331
      },
      {
        "latitude": 16.42922,
        "longitude": 80.28064
      },
      {
        "latitude": 16.40996,
        "longitude": 80.26968
      },
      {
        "latitude": 16.41589,
        "longitude": 80.23946
      },
      {
        "latitude": 16.39485,
        "longitude": 80.21986
      },
      {
        "latitude": 16.38244,
        "longitude": 80.23023
      },
      {
        "latitude": 16.36972,
        "longitude": 80.2254
      },
      {
        "latitude": 16.3659,
        "longitude": 80.23102
      },
      {
        "latitude": 16.33909,
        "longitude": 80.21741
      },
      {
        "latitude": 16.35889,
        "longitude": 80.18152
      },
      {
        "latitude": 16.3237,
        "longitude": 80.17486
      },
      {
        "latitude": 16.32621,
        "longitude": 80.16029
      },
      {
        "latitude": 16.30353,
        "longitude": 80.15742
      },
      {
        "latitude": 16.31036,
        "longitude": 80.12472
      },
      {
        "latitude": 16.29953,
        "longitude": 80.12133
      }
    ],
    "polygons": [
      [
        {
          "latitude": 16.29953,
          "longitude": 80.12133
        },
        {
          "latitude": 16.27033,
          "longitude": 80.12734
        },
        {
          "latitude": 16.25858,
          "longitude": 80.15243
        },
        {
          "latitude": 16.27029,
          "longitude": 80.16336
        },
        {
          "latitude": 16.26353,
          "longitude": 80.17834
        },
        {
          "latitude": 16.27852,
          "longitude": 80.17666
        },
        {
          "latitude": 16.27668,
          "longitude": 80.19067
        },
        {
          "latitude": 16.26805,
          "longitude": 80.19213
        },
        {
          "latitude": 16.25804,
          "longitude": 80.22018
        },
        {
          "latitude": 16.24957,
          "longitude": 80.21883
        },
        {
          "latitude": 16.24635,
          "longitude": 80.23076
        },
        {
          "latitude": 16.27383,
          "longitude": 80.24464
        },
        {
          "latitude": 16.26606,
          "longitude": 80.28013
        },
        {
          "latitude": 16.2861,
          "longitude": 80.31041
        },
        {
          "latitude": 16.30019,
          "longitude": 80.3121
        },
        {
          "latitude": 16.3155,
          "longitude": 80.32969
        },
        {
          "latitude": 16.29996,
          "longitude": 80.34121
        },
        {
          "latitude": 16.31511,
          "longitude": 80.34904
        },
        {
          "latitude": 16.29988,
          "longitude": 80.35202
        },
        {
          "latitude": 16.27178,
          "longitude": 80.33954
        },
        {
          "latitude": 16.21538,
          "longitude": 80.28921
        },
        {
          "latitude": 16.21783,
          "longitude": 80.2801
        },
        {
          "latitude": 16.20654,
          "longitude": 80.27625
        },
        {
          "latitude": 16.19941,
          "longitude": 80.27459
        },
        {
          "latitude": 16.18955,
          "longitude": 80.29646
        },
        {
          "latitude": 16.16417,
          "longitude": 80.29142
        },
        {
          "latitude": 16.1559,
          "longitude": 80.27127
        },
        {
          "latitude": 16.1428,
          "longitude": 80.27862
        },
        {
          "latitude": 16.12497,
          "longitude": 80.26606
        },
        {
          "latitude": 16.10344,
          "longitude": 80.28978
        },
        {
          "latitude": 16.09259,
          "longitude": 80.28122
        },
        {
          "latitude": 16.09778,
          "longitude": 80.25662
        },
        {
          "latitude": 16.08356,
          "longitude": 80.23475
        },
        {
          "latitude": 16.08779,
          "longitude": 80.22642
        },
        {
          "latitude": 16.03849,
          "longitude": 80.22945
        },
        {
          "latitude": 16.03727,
          "longitude": 80.23712
        },
        {
          "latitude": 16.05258,
          "longitude": 80.24001
        },
        {
          "latitude": 16.04597,
          "longitude": 80.26122
        },
        {
          "latitude": 16.05337,
          "longitude": 80.26238
        },
        {
          "latitude": 16.04981,
          "longitude": 80.30085
        },
        {
          "latitude": 16.05552,
          "longitude": 80.30177
        },
        {
          "latitude": 16.04506,
          "longitude": 80.31806
        },
        {
          "latitude": 16.02915,
          "longitude": 80.31361
        },
        {
          "latitude": 16.02561,
          "longitude": 80.32774
        },
        {
          "latitude": 16.01865,
          "longitude": 80.32507
        },
        {
          "latitude": 16.01513,
          "longitude": 80.33549
        },
        {
          "latitude": 16.02895,
          "longitude": 80.34501
        },
        {
          "latitude": 16.02704,
          "longitude": 80.3586
        },
        {
          "latitude": 16.01297,
          "longitude": 80.37127
        },
        {
          "latitude": 15.99977,
          "longitude": 80.42519
        },
        {
          "latitude": 15.98086,
          "longitude": 80.42568
        },
        {
          "latitude": 15.98156,
          "longitude": 80.45154
        },
        {
          "latitude": 16.01099,
          "longitude": 80.45857
        },
        {
          "latitude": 16.00967,
          "longitude": 80.49072
        },
        {
          "latitude": 16.00551,
          "longitude": 80.49961
        },
        {
          "latitude": 15.99674,
          "longitude": 80.4973
        },
        {
          "latitude": 16.01463,
          "longitude": 80.52912
        },
        {
          "latitude": 16.00017,
          "longitude": 80.52474
        },
        {
          "latitude": 15.9967,
          "longitude": 80.53527
        },
        {
          "latitude": 16.01046,
          "longitude": 80.53837
        },
        {
          "latitude": 16.00637,
          "longitude": 80.54653
        },
        {
          "latitude": 16.01337,
          "longitude": 80.5607
        },
        {
          "latitude": 16.03158,
          "longitude": 80.56262
        },
        {
          "latitude": 16.02468,
          "longitude": 80.58074
        },
        {
          "latitude": 16.04148,
          "longitude": 80.58306
        },
        {
          "latitude": 16.04817,
          "longitude": 80.59836
        },
        {
          "latitude": 16.0608,
          "longitude": 80.59059
        },
        {
          "latitude": 16.10244,
          "longitude": 80.59625
        },
        {
          "latitude": 16.12163,
          "longitude": 80.56937
        },
        {
          "latitude": 16.15072,
          "longitude": 80.57184
        },
        {
          "latitude": 16.15186,
          "longitude": 80.56212
        },
        {
          "latitude": 16.13372,
          "longitude": 80.55307
        },
        {
          "latitude": 16.14172,
          "longitude": 80.54279
        },
        {
          "latitude": 16.16278,
          "longitude": 80.55305
        },
        {
          "latitude": 16.16488,
          "longitude": 80.54372
        },
        {
          "latitude": 16.17453,
          "longitude": 80.5493
        },
        {
          "latitude": 16.17563,
          "longitude": 80.56324
        },
        {
          "latitude": 16.20312,
          "longitude": 80.55692
        },
        {
          "latitude": 16.20411,
          "longitude": 80.57111
        },
        {
          "latitude": 16.23745,
          "longitude": 80.59161
        },
        {
          "latitude": 16.23467,
          "longitude": 80.60533
        },
        {
          "latitude": 16.22326,
          "longitude": 80.60816
        },
        {
          "latitude": 16.2263,
          "longitude": 80.621
        },
        {
          "latitude": 16.21274,
          "longitude": 80.63357
        },
        {
          "latitude": 16.21435,
          "longitude": 80.64307
        },
        {
          "latitude": 16.19479,
          "longitude": 80.64944
        },
        {
          "latitude": 16.19408,
          "longitude": 80.67287
        },
        {
          "latitude": 16.19986,
          "longitude": 80.68577
        },
        {
          "latitude": 16.22849,
          "longitude": 80.69207
        },
        {
          "latitude": 16.23131,
          "longitude": 80.71542
        },
        {
          "latitude": 16.24494,
          "longitude": 80.71962
        },
        {
          "latitude": 16.23161,
          "longitude": 80.74845
        },
        {
          "latitude": 16.24817,
          "longitude": 80.75001
        },
        {
          "latitude": 16.25477,
          "longitude": 80.75858
        },
        {
          "latitude": 16.25004,
          "longitude": 80.77485
        },
        {
          "latitude": 16.2565,
          "longitude": 80.78173
        },
        {
          "latitude": 16.24708,
          "longitude": 80.7792
        },
        {
          "latitude": 16.24156,
          "longitude": 80.80003
        },
        {
          "latitude": 16.25433,
          "longitude": 80.80393
        },
        {
          "latitude": 16.28306,
          "longitude": 80.79768
        },
        {
          "latitude": 16.28849,
          "longitude": 80.78435
        },
        {
          "latitude": 16.33034,
          "longitude": 80.74778
        },
        {
          "latitude": 16.38109,
          "longitude": 80.72517
        },
        {
          "latitude": 16.42423,
          "longitude": 80.67455
        },
        {
          "latitude": 16.44228,
          "longitude": 80.67454
        },
        {
          "latitude": 16.44055,
          "longitude": 80.66586
        },
        {
          "latitude": 16.44929,
          "longitude": 80.66285
        },
        {
          "latitude": 16.46443,
          "longitude": 80.66978
        },
        {
          "latitude": 16.47167,
          "longitude": 80.66523
        },
        {
          "latitude": 16.53314,
          "longitude": 80.55489
        },
        {
          "latitude": 16.54167,
          "longitude": 80.55442
        },
        {
          "latitude": 16.56267,
          "longitude": 80.52885
        },
        {
          "latitude": 16.59097,
          "longitude": 80.46604
        },
        {
          "latitude": 16.58789,
          "longitude": 80.42732
        },
        {
          "latitude": 16.55862,
          "longitude": 80.42798
        },
        {
          "latitude": 16.52559,
          "longitude": 80.40673
        },
        {
          "latitude": 16.50765,
          "longitude": 80.40728
        },
        {
          "latitude": 16.5057,
          "longitude": 80.4197
        },
        {
          "latitude": 16.47655,
          "longitude": 80.42635
        },
        {
          "latitude": 16.47833,
          "longitude": 80.38121
        },
        {
          "latitude": 16.46427,
          "longitude": 80.3781
        },
        {
          "latitude": 16.45856,
          "longitude": 80.36744
        },
        {
          "latitude": 16.46645,
          "longitude": 80.34093
        },
        {
          "latitude": 16.46319,
          "longitude": 80.3179
        },
        {
          "latitude": 16.45432,
          "longitude": 80.30874
        },
        {
          "latitude": 16.42568,
          "longitude": 80.30331
        },
        {
          "latitude": 16.42922,
          "longitude": 80.28064
        },
        {
          "latitude": 16.40996,
          "longitude": 80.26968
        },
        {
          "latitude": 16.41589,
          "longitude": 80.23946
        },
        {
          "latitude": 16.39485,
          "longitude": 80.21986
        },
        {
          "latitude": 16.38244,
          "longitude": 80.23023
        },
        {
          "latitude": 16.36972,
          "longitude": 80.2254
        },
        {
          "latitude": 16.3659,
          "longitude": 80.23102
        },
        {
          "latitude": 16.33909,
          "longitude": 80.21741
        },
        {
          "latitude": 16.35889,
          "longitude": 80.18152
        },
        {
          "latitude": 16.3237,
          "longitude": 80.17486
        },
        {
          "latitude": 16.32621,
          "longitude": 80.16029
        },
        {
          "latitude": 16.30353,
          "longitude": 80.15742
        },
        {
          "latitude": 16.31036,
          "longitude": 80.12472
        },
        {
          "latitude": 16.29953,
          "longitude": 80.12133
        }
      ]
    ]
  },
  {
    "id": "kakinada",
    "name": "Kakinada",
    "headquarters": "Kakinada",
    "center": {
      "latitude": 17.1284,
      "longitude": 82.2461
    },
    "region": "Coastal Andhra",
    "polygon": [
      {
        "latitude": 17.18462,
        "longitude": 81.90312
      },
      {
        "latitude": 17.16407,
        "longitude": 81.91875
      },
      {
        "latitude": 17.1402,
        "longitude": 81.91505
      },
      {
        "latitude": 17.10227,
        "longitude": 81.92388
      },
      {
        "latitude": 17.11819,
        "longitude": 81.95814
      },
      {
        "latitude": 17.11974,
        "longitude": 81.9992
      },
      {
        "latitude": 17.09171,
        "longitude": 82.04724
      },
      {
        "latitude": 17.07272,
        "longitude": 82.0473
      },
      {
        "latitude": 17.06337,
        "longitude": 82.03186
      },
      {
        "latitude": 17.03743,
        "longitude": 82.03132
      },
      {
        "latitude": 17.04164,
        "longitude": 82.0747
      },
      {
        "latitude": 17.03611,
        "longitude": 82.07821
      },
      {
        "latitude": 17.0132,
        "longitude": 82.06864
      },
      {
        "latitude": 17.01184,
        "longitude": 82.06147
      },
      {
        "latitude": 16.9936,
        "longitude": 82.05859
      },
      {
        "latitude": 16.99278,
        "longitude": 82.06496
      },
      {
        "latitude": 16.95669,
        "longitude": 82.07305
      },
      {
        "latitude": 16.94425,
        "longitude": 82.06227
      },
      {
        "latitude": 16.92868,
        "longitude": 82.06588
      },
      {
        "latitude": 16.9009,
        "longitude": 82.05573
      },
      {
        "latitude": 16.89464,
        "longitude": 82.05738
      },
      {
        "latitude": 16.89783,
        "longitude": 82.07464
      },
      {
        "latitude": 16.88522,
        "longitude": 82.07474
      },
      {
        "latitude": 16.88336,
        "longitude": 82.09368
      },
      {
        "latitude": 16.87456,
        "longitude": 82.09359
      },
      {
        "latitude": 16.86344,
        "longitude": 82.10945
      },
      {
        "latitude": 16.85082,
        "longitude": 82.08307
      },
      {
        "latitude": 16.84127,
        "longitude": 82.09227
      },
      {
        "latitude": 16.83375,
        "longitude": 82.08933
      },
      {
        "latitude": 16.84264,
        "longitude": 82.10097
      },
      {
        "latitude": 16.83681,
        "longitude": 82.11066
      },
      {
        "latitude": 16.80762,
        "longitude": 82.09906
      },
      {
        "latitude": 16.80572,
        "longitude": 82.10747
      },
      {
        "latitude": 16.79167,
        "longitude": 82.11082
      },
      {
        "latitude": 16.78634,
        "longitude": 82.093
      },
      {
        "latitude": 16.77887,
        "longitude": 82.09605
      },
      {
        "latitude": 16.76628,
        "longitude": 82.08679
      },
      {
        "latitude": 16.75311,
        "longitude": 82.0662
      },
      {
        "latitude": 16.77164,
        "longitude": 82.02222
      },
      {
        "latitude": 16.77383,
        "longitude": 81.97766
      },
      {
        "latitude": 16.76193,
        "longitude": 81.97483
      },
      {
        "latitude": 16.76223,
        "longitude": 81.99481
      },
      {
        "latitude": 16.74633,
        "longitude": 81.99191
      },
      {
        "latitude": 16.74253,
        "longitude": 82.00211
      },
      {
        "latitude": 16.72725,
        "longitude": 81.99603
      },
      {
        "latitude": 16.72686,
        "longitude": 81.98649
      },
      {
        "latitude": 16.71562,
        "longitude": 81.9858
      },
      {
        "latitude": 16.70756,
        "longitude": 81.9912
      },
      {
        "latitude": 16.72051,
        "longitude": 82.00904
      },
      {
        "latitude": 16.70441,
        "longitude": 82.02004
      },
      {
        "latitude": 16.68379,
        "longitude": 82.01158
      },
      {
        "latitude": 16.67247,
        "longitude": 82.03563
      },
      {
        "latitude": 16.68232,
        "longitude": 82.05226
      },
      {
        "latitude": 16.67628,
        "longitude": 82.08396
      },
      {
        "latitude": 16.68451,
        "longitude": 82.08048
      },
      {
        "latitude": 16.69056,
        "longitude": 82.10605
      },
      {
        "latitude": 16.68371,
        "longitude": 82.12987
      },
      {
        "latitude": 16.68966,
        "longitude": 82.17136
      },
      {
        "latitude": 16.70799,
        "longitude": 82.1875
      },
      {
        "latitude": 16.71453,
        "longitude": 82.20516
      },
      {
        "latitude": 16.71482,
        "longitude": 82.22797
      },
      {
        "latitude": 16.69557,
        "longitude": 82.26593
      },
      {
        "latitude": 16.70228,
        "longitude": 82.28779
      },
      {
        "latitude": 16.72742,
        "longitude": 82.31228
      },
      {
        "latitude": 16.77724,
        "longitude": 82.30171
      },
      {
        "latitude": 16.77748,
        "longitude": 82.32081
      },
      {
        "latitude": 16.71616,
        "longitude": 82.33364
      },
      {
        "latitude": 16.71398,
        "longitude": 82.3428
      },
      {
        "latitude": 16.69619,
        "longitude": 82.33597
      },
      {
        "latitude": 16.69232,
        "longitude": 82.3414
      },
      {
        "latitude": 16.72151,
        "longitude": 82.36918
      },
      {
        "latitude": 16.74172,
        "longitude": 82.34365
      },
      {
        "latitude": 16.90627,
        "longitude": 82.36992
      },
      {
        "latitude": 16.9599,
        "longitude": 82.3653
      },
      {
        "latitude": 16.98026,
        "longitude": 82.35439
      },
      {
        "latitude": 16.99341,
        "longitude": 82.33348
      },
      {
        "latitude": 16.94809,
        "longitude": 82.27122
      },
      {
        "latitude": 16.99333,
        "longitude": 82.27972
      },
      {
        "latitude": 17.038,
        "longitude": 82.30237
      },
      {
        "latitude": 17.07649,
        "longitude": 82.338
      },
      {
        "latitude": 17.17485,
        "longitude": 82.4431
      },
      {
        "latitude": 17.24851,
        "longitude": 82.54136
      },
      {
        "latitude": 17.26327,
        "longitude": 82.53906
      },
      {
        "latitude": 17.27659,
        "longitude": 82.5229
      },
      {
        "latitude": 17.29931,
        "longitude": 82.51816
      },
      {
        "latitude": 17.30787,
        "longitude": 82.53584
      },
      {
        "latitude": 17.32705,
        "longitude": 82.53575
      },
      {
        "latitude": 17.32416,
        "longitude": 82.55555
      },
      {
        "latitude": 17.33079,
        "longitude": 82.56016
      },
      {
        "latitude": 17.35067,
        "longitude": 82.56682
      },
      {
        "latitude": 17.35292,
        "longitude": 82.5553
      },
      {
        "latitude": 17.37408,
        "longitude": 82.54297
      },
      {
        "latitude": 17.40847,
        "longitude": 82.56057
      },
      {
        "latitude": 17.42457,
        "longitude": 82.58323
      },
      {
        "latitude": 17.46025,
        "longitude": 82.60477
      },
      {
        "latitude": 17.46917,
        "longitude": 82.58544
      },
      {
        "latitude": 17.49196,
        "longitude": 82.56812
      },
      {
        "latitude": 17.49063,
        "longitude": 82.56119
      },
      {
        "latitude": 17.52705,
        "longitude": 82.55247
      },
      {
        "latitude": 17.50731,
        "longitude": 82.53903
      },
      {
        "latitude": 17.50138,
        "longitude": 82.51733
      },
      {
        "latitude": 17.509,
        "longitude": 82.50223
      },
      {
        "latitude": 17.49919,
        "longitude": 82.48723
      },
      {
        "latitude": 17.53476,
        "longitude": 82.46634
      },
      {
        "latitude": 17.52952,
        "longitude": 82.46055
      },
      {
        "latitude": 17.51138,
        "longitude": 82.46525
      },
      {
        "latitude": 17.51099,
        "longitude": 82.44945
      },
      {
        "latitude": 17.48031,
        "longitude": 82.45119
      },
      {
        "latitude": 17.46652,
        "longitude": 82.41007
      },
      {
        "latitude": 17.4791,
        "longitude": 82.37282
      },
      {
        "latitude": 17.48914,
        "longitude": 82.36741
      },
      {
        "latitude": 17.51016,
        "longitude": 82.3753
      },
      {
        "latitude": 17.50812,
        "longitude": 82.35935
      },
      {
        "latitude": 17.49392,
        "longitude": 82.34465
      },
      {
        "latitude": 17.51089,
        "longitude": 82.33003
      },
      {
        "latitude": 17.47758,
        "longitude": 82.28931
      },
      {
        "latitude": 17.44598,
        "longitude": 82.28474
      },
      {
        "latitude": 17.43099,
        "longitude": 82.25317
      },
      {
        "latitude": 17.39691,
        "longitude": 82.21718
      },
      {
        "latitude": 17.38921,
        "longitude": 82.21801
      },
      {
        "latitude": 17.3792,
        "longitude": 82.19806
      },
      {
        "latitude": 17.38674,
        "longitude": 82.1856
      },
      {
        "latitude": 17.3666,
        "longitude": 82.13909
      },
      {
        "latitude": 17.36306,
        "longitude": 82.14945
      },
      {
        "latitude": 17.35214,
        "longitude": 82.14498
      },
      {
        "latitude": 17.34883,
        "longitude": 82.15414
      },
      {
        "latitude": 17.34165,
        "longitude": 82.14266
      },
      {
        "latitude": 17.34504,
        "longitude": 82.12503
      },
      {
        "latitude": 17.32286,
        "longitude": 82.12269
      },
      {
        "latitude": 17.3288,
        "longitude": 82.11507
      },
      {
        "latitude": 17.32562,
        "longitude": 82.09932
      },
      {
        "latitude": 17.33885,
        "longitude": 82.10771
      },
      {
        "latitude": 17.34697,
        "longitude": 82.09158
      },
      {
        "latitude": 17.366,
        "longitude": 82.11221
      },
      {
        "latitude": 17.38597,
        "longitude": 82.12084
      },
      {
        "latitude": 17.3919,
        "longitude": 82.11358
      },
      {
        "latitude": 17.3848,
        "longitude": 82.10176
      },
      {
        "latitude": 17.40076,
        "longitude": 82.09847
      },
      {
        "latitude": 17.38804,
        "longitude": 82.08762
      },
      {
        "latitude": 17.40259,
        "longitude": 82.08217
      },
      {
        "latitude": 17.40172,
        "longitude": 82.07425
      },
      {
        "latitude": 17.39712,
        "longitude": 82.07123
      },
      {
        "latitude": 17.39459,
        "longitude": 82.08108
      },
      {
        "latitude": 17.38466,
        "longitude": 82.07487
      },
      {
        "latitude": 17.39016,
        "longitude": 82.0677
      },
      {
        "latitude": 17.3751,
        "longitude": 82.05151
      },
      {
        "latitude": 17.36064,
        "longitude": 82.06205
      },
      {
        "latitude": 17.34461,
        "longitude": 82.05489
      },
      {
        "latitude": 17.33133,
        "longitude": 82.06207
      },
      {
        "latitude": 17.31609,
        "longitude": 82.05365
      },
      {
        "latitude": 17.30342,
        "longitude": 82.06381
      },
      {
        "latitude": 17.30204,
        "longitude": 82.08619
      },
      {
        "latitude": 17.28951,
        "longitude": 82.0933
      },
      {
        "latitude": 17.28539,
        "longitude": 82.07555
      },
      {
        "latitude": 17.29398,
        "longitude": 82.06469
      },
      {
        "latitude": 17.2768,
        "longitude": 82.05991
      },
      {
        "latitude": 17.26961,
        "longitude": 82.0418
      },
      {
        "latitude": 17.26043,
        "longitude": 82.00493
      },
      {
        "latitude": 17.2617,
        "longitude": 81.96648
      },
      {
        "latitude": 17.24933,
        "longitude": 81.95101
      },
      {
        "latitude": 17.23865,
        "longitude": 81.95491
      },
      {
        "latitude": 17.20018,
        "longitude": 81.93702
      },
      {
        "latitude": 17.1986,
        "longitude": 81.92031
      },
      {
        "latitude": 17.18462,
        "longitude": 81.90312
      }
    ],
    "polygons": [
      [
        {
          "latitude": 17.18462,
          "longitude": 81.90312
        },
        {
          "latitude": 17.16407,
          "longitude": 81.91875
        },
        {
          "latitude": 17.1402,
          "longitude": 81.91505
        },
        {
          "latitude": 17.10227,
          "longitude": 81.92388
        },
        {
          "latitude": 17.11819,
          "longitude": 81.95814
        },
        {
          "latitude": 17.11974,
          "longitude": 81.9992
        },
        {
          "latitude": 17.09171,
          "longitude": 82.04724
        },
        {
          "latitude": 17.07272,
          "longitude": 82.0473
        },
        {
          "latitude": 17.06337,
          "longitude": 82.03186
        },
        {
          "latitude": 17.03743,
          "longitude": 82.03132
        },
        {
          "latitude": 17.04164,
          "longitude": 82.0747
        },
        {
          "latitude": 17.03611,
          "longitude": 82.07821
        },
        {
          "latitude": 17.0132,
          "longitude": 82.06864
        },
        {
          "latitude": 17.01184,
          "longitude": 82.06147
        },
        {
          "latitude": 16.9936,
          "longitude": 82.05859
        },
        {
          "latitude": 16.99278,
          "longitude": 82.06496
        },
        {
          "latitude": 16.95669,
          "longitude": 82.07305
        },
        {
          "latitude": 16.94425,
          "longitude": 82.06227
        },
        {
          "latitude": 16.92868,
          "longitude": 82.06588
        },
        {
          "latitude": 16.9009,
          "longitude": 82.05573
        },
        {
          "latitude": 16.89464,
          "longitude": 82.05738
        },
        {
          "latitude": 16.89783,
          "longitude": 82.07464
        },
        {
          "latitude": 16.88522,
          "longitude": 82.07474
        },
        {
          "latitude": 16.88336,
          "longitude": 82.09368
        },
        {
          "latitude": 16.87456,
          "longitude": 82.09359
        },
        {
          "latitude": 16.86344,
          "longitude": 82.10945
        },
        {
          "latitude": 16.85082,
          "longitude": 82.08307
        },
        {
          "latitude": 16.84127,
          "longitude": 82.09227
        },
        {
          "latitude": 16.83375,
          "longitude": 82.08933
        },
        {
          "latitude": 16.84264,
          "longitude": 82.10097
        },
        {
          "latitude": 16.83681,
          "longitude": 82.11066
        },
        {
          "latitude": 16.80762,
          "longitude": 82.09906
        },
        {
          "latitude": 16.80572,
          "longitude": 82.10747
        },
        {
          "latitude": 16.79167,
          "longitude": 82.11082
        },
        {
          "latitude": 16.78634,
          "longitude": 82.093
        },
        {
          "latitude": 16.77887,
          "longitude": 82.09605
        },
        {
          "latitude": 16.76628,
          "longitude": 82.08679
        },
        {
          "latitude": 16.75311,
          "longitude": 82.0662
        },
        {
          "latitude": 16.77164,
          "longitude": 82.02222
        },
        {
          "latitude": 16.77383,
          "longitude": 81.97766
        },
        {
          "latitude": 16.76193,
          "longitude": 81.97483
        },
        {
          "latitude": 16.76223,
          "longitude": 81.99481
        },
        {
          "latitude": 16.74633,
          "longitude": 81.99191
        },
        {
          "latitude": 16.74253,
          "longitude": 82.00211
        },
        {
          "latitude": 16.72725,
          "longitude": 81.99603
        },
        {
          "latitude": 16.72686,
          "longitude": 81.98649
        },
        {
          "latitude": 16.71562,
          "longitude": 81.9858
        },
        {
          "latitude": 16.70756,
          "longitude": 81.9912
        },
        {
          "latitude": 16.72051,
          "longitude": 82.00904
        },
        {
          "latitude": 16.70441,
          "longitude": 82.02004
        },
        {
          "latitude": 16.68379,
          "longitude": 82.01158
        },
        {
          "latitude": 16.67247,
          "longitude": 82.03563
        },
        {
          "latitude": 16.68232,
          "longitude": 82.05226
        },
        {
          "latitude": 16.67628,
          "longitude": 82.08396
        },
        {
          "latitude": 16.68451,
          "longitude": 82.08048
        },
        {
          "latitude": 16.69056,
          "longitude": 82.10605
        },
        {
          "latitude": 16.68371,
          "longitude": 82.12987
        },
        {
          "latitude": 16.68966,
          "longitude": 82.17136
        },
        {
          "latitude": 16.70799,
          "longitude": 82.1875
        },
        {
          "latitude": 16.71453,
          "longitude": 82.20516
        },
        {
          "latitude": 16.71482,
          "longitude": 82.22797
        },
        {
          "latitude": 16.69557,
          "longitude": 82.26593
        },
        {
          "latitude": 16.70228,
          "longitude": 82.28779
        },
        {
          "latitude": 16.72742,
          "longitude": 82.31228
        },
        {
          "latitude": 16.77724,
          "longitude": 82.30171
        },
        {
          "latitude": 16.77748,
          "longitude": 82.32081
        },
        {
          "latitude": 16.71616,
          "longitude": 82.33364
        },
        {
          "latitude": 16.71398,
          "longitude": 82.3428
        },
        {
          "latitude": 16.69619,
          "longitude": 82.33597
        },
        {
          "latitude": 16.69232,
          "longitude": 82.3414
        },
        {
          "latitude": 16.72151,
          "longitude": 82.36918
        },
        {
          "latitude": 16.74172,
          "longitude": 82.34365
        },
        {
          "latitude": 16.90627,
          "longitude": 82.36992
        },
        {
          "latitude": 16.9599,
          "longitude": 82.3653
        },
        {
          "latitude": 16.98026,
          "longitude": 82.35439
        },
        {
          "latitude": 16.99341,
          "longitude": 82.33348
        },
        {
          "latitude": 16.94809,
          "longitude": 82.27122
        },
        {
          "latitude": 16.99333,
          "longitude": 82.27972
        },
        {
          "latitude": 17.038,
          "longitude": 82.30237
        },
        {
          "latitude": 17.07649,
          "longitude": 82.338
        },
        {
          "latitude": 17.17485,
          "longitude": 82.4431
        },
        {
          "latitude": 17.24851,
          "longitude": 82.54136
        },
        {
          "latitude": 17.26327,
          "longitude": 82.53906
        },
        {
          "latitude": 17.27659,
          "longitude": 82.5229
        },
        {
          "latitude": 17.29931,
          "longitude": 82.51816
        },
        {
          "latitude": 17.30787,
          "longitude": 82.53584
        },
        {
          "latitude": 17.32705,
          "longitude": 82.53575
        },
        {
          "latitude": 17.32416,
          "longitude": 82.55555
        },
        {
          "latitude": 17.33079,
          "longitude": 82.56016
        },
        {
          "latitude": 17.35067,
          "longitude": 82.56682
        },
        {
          "latitude": 17.35292,
          "longitude": 82.5553
        },
        {
          "latitude": 17.37408,
          "longitude": 82.54297
        },
        {
          "latitude": 17.40847,
          "longitude": 82.56057
        },
        {
          "latitude": 17.42457,
          "longitude": 82.58323
        },
        {
          "latitude": 17.46025,
          "longitude": 82.60477
        },
        {
          "latitude": 17.46917,
          "longitude": 82.58544
        },
        {
          "latitude": 17.49196,
          "longitude": 82.56812
        },
        {
          "latitude": 17.49063,
          "longitude": 82.56119
        },
        {
          "latitude": 17.52705,
          "longitude": 82.55247
        },
        {
          "latitude": 17.50731,
          "longitude": 82.53903
        },
        {
          "latitude": 17.50138,
          "longitude": 82.51733
        },
        {
          "latitude": 17.509,
          "longitude": 82.50223
        },
        {
          "latitude": 17.49919,
          "longitude": 82.48723
        },
        {
          "latitude": 17.53476,
          "longitude": 82.46634
        },
        {
          "latitude": 17.52952,
          "longitude": 82.46055
        },
        {
          "latitude": 17.51138,
          "longitude": 82.46525
        },
        {
          "latitude": 17.51099,
          "longitude": 82.44945
        },
        {
          "latitude": 17.48031,
          "longitude": 82.45119
        },
        {
          "latitude": 17.46652,
          "longitude": 82.41007
        },
        {
          "latitude": 17.4791,
          "longitude": 82.37282
        },
        {
          "latitude": 17.48914,
          "longitude": 82.36741
        },
        {
          "latitude": 17.51016,
          "longitude": 82.3753
        },
        {
          "latitude": 17.50812,
          "longitude": 82.35935
        },
        {
          "latitude": 17.49392,
          "longitude": 82.34465
        },
        {
          "latitude": 17.51089,
          "longitude": 82.33003
        },
        {
          "latitude": 17.47758,
          "longitude": 82.28931
        },
        {
          "latitude": 17.44598,
          "longitude": 82.28474
        },
        {
          "latitude": 17.43099,
          "longitude": 82.25317
        },
        {
          "latitude": 17.39691,
          "longitude": 82.21718
        },
        {
          "latitude": 17.38921,
          "longitude": 82.21801
        },
        {
          "latitude": 17.3792,
          "longitude": 82.19806
        },
        {
          "latitude": 17.38674,
          "longitude": 82.1856
        },
        {
          "latitude": 17.3666,
          "longitude": 82.13909
        },
        {
          "latitude": 17.36306,
          "longitude": 82.14945
        },
        {
          "latitude": 17.35214,
          "longitude": 82.14498
        },
        {
          "latitude": 17.34883,
          "longitude": 82.15414
        },
        {
          "latitude": 17.34165,
          "longitude": 82.14266
        },
        {
          "latitude": 17.34504,
          "longitude": 82.12503
        },
        {
          "latitude": 17.32286,
          "longitude": 82.12269
        },
        {
          "latitude": 17.3288,
          "longitude": 82.11507
        },
        {
          "latitude": 17.32562,
          "longitude": 82.09932
        },
        {
          "latitude": 17.33885,
          "longitude": 82.10771
        },
        {
          "latitude": 17.34697,
          "longitude": 82.09158
        },
        {
          "latitude": 17.366,
          "longitude": 82.11221
        },
        {
          "latitude": 17.38597,
          "longitude": 82.12084
        },
        {
          "latitude": 17.3919,
          "longitude": 82.11358
        },
        {
          "latitude": 17.3848,
          "longitude": 82.10176
        },
        {
          "latitude": 17.40076,
          "longitude": 82.09847
        },
        {
          "latitude": 17.38804,
          "longitude": 82.08762
        },
        {
          "latitude": 17.40259,
          "longitude": 82.08217
        },
        {
          "latitude": 17.40172,
          "longitude": 82.07425
        },
        {
          "latitude": 17.39712,
          "longitude": 82.07123
        },
        {
          "latitude": 17.39459,
          "longitude": 82.08108
        },
        {
          "latitude": 17.38466,
          "longitude": 82.07487
        },
        {
          "latitude": 17.39016,
          "longitude": 82.0677
        },
        {
          "latitude": 17.3751,
          "longitude": 82.05151
        },
        {
          "latitude": 17.36064,
          "longitude": 82.06205
        },
        {
          "latitude": 17.34461,
          "longitude": 82.05489
        },
        {
          "latitude": 17.33133,
          "longitude": 82.06207
        },
        {
          "latitude": 17.31609,
          "longitude": 82.05365
        },
        {
          "latitude": 17.30342,
          "longitude": 82.06381
        },
        {
          "latitude": 17.30204,
          "longitude": 82.08619
        },
        {
          "latitude": 17.28951,
          "longitude": 82.0933
        },
        {
          "latitude": 17.28539,
          "longitude": 82.07555
        },
        {
          "latitude": 17.29398,
          "longitude": 82.06469
        },
        {
          "latitude": 17.2768,
          "longitude": 82.05991
        },
        {
          "latitude": 17.26961,
          "longitude": 82.0418
        },
        {
          "latitude": 17.26043,
          "longitude": 82.00493
        },
        {
          "latitude": 17.2617,
          "longitude": 81.96648
        },
        {
          "latitude": 17.24933,
          "longitude": 81.95101
        },
        {
          "latitude": 17.23865,
          "longitude": 81.95491
        },
        {
          "latitude": 17.20018,
          "longitude": 81.93702
        },
        {
          "latitude": 17.1986,
          "longitude": 81.92031
        },
        {
          "latitude": 17.18462,
          "longitude": 81.90312
        }
      ]
    ]
  },
  {
    "id": "konaseema",
    "name": "Dr. B.R. Ambedkar Konaseema",
    "headquarters": "Amalapuram",
    "center": {
      "latitude": 16.6424,
      "longitude": 81.9815
    },
    "region": "Coastal Andhra",
    "polygon": [
      {
        "latitude": 16.41338,
        "longitude": 81.69652
      },
      {
        "latitude": 16.35611,
        "longitude": 81.7161
      },
      {
        "latitude": 16.31688,
        "longitude": 81.71323
      },
      {
        "latitude": 16.31257,
        "longitude": 81.72392
      },
      {
        "latitude": 16.37542,
        "longitude": 81.85367
      },
      {
        "latitude": 16.39905,
        "longitude": 81.95817
      },
      {
        "latitude": 16.53977,
        "longitude": 82.22441
      },
      {
        "latitude": 16.56962,
        "longitude": 82.30924
      },
      {
        "latitude": 16.57712,
        "longitude": 82.31902
      },
      {
        "latitude": 16.60978,
        "longitude": 82.32875
      },
      {
        "latitude": 16.65908,
        "longitude": 82.32473
      },
      {
        "latitude": 16.70116,
        "longitude": 82.35481
      },
      {
        "latitude": 16.69266,
        "longitude": 82.33626
      },
      {
        "latitude": 16.71398,
        "longitude": 82.3428
      },
      {
        "latitude": 16.71616,
        "longitude": 82.33364
      },
      {
        "latitude": 16.77748,
        "longitude": 82.32081
      },
      {
        "latitude": 16.77671,
        "longitude": 82.30052
      },
      {
        "latitude": 16.72742,
        "longitude": 82.31228
      },
      {
        "latitude": 16.70228,
        "longitude": 82.28779
      },
      {
        "latitude": 16.69557,
        "longitude": 82.26593
      },
      {
        "latitude": 16.71482,
        "longitude": 82.22797
      },
      {
        "latitude": 16.71437,
        "longitude": 82.20333
      },
      {
        "latitude": 16.68966,
        "longitude": 82.17136
      },
      {
        "latitude": 16.68371,
        "longitude": 82.12987
      },
      {
        "latitude": 16.69056,
        "longitude": 82.10605
      },
      {
        "latitude": 16.68451,
        "longitude": 82.08048
      },
      {
        "latitude": 16.67628,
        "longitude": 82.08396
      },
      {
        "latitude": 16.68232,
        "longitude": 82.05226
      },
      {
        "latitude": 16.67247,
        "longitude": 82.03204
      },
      {
        "latitude": 16.68379,
        "longitude": 82.01158
      },
      {
        "latitude": 16.70441,
        "longitude": 82.02004
      },
      {
        "latitude": 16.71833,
        "longitude": 82.01315
      },
      {
        "latitude": 16.70756,
        "longitude": 81.9912
      },
      {
        "latitude": 16.71562,
        "longitude": 81.9858
      },
      {
        "latitude": 16.72686,
        "longitude": 81.98649
      },
      {
        "latitude": 16.72725,
        "longitude": 81.99603
      },
      {
        "latitude": 16.74253,
        "longitude": 82.00211
      },
      {
        "latitude": 16.74633,
        "longitude": 81.99191
      },
      {
        "latitude": 16.76223,
        "longitude": 81.99481
      },
      {
        "latitude": 16.76193,
        "longitude": 81.97483
      },
      {
        "latitude": 16.77284,
        "longitude": 81.97718
      },
      {
        "latitude": 16.77164,
        "longitude": 82.02222
      },
      {
        "latitude": 16.75311,
        "longitude": 82.0662
      },
      {
        "latitude": 16.76628,
        "longitude": 82.08679
      },
      {
        "latitude": 16.77887,
        "longitude": 82.09605
      },
      {
        "latitude": 16.78634,
        "longitude": 82.093
      },
      {
        "latitude": 16.79246,
        "longitude": 82.11091
      },
      {
        "latitude": 16.80572,
        "longitude": 82.10747
      },
      {
        "latitude": 16.80762,
        "longitude": 82.09906
      },
      {
        "latitude": 16.83681,
        "longitude": 82.11066
      },
      {
        "latitude": 16.84264,
        "longitude": 82.10097
      },
      {
        "latitude": 16.83375,
        "longitude": 82.08933
      },
      {
        "latitude": 16.84127,
        "longitude": 82.09227
      },
      {
        "latitude": 16.85082,
        "longitude": 82.08307
      },
      {
        "latitude": 16.86305,
        "longitude": 82.10957
      },
      {
        "latitude": 16.87456,
        "longitude": 82.09359
      },
      {
        "latitude": 16.88336,
        "longitude": 82.09368
      },
      {
        "latitude": 16.87663,
        "longitude": 82.0472
      },
      {
        "latitude": 16.89609,
        "longitude": 82.04769
      },
      {
        "latitude": 16.90489,
        "longitude": 82.03917
      },
      {
        "latitude": 16.89654,
        "longitude": 82.02923
      },
      {
        "latitude": 16.90415,
        "longitude": 82.03077
      },
      {
        "latitude": 16.91712,
        "longitude": 82.00329
      },
      {
        "latitude": 16.89561,
        "longitude": 81.9943
      },
      {
        "latitude": 16.89573,
        "longitude": 81.98331
      },
      {
        "latitude": 16.87824,
        "longitude": 81.98799
      },
      {
        "latitude": 16.86561,
        "longitude": 81.98351
      },
      {
        "latitude": 16.8651,
        "longitude": 81.97487
      },
      {
        "latitude": 16.85588,
        "longitude": 81.97878
      },
      {
        "latitude": 16.82323,
        "longitude": 81.96434
      },
      {
        "latitude": 16.82493,
        "longitude": 81.95593
      },
      {
        "latitude": 16.83554,
        "longitude": 81.95821
      },
      {
        "latitude": 16.8382,
        "longitude": 81.9517
      },
      {
        "latitude": 16.87015,
        "longitude": 81.9597
      },
      {
        "latitude": 16.87622,
        "longitude": 81.9497
      },
      {
        "latitude": 16.89945,
        "longitude": 81.95646
      },
      {
        "latitude": 16.91429,
        "longitude": 81.93675
      },
      {
        "latitude": 16.96544,
        "longitude": 81.93957
      },
      {
        "latitude": 16.98101,
        "longitude": 81.91955
      },
      {
        "latitude": 16.95023,
        "longitude": 81.90023
      },
      {
        "latitude": 16.94064,
        "longitude": 81.86264
      },
      {
        "latitude": 16.9321,
        "longitude": 81.86919
      },
      {
        "latitude": 16.90603,
        "longitude": 81.86302
      },
      {
        "latitude": 16.90285,
        "longitude": 81.88143
      },
      {
        "latitude": 16.89029,
        "longitude": 81.88246
      },
      {
        "latitude": 16.88184,
        "longitude": 81.8814
      },
      {
        "latitude": 16.8777,
        "longitude": 81.86951
      },
      {
        "latitude": 16.84937,
        "longitude": 81.87037
      },
      {
        "latitude": 16.84516,
        "longitude": 81.86279
      },
      {
        "latitude": 16.84763,
        "longitude": 81.85116
      },
      {
        "latitude": 16.87044,
        "longitude": 81.84726
      },
      {
        "latitude": 16.8741,
        "longitude": 81.83197
      },
      {
        "latitude": 16.86506,
        "longitude": 81.8294
      },
      {
        "latitude": 16.85811,
        "longitude": 81.80419
      },
      {
        "latitude": 16.88039,
        "longitude": 81.80353
      },
      {
        "latitude": 16.94495,
        "longitude": 81.77813
      },
      {
        "latitude": 16.94457,
        "longitude": 81.7308
      },
      {
        "latitude": 16.91397,
        "longitude": 81.72416
      },
      {
        "latitude": 16.9138,
        "longitude": 81.73219
      },
      {
        "latitude": 16.87941,
        "longitude": 81.73416
      },
      {
        "latitude": 16.85179,
        "longitude": 81.75153
      },
      {
        "latitude": 16.79287,
        "longitude": 81.74477
      },
      {
        "latitude": 16.76196,
        "longitude": 81.76396
      },
      {
        "latitude": 16.74579,
        "longitude": 81.79075
      },
      {
        "latitude": 16.73271,
        "longitude": 81.79509
      },
      {
        "latitude": 16.70752,
        "longitude": 81.78586
      },
      {
        "latitude": 16.64856,
        "longitude": 81.84131
      },
      {
        "latitude": 16.59685,
        "longitude": 81.85879
      },
      {
        "latitude": 16.49541,
        "longitude": 81.84605
      },
      {
        "latitude": 16.48335,
        "longitude": 81.80696
      },
      {
        "latitude": 16.4229,
        "longitude": 81.75436
      },
      {
        "latitude": 16.42344,
        "longitude": 81.73594
      },
      {
        "latitude": 16.44327,
        "longitude": 81.72781
      },
      {
        "latitude": 16.44634,
        "longitude": 81.71433
      },
      {
        "latitude": 16.41338,
        "longitude": 81.69652
      }
    ],
    "polygons": [
      [
        {
          "latitude": 16.41338,
          "longitude": 81.69652
        },
        {
          "latitude": 16.35611,
          "longitude": 81.7161
        },
        {
          "latitude": 16.31688,
          "longitude": 81.71323
        },
        {
          "latitude": 16.31257,
          "longitude": 81.72392
        },
        {
          "latitude": 16.37542,
          "longitude": 81.85367
        },
        {
          "latitude": 16.39905,
          "longitude": 81.95817
        },
        {
          "latitude": 16.53977,
          "longitude": 82.22441
        },
        {
          "latitude": 16.56962,
          "longitude": 82.30924
        },
        {
          "latitude": 16.57712,
          "longitude": 82.31902
        },
        {
          "latitude": 16.60978,
          "longitude": 82.32875
        },
        {
          "latitude": 16.65908,
          "longitude": 82.32473
        },
        {
          "latitude": 16.70116,
          "longitude": 82.35481
        },
        {
          "latitude": 16.69266,
          "longitude": 82.33626
        },
        {
          "latitude": 16.71398,
          "longitude": 82.3428
        },
        {
          "latitude": 16.71616,
          "longitude": 82.33364
        },
        {
          "latitude": 16.77748,
          "longitude": 82.32081
        },
        {
          "latitude": 16.77671,
          "longitude": 82.30052
        },
        {
          "latitude": 16.72742,
          "longitude": 82.31228
        },
        {
          "latitude": 16.70228,
          "longitude": 82.28779
        },
        {
          "latitude": 16.69557,
          "longitude": 82.26593
        },
        {
          "latitude": 16.71482,
          "longitude": 82.22797
        },
        {
          "latitude": 16.71437,
          "longitude": 82.20333
        },
        {
          "latitude": 16.68966,
          "longitude": 82.17136
        },
        {
          "latitude": 16.68371,
          "longitude": 82.12987
        },
        {
          "latitude": 16.69056,
          "longitude": 82.10605
        },
        {
          "latitude": 16.68451,
          "longitude": 82.08048
        },
        {
          "latitude": 16.67628,
          "longitude": 82.08396
        },
        {
          "latitude": 16.68232,
          "longitude": 82.05226
        },
        {
          "latitude": 16.67247,
          "longitude": 82.03204
        },
        {
          "latitude": 16.68379,
          "longitude": 82.01158
        },
        {
          "latitude": 16.70441,
          "longitude": 82.02004
        },
        {
          "latitude": 16.71833,
          "longitude": 82.01315
        },
        {
          "latitude": 16.70756,
          "longitude": 81.9912
        },
        {
          "latitude": 16.71562,
          "longitude": 81.9858
        },
        {
          "latitude": 16.72686,
          "longitude": 81.98649
        },
        {
          "latitude": 16.72725,
          "longitude": 81.99603
        },
        {
          "latitude": 16.74253,
          "longitude": 82.00211
        },
        {
          "latitude": 16.74633,
          "longitude": 81.99191
        },
        {
          "latitude": 16.76223,
          "longitude": 81.99481
        },
        {
          "latitude": 16.76193,
          "longitude": 81.97483
        },
        {
          "latitude": 16.77284,
          "longitude": 81.97718
        },
        {
          "latitude": 16.77164,
          "longitude": 82.02222
        },
        {
          "latitude": 16.75311,
          "longitude": 82.0662
        },
        {
          "latitude": 16.76628,
          "longitude": 82.08679
        },
        {
          "latitude": 16.77887,
          "longitude": 82.09605
        },
        {
          "latitude": 16.78634,
          "longitude": 82.093
        },
        {
          "latitude": 16.79246,
          "longitude": 82.11091
        },
        {
          "latitude": 16.80572,
          "longitude": 82.10747
        },
        {
          "latitude": 16.80762,
          "longitude": 82.09906
        },
        {
          "latitude": 16.83681,
          "longitude": 82.11066
        },
        {
          "latitude": 16.84264,
          "longitude": 82.10097
        },
        {
          "latitude": 16.83375,
          "longitude": 82.08933
        },
        {
          "latitude": 16.84127,
          "longitude": 82.09227
        },
        {
          "latitude": 16.85082,
          "longitude": 82.08307
        },
        {
          "latitude": 16.86305,
          "longitude": 82.10957
        },
        {
          "latitude": 16.87456,
          "longitude": 82.09359
        },
        {
          "latitude": 16.88336,
          "longitude": 82.09368
        },
        {
          "latitude": 16.87663,
          "longitude": 82.0472
        },
        {
          "latitude": 16.89609,
          "longitude": 82.04769
        },
        {
          "latitude": 16.90489,
          "longitude": 82.03917
        },
        {
          "latitude": 16.89654,
          "longitude": 82.02923
        },
        {
          "latitude": 16.90415,
          "longitude": 82.03077
        },
        {
          "latitude": 16.91712,
          "longitude": 82.00329
        },
        {
          "latitude": 16.89561,
          "longitude": 81.9943
        },
        {
          "latitude": 16.89573,
          "longitude": 81.98331
        },
        {
          "latitude": 16.87824,
          "longitude": 81.98799
        },
        {
          "latitude": 16.86561,
          "longitude": 81.98351
        },
        {
          "latitude": 16.8651,
          "longitude": 81.97487
        },
        {
          "latitude": 16.85588,
          "longitude": 81.97878
        },
        {
          "latitude": 16.82323,
          "longitude": 81.96434
        },
        {
          "latitude": 16.82493,
          "longitude": 81.95593
        },
        {
          "latitude": 16.83554,
          "longitude": 81.95821
        },
        {
          "latitude": 16.8382,
          "longitude": 81.9517
        },
        {
          "latitude": 16.87015,
          "longitude": 81.9597
        },
        {
          "latitude": 16.87622,
          "longitude": 81.9497
        },
        {
          "latitude": 16.89945,
          "longitude": 81.95646
        },
        {
          "latitude": 16.91429,
          "longitude": 81.93675
        },
        {
          "latitude": 16.96544,
          "longitude": 81.93957
        },
        {
          "latitude": 16.98101,
          "longitude": 81.91955
        },
        {
          "latitude": 16.95023,
          "longitude": 81.90023
        },
        {
          "latitude": 16.94064,
          "longitude": 81.86264
        },
        {
          "latitude": 16.9321,
          "longitude": 81.86919
        },
        {
          "latitude": 16.90603,
          "longitude": 81.86302
        },
        {
          "latitude": 16.90285,
          "longitude": 81.88143
        },
        {
          "latitude": 16.89029,
          "longitude": 81.88246
        },
        {
          "latitude": 16.88184,
          "longitude": 81.8814
        },
        {
          "latitude": 16.8777,
          "longitude": 81.86951
        },
        {
          "latitude": 16.84937,
          "longitude": 81.87037
        },
        {
          "latitude": 16.84516,
          "longitude": 81.86279
        },
        {
          "latitude": 16.84763,
          "longitude": 81.85116
        },
        {
          "latitude": 16.87044,
          "longitude": 81.84726
        },
        {
          "latitude": 16.8741,
          "longitude": 81.83197
        },
        {
          "latitude": 16.86506,
          "longitude": 81.8294
        },
        {
          "latitude": 16.85811,
          "longitude": 81.80419
        },
        {
          "latitude": 16.88039,
          "longitude": 81.80353
        },
        {
          "latitude": 16.94495,
          "longitude": 81.77813
        },
        {
          "latitude": 16.94457,
          "longitude": 81.7308
        },
        {
          "latitude": 16.91397,
          "longitude": 81.72416
        },
        {
          "latitude": 16.9138,
          "longitude": 81.73219
        },
        {
          "latitude": 16.87941,
          "longitude": 81.73416
        },
        {
          "latitude": 16.85179,
          "longitude": 81.75153
        },
        {
          "latitude": 16.79287,
          "longitude": 81.74477
        },
        {
          "latitude": 16.76196,
          "longitude": 81.76396
        },
        {
          "latitude": 16.74579,
          "longitude": 81.79075
        },
        {
          "latitude": 16.73271,
          "longitude": 81.79509
        },
        {
          "latitude": 16.70752,
          "longitude": 81.78586
        },
        {
          "latitude": 16.64856,
          "longitude": 81.84131
        },
        {
          "latitude": 16.59685,
          "longitude": 81.85879
        },
        {
          "latitude": 16.49541,
          "longitude": 81.84605
        },
        {
          "latitude": 16.48335,
          "longitude": 81.80696
        },
        {
          "latitude": 16.4229,
          "longitude": 81.75436
        },
        {
          "latitude": 16.42344,
          "longitude": 81.73594
        },
        {
          "latitude": 16.44327,
          "longitude": 81.72781
        },
        {
          "latitude": 16.44634,
          "longitude": 81.71433
        },
        {
          "latitude": 16.41338,
          "longitude": 81.69652
        }
      ]
    ]
  },
  {
    "id": "krishna",
    "name": "Krishna",
    "headquarters": "Machilipatnam",
    "center": {
      "latitude": 16.2656,
      "longitude": 80.9925
    },
    "region": "Coastal Andhra",
    "polygon": [
      {
        "latitude": 16.47999,
        "longitude": 80.65259
      },
      {
        "latitude": 16.46643,
        "longitude": 80.66961
      },
      {
        "latitude": 16.44929,
        "longitude": 80.66285
      },
      {
        "latitude": 16.44055,
        "longitude": 80.66586
      },
      {
        "latitude": 16.44228,
        "longitude": 80.67454
      },
      {
        "latitude": 16.42423,
        "longitude": 80.67455
      },
      {
        "latitude": 16.38109,
        "longitude": 80.72517
      },
      {
        "latitude": 16.33034,
        "longitude": 80.74778
      },
      {
        "latitude": 16.28849,
        "longitude": 80.78435
      },
      {
        "latitude": 16.28306,
        "longitude": 80.79768
      },
      {
        "latitude": 16.24012,
        "longitude": 80.80341
      },
      {
        "latitude": 16.24095,
        "longitude": 80.81751
      },
      {
        "latitude": 16.21787,
        "longitude": 80.82058
      },
      {
        "latitude": 16.21559,
        "longitude": 80.84129
      },
      {
        "latitude": 16.19885,
        "longitude": 80.82838
      },
      {
        "latitude": 16.13143,
        "longitude": 80.86412
      },
      {
        "latitude": 16.10389,
        "longitude": 80.85509
      },
      {
        "latitude": 16.10563,
        "longitude": 80.86773
      },
      {
        "latitude": 16.09099,
        "longitude": 80.86661
      },
      {
        "latitude": 16.07997,
        "longitude": 80.87546
      },
      {
        "latitude": 16.06852,
        "longitude": 80.87122
      },
      {
        "latitude": 16.06868,
        "longitude": 80.88066
      },
      {
        "latitude": 16.05317,
        "longitude": 80.87669
      },
      {
        "latitude": 16.00246,
        "longitude": 80.89103
      },
      {
        "latitude": 15.96085,
        "longitude": 80.88996
      },
      {
        "latitude": 15.96543,
        "longitude": 80.89648
      },
      {
        "latitude": 15.95362,
        "longitude": 80.89775
      },
      {
        "latitude": 15.9231,
        "longitude": 80.89461
      },
      {
        "latitude": 15.91725,
        "longitude": 80.90273
      },
      {
        "latitude": 15.85637,
        "longitude": 80.8862
      },
      {
        "latitude": 15.8453,
        "longitude": 80.87223
      },
      {
        "latitude": 15.76176,
        "longitude": 80.83805
      },
      {
        "latitude": 15.70702,
        "longitude": 80.83349
      },
      {
        "latitude": 15.71657,
        "longitude": 80.93877
      },
      {
        "latitude": 15.75449,
        "longitude": 81.00853
      },
      {
        "latitude": 15.76097,
        "longitude": 81.00868
      },
      {
        "latitude": 15.76381,
        "longitude": 80.99678
      },
      {
        "latitude": 15.77048,
        "longitude": 80.9975
      },
      {
        "latitude": 15.76634,
        "longitude": 81.01193
      },
      {
        "latitude": 15.77196,
        "longitude": 81.01318
      },
      {
        "latitude": 15.8017,
        "longitude": 81.00083
      },
      {
        "latitude": 15.8371,
        "longitude": 81.00254
      },
      {
        "latitude": 15.91725,
        "longitude": 81.07563
      },
      {
        "latitude": 15.97462,
        "longitude": 81.14752
      },
      {
        "latitude": 16.0149,
        "longitude": 81.14532
      },
      {
        "latitude": 16.10338,
        "longitude": 81.19048
      },
      {
        "latitude": 16.20142,
        "longitude": 81.20855
      },
      {
        "latitude": 16.24918,
        "longitude": 81.23702
      },
      {
        "latitude": 16.27808,
        "longitude": 81.26439
      },
      {
        "latitude": 16.31562,
        "longitude": 81.32537
      },
      {
        "latitude": 16.34265,
        "longitude": 81.39246
      },
      {
        "latitude": 16.35544,
        "longitude": 81.48779
      },
      {
        "latitude": 16.34709,
        "longitude": 81.55878
      },
      {
        "latitude": 16.37791,
        "longitude": 81.54406
      },
      {
        "latitude": 16.38033,
        "longitude": 81.52137
      },
      {
        "latitude": 16.37054,
        "longitude": 81.51179
      },
      {
        "latitude": 16.36942,
        "longitude": 81.49468
      },
      {
        "latitude": 16.39771,
        "longitude": 81.47166
      },
      {
        "latitude": 16.4052,
        "longitude": 81.45428
      },
      {
        "latitude": 16.39876,
        "longitude": 81.43716
      },
      {
        "latitude": 16.41919,
        "longitude": 81.42459
      },
      {
        "latitude": 16.42838,
        "longitude": 81.40183
      },
      {
        "latitude": 16.40859,
        "longitude": 81.38303
      },
      {
        "latitude": 16.4059,
        "longitude": 81.34348
      },
      {
        "latitude": 16.41705,
        "longitude": 81.33403
      },
      {
        "latitude": 16.41899,
        "longitude": 81.3198
      },
      {
        "latitude": 16.4377,
        "longitude": 81.32564
      },
      {
        "latitude": 16.45912,
        "longitude": 81.32128
      },
      {
        "latitude": 16.45374,
        "longitude": 81.29186
      },
      {
        "latitude": 16.43886,
        "longitude": 81.30457
      },
      {
        "latitude": 16.42947,
        "longitude": 81.27858
      },
      {
        "latitude": 16.40339,
        "longitude": 81.25434
      },
      {
        "latitude": 16.4125,
        "longitude": 81.23095
      },
      {
        "latitude": 16.4269,
        "longitude": 81.22892
      },
      {
        "latitude": 16.42219,
        "longitude": 81.21808
      },
      {
        "latitude": 16.40923,
        "longitude": 81.20674
      },
      {
        "latitude": 16.38145,
        "longitude": 81.20232
      },
      {
        "latitude": 16.38655,
        "longitude": 81.1722
      },
      {
        "latitude": 16.40262,
        "longitude": 81.1727
      },
      {
        "latitude": 16.40469,
        "longitude": 81.15871
      },
      {
        "latitude": 16.37659,
        "longitude": 81.14019
      },
      {
        "latitude": 16.38831,
        "longitude": 81.10931
      },
      {
        "latitude": 16.38072,
        "longitude": 81.10249
      },
      {
        "latitude": 16.38311,
        "longitude": 81.08308
      },
      {
        "latitude": 16.39478,
        "longitude": 81.07948
      },
      {
        "latitude": 16.39845,
        "longitude": 81.06192
      },
      {
        "latitude": 16.41772,
        "longitude": 81.05677
      },
      {
        "latitude": 16.4207,
        "longitude": 81.04444
      },
      {
        "latitude": 16.43462,
        "longitude": 81.04567
      },
      {
        "latitude": 16.44194,
        "longitude": 81.06747
      },
      {
        "latitude": 16.43177,
        "longitude": 81.08123
      },
      {
        "latitude": 16.44937,
        "longitude": 81.08445
      },
      {
        "latitude": 16.45719,
        "longitude": 81.07555
      },
      {
        "latitude": 16.45241,
        "longitude": 81.08661
      },
      {
        "latitude": 16.46787,
        "longitude": 81.0931
      },
      {
        "latitude": 16.48266,
        "longitude": 81.0827
      },
      {
        "latitude": 16.49542,
        "longitude": 81.08895
      },
      {
        "latitude": 16.49002,
        "longitude": 81.09591
      },
      {
        "latitude": 16.49742,
        "longitude": 81.11164
      },
      {
        "latitude": 16.51237,
        "longitude": 81.11809
      },
      {
        "latitude": 16.52119,
        "longitude": 81.10084
      },
      {
        "latitude": 16.55234,
        "longitude": 81.10584
      },
      {
        "latitude": 16.55874,
        "longitude": 81.09026
      },
      {
        "latitude": 16.58079,
        "longitude": 81.10587
      },
      {
        "latitude": 16.5876,
        "longitude": 81.10031
      },
      {
        "latitude": 16.56229,
        "longitude": 81.04002
      },
      {
        "latitude": 16.56133,
        "longitude": 81.01184
      },
      {
        "latitude": 16.58613,
        "longitude": 81.0075
      },
      {
        "latitude": 16.6264,
        "longitude": 80.9728
      },
      {
        "latitude": 16.67077,
        "longitude": 80.95574
      },
      {
        "latitude": 16.67492,
        "longitude": 80.93856
      },
      {
        "latitude": 16.68625,
        "longitude": 80.94182
      },
      {
        "latitude": 16.69544,
        "longitude": 80.92518
      },
      {
        "latitude": 16.70461,
        "longitude": 80.92768
      },
      {
        "latitude": 16.70028,
        "longitude": 80.91601
      },
      {
        "latitude": 16.70931,
        "longitude": 80.91925
      },
      {
        "latitude": 16.70693,
        "longitude": 80.90266
      },
      {
        "latitude": 16.71362,
        "longitude": 80.90191
      },
      {
        "latitude": 16.70815,
        "longitude": 80.89834
      },
      {
        "latitude": 16.71277,
        "longitude": 80.87713
      },
      {
        "latitude": 16.69149,
        "longitude": 80.87368
      },
      {
        "latitude": 16.69779,
        "longitude": 80.85647
      },
      {
        "latitude": 16.68899,
        "longitude": 80.85126
      },
      {
        "latitude": 16.67147,
        "longitude": 80.85312
      },
      {
        "latitude": 16.65407,
        "longitude": 80.88709
      },
      {
        "latitude": 16.61765,
        "longitude": 80.88048
      },
      {
        "latitude": 16.62476,
        "longitude": 80.86132
      },
      {
        "latitude": 16.61041,
        "longitude": 80.84797
      },
      {
        "latitude": 16.61367,
        "longitude": 80.83654
      },
      {
        "latitude": 16.63106,
        "longitude": 80.83108
      },
      {
        "latitude": 16.64327,
        "longitude": 80.836
      },
      {
        "latitude": 16.6527,
        "longitude": 80.82426
      },
      {
        "latitude": 16.676,
        "longitude": 80.81894
      },
      {
        "latitude": 16.66027,
        "longitude": 80.80842
      },
      {
        "latitude": 16.6513,
        "longitude": 80.81774
      },
      {
        "latitude": 16.63493,
        "longitude": 80.79876
      },
      {
        "latitude": 16.64278,
        "longitude": 80.79268
      },
      {
        "latitude": 16.62243,
        "longitude": 80.77854
      },
      {
        "latitude": 16.62962,
        "longitude": 80.7577
      },
      {
        "latitude": 16.62728,
        "longitude": 80.74333
      },
      {
        "latitude": 16.61883,
        "longitude": 80.73926
      },
      {
        "latitude": 16.62659,
        "longitude": 80.69709
      },
      {
        "latitude": 16.60533,
        "longitude": 80.69439
      },
      {
        "latitude": 16.58551,
        "longitude": 80.70164
      },
      {
        "latitude": 16.54248,
        "longitude": 80.68619
      },
      {
        "latitude": 16.5222,
        "longitude": 80.72774
      },
      {
        "latitude": 16.51513,
        "longitude": 80.76496
      },
      {
        "latitude": 16.48721,
        "longitude": 80.74432
      },
      {
        "latitude": 16.50014,
        "longitude": 80.71307
      },
      {
        "latitude": 16.50812,
        "longitude": 80.71169
      },
      {
        "latitude": 16.51539,
        "longitude": 80.68324
      },
      {
        "latitude": 16.48893,
        "longitude": 80.67146
      },
      {
        "latitude": 16.48206,
        "longitude": 80.67688
      },
      {
        "latitude": 16.4883,
        "longitude": 80.66278
      },
      {
        "latitude": 16.47999,
        "longitude": 80.65259
      }
    ],
    "polygons": [
      [
        {
          "latitude": 16.47999,
          "longitude": 80.65259
        },
        {
          "latitude": 16.46643,
          "longitude": 80.66961
        },
        {
          "latitude": 16.44929,
          "longitude": 80.66285
        },
        {
          "latitude": 16.44055,
          "longitude": 80.66586
        },
        {
          "latitude": 16.44228,
          "longitude": 80.67454
        },
        {
          "latitude": 16.42423,
          "longitude": 80.67455
        },
        {
          "latitude": 16.38109,
          "longitude": 80.72517
        },
        {
          "latitude": 16.33034,
          "longitude": 80.74778
        },
        {
          "latitude": 16.28849,
          "longitude": 80.78435
        },
        {
          "latitude": 16.28306,
          "longitude": 80.79768
        },
        {
          "latitude": 16.24012,
          "longitude": 80.80341
        },
        {
          "latitude": 16.24095,
          "longitude": 80.81751
        },
        {
          "latitude": 16.21787,
          "longitude": 80.82058
        },
        {
          "latitude": 16.21559,
          "longitude": 80.84129
        },
        {
          "latitude": 16.19885,
          "longitude": 80.82838
        },
        {
          "latitude": 16.13143,
          "longitude": 80.86412
        },
        {
          "latitude": 16.10389,
          "longitude": 80.85509
        },
        {
          "latitude": 16.10563,
          "longitude": 80.86773
        },
        {
          "latitude": 16.09099,
          "longitude": 80.86661
        },
        {
          "latitude": 16.07997,
          "longitude": 80.87546
        },
        {
          "latitude": 16.06852,
          "longitude": 80.87122
        },
        {
          "latitude": 16.06868,
          "longitude": 80.88066
        },
        {
          "latitude": 16.05317,
          "longitude": 80.87669
        },
        {
          "latitude": 16.00246,
          "longitude": 80.89103
        },
        {
          "latitude": 15.96085,
          "longitude": 80.88996
        },
        {
          "latitude": 15.96543,
          "longitude": 80.89648
        },
        {
          "latitude": 15.95362,
          "longitude": 80.89775
        },
        {
          "latitude": 15.9231,
          "longitude": 80.89461
        },
        {
          "latitude": 15.91725,
          "longitude": 80.90273
        },
        {
          "latitude": 15.85637,
          "longitude": 80.8862
        },
        {
          "latitude": 15.8453,
          "longitude": 80.87223
        },
        {
          "latitude": 15.76176,
          "longitude": 80.83805
        },
        {
          "latitude": 15.70702,
          "longitude": 80.83349
        },
        {
          "latitude": 15.71657,
          "longitude": 80.93877
        },
        {
          "latitude": 15.75449,
          "longitude": 81.00853
        },
        {
          "latitude": 15.76097,
          "longitude": 81.00868
        },
        {
          "latitude": 15.76381,
          "longitude": 80.99678
        },
        {
          "latitude": 15.77048,
          "longitude": 80.9975
        },
        {
          "latitude": 15.76634,
          "longitude": 81.01193
        },
        {
          "latitude": 15.77196,
          "longitude": 81.01318
        },
        {
          "latitude": 15.8017,
          "longitude": 81.00083
        },
        {
          "latitude": 15.8371,
          "longitude": 81.00254
        },
        {
          "latitude": 15.91725,
          "longitude": 81.07563
        },
        {
          "latitude": 15.97462,
          "longitude": 81.14752
        },
        {
          "latitude": 16.0149,
          "longitude": 81.14532
        },
        {
          "latitude": 16.10338,
          "longitude": 81.19048
        },
        {
          "latitude": 16.20142,
          "longitude": 81.20855
        },
        {
          "latitude": 16.24918,
          "longitude": 81.23702
        },
        {
          "latitude": 16.27808,
          "longitude": 81.26439
        },
        {
          "latitude": 16.31562,
          "longitude": 81.32537
        },
        {
          "latitude": 16.34265,
          "longitude": 81.39246
        },
        {
          "latitude": 16.35544,
          "longitude": 81.48779
        },
        {
          "latitude": 16.34709,
          "longitude": 81.55878
        },
        {
          "latitude": 16.37791,
          "longitude": 81.54406
        },
        {
          "latitude": 16.38033,
          "longitude": 81.52137
        },
        {
          "latitude": 16.37054,
          "longitude": 81.51179
        },
        {
          "latitude": 16.36942,
          "longitude": 81.49468
        },
        {
          "latitude": 16.39771,
          "longitude": 81.47166
        },
        {
          "latitude": 16.4052,
          "longitude": 81.45428
        },
        {
          "latitude": 16.39876,
          "longitude": 81.43716
        },
        {
          "latitude": 16.41919,
          "longitude": 81.42459
        },
        {
          "latitude": 16.42838,
          "longitude": 81.40183
        },
        {
          "latitude": 16.40859,
          "longitude": 81.38303
        },
        {
          "latitude": 16.4059,
          "longitude": 81.34348
        },
        {
          "latitude": 16.41705,
          "longitude": 81.33403
        },
        {
          "latitude": 16.41899,
          "longitude": 81.3198
        },
        {
          "latitude": 16.4377,
          "longitude": 81.32564
        },
        {
          "latitude": 16.45912,
          "longitude": 81.32128
        },
        {
          "latitude": 16.45374,
          "longitude": 81.29186
        },
        {
          "latitude": 16.43886,
          "longitude": 81.30457
        },
        {
          "latitude": 16.42947,
          "longitude": 81.27858
        },
        {
          "latitude": 16.40339,
          "longitude": 81.25434
        },
        {
          "latitude": 16.4125,
          "longitude": 81.23095
        },
        {
          "latitude": 16.4269,
          "longitude": 81.22892
        },
        {
          "latitude": 16.42219,
          "longitude": 81.21808
        },
        {
          "latitude": 16.40923,
          "longitude": 81.20674
        },
        {
          "latitude": 16.38145,
          "longitude": 81.20232
        },
        {
          "latitude": 16.38655,
          "longitude": 81.1722
        },
        {
          "latitude": 16.40262,
          "longitude": 81.1727
        },
        {
          "latitude": 16.40469,
          "longitude": 81.15871
        },
        {
          "latitude": 16.37659,
          "longitude": 81.14019
        },
        {
          "latitude": 16.38831,
          "longitude": 81.10931
        },
        {
          "latitude": 16.38072,
          "longitude": 81.10249
        },
        {
          "latitude": 16.38311,
          "longitude": 81.08308
        },
        {
          "latitude": 16.39478,
          "longitude": 81.07948
        },
        {
          "latitude": 16.39845,
          "longitude": 81.06192
        },
        {
          "latitude": 16.41772,
          "longitude": 81.05677
        },
        {
          "latitude": 16.4207,
          "longitude": 81.04444
        },
        {
          "latitude": 16.43462,
          "longitude": 81.04567
        },
        {
          "latitude": 16.44194,
          "longitude": 81.06747
        },
        {
          "latitude": 16.43177,
          "longitude": 81.08123
        },
        {
          "latitude": 16.44937,
          "longitude": 81.08445
        },
        {
          "latitude": 16.45719,
          "longitude": 81.07555
        },
        {
          "latitude": 16.45241,
          "longitude": 81.08661
        },
        {
          "latitude": 16.46787,
          "longitude": 81.0931
        },
        {
          "latitude": 16.48266,
          "longitude": 81.0827
        },
        {
          "latitude": 16.49542,
          "longitude": 81.08895
        },
        {
          "latitude": 16.49002,
          "longitude": 81.09591
        },
        {
          "latitude": 16.49742,
          "longitude": 81.11164
        },
        {
          "latitude": 16.51237,
          "longitude": 81.11809
        },
        {
          "latitude": 16.52119,
          "longitude": 81.10084
        },
        {
          "latitude": 16.55234,
          "longitude": 81.10584
        },
        {
          "latitude": 16.55874,
          "longitude": 81.09026
        },
        {
          "latitude": 16.58079,
          "longitude": 81.10587
        },
        {
          "latitude": 16.5876,
          "longitude": 81.10031
        },
        {
          "latitude": 16.56229,
          "longitude": 81.04002
        },
        {
          "latitude": 16.56133,
          "longitude": 81.01184
        },
        {
          "latitude": 16.58613,
          "longitude": 81.0075
        },
        {
          "latitude": 16.6264,
          "longitude": 80.9728
        },
        {
          "latitude": 16.67077,
          "longitude": 80.95574
        },
        {
          "latitude": 16.67492,
          "longitude": 80.93856
        },
        {
          "latitude": 16.68625,
          "longitude": 80.94182
        },
        {
          "latitude": 16.69544,
          "longitude": 80.92518
        },
        {
          "latitude": 16.70461,
          "longitude": 80.92768
        },
        {
          "latitude": 16.70028,
          "longitude": 80.91601
        },
        {
          "latitude": 16.70931,
          "longitude": 80.91925
        },
        {
          "latitude": 16.70693,
          "longitude": 80.90266
        },
        {
          "latitude": 16.71362,
          "longitude": 80.90191
        },
        {
          "latitude": 16.70815,
          "longitude": 80.89834
        },
        {
          "latitude": 16.71277,
          "longitude": 80.87713
        },
        {
          "latitude": 16.69149,
          "longitude": 80.87368
        },
        {
          "latitude": 16.69779,
          "longitude": 80.85647
        },
        {
          "latitude": 16.68899,
          "longitude": 80.85126
        },
        {
          "latitude": 16.67147,
          "longitude": 80.85312
        },
        {
          "latitude": 16.65407,
          "longitude": 80.88709
        },
        {
          "latitude": 16.61765,
          "longitude": 80.88048
        },
        {
          "latitude": 16.62476,
          "longitude": 80.86132
        },
        {
          "latitude": 16.61041,
          "longitude": 80.84797
        },
        {
          "latitude": 16.61367,
          "longitude": 80.83654
        },
        {
          "latitude": 16.63106,
          "longitude": 80.83108
        },
        {
          "latitude": 16.64327,
          "longitude": 80.836
        },
        {
          "latitude": 16.6527,
          "longitude": 80.82426
        },
        {
          "latitude": 16.676,
          "longitude": 80.81894
        },
        {
          "latitude": 16.66027,
          "longitude": 80.80842
        },
        {
          "latitude": 16.6513,
          "longitude": 80.81774
        },
        {
          "latitude": 16.63493,
          "longitude": 80.79876
        },
        {
          "latitude": 16.64278,
          "longitude": 80.79268
        },
        {
          "latitude": 16.62243,
          "longitude": 80.77854
        },
        {
          "latitude": 16.62962,
          "longitude": 80.7577
        },
        {
          "latitude": 16.62728,
          "longitude": 80.74333
        },
        {
          "latitude": 16.61883,
          "longitude": 80.73926
        },
        {
          "latitude": 16.62659,
          "longitude": 80.69709
        },
        {
          "latitude": 16.60533,
          "longitude": 80.69439
        },
        {
          "latitude": 16.58551,
          "longitude": 80.70164
        },
        {
          "latitude": 16.54248,
          "longitude": 80.68619
        },
        {
          "latitude": 16.5222,
          "longitude": 80.72774
        },
        {
          "latitude": 16.51513,
          "longitude": 80.76496
        },
        {
          "latitude": 16.48721,
          "longitude": 80.74432
        },
        {
          "latitude": 16.50014,
          "longitude": 80.71307
        },
        {
          "latitude": 16.50812,
          "longitude": 80.71169
        },
        {
          "latitude": 16.51539,
          "longitude": 80.68324
        },
        {
          "latitude": 16.48893,
          "longitude": 80.67146
        },
        {
          "latitude": 16.48206,
          "longitude": 80.67688
        },
        {
          "latitude": 16.4883,
          "longitude": 80.66278
        },
        {
          "latitude": 16.47999,
          "longitude": 80.65259
        }
      ],
      [
        {
          "latitude": 16.71286,
          "longitude": 80.93081
        },
        {
          "latitude": 16.70087,
          "longitude": 80.95422
        },
        {
          "latitude": 16.72661,
          "longitude": 80.96947
        },
        {
          "latitude": 16.72236,
          "longitude": 80.98874
        },
        {
          "latitude": 16.74715,
          "longitude": 80.99984
        },
        {
          "latitude": 16.76229,
          "longitude": 80.96845
        },
        {
          "latitude": 16.75351,
          "longitude": 80.94352
        },
        {
          "latitude": 16.74368,
          "longitude": 80.95067
        },
        {
          "latitude": 16.71286,
          "longitude": 80.93081
        }
      ],
      [
        {
          "latitude": 16.67829,
          "longitude": 80.96782
        },
        {
          "latitude": 16.63534,
          "longitude": 80.99533
        },
        {
          "latitude": 16.63463,
          "longitude": 81.0102
        },
        {
          "latitude": 16.6511,
          "longitude": 81.01756
        },
        {
          "latitude": 16.66407,
          "longitude": 80.99914
        },
        {
          "latitude": 16.67193,
          "longitude": 81.00748
        },
        {
          "latitude": 16.68002,
          "longitude": 80.99178
        },
        {
          "latitude": 16.67829,
          "longitude": 80.96782
        }
      ]
    ]
  },
  {
    "id": "kurnool",
    "name": "Kurnool",
    "headquarters": "Kurnool",
    "center": {
      "latitude": 15.6014,
      "longitude": 77.537
    },
    "region": "Rayalaseema",
    "polygon": [
      {
        "latitude": 15.50647,
        "longitude": 76.9721
      },
      {
        "latitude": 15.49067,
        "longitude": 76.97551
      },
      {
        "latitude": 15.48043,
        "longitude": 76.99274
      },
      {
        "latitude": 15.45119,
        "longitude": 77.00909
      },
      {
        "latitude": 15.43162,
        "longitude": 77.03419
      },
      {
        "latitude": 15.40533,
        "longitude": 77.02927
      },
      {
        "latitude": 15.39067,
        "longitude": 77.04735
      },
      {
        "latitude": 15.36257,
        "longitude": 77.04212
      },
      {
        "latitude": 15.34523,
        "longitude": 77.06435
      },
      {
        "latitude": 15.32803,
        "longitude": 77.06439
      },
      {
        "latitude": 15.33408,
        "longitude": 77.11341
      },
      {
        "latitude": 15.2949,
        "longitude": 77.11841
      },
      {
        "latitude": 15.29228,
        "longitude": 77.15178
      },
      {
        "latitude": 15.27285,
        "longitude": 77.14769
      },
      {
        "latitude": 15.26842,
        "longitude": 77.16721
      },
      {
        "latitude": 15.25811,
        "longitude": 77.16786
      },
      {
        "latitude": 15.25726,
        "longitude": 77.14381
      },
      {
        "latitude": 15.24096,
        "longitude": 77.13622
      },
      {
        "latitude": 15.24002,
        "longitude": 77.12627
      },
      {
        "latitude": 15.22694,
        "longitude": 77.12512
      },
      {
        "latitude": 15.2251,
        "longitude": 77.1454
      },
      {
        "latitude": 15.21482,
        "longitude": 77.15482
      },
      {
        "latitude": 15.17194,
        "longitude": 77.16913
      },
      {
        "latitude": 15.15736,
        "longitude": 77.16284
      },
      {
        "latitude": 15.15859,
        "longitude": 77.14076
      },
      {
        "latitude": 15.14542,
        "longitude": 77.13684
      },
      {
        "latitude": 15.14311,
        "longitude": 77.17655
      },
      {
        "latitude": 15.15831,
        "longitude": 77.18813
      },
      {
        "latitude": 15.16067,
        "longitude": 77.20239
      },
      {
        "latitude": 15.14501,
        "longitude": 77.2301
      },
      {
        "latitude": 15.14338,
        "longitude": 77.26403
      },
      {
        "latitude": 15.13171,
        "longitude": 77.27145
      },
      {
        "latitude": 15.13199,
        "longitude": 77.2917
      },
      {
        "latitude": 15.15517,
        "longitude": 77.29955
      },
      {
        "latitude": 15.15558,
        "longitude": 77.31003
      },
      {
        "latitude": 15.17808,
        "longitude": 77.31625
      },
      {
        "latitude": 15.17844,
        "longitude": 77.35141
      },
      {
        "latitude": 15.22424,
        "longitude": 77.3631
      },
      {
        "latitude": 15.21854,
        "longitude": 77.39459
      },
      {
        "latitude": 15.22693,
        "longitude": 77.40894
      },
      {
        "latitude": 15.22506,
        "longitude": 77.42494
      },
      {
        "latitude": 15.22213,
        "longitude": 77.43324
      },
      {
        "latitude": 15.21139,
        "longitude": 77.43473
      },
      {
        "latitude": 15.20685,
        "longitude": 77.45083
      },
      {
        "latitude": 15.2237,
        "longitude": 77.45152
      },
      {
        "latitude": 15.20988,
        "longitude": 77.48129
      },
      {
        "latitude": 15.22297,
        "longitude": 77.50203
      },
      {
        "latitude": 15.22531,
        "longitude": 77.52747
      },
      {
        "latitude": 15.21008,
        "longitude": 77.54233
      },
      {
        "latitude": 15.20054,
        "longitude": 77.57586
      },
      {
        "latitude": 15.18913,
        "longitude": 77.58262
      },
      {
        "latitude": 15.18473,
        "longitude": 77.61153
      },
      {
        "latitude": 15.20773,
        "longitude": 77.61572
      },
      {
        "latitude": 15.20814,
        "longitude": 77.63518
      },
      {
        "latitude": 15.2231,
        "longitude": 77.63772
      },
      {
        "latitude": 15.23382,
        "longitude": 77.65183
      },
      {
        "latitude": 15.23287,
        "longitude": 77.67149
      },
      {
        "latitude": 15.23824,
        "longitude": 77.67704
      },
      {
        "latitude": 15.24334,
        "longitude": 77.67141
      },
      {
        "latitude": 15.24693,
        "longitude": 77.68063
      },
      {
        "latitude": 15.27183,
        "longitude": 77.67538
      },
      {
        "latitude": 15.31997,
        "longitude": 77.68488
      },
      {
        "latitude": 15.31918,
        "longitude": 77.67278
      },
      {
        "latitude": 15.33873,
        "longitude": 77.64848
      },
      {
        "latitude": 15.39403,
        "longitude": 77.67628
      },
      {
        "latitude": 15.37966,
        "longitude": 77.71229
      },
      {
        "latitude": 15.40972,
        "longitude": 77.7421
      },
      {
        "latitude": 15.40512,
        "longitude": 77.77571
      },
      {
        "latitude": 15.42394,
        "longitude": 77.78825
      },
      {
        "latitude": 15.4418,
        "longitude": 77.78802
      },
      {
        "latitude": 15.44204,
        "longitude": 77.79617
      },
      {
        "latitude": 15.45042,
        "longitude": 77.7921
      },
      {
        "latitude": 15.45516,
        "longitude": 77.8002
      },
      {
        "latitude": 15.46355,
        "longitude": 77.7902
      },
      {
        "latitude": 15.46804,
        "longitude": 77.80394
      },
      {
        "latitude": 15.49065,
        "longitude": 77.81101
      },
      {
        "latitude": 15.48771,
        "longitude": 77.84416
      },
      {
        "latitude": 15.46992,
        "longitude": 77.83984
      },
      {
        "latitude": 15.46725,
        "longitude": 77.84685
      },
      {
        "latitude": 15.48865,
        "longitude": 77.87039
      },
      {
        "latitude": 15.46724,
        "longitude": 77.89064
      },
      {
        "latitude": 15.46819,
        "longitude": 77.90396
      },
      {
        "latitude": 15.44764,
        "longitude": 77.90112
      },
      {
        "latitude": 15.43749,
        "longitude": 77.92199
      },
      {
        "latitude": 15.41707,
        "longitude": 77.93662
      },
      {
        "latitude": 15.43204,
        "longitude": 77.96804
      },
      {
        "latitude": 15.42951,
        "longitude": 77.99124
      },
      {
        "latitude": 15.46303,
        "longitude": 77.99808
      },
      {
        "latitude": 15.47776,
        "longitude": 78.04701
      },
      {
        "latitude": 15.49883,
        "longitude": 78.04404
      },
      {
        "latitude": 15.48991,
        "longitude": 78.02877
      },
      {
        "latitude": 15.48178,
        "longitude": 78.04144
      },
      {
        "latitude": 15.48207,
        "longitude": 78.02212
      },
      {
        "latitude": 15.48823,
        "longitude": 78.01953
      },
      {
        "latitude": 15.48832,
        "longitude": 78.02625
      },
      {
        "latitude": 15.51086,
        "longitude": 78.03503
      },
      {
        "latitude": 15.51794,
        "longitude": 78.05648
      },
      {
        "latitude": 15.53049,
        "longitude": 78.04767
      },
      {
        "latitude": 15.52599,
        "longitude": 78.03897
      },
      {
        "latitude": 15.53416,
        "longitude": 78.03226
      },
      {
        "latitude": 15.53503,
        "longitude": 78.04824
      },
      {
        "latitude": 15.54519,
        "longitude": 78.05066
      },
      {
        "latitude": 15.53245,
        "longitude": 78.06952
      },
      {
        "latitude": 15.57062,
        "longitude": 78.07773
      },
      {
        "latitude": 15.57975,
        "longitude": 78.13169
      },
      {
        "latitude": 15.56849,
        "longitude": 78.14382
      },
      {
        "latitude": 15.53149,
        "longitude": 78.13443
      },
      {
        "latitude": 15.54395,
        "longitude": 78.18396
      },
      {
        "latitude": 15.55272,
        "longitude": 78.18427
      },
      {
        "latitude": 15.55976,
        "longitude": 78.17353
      },
      {
        "latitude": 15.5936,
        "longitude": 78.18624
      },
      {
        "latitude": 15.59092,
        "longitude": 78.21428
      },
      {
        "latitude": 15.60333,
        "longitude": 78.20812
      },
      {
        "latitude": 15.61886,
        "longitude": 78.21193
      },
      {
        "latitude": 15.63194,
        "longitude": 78.22887
      },
      {
        "latitude": 15.64078,
        "longitude": 78.26313
      },
      {
        "latitude": 15.70197,
        "longitude": 78.26838
      },
      {
        "latitude": 15.69441,
        "longitude": 78.20604
      },
      {
        "latitude": 15.7125,
        "longitude": 78.20217
      },
      {
        "latitude": 15.72605,
        "longitude": 78.18248
      },
      {
        "latitude": 15.74042,
        "longitude": 78.18718
      },
      {
        "latitude": 15.75545,
        "longitude": 78.15863
      },
      {
        "latitude": 15.77544,
        "longitude": 78.18224
      },
      {
        "latitude": 15.77319,
        "longitude": 78.1931
      },
      {
        "latitude": 15.78838,
        "longitude": 78.20157
      },
      {
        "latitude": 15.80541,
        "longitude": 78.15437
      },
      {
        "latitude": 15.81642,
        "longitude": 78.15019
      },
      {
        "latitude": 15.82557,
        "longitude": 78.17143
      },
      {
        "latitude": 15.8525,
        "longitude": 78.16609
      },
      {
        "latitude": 15.85606,
        "longitude": 78.13596
      },
      {
        "latitude": 15.85198,
        "longitude": 78.13033
      },
      {
        "latitude": 15.83761,
        "longitude": 78.13407
      },
      {
        "latitude": 15.84227,
        "longitude": 78.08392
      },
      {
        "latitude": 15.85169,
        "longitude": 78.07174
      },
      {
        "latitude": 15.86317,
        "longitude": 78.07189
      },
      {
        "latitude": 15.87621,
        "longitude": 78.04715
      },
      {
        "latitude": 15.90554,
        "longitude": 78.0456
      },
      {
        "latitude": 15.90877,
        "longitude": 78.03228
      },
      {
        "latitude": 15.86303,
        "longitude": 78.00908
      },
      {
        "latitude": 15.8844,
        "longitude": 77.97442
      },
      {
        "latitude": 15.8842,
        "longitude": 77.93792
      },
      {
        "latitude": 15.90673,
        "longitude": 77.88955
      },
      {
        "latitude": 15.90539,
        "longitude": 77.87759
      },
      {
        "latitude": 15.88495,
        "longitude": 77.85894
      },
      {
        "latitude": 15.87548,
        "longitude": 77.80395
      },
      {
        "latitude": 15.89675,
        "longitude": 77.7257
      },
      {
        "latitude": 15.88457,
        "longitude": 77.69451
      },
      {
        "latitude": 15.88658,
        "longitude": 77.66001
      },
      {
        "latitude": 15.91863,
        "longitude": 77.6126
      },
      {
        "latitude": 15.91287,
        "longitude": 77.59562
      },
      {
        "latitude": 15.92057,
        "longitude": 77.54692
      },
      {
        "latitude": 15.9344,
        "longitude": 77.46708
      },
      {
        "latitude": 15.949,
        "longitude": 77.42902
      },
      {
        "latitude": 15.93951,
        "longitude": 77.38038
      },
      {
        "latitude": 15.94954,
        "longitude": 77.36135
      },
      {
        "latitude": 15.95386,
        "longitude": 77.28436
      },
      {
        "latitude": 15.96503,
        "longitude": 77.25
      },
      {
        "latitude": 15.95754,
        "longitude": 77.23535
      },
      {
        "latitude": 15.95671,
        "longitude": 77.18474
      },
      {
        "latitude": 15.91862,
        "longitude": 77.08442
      },
      {
        "latitude": 15.85763,
        "longitude": 77.03273
      },
      {
        "latitude": 15.83761,
        "longitude": 77.02504
      },
      {
        "latitude": 15.82644,
        "longitude": 77.06547
      },
      {
        "latitude": 15.78883,
        "longitude": 77.06725
      },
      {
        "latitude": 15.76974,
        "longitude": 77.05224
      },
      {
        "latitude": 15.75607,
        "longitude": 77.05415
      },
      {
        "latitude": 15.75617,
        "longitude": 77.04775
      },
      {
        "latitude": 15.73026,
        "longitude": 77.0491
      },
      {
        "latitude": 15.72752,
        "longitude": 77.07969
      },
      {
        "latitude": 15.71626,
        "longitude": 77.07887
      },
      {
        "latitude": 15.71549,
        "longitude": 77.08741
      },
      {
        "latitude": 15.69515,
        "longitude": 77.0787
      },
      {
        "latitude": 15.68147,
        "longitude": 77.10923
      },
      {
        "latitude": 15.66247,
        "longitude": 77.1283
      },
      {
        "latitude": 15.63109,
        "longitude": 77.12143
      },
      {
        "latitude": 15.65915,
        "longitude": 77.08319
      },
      {
        "latitude": 15.64666,
        "longitude": 77.07173
      },
      {
        "latitude": 15.6345,
        "longitude": 77.03043
      },
      {
        "latitude": 15.50299,
        "longitude": 77.03015
      },
      {
        "latitude": 15.50647,
        "longitude": 76.9721
      }
    ],
    "polygons": [
      [
        {
          "latitude": 15.50647,
          "longitude": 76.9721
        },
        {
          "latitude": 15.49067,
          "longitude": 76.97551
        },
        {
          "latitude": 15.48043,
          "longitude": 76.99274
        },
        {
          "latitude": 15.45119,
          "longitude": 77.00909
        },
        {
          "latitude": 15.43162,
          "longitude": 77.03419
        },
        {
          "latitude": 15.40533,
          "longitude": 77.02927
        },
        {
          "latitude": 15.39067,
          "longitude": 77.04735
        },
        {
          "latitude": 15.36257,
          "longitude": 77.04212
        },
        {
          "latitude": 15.34523,
          "longitude": 77.06435
        },
        {
          "latitude": 15.32803,
          "longitude": 77.06439
        },
        {
          "latitude": 15.33408,
          "longitude": 77.11341
        },
        {
          "latitude": 15.2949,
          "longitude": 77.11841
        },
        {
          "latitude": 15.29228,
          "longitude": 77.15178
        },
        {
          "latitude": 15.27285,
          "longitude": 77.14769
        },
        {
          "latitude": 15.26842,
          "longitude": 77.16721
        },
        {
          "latitude": 15.25811,
          "longitude": 77.16786
        },
        {
          "latitude": 15.25726,
          "longitude": 77.14381
        },
        {
          "latitude": 15.24096,
          "longitude": 77.13622
        },
        {
          "latitude": 15.24002,
          "longitude": 77.12627
        },
        {
          "latitude": 15.22694,
          "longitude": 77.12512
        },
        {
          "latitude": 15.2251,
          "longitude": 77.1454
        },
        {
          "latitude": 15.21482,
          "longitude": 77.15482
        },
        {
          "latitude": 15.17194,
          "longitude": 77.16913
        },
        {
          "latitude": 15.15736,
          "longitude": 77.16284
        },
        {
          "latitude": 15.15859,
          "longitude": 77.14076
        },
        {
          "latitude": 15.14542,
          "longitude": 77.13684
        },
        {
          "latitude": 15.14311,
          "longitude": 77.17655
        },
        {
          "latitude": 15.15831,
          "longitude": 77.18813
        },
        {
          "latitude": 15.16067,
          "longitude": 77.20239
        },
        {
          "latitude": 15.14501,
          "longitude": 77.2301
        },
        {
          "latitude": 15.14338,
          "longitude": 77.26403
        },
        {
          "latitude": 15.13171,
          "longitude": 77.27145
        },
        {
          "latitude": 15.13199,
          "longitude": 77.2917
        },
        {
          "latitude": 15.15517,
          "longitude": 77.29955
        },
        {
          "latitude": 15.15558,
          "longitude": 77.31003
        },
        {
          "latitude": 15.17808,
          "longitude": 77.31625
        },
        {
          "latitude": 15.17844,
          "longitude": 77.35141
        },
        {
          "latitude": 15.22424,
          "longitude": 77.3631
        },
        {
          "latitude": 15.21854,
          "longitude": 77.39459
        },
        {
          "latitude": 15.22693,
          "longitude": 77.40894
        },
        {
          "latitude": 15.22506,
          "longitude": 77.42494
        },
        {
          "latitude": 15.22213,
          "longitude": 77.43324
        },
        {
          "latitude": 15.21139,
          "longitude": 77.43473
        },
        {
          "latitude": 15.20685,
          "longitude": 77.45083
        },
        {
          "latitude": 15.2237,
          "longitude": 77.45152
        },
        {
          "latitude": 15.20988,
          "longitude": 77.48129
        },
        {
          "latitude": 15.22297,
          "longitude": 77.50203
        },
        {
          "latitude": 15.22531,
          "longitude": 77.52747
        },
        {
          "latitude": 15.21008,
          "longitude": 77.54233
        },
        {
          "latitude": 15.20054,
          "longitude": 77.57586
        },
        {
          "latitude": 15.18913,
          "longitude": 77.58262
        },
        {
          "latitude": 15.18473,
          "longitude": 77.61153
        },
        {
          "latitude": 15.20773,
          "longitude": 77.61572
        },
        {
          "latitude": 15.20814,
          "longitude": 77.63518
        },
        {
          "latitude": 15.2231,
          "longitude": 77.63772
        },
        {
          "latitude": 15.23382,
          "longitude": 77.65183
        },
        {
          "latitude": 15.23287,
          "longitude": 77.67149
        },
        {
          "latitude": 15.23824,
          "longitude": 77.67704
        },
        {
          "latitude": 15.24334,
          "longitude": 77.67141
        },
        {
          "latitude": 15.24693,
          "longitude": 77.68063
        },
        {
          "latitude": 15.27183,
          "longitude": 77.67538
        },
        {
          "latitude": 15.31997,
          "longitude": 77.68488
        },
        {
          "latitude": 15.31918,
          "longitude": 77.67278
        },
        {
          "latitude": 15.33873,
          "longitude": 77.64848
        },
        {
          "latitude": 15.39403,
          "longitude": 77.67628
        },
        {
          "latitude": 15.37966,
          "longitude": 77.71229
        },
        {
          "latitude": 15.40972,
          "longitude": 77.7421
        },
        {
          "latitude": 15.40512,
          "longitude": 77.77571
        },
        {
          "latitude": 15.42394,
          "longitude": 77.78825
        },
        {
          "latitude": 15.4418,
          "longitude": 77.78802
        },
        {
          "latitude": 15.44204,
          "longitude": 77.79617
        },
        {
          "latitude": 15.45042,
          "longitude": 77.7921
        },
        {
          "latitude": 15.45516,
          "longitude": 77.8002
        },
        {
          "latitude": 15.46355,
          "longitude": 77.7902
        },
        {
          "latitude": 15.46804,
          "longitude": 77.80394
        },
        {
          "latitude": 15.49065,
          "longitude": 77.81101
        },
        {
          "latitude": 15.48771,
          "longitude": 77.84416
        },
        {
          "latitude": 15.46992,
          "longitude": 77.83984
        },
        {
          "latitude": 15.46725,
          "longitude": 77.84685
        },
        {
          "latitude": 15.48865,
          "longitude": 77.87039
        },
        {
          "latitude": 15.46724,
          "longitude": 77.89064
        },
        {
          "latitude": 15.46819,
          "longitude": 77.90396
        },
        {
          "latitude": 15.44764,
          "longitude": 77.90112
        },
        {
          "latitude": 15.43749,
          "longitude": 77.92199
        },
        {
          "latitude": 15.41707,
          "longitude": 77.93662
        },
        {
          "latitude": 15.43204,
          "longitude": 77.96804
        },
        {
          "latitude": 15.42951,
          "longitude": 77.99124
        },
        {
          "latitude": 15.46303,
          "longitude": 77.99808
        },
        {
          "latitude": 15.47776,
          "longitude": 78.04701
        },
        {
          "latitude": 15.49883,
          "longitude": 78.04404
        },
        {
          "latitude": 15.48991,
          "longitude": 78.02877
        },
        {
          "latitude": 15.48178,
          "longitude": 78.04144
        },
        {
          "latitude": 15.48207,
          "longitude": 78.02212
        },
        {
          "latitude": 15.48823,
          "longitude": 78.01953
        },
        {
          "latitude": 15.48832,
          "longitude": 78.02625
        },
        {
          "latitude": 15.51086,
          "longitude": 78.03503
        },
        {
          "latitude": 15.51794,
          "longitude": 78.05648
        },
        {
          "latitude": 15.53049,
          "longitude": 78.04767
        },
        {
          "latitude": 15.52599,
          "longitude": 78.03897
        },
        {
          "latitude": 15.53416,
          "longitude": 78.03226
        },
        {
          "latitude": 15.53503,
          "longitude": 78.04824
        },
        {
          "latitude": 15.54519,
          "longitude": 78.05066
        },
        {
          "latitude": 15.53245,
          "longitude": 78.06952
        },
        {
          "latitude": 15.57062,
          "longitude": 78.07773
        },
        {
          "latitude": 15.57975,
          "longitude": 78.13169
        },
        {
          "latitude": 15.56849,
          "longitude": 78.14382
        },
        {
          "latitude": 15.53149,
          "longitude": 78.13443
        },
        {
          "latitude": 15.54395,
          "longitude": 78.18396
        },
        {
          "latitude": 15.55272,
          "longitude": 78.18427
        },
        {
          "latitude": 15.55976,
          "longitude": 78.17353
        },
        {
          "latitude": 15.5936,
          "longitude": 78.18624
        },
        {
          "latitude": 15.59092,
          "longitude": 78.21428
        },
        {
          "latitude": 15.60333,
          "longitude": 78.20812
        },
        {
          "latitude": 15.61886,
          "longitude": 78.21193
        },
        {
          "latitude": 15.63194,
          "longitude": 78.22887
        },
        {
          "latitude": 15.64078,
          "longitude": 78.26313
        },
        {
          "latitude": 15.70197,
          "longitude": 78.26838
        },
        {
          "latitude": 15.69441,
          "longitude": 78.20604
        },
        {
          "latitude": 15.7125,
          "longitude": 78.20217
        },
        {
          "latitude": 15.72605,
          "longitude": 78.18248
        },
        {
          "latitude": 15.74042,
          "longitude": 78.18718
        },
        {
          "latitude": 15.75545,
          "longitude": 78.15863
        },
        {
          "latitude": 15.77544,
          "longitude": 78.18224
        },
        {
          "latitude": 15.77319,
          "longitude": 78.1931
        },
        {
          "latitude": 15.78838,
          "longitude": 78.20157
        },
        {
          "latitude": 15.80541,
          "longitude": 78.15437
        },
        {
          "latitude": 15.81642,
          "longitude": 78.15019
        },
        {
          "latitude": 15.82557,
          "longitude": 78.17143
        },
        {
          "latitude": 15.8525,
          "longitude": 78.16609
        },
        {
          "latitude": 15.85606,
          "longitude": 78.13596
        },
        {
          "latitude": 15.85198,
          "longitude": 78.13033
        },
        {
          "latitude": 15.83761,
          "longitude": 78.13407
        },
        {
          "latitude": 15.84227,
          "longitude": 78.08392
        },
        {
          "latitude": 15.85169,
          "longitude": 78.07174
        },
        {
          "latitude": 15.86317,
          "longitude": 78.07189
        },
        {
          "latitude": 15.87621,
          "longitude": 78.04715
        },
        {
          "latitude": 15.90554,
          "longitude": 78.0456
        },
        {
          "latitude": 15.90877,
          "longitude": 78.03228
        },
        {
          "latitude": 15.86303,
          "longitude": 78.00908
        },
        {
          "latitude": 15.8844,
          "longitude": 77.97442
        },
        {
          "latitude": 15.8842,
          "longitude": 77.93792
        },
        {
          "latitude": 15.90673,
          "longitude": 77.88955
        },
        {
          "latitude": 15.90539,
          "longitude": 77.87759
        },
        {
          "latitude": 15.88495,
          "longitude": 77.85894
        },
        {
          "latitude": 15.87548,
          "longitude": 77.80395
        },
        {
          "latitude": 15.89675,
          "longitude": 77.7257
        },
        {
          "latitude": 15.88457,
          "longitude": 77.69451
        },
        {
          "latitude": 15.88658,
          "longitude": 77.66001
        },
        {
          "latitude": 15.91863,
          "longitude": 77.6126
        },
        {
          "latitude": 15.91287,
          "longitude": 77.59562
        },
        {
          "latitude": 15.92057,
          "longitude": 77.54692
        },
        {
          "latitude": 15.9344,
          "longitude": 77.46708
        },
        {
          "latitude": 15.949,
          "longitude": 77.42902
        },
        {
          "latitude": 15.93951,
          "longitude": 77.38038
        },
        {
          "latitude": 15.94954,
          "longitude": 77.36135
        },
        {
          "latitude": 15.95386,
          "longitude": 77.28436
        },
        {
          "latitude": 15.96503,
          "longitude": 77.25
        },
        {
          "latitude": 15.95754,
          "longitude": 77.23535
        },
        {
          "latitude": 15.95671,
          "longitude": 77.18474
        },
        {
          "latitude": 15.91862,
          "longitude": 77.08442
        },
        {
          "latitude": 15.85763,
          "longitude": 77.03273
        },
        {
          "latitude": 15.83761,
          "longitude": 77.02504
        },
        {
          "latitude": 15.82644,
          "longitude": 77.06547
        },
        {
          "latitude": 15.78883,
          "longitude": 77.06725
        },
        {
          "latitude": 15.76974,
          "longitude": 77.05224
        },
        {
          "latitude": 15.75607,
          "longitude": 77.05415
        },
        {
          "latitude": 15.75617,
          "longitude": 77.04775
        },
        {
          "latitude": 15.73026,
          "longitude": 77.0491
        },
        {
          "latitude": 15.72752,
          "longitude": 77.07969
        },
        {
          "latitude": 15.71626,
          "longitude": 77.07887
        },
        {
          "latitude": 15.71549,
          "longitude": 77.08741
        },
        {
          "latitude": 15.69515,
          "longitude": 77.0787
        },
        {
          "latitude": 15.68147,
          "longitude": 77.10923
        },
        {
          "latitude": 15.66247,
          "longitude": 77.1283
        },
        {
          "latitude": 15.63109,
          "longitude": 77.12143
        },
        {
          "latitude": 15.65915,
          "longitude": 77.08319
        },
        {
          "latitude": 15.64666,
          "longitude": 77.07173
        },
        {
          "latitude": 15.6345,
          "longitude": 77.03043
        },
        {
          "latitude": 15.50299,
          "longitude": 77.03015
        },
        {
          "latitude": 15.50647,
          "longitude": 76.9721
        }
      ]
    ]
  },
  {
    "id": "nandyal",
    "name": "Nandyal",
    "headquarters": "Nandyal",
    "center": {
      "latitude": 15.4776,
      "longitude": 78.3737
    },
    "region": "Rayalaseema",
    "polygon": [
      {
        "latitude": 15.33873,
        "longitude": 77.64848
      },
      {
        "latitude": 15.31918,
        "longitude": 77.67278
      },
      {
        "latitude": 15.31997,
        "longitude": 77.68488
      },
      {
        "latitude": 15.27183,
        "longitude": 77.67538
      },
      {
        "latitude": 15.24693,
        "longitude": 77.68063
      },
      {
        "latitude": 15.2391,
        "longitude": 77.67013
      },
      {
        "latitude": 15.23824,
        "longitude": 77.67704
      },
      {
        "latitude": 15.23287,
        "longitude": 77.67149
      },
      {
        "latitude": 15.21778,
        "longitude": 77.67877
      },
      {
        "latitude": 15.20682,
        "longitude": 77.69768
      },
      {
        "latitude": 15.18477,
        "longitude": 77.69291
      },
      {
        "latitude": 15.18078,
        "longitude": 77.70126
      },
      {
        "latitude": 15.18759,
        "longitude": 77.7116
      },
      {
        "latitude": 15.17304,
        "longitude": 77.71654
      },
      {
        "latitude": 15.1694,
        "longitude": 77.73296
      },
      {
        "latitude": 15.15286,
        "longitude": 77.72961
      },
      {
        "latitude": 15.1413,
        "longitude": 77.7467
      },
      {
        "latitude": 15.12947,
        "longitude": 77.74878
      },
      {
        "latitude": 15.12547,
        "longitude": 77.77395
      },
      {
        "latitude": 15.11459,
        "longitude": 77.77129
      },
      {
        "latitude": 15.10731,
        "longitude": 77.79149
      },
      {
        "latitude": 15.14396,
        "longitude": 77.81566
      },
      {
        "latitude": 15.14599,
        "longitude": 77.839
      },
      {
        "latitude": 15.13061,
        "longitude": 77.84267
      },
      {
        "latitude": 15.13627,
        "longitude": 77.87531
      },
      {
        "latitude": 15.17953,
        "longitude": 77.88464
      },
      {
        "latitude": 15.17487,
        "longitude": 77.91944
      },
      {
        "latitude": 15.14946,
        "longitude": 77.92432
      },
      {
        "latitude": 15.14045,
        "longitude": 77.90946
      },
      {
        "latitude": 15.12996,
        "longitude": 77.91496
      },
      {
        "latitude": 15.13174,
        "longitude": 77.90727
      },
      {
        "latitude": 15.1236,
        "longitude": 77.90642
      },
      {
        "latitude": 15.10976,
        "longitude": 77.96134
      },
      {
        "latitude": 15.14009,
        "longitude": 77.97463
      },
      {
        "latitude": 15.13426,
        "longitude": 77.99379
      },
      {
        "latitude": 15.11303,
        "longitude": 78.01453
      },
      {
        "latitude": 15.06532,
        "longitude": 77.9954
      },
      {
        "latitude": 15.05238,
        "longitude": 78.011
      },
      {
        "latitude": 15.02862,
        "longitude": 78.01091
      },
      {
        "latitude": 15.00061,
        "longitude": 78.03402
      },
      {
        "latitude": 14.99295,
        "longitude": 78.05461
      },
      {
        "latitude": 15.00437,
        "longitude": 78.06034
      },
      {
        "latitude": 14.98295,
        "longitude": 78.08862
      },
      {
        "latitude": 14.97305,
        "longitude": 78.08735
      },
      {
        "latitude": 14.96198,
        "longitude": 78.13343
      },
      {
        "latitude": 14.94871,
        "longitude": 78.13752
      },
      {
        "latitude": 14.94934,
        "longitude": 78.15133
      },
      {
        "latitude": 14.9599,
        "longitude": 78.15319
      },
      {
        "latitude": 14.96449,
        "longitude": 78.16572
      },
      {
        "latitude": 14.95604,
        "longitude": 78.22052
      },
      {
        "latitude": 15.00499,
        "longitude": 78.23605
      },
      {
        "latitude": 15.00056,
        "longitude": 78.24376
      },
      {
        "latitude": 15.02751,
        "longitude": 78.26049
      },
      {
        "latitude": 15.03191,
        "longitude": 78.28414
      },
      {
        "latitude": 15.05976,
        "longitude": 78.27527
      },
      {
        "latitude": 15.07355,
        "longitude": 78.28913
      },
      {
        "latitude": 15.07353,
        "longitude": 78.32505
      },
      {
        "latitude": 15.05331,
        "longitude": 78.36419
      },
      {
        "latitude": 15.07287,
        "longitude": 78.3705
      },
      {
        "latitude": 15.06959,
        "longitude": 78.38225
      },
      {
        "latitude": 15.0577,
        "longitude": 78.37809
      },
      {
        "latitude": 15.04994,
        "longitude": 78.39956
      },
      {
        "latitude": 15.03978,
        "longitude": 78.37757
      },
      {
        "latitude": 15.02656,
        "longitude": 78.36917
      },
      {
        "latitude": 15.03201,
        "longitude": 78.35344
      },
      {
        "latitude": 15.00322,
        "longitude": 78.34275
      },
      {
        "latitude": 14.96961,
        "longitude": 78.39233
      },
      {
        "latitude": 14.97444,
        "longitude": 78.40995
      },
      {
        "latitude": 15.03201,
        "longitude": 78.4179
      },
      {
        "latitude": 15.03823,
        "longitude": 78.43755
      },
      {
        "latitude": 15.0321,
        "longitude": 78.45689
      },
      {
        "latitude": 15.04052,
        "longitude": 78.46179
      },
      {
        "latitude": 15.03684,
        "longitude": 78.47467
      },
      {
        "latitude": 15.04485,
        "longitude": 78.48122
      },
      {
        "latitude": 15.03814,
        "longitude": 78.48517
      },
      {
        "latitude": 15.05168,
        "longitude": 78.48752
      },
      {
        "latitude": 15.06434,
        "longitude": 78.47405
      },
      {
        "latitude": 15.07261,
        "longitude": 78.4875
      },
      {
        "latitude": 15.06126,
        "longitude": 78.51573
      },
      {
        "latitude": 15.01424,
        "longitude": 78.51553
      },
      {
        "latitude": 15.00484,
        "longitude": 78.50884
      },
      {
        "latitude": 14.99819,
        "longitude": 78.51664
      },
      {
        "latitude": 14.95646,
        "longitude": 78.505
      },
      {
        "latitude": 14.95704,
        "longitude": 78.49863
      },
      {
        "latitude": 14.90429,
        "longitude": 78.47777
      },
      {
        "latitude": 14.90219,
        "longitude": 78.48559
      },
      {
        "latitude": 14.94474,
        "longitude": 78.51967
      },
      {
        "latitude": 14.9553,
        "longitude": 78.51963
      },
      {
        "latitude": 14.96642,
        "longitude": 78.54021
      },
      {
        "latitude": 14.96285,
        "longitude": 78.55138
      },
      {
        "latitude": 14.93453,
        "longitude": 78.54676
      },
      {
        "latitude": 14.93164,
        "longitude": 78.55421
      },
      {
        "latitude": 14.94711,
        "longitude": 78.58116
      },
      {
        "latitude": 14.94091,
        "longitude": 78.59216
      },
      {
        "latitude": 14.95577,
        "longitude": 78.60149
      },
      {
        "latitude": 14.94831,
        "longitude": 78.62975
      },
      {
        "latitude": 14.92696,
        "longitude": 78.63005
      },
      {
        "latitude": 14.93981,
        "longitude": 78.68472
      },
      {
        "latitude": 14.96941,
        "longitude": 78.69186
      },
      {
        "latitude": 14.97029,
        "longitude": 78.71801
      },
      {
        "latitude": 15.02294,
        "longitude": 78.70913
      },
      {
        "latitude": 15.03513,
        "longitude": 78.74797
      },
      {
        "latitude": 15.05536,
        "longitude": 78.76088
      },
      {
        "latitude": 15.13505,
        "longitude": 78.74909
      },
      {
        "latitude": 15.18556,
        "longitude": 78.7574
      },
      {
        "latitude": 15.18375,
        "longitude": 78.74186
      },
      {
        "latitude": 15.20121,
        "longitude": 78.73658
      },
      {
        "latitude": 15.3264,
        "longitude": 78.73673
      },
      {
        "latitude": 15.41984,
        "longitude": 78.77155
      },
      {
        "latitude": 15.66433,
        "longitude": 78.7715
      },
      {
        "latitude": 15.86719,
        "longitude": 78.81004
      },
      {
        "latitude": 15.90804,
        "longitude": 78.83761
      },
      {
        "latitude": 15.96834,
        "longitude": 78.90954
      },
      {
        "latitude": 16.09307,
        "longitude": 78.92914
      },
      {
        "latitude": 16.12286,
        "longitude": 78.92159
      },
      {
        "latitude": 16.10324,
        "longitude": 78.92153
      },
      {
        "latitude": 16.08491,
        "longitude": 78.88977
      },
      {
        "latitude": 16.14419,
        "longitude": 78.87275
      },
      {
        "latitude": 16.14577,
        "longitude": 78.83443
      },
      {
        "latitude": 16.09435,
        "longitude": 78.84227
      },
      {
        "latitude": 16.07093,
        "longitude": 78.83655
      },
      {
        "latitude": 16.02468,
        "longitude": 78.79066
      },
      {
        "latitude": 16.00988,
        "longitude": 78.74042
      },
      {
        "latitude": 16.03454,
        "longitude": 78.68178
      },
      {
        "latitude": 16.07909,
        "longitude": 78.65042
      },
      {
        "latitude": 16.08828,
        "longitude": 78.62267
      },
      {
        "latitude": 16.08457,
        "longitude": 78.60226
      },
      {
        "latitude": 16.06423,
        "longitude": 78.58776
      },
      {
        "latitude": 16.0431,
        "longitude": 78.55339
      },
      {
        "latitude": 16.0735,
        "longitude": 78.46018
      },
      {
        "latitude": 16.07602,
        "longitude": 78.40714
      },
      {
        "latitude": 16.04721,
        "longitude": 78.36518
      },
      {
        "latitude": 16.03957,
        "longitude": 78.32752
      },
      {
        "latitude": 16.01313,
        "longitude": 78.31347
      },
      {
        "latitude": 16.0254,
        "longitude": 78.26029
      },
      {
        "latitude": 15.93716,
        "longitude": 78.25228
      },
      {
        "latitude": 15.90841,
        "longitude": 78.18194
      },
      {
        "latitude": 15.89359,
        "longitude": 78.1901
      },
      {
        "latitude": 15.87823,
        "longitude": 78.17691
      },
      {
        "latitude": 15.85938,
        "longitude": 78.17541
      },
      {
        "latitude": 15.85558,
        "longitude": 78.16339
      },
      {
        "latitude": 15.82557,
        "longitude": 78.17143
      },
      {
        "latitude": 15.81642,
        "longitude": 78.15019
      },
      {
        "latitude": 15.80035,
        "longitude": 78.15784
      },
      {
        "latitude": 15.7884,
        "longitude": 78.20157
      },
      {
        "latitude": 15.77319,
        "longitude": 78.1931
      },
      {
        "latitude": 15.77544,
        "longitude": 78.18224
      },
      {
        "latitude": 15.75545,
        "longitude": 78.15863
      },
      {
        "latitude": 15.74042,
        "longitude": 78.18718
      },
      {
        "latitude": 15.72605,
        "longitude": 78.18248
      },
      {
        "latitude": 15.7125,
        "longitude": 78.20217
      },
      {
        "latitude": 15.69441,
        "longitude": 78.20604
      },
      {
        "latitude": 15.70197,
        "longitude": 78.26838
      },
      {
        "latitude": 15.64078,
        "longitude": 78.26313
      },
      {
        "latitude": 15.63194,
        "longitude": 78.22887
      },
      {
        "latitude": 15.61886,
        "longitude": 78.21193
      },
      {
        "latitude": 15.60333,
        "longitude": 78.20812
      },
      {
        "latitude": 15.59092,
        "longitude": 78.21428
      },
      {
        "latitude": 15.5936,
        "longitude": 78.18624
      },
      {
        "latitude": 15.55976,
        "longitude": 78.17353
      },
      {
        "latitude": 15.5442,
        "longitude": 78.1842
      },
      {
        "latitude": 15.53149,
        "longitude": 78.13443
      },
      {
        "latitude": 15.56849,
        "longitude": 78.14382
      },
      {
        "latitude": 15.57975,
        "longitude": 78.13169
      },
      {
        "latitude": 15.57062,
        "longitude": 78.07773
      },
      {
        "latitude": 15.53245,
        "longitude": 78.06952
      },
      {
        "latitude": 15.54519,
        "longitude": 78.05066
      },
      {
        "latitude": 15.53503,
        "longitude": 78.04824
      },
      {
        "latitude": 15.53416,
        "longitude": 78.03226
      },
      {
        "latitude": 15.52599,
        "longitude": 78.03897
      },
      {
        "latitude": 15.53049,
        "longitude": 78.04767
      },
      {
        "latitude": 15.51794,
        "longitude": 78.05648
      },
      {
        "latitude": 15.51086,
        "longitude": 78.03503
      },
      {
        "latitude": 15.48832,
        "longitude": 78.02625
      },
      {
        "latitude": 15.48823,
        "longitude": 78.01953
      },
      {
        "latitude": 15.48207,
        "longitude": 78.02212
      },
      {
        "latitude": 15.48178,
        "longitude": 78.04144
      },
      {
        "latitude": 15.48991,
        "longitude": 78.02877
      },
      {
        "latitude": 15.49883,
        "longitude": 78.04404
      },
      {
        "latitude": 15.47776,
        "longitude": 78.04701
      },
      {
        "latitude": 15.46303,
        "longitude": 77.99808
      },
      {
        "latitude": 15.42951,
        "longitude": 77.99124
      },
      {
        "latitude": 15.43204,
        "longitude": 77.96804
      },
      {
        "latitude": 15.41707,
        "longitude": 77.93662
      },
      {
        "latitude": 15.43749,
        "longitude": 77.92199
      },
      {
        "latitude": 15.44764,
        "longitude": 77.90112
      },
      {
        "latitude": 15.46819,
        "longitude": 77.90396
      },
      {
        "latitude": 15.46724,
        "longitude": 77.89064
      },
      {
        "latitude": 15.48865,
        "longitude": 77.87039
      },
      {
        "latitude": 15.46725,
        "longitude": 77.84685
      },
      {
        "latitude": 15.46992,
        "longitude": 77.83984
      },
      {
        "latitude": 15.48771,
        "longitude": 77.84416
      },
      {
        "latitude": 15.49065,
        "longitude": 77.81101
      },
      {
        "latitude": 15.46804,
        "longitude": 77.80394
      },
      {
        "latitude": 15.46355,
        "longitude": 77.7902
      },
      {
        "latitude": 15.45516,
        "longitude": 77.8002
      },
      {
        "latitude": 15.45042,
        "longitude": 77.7921
      },
      {
        "latitude": 15.44204,
        "longitude": 77.79617
      },
      {
        "latitude": 15.4418,
        "longitude": 77.78802
      },
      {
        "latitude": 15.42394,
        "longitude": 77.78825
      },
      {
        "latitude": 15.40512,
        "longitude": 77.77571
      },
      {
        "latitude": 15.40972,
        "longitude": 77.7421
      },
      {
        "latitude": 15.37966,
        "longitude": 77.71229
      },
      {
        "latitude": 15.39403,
        "longitude": 77.67628
      },
      {
        "latitude": 15.33873,
        "longitude": 77.64848
      }
    ],
    "polygons": [
      [
        {
          "latitude": 15.33873,
          "longitude": 77.64848
        },
        {
          "latitude": 15.31918,
          "longitude": 77.67278
        },
        {
          "latitude": 15.31997,
          "longitude": 77.68488
        },
        {
          "latitude": 15.27183,
          "longitude": 77.67538
        },
        {
          "latitude": 15.24693,
          "longitude": 77.68063
        },
        {
          "latitude": 15.2391,
          "longitude": 77.67013
        },
        {
          "latitude": 15.23824,
          "longitude": 77.67704
        },
        {
          "latitude": 15.23287,
          "longitude": 77.67149
        },
        {
          "latitude": 15.21778,
          "longitude": 77.67877
        },
        {
          "latitude": 15.20682,
          "longitude": 77.69768
        },
        {
          "latitude": 15.18477,
          "longitude": 77.69291
        },
        {
          "latitude": 15.18078,
          "longitude": 77.70126
        },
        {
          "latitude": 15.18759,
          "longitude": 77.7116
        },
        {
          "latitude": 15.17304,
          "longitude": 77.71654
        },
        {
          "latitude": 15.1694,
          "longitude": 77.73296
        },
        {
          "latitude": 15.15286,
          "longitude": 77.72961
        },
        {
          "latitude": 15.1413,
          "longitude": 77.7467
        },
        {
          "latitude": 15.12947,
          "longitude": 77.74878
        },
        {
          "latitude": 15.12547,
          "longitude": 77.77395
        },
        {
          "latitude": 15.11459,
          "longitude": 77.77129
        },
        {
          "latitude": 15.10731,
          "longitude": 77.79149
        },
        {
          "latitude": 15.14396,
          "longitude": 77.81566
        },
        {
          "latitude": 15.14599,
          "longitude": 77.839
        },
        {
          "latitude": 15.13061,
          "longitude": 77.84267
        },
        {
          "latitude": 15.13627,
          "longitude": 77.87531
        },
        {
          "latitude": 15.17953,
          "longitude": 77.88464
        },
        {
          "latitude": 15.17487,
          "longitude": 77.91944
        },
        {
          "latitude": 15.14946,
          "longitude": 77.92432
        },
        {
          "latitude": 15.14045,
          "longitude": 77.90946
        },
        {
          "latitude": 15.12996,
          "longitude": 77.91496
        },
        {
          "latitude": 15.13174,
          "longitude": 77.90727
        },
        {
          "latitude": 15.1236,
          "longitude": 77.90642
        },
        {
          "latitude": 15.10976,
          "longitude": 77.96134
        },
        {
          "latitude": 15.14009,
          "longitude": 77.97463
        },
        {
          "latitude": 15.13426,
          "longitude": 77.99379
        },
        {
          "latitude": 15.11303,
          "longitude": 78.01453
        },
        {
          "latitude": 15.06532,
          "longitude": 77.9954
        },
        {
          "latitude": 15.05238,
          "longitude": 78.011
        },
        {
          "latitude": 15.02862,
          "longitude": 78.01091
        },
        {
          "latitude": 15.00061,
          "longitude": 78.03402
        },
        {
          "latitude": 14.99295,
          "longitude": 78.05461
        },
        {
          "latitude": 15.00437,
          "longitude": 78.06034
        },
        {
          "latitude": 14.98295,
          "longitude": 78.08862
        },
        {
          "latitude": 14.97305,
          "longitude": 78.08735
        },
        {
          "latitude": 14.96198,
          "longitude": 78.13343
        },
        {
          "latitude": 14.94871,
          "longitude": 78.13752
        },
        {
          "latitude": 14.94934,
          "longitude": 78.15133
        },
        {
          "latitude": 14.9599,
          "longitude": 78.15319
        },
        {
          "latitude": 14.96449,
          "longitude": 78.16572
        },
        {
          "latitude": 14.95604,
          "longitude": 78.22052
        },
        {
          "latitude": 15.00499,
          "longitude": 78.23605
        },
        {
          "latitude": 15.00056,
          "longitude": 78.24376
        },
        {
          "latitude": 15.02751,
          "longitude": 78.26049
        },
        {
          "latitude": 15.03191,
          "longitude": 78.28414
        },
        {
          "latitude": 15.05976,
          "longitude": 78.27527
        },
        {
          "latitude": 15.07355,
          "longitude": 78.28913
        },
        {
          "latitude": 15.07353,
          "longitude": 78.32505
        },
        {
          "latitude": 15.05331,
          "longitude": 78.36419
        },
        {
          "latitude": 15.07287,
          "longitude": 78.3705
        },
        {
          "latitude": 15.06959,
          "longitude": 78.38225
        },
        {
          "latitude": 15.0577,
          "longitude": 78.37809
        },
        {
          "latitude": 15.04994,
          "longitude": 78.39956
        },
        {
          "latitude": 15.03978,
          "longitude": 78.37757
        },
        {
          "latitude": 15.02656,
          "longitude": 78.36917
        },
        {
          "latitude": 15.03201,
          "longitude": 78.35344
        },
        {
          "latitude": 15.00322,
          "longitude": 78.34275
        },
        {
          "latitude": 14.96961,
          "longitude": 78.39233
        },
        {
          "latitude": 14.97444,
          "longitude": 78.40995
        },
        {
          "latitude": 15.03201,
          "longitude": 78.4179
        },
        {
          "latitude": 15.03823,
          "longitude": 78.43755
        },
        {
          "latitude": 15.0321,
          "longitude": 78.45689
        },
        {
          "latitude": 15.04052,
          "longitude": 78.46179
        },
        {
          "latitude": 15.03684,
          "longitude": 78.47467
        },
        {
          "latitude": 15.04485,
          "longitude": 78.48122
        },
        {
          "latitude": 15.03814,
          "longitude": 78.48517
        },
        {
          "latitude": 15.05168,
          "longitude": 78.48752
        },
        {
          "latitude": 15.06434,
          "longitude": 78.47405
        },
        {
          "latitude": 15.07261,
          "longitude": 78.4875
        },
        {
          "latitude": 15.06126,
          "longitude": 78.51573
        },
        {
          "latitude": 15.01424,
          "longitude": 78.51553
        },
        {
          "latitude": 15.00484,
          "longitude": 78.50884
        },
        {
          "latitude": 14.99819,
          "longitude": 78.51664
        },
        {
          "latitude": 14.95646,
          "longitude": 78.505
        },
        {
          "latitude": 14.95704,
          "longitude": 78.49863
        },
        {
          "latitude": 14.90429,
          "longitude": 78.47777
        },
        {
          "latitude": 14.90219,
          "longitude": 78.48559
        },
        {
          "latitude": 14.94474,
          "longitude": 78.51967
        },
        {
          "latitude": 14.9553,
          "longitude": 78.51963
        },
        {
          "latitude": 14.96642,
          "longitude": 78.54021
        },
        {
          "latitude": 14.96285,
          "longitude": 78.55138
        },
        {
          "latitude": 14.93453,
          "longitude": 78.54676
        },
        {
          "latitude": 14.93164,
          "longitude": 78.55421
        },
        {
          "latitude": 14.94711,
          "longitude": 78.58116
        },
        {
          "latitude": 14.94091,
          "longitude": 78.59216
        },
        {
          "latitude": 14.95577,
          "longitude": 78.60149
        },
        {
          "latitude": 14.94831,
          "longitude": 78.62975
        },
        {
          "latitude": 14.92696,
          "longitude": 78.63005
        },
        {
          "latitude": 14.93981,
          "longitude": 78.68472
        },
        {
          "latitude": 14.96941,
          "longitude": 78.69186
        },
        {
          "latitude": 14.97029,
          "longitude": 78.71801
        },
        {
          "latitude": 15.02294,
          "longitude": 78.70913
        },
        {
          "latitude": 15.03513,
          "longitude": 78.74797
        },
        {
          "latitude": 15.05536,
          "longitude": 78.76088
        },
        {
          "latitude": 15.13505,
          "longitude": 78.74909
        },
        {
          "latitude": 15.18556,
          "longitude": 78.7574
        },
        {
          "latitude": 15.18375,
          "longitude": 78.74186
        },
        {
          "latitude": 15.20121,
          "longitude": 78.73658
        },
        {
          "latitude": 15.3264,
          "longitude": 78.73673
        },
        {
          "latitude": 15.41984,
          "longitude": 78.77155
        },
        {
          "latitude": 15.66433,
          "longitude": 78.7715
        },
        {
          "latitude": 15.86719,
          "longitude": 78.81004
        },
        {
          "latitude": 15.90804,
          "longitude": 78.83761
        },
        {
          "latitude": 15.96834,
          "longitude": 78.90954
        },
        {
          "latitude": 16.09307,
          "longitude": 78.92914
        },
        {
          "latitude": 16.12286,
          "longitude": 78.92159
        },
        {
          "latitude": 16.10324,
          "longitude": 78.92153
        },
        {
          "latitude": 16.08491,
          "longitude": 78.88977
        },
        {
          "latitude": 16.14419,
          "longitude": 78.87275
        },
        {
          "latitude": 16.14577,
          "longitude": 78.83443
        },
        {
          "latitude": 16.09435,
          "longitude": 78.84227
        },
        {
          "latitude": 16.07093,
          "longitude": 78.83655
        },
        {
          "latitude": 16.02468,
          "longitude": 78.79066
        },
        {
          "latitude": 16.00988,
          "longitude": 78.74042
        },
        {
          "latitude": 16.03454,
          "longitude": 78.68178
        },
        {
          "latitude": 16.07909,
          "longitude": 78.65042
        },
        {
          "latitude": 16.08828,
          "longitude": 78.62267
        },
        {
          "latitude": 16.08457,
          "longitude": 78.60226
        },
        {
          "latitude": 16.06423,
          "longitude": 78.58776
        },
        {
          "latitude": 16.0431,
          "longitude": 78.55339
        },
        {
          "latitude": 16.0735,
          "longitude": 78.46018
        },
        {
          "latitude": 16.07602,
          "longitude": 78.40714
        },
        {
          "latitude": 16.04721,
          "longitude": 78.36518
        },
        {
          "latitude": 16.03957,
          "longitude": 78.32752
        },
        {
          "latitude": 16.01313,
          "longitude": 78.31347
        },
        {
          "latitude": 16.0254,
          "longitude": 78.26029
        },
        {
          "latitude": 15.93716,
          "longitude": 78.25228
        },
        {
          "latitude": 15.90841,
          "longitude": 78.18194
        },
        {
          "latitude": 15.89359,
          "longitude": 78.1901
        },
        {
          "latitude": 15.87823,
          "longitude": 78.17691
        },
        {
          "latitude": 15.85938,
          "longitude": 78.17541
        },
        {
          "latitude": 15.85558,
          "longitude": 78.16339
        },
        {
          "latitude": 15.82557,
          "longitude": 78.17143
        },
        {
          "latitude": 15.81642,
          "longitude": 78.15019
        },
        {
          "latitude": 15.80035,
          "longitude": 78.15784
        },
        {
          "latitude": 15.7884,
          "longitude": 78.20157
        },
        {
          "latitude": 15.77319,
          "longitude": 78.1931
        },
        {
          "latitude": 15.77544,
          "longitude": 78.18224
        },
        {
          "latitude": 15.75545,
          "longitude": 78.15863
        },
        {
          "latitude": 15.74042,
          "longitude": 78.18718
        },
        {
          "latitude": 15.72605,
          "longitude": 78.18248
        },
        {
          "latitude": 15.7125,
          "longitude": 78.20217
        },
        {
          "latitude": 15.69441,
          "longitude": 78.20604
        },
        {
          "latitude": 15.70197,
          "longitude": 78.26838
        },
        {
          "latitude": 15.64078,
          "longitude": 78.26313
        },
        {
          "latitude": 15.63194,
          "longitude": 78.22887
        },
        {
          "latitude": 15.61886,
          "longitude": 78.21193
        },
        {
          "latitude": 15.60333,
          "longitude": 78.20812
        },
        {
          "latitude": 15.59092,
          "longitude": 78.21428
        },
        {
          "latitude": 15.5936,
          "longitude": 78.18624
        },
        {
          "latitude": 15.55976,
          "longitude": 78.17353
        },
        {
          "latitude": 15.5442,
          "longitude": 78.1842
        },
        {
          "latitude": 15.53149,
          "longitude": 78.13443
        },
        {
          "latitude": 15.56849,
          "longitude": 78.14382
        },
        {
          "latitude": 15.57975,
          "longitude": 78.13169
        },
        {
          "latitude": 15.57062,
          "longitude": 78.07773
        },
        {
          "latitude": 15.53245,
          "longitude": 78.06952
        },
        {
          "latitude": 15.54519,
          "longitude": 78.05066
        },
        {
          "latitude": 15.53503,
          "longitude": 78.04824
        },
        {
          "latitude": 15.53416,
          "longitude": 78.03226
        },
        {
          "latitude": 15.52599,
          "longitude": 78.03897
        },
        {
          "latitude": 15.53049,
          "longitude": 78.04767
        },
        {
          "latitude": 15.51794,
          "longitude": 78.05648
        },
        {
          "latitude": 15.51086,
          "longitude": 78.03503
        },
        {
          "latitude": 15.48832,
          "longitude": 78.02625
        },
        {
          "latitude": 15.48823,
          "longitude": 78.01953
        },
        {
          "latitude": 15.48207,
          "longitude": 78.02212
        },
        {
          "latitude": 15.48178,
          "longitude": 78.04144
        },
        {
          "latitude": 15.48991,
          "longitude": 78.02877
        },
        {
          "latitude": 15.49883,
          "longitude": 78.04404
        },
        {
          "latitude": 15.47776,
          "longitude": 78.04701
        },
        {
          "latitude": 15.46303,
          "longitude": 77.99808
        },
        {
          "latitude": 15.42951,
          "longitude": 77.99124
        },
        {
          "latitude": 15.43204,
          "longitude": 77.96804
        },
        {
          "latitude": 15.41707,
          "longitude": 77.93662
        },
        {
          "latitude": 15.43749,
          "longitude": 77.92199
        },
        {
          "latitude": 15.44764,
          "longitude": 77.90112
        },
        {
          "latitude": 15.46819,
          "longitude": 77.90396
        },
        {
          "latitude": 15.46724,
          "longitude": 77.89064
        },
        {
          "latitude": 15.48865,
          "longitude": 77.87039
        },
        {
          "latitude": 15.46725,
          "longitude": 77.84685
        },
        {
          "latitude": 15.46992,
          "longitude": 77.83984
        },
        {
          "latitude": 15.48771,
          "longitude": 77.84416
        },
        {
          "latitude": 15.49065,
          "longitude": 77.81101
        },
        {
          "latitude": 15.46804,
          "longitude": 77.80394
        },
        {
          "latitude": 15.46355,
          "longitude": 77.7902
        },
        {
          "latitude": 15.45516,
          "longitude": 77.8002
        },
        {
          "latitude": 15.45042,
          "longitude": 77.7921
        },
        {
          "latitude": 15.44204,
          "longitude": 77.79617
        },
        {
          "latitude": 15.4418,
          "longitude": 77.78802
        },
        {
          "latitude": 15.42394,
          "longitude": 77.78825
        },
        {
          "latitude": 15.40512,
          "longitude": 77.77571
        },
        {
          "latitude": 15.40972,
          "longitude": 77.7421
        },
        {
          "latitude": 15.37966,
          "longitude": 77.71229
        },
        {
          "latitude": 15.39403,
          "longitude": 77.67628
        },
        {
          "latitude": 15.33873,
          "longitude": 77.64848
        }
      ]
    ]
  },
  {
    "id": "ntr",
    "name": "NTR",
    "headquarters": "Vijayawada",
    "center": {
      "latitude": 16.8215,
      "longitude": 80.4629
    },
    "region": "Coastal Andhra",
    "polygon": [
      {
        "latitude": 16.87022,
        "longitude": 80.00223
      },
      {
        "latitude": 16.8535,
        "longitude": 80.01818
      },
      {
        "latitude": 16.85298,
        "longitude": 80.04654
      },
      {
        "latitude": 16.83227,
        "longitude": 80.04868
      },
      {
        "latitude": 16.81882,
        "longitude": 80.0712
      },
      {
        "latitude": 16.82404,
        "longitude": 80.11158
      },
      {
        "latitude": 16.80906,
        "longitude": 80.12535
      },
      {
        "latitude": 16.73461,
        "longitude": 80.14371
      },
      {
        "latitude": 16.70936,
        "longitude": 80.14019
      },
      {
        "latitude": 16.68792,
        "longitude": 80.14834
      },
      {
        "latitude": 16.65913,
        "longitude": 80.13613
      },
      {
        "latitude": 16.64921,
        "longitude": 80.14247
      },
      {
        "latitude": 16.64274,
        "longitude": 80.18023
      },
      {
        "latitude": 16.61105,
        "longitude": 80.2523
      },
      {
        "latitude": 16.61166,
        "longitude": 80.33089
      },
      {
        "latitude": 16.58759,
        "longitude": 80.36726
      },
      {
        "latitude": 16.59068,
        "longitude": 80.46708
      },
      {
        "latitude": 16.56267,
        "longitude": 80.52885
      },
      {
        "latitude": 16.54167,
        "longitude": 80.55442
      },
      {
        "latitude": 16.53314,
        "longitude": 80.55489
      },
      {
        "latitude": 16.47999,
        "longitude": 80.65259
      },
      {
        "latitude": 16.4883,
        "longitude": 80.66278
      },
      {
        "latitude": 16.48206,
        "longitude": 80.67688
      },
      {
        "latitude": 16.48893,
        "longitude": 80.67146
      },
      {
        "latitude": 16.51539,
        "longitude": 80.68324
      },
      {
        "latitude": 16.50812,
        "longitude": 80.71169
      },
      {
        "latitude": 16.50014,
        "longitude": 80.71307
      },
      {
        "latitude": 16.48721,
        "longitude": 80.74432
      },
      {
        "latitude": 16.51513,
        "longitude": 80.76496
      },
      {
        "latitude": 16.5222,
        "longitude": 80.72774
      },
      {
        "latitude": 16.54248,
        "longitude": 80.68619
      },
      {
        "latitude": 16.58551,
        "longitude": 80.70164
      },
      {
        "latitude": 16.60533,
        "longitude": 80.69439
      },
      {
        "latitude": 16.62652,
        "longitude": 80.69708
      },
      {
        "latitude": 16.63855,
        "longitude": 80.68602
      },
      {
        "latitude": 16.66656,
        "longitude": 80.68707
      },
      {
        "latitude": 16.80991,
        "longitude": 80.77652
      },
      {
        "latitude": 16.85053,
        "longitude": 80.77204
      },
      {
        "latitude": 16.85942,
        "longitude": 80.79438
      },
      {
        "latitude": 16.88207,
        "longitude": 80.79761
      },
      {
        "latitude": 16.87897,
        "longitude": 80.82598
      },
      {
        "latitude": 16.88633,
        "longitude": 80.84497
      },
      {
        "latitude": 16.90853,
        "longitude": 80.8535
      },
      {
        "latitude": 16.92769,
        "longitude": 80.8238
      },
      {
        "latitude": 16.98978,
        "longitude": 80.82563
      },
      {
        "latitude": 17.00074,
        "longitude": 80.79918
      },
      {
        "latitude": 17.02182,
        "longitude": 80.77949
      },
      {
        "latitude": 17.06068,
        "longitude": 80.79927
      },
      {
        "latitude": 17.08211,
        "longitude": 80.70918
      },
      {
        "latitude": 17.06731,
        "longitude": 80.67281
      },
      {
        "latitude": 17.07036,
        "longitude": 80.65141
      },
      {
        "latitude": 17.08741,
        "longitude": 80.65498
      },
      {
        "latitude": 17.10158,
        "longitude": 80.66986
      },
      {
        "latitude": 17.11638,
        "longitude": 80.64066
      },
      {
        "latitude": 17.1242,
        "longitude": 80.64361
      },
      {
        "latitude": 17.12826,
        "longitude": 80.61929
      },
      {
        "latitude": 17.15324,
        "longitude": 80.57912
      },
      {
        "latitude": 17.13253,
        "longitude": 80.56146
      },
      {
        "latitude": 17.11756,
        "longitude": 80.52757
      },
      {
        "latitude": 17.12144,
        "longitude": 80.51342
      },
      {
        "latitude": 17.08991,
        "longitude": 80.50273
      },
      {
        "latitude": 17.08537,
        "longitude": 80.50986
      },
      {
        "latitude": 17.06648,
        "longitude": 80.50373
      },
      {
        "latitude": 17.05183,
        "longitude": 80.49041
      },
      {
        "latitude": 17.05007,
        "longitude": 80.47062
      },
      {
        "latitude": 17.0304,
        "longitude": 80.46379
      },
      {
        "latitude": 17.03746,
        "longitude": 80.43817
      },
      {
        "latitude": 17.07293,
        "longitude": 80.41707
      },
      {
        "latitude": 17.09207,
        "longitude": 80.4186
      },
      {
        "latitude": 17.09137,
        "longitude": 80.4083
      },
      {
        "latitude": 17.06867,
        "longitude": 80.38446
      },
      {
        "latitude": 17.05286,
        "longitude": 80.3974
      },
      {
        "latitude": 17.03622,
        "longitude": 80.39509
      },
      {
        "latitude": 17.02646,
        "longitude": 80.40639
      },
      {
        "latitude": 17.01575,
        "longitude": 80.40599
      },
      {
        "latitude": 17.00845,
        "longitude": 80.38676
      },
      {
        "latitude": 16.97592,
        "longitude": 80.36354
      },
      {
        "latitude": 16.95547,
        "longitude": 80.44756
      },
      {
        "latitude": 16.92731,
        "longitude": 80.49273
      },
      {
        "latitude": 16.9546,
        "longitude": 80.4964
      },
      {
        "latitude": 16.94793,
        "longitude": 80.52569
      },
      {
        "latitude": 16.96177,
        "longitude": 80.53315
      },
      {
        "latitude": 16.91888,
        "longitude": 80.60148
      },
      {
        "latitude": 16.90374,
        "longitude": 80.58599
      },
      {
        "latitude": 16.88497,
        "longitude": 80.59518
      },
      {
        "latitude": 16.86967,
        "longitude": 80.56805
      },
      {
        "latitude": 16.83309,
        "longitude": 80.56248
      },
      {
        "latitude": 16.79368,
        "longitude": 80.61166
      },
      {
        "latitude": 16.79257,
        "longitude": 80.59607
      },
      {
        "latitude": 16.7686,
        "longitude": 80.56916
      },
      {
        "latitude": 16.77563,
        "longitude": 80.51535
      },
      {
        "latitude": 16.79493,
        "longitude": 80.46404
      },
      {
        "latitude": 16.82015,
        "longitude": 80.46404
      },
      {
        "latitude": 16.83805,
        "longitude": 80.428
      },
      {
        "latitude": 16.84983,
        "longitude": 80.42625
      },
      {
        "latitude": 16.8654,
        "longitude": 80.38265
      },
      {
        "latitude": 16.85303,
        "longitude": 80.37821
      },
      {
        "latitude": 16.84699,
        "longitude": 80.40761
      },
      {
        "latitude": 16.83248,
        "longitude": 80.40369
      },
      {
        "latitude": 16.82541,
        "longitude": 80.38521
      },
      {
        "latitude": 16.81616,
        "longitude": 80.38115
      },
      {
        "latitude": 16.82856,
        "longitude": 80.37317
      },
      {
        "latitude": 16.84147,
        "longitude": 80.37944
      },
      {
        "latitude": 16.84084,
        "longitude": 80.37192
      },
      {
        "latitude": 16.85208,
        "longitude": 80.37289
      },
      {
        "latitude": 16.86035,
        "longitude": 80.34027
      },
      {
        "latitude": 16.87444,
        "longitude": 80.34374
      },
      {
        "latitude": 16.87942,
        "longitude": 80.3213
      },
      {
        "latitude": 16.9037,
        "longitude": 80.32415
      },
      {
        "latitude": 16.91741,
        "longitude": 80.31195
      },
      {
        "latitude": 16.94846,
        "longitude": 80.31537
      },
      {
        "latitude": 16.95416,
        "longitude": 80.30267
      },
      {
        "latitude": 16.97355,
        "longitude": 80.30663
      },
      {
        "latitude": 16.97758,
        "longitude": 80.29196
      },
      {
        "latitude": 16.99614,
        "longitude": 80.29323
      },
      {
        "latitude": 17.00812,
        "longitude": 80.28093
      },
      {
        "latitude": 16.99758,
        "longitude": 80.26433
      },
      {
        "latitude": 17.00303,
        "longitude": 80.2395
      },
      {
        "latitude": 17.01581,
        "longitude": 80.22526
      },
      {
        "latitude": 17.00879,
        "longitude": 80.22098
      },
      {
        "latitude": 17.01174,
        "longitude": 80.20796
      },
      {
        "latitude": 17.02732,
        "longitude": 80.19782
      },
      {
        "latitude": 17.039,
        "longitude": 80.20363
      },
      {
        "latitude": 17.04403,
        "longitude": 80.1955
      },
      {
        "latitude": 17.0212,
        "longitude": 80.18638
      },
      {
        "latitude": 17.01655,
        "longitude": 80.16915
      },
      {
        "latitude": 17.00563,
        "longitude": 80.16656
      },
      {
        "latitude": 17.00748,
        "longitude": 80.15271
      },
      {
        "latitude": 16.99056,
        "longitude": 80.14203
      },
      {
        "latitude": 16.99,
        "longitude": 80.09715
      },
      {
        "latitude": 16.96827,
        "longitude": 80.09276
      },
      {
        "latitude": 16.9715,
        "longitude": 80.05661
      },
      {
        "latitude": 16.93669,
        "longitude": 80.0511
      },
      {
        "latitude": 16.91931,
        "longitude": 80.04061
      },
      {
        "latitude": 16.91694,
        "longitude": 80.01716
      },
      {
        "latitude": 16.87022,
        "longitude": 80.00223
      }
    ],
    "polygons": [
      [
        {
          "latitude": 16.87022,
          "longitude": 80.00223
        },
        {
          "latitude": 16.8535,
          "longitude": 80.01818
        },
        {
          "latitude": 16.85298,
          "longitude": 80.04654
        },
        {
          "latitude": 16.83227,
          "longitude": 80.04868
        },
        {
          "latitude": 16.81882,
          "longitude": 80.0712
        },
        {
          "latitude": 16.82404,
          "longitude": 80.11158
        },
        {
          "latitude": 16.80906,
          "longitude": 80.12535
        },
        {
          "latitude": 16.73461,
          "longitude": 80.14371
        },
        {
          "latitude": 16.70936,
          "longitude": 80.14019
        },
        {
          "latitude": 16.68792,
          "longitude": 80.14834
        },
        {
          "latitude": 16.65913,
          "longitude": 80.13613
        },
        {
          "latitude": 16.64921,
          "longitude": 80.14247
        },
        {
          "latitude": 16.64274,
          "longitude": 80.18023
        },
        {
          "latitude": 16.61105,
          "longitude": 80.2523
        },
        {
          "latitude": 16.61166,
          "longitude": 80.33089
        },
        {
          "latitude": 16.58759,
          "longitude": 80.36726
        },
        {
          "latitude": 16.59068,
          "longitude": 80.46708
        },
        {
          "latitude": 16.56267,
          "longitude": 80.52885
        },
        {
          "latitude": 16.54167,
          "longitude": 80.55442
        },
        {
          "latitude": 16.53314,
          "longitude": 80.55489
        },
        {
          "latitude": 16.47999,
          "longitude": 80.65259
        },
        {
          "latitude": 16.4883,
          "longitude": 80.66278
        },
        {
          "latitude": 16.48206,
          "longitude": 80.67688
        },
        {
          "latitude": 16.48893,
          "longitude": 80.67146
        },
        {
          "latitude": 16.51539,
          "longitude": 80.68324
        },
        {
          "latitude": 16.50812,
          "longitude": 80.71169
        },
        {
          "latitude": 16.50014,
          "longitude": 80.71307
        },
        {
          "latitude": 16.48721,
          "longitude": 80.74432
        },
        {
          "latitude": 16.51513,
          "longitude": 80.76496
        },
        {
          "latitude": 16.5222,
          "longitude": 80.72774
        },
        {
          "latitude": 16.54248,
          "longitude": 80.68619
        },
        {
          "latitude": 16.58551,
          "longitude": 80.70164
        },
        {
          "latitude": 16.60533,
          "longitude": 80.69439
        },
        {
          "latitude": 16.62652,
          "longitude": 80.69708
        },
        {
          "latitude": 16.63855,
          "longitude": 80.68602
        },
        {
          "latitude": 16.66656,
          "longitude": 80.68707
        },
        {
          "latitude": 16.80991,
          "longitude": 80.77652
        },
        {
          "latitude": 16.85053,
          "longitude": 80.77204
        },
        {
          "latitude": 16.85942,
          "longitude": 80.79438
        },
        {
          "latitude": 16.88207,
          "longitude": 80.79761
        },
        {
          "latitude": 16.87897,
          "longitude": 80.82598
        },
        {
          "latitude": 16.88633,
          "longitude": 80.84497
        },
        {
          "latitude": 16.90853,
          "longitude": 80.8535
        },
        {
          "latitude": 16.92769,
          "longitude": 80.8238
        },
        {
          "latitude": 16.98978,
          "longitude": 80.82563
        },
        {
          "latitude": 17.00074,
          "longitude": 80.79918
        },
        {
          "latitude": 17.02182,
          "longitude": 80.77949
        },
        {
          "latitude": 17.06068,
          "longitude": 80.79927
        },
        {
          "latitude": 17.08211,
          "longitude": 80.70918
        },
        {
          "latitude": 17.06731,
          "longitude": 80.67281
        },
        {
          "latitude": 17.07036,
          "longitude": 80.65141
        },
        {
          "latitude": 17.08741,
          "longitude": 80.65498
        },
        {
          "latitude": 17.10158,
          "longitude": 80.66986
        },
        {
          "latitude": 17.11638,
          "longitude": 80.64066
        },
        {
          "latitude": 17.1242,
          "longitude": 80.64361
        },
        {
          "latitude": 17.12826,
          "longitude": 80.61929
        },
        {
          "latitude": 17.15324,
          "longitude": 80.57912
        },
        {
          "latitude": 17.13253,
          "longitude": 80.56146
        },
        {
          "latitude": 17.11756,
          "longitude": 80.52757
        },
        {
          "latitude": 17.12144,
          "longitude": 80.51342
        },
        {
          "latitude": 17.08991,
          "longitude": 80.50273
        },
        {
          "latitude": 17.08537,
          "longitude": 80.50986
        },
        {
          "latitude": 17.06648,
          "longitude": 80.50373
        },
        {
          "latitude": 17.05183,
          "longitude": 80.49041
        },
        {
          "latitude": 17.05007,
          "longitude": 80.47062
        },
        {
          "latitude": 17.0304,
          "longitude": 80.46379
        },
        {
          "latitude": 17.03746,
          "longitude": 80.43817
        },
        {
          "latitude": 17.07293,
          "longitude": 80.41707
        },
        {
          "latitude": 17.09207,
          "longitude": 80.4186
        },
        {
          "latitude": 17.09137,
          "longitude": 80.4083
        },
        {
          "latitude": 17.06867,
          "longitude": 80.38446
        },
        {
          "latitude": 17.05286,
          "longitude": 80.3974
        },
        {
          "latitude": 17.03622,
          "longitude": 80.39509
        },
        {
          "latitude": 17.02646,
          "longitude": 80.40639
        },
        {
          "latitude": 17.01575,
          "longitude": 80.40599
        },
        {
          "latitude": 17.00845,
          "longitude": 80.38676
        },
        {
          "latitude": 16.97592,
          "longitude": 80.36354
        },
        {
          "latitude": 16.95547,
          "longitude": 80.44756
        },
        {
          "latitude": 16.92731,
          "longitude": 80.49273
        },
        {
          "latitude": 16.9546,
          "longitude": 80.4964
        },
        {
          "latitude": 16.94793,
          "longitude": 80.52569
        },
        {
          "latitude": 16.96177,
          "longitude": 80.53315
        },
        {
          "latitude": 16.91888,
          "longitude": 80.60148
        },
        {
          "latitude": 16.90374,
          "longitude": 80.58599
        },
        {
          "latitude": 16.88497,
          "longitude": 80.59518
        },
        {
          "latitude": 16.86967,
          "longitude": 80.56805
        },
        {
          "latitude": 16.83309,
          "longitude": 80.56248
        },
        {
          "latitude": 16.79368,
          "longitude": 80.61166
        },
        {
          "latitude": 16.79257,
          "longitude": 80.59607
        },
        {
          "latitude": 16.7686,
          "longitude": 80.56916
        },
        {
          "latitude": 16.77563,
          "longitude": 80.51535
        },
        {
          "latitude": 16.79493,
          "longitude": 80.46404
        },
        {
          "latitude": 16.82015,
          "longitude": 80.46404
        },
        {
          "latitude": 16.83805,
          "longitude": 80.428
        },
        {
          "latitude": 16.84983,
          "longitude": 80.42625
        },
        {
          "latitude": 16.8654,
          "longitude": 80.38265
        },
        {
          "latitude": 16.85303,
          "longitude": 80.37821
        },
        {
          "latitude": 16.84699,
          "longitude": 80.40761
        },
        {
          "latitude": 16.83248,
          "longitude": 80.40369
        },
        {
          "latitude": 16.82541,
          "longitude": 80.38521
        },
        {
          "latitude": 16.81616,
          "longitude": 80.38115
        },
        {
          "latitude": 16.82856,
          "longitude": 80.37317
        },
        {
          "latitude": 16.84147,
          "longitude": 80.37944
        },
        {
          "latitude": 16.84084,
          "longitude": 80.37192
        },
        {
          "latitude": 16.85208,
          "longitude": 80.37289
        },
        {
          "latitude": 16.86035,
          "longitude": 80.34027
        },
        {
          "latitude": 16.87444,
          "longitude": 80.34374
        },
        {
          "latitude": 16.87942,
          "longitude": 80.3213
        },
        {
          "latitude": 16.9037,
          "longitude": 80.32415
        },
        {
          "latitude": 16.91741,
          "longitude": 80.31195
        },
        {
          "latitude": 16.94846,
          "longitude": 80.31537
        },
        {
          "latitude": 16.95416,
          "longitude": 80.30267
        },
        {
          "latitude": 16.97355,
          "longitude": 80.30663
        },
        {
          "latitude": 16.97758,
          "longitude": 80.29196
        },
        {
          "latitude": 16.99614,
          "longitude": 80.29323
        },
        {
          "latitude": 17.00812,
          "longitude": 80.28093
        },
        {
          "latitude": 16.99758,
          "longitude": 80.26433
        },
        {
          "latitude": 17.00303,
          "longitude": 80.2395
        },
        {
          "latitude": 17.01581,
          "longitude": 80.22526
        },
        {
          "latitude": 17.00879,
          "longitude": 80.22098
        },
        {
          "latitude": 17.01174,
          "longitude": 80.20796
        },
        {
          "latitude": 17.02732,
          "longitude": 80.19782
        },
        {
          "latitude": 17.039,
          "longitude": 80.20363
        },
        {
          "latitude": 17.04403,
          "longitude": 80.1955
        },
        {
          "latitude": 17.0212,
          "longitude": 80.18638
        },
        {
          "latitude": 17.01655,
          "longitude": 80.16915
        },
        {
          "latitude": 17.00563,
          "longitude": 80.16656
        },
        {
          "latitude": 17.00748,
          "longitude": 80.15271
        },
        {
          "latitude": 16.99056,
          "longitude": 80.14203
        },
        {
          "latitude": 16.99,
          "longitude": 80.09715
        },
        {
          "latitude": 16.96827,
          "longitude": 80.09276
        },
        {
          "latitude": 16.9715,
          "longitude": 80.05661
        },
        {
          "latitude": 16.93669,
          "longitude": 80.0511
        },
        {
          "latitude": 16.91931,
          "longitude": 80.04061
        },
        {
          "latitude": 16.91694,
          "longitude": 80.01716
        },
        {
          "latitude": 16.87022,
          "longitude": 80.00223
        }
      ]
    ]
  },
  {
    "id": "palnadu",
    "name": "Palnadu",
    "headquarters": "Narasaraopet",
    "center": {
      "latitude": 16.3621,
      "longitude": 79.8109
    },
    "region": "Coastal Andhra",
    "polygon": [
      {
        "latitude": 16.38485,
        "longitude": 79.20769
      },
      {
        "latitude": 16.35502,
        "longitude": 79.21129
      },
      {
        "latitude": 16.335,
        "longitude": 79.23426
      },
      {
        "latitude": 16.23584,
        "longitude": 79.22208
      },
      {
        "latitude": 16.22768,
        "longitude": 79.21463
      },
      {
        "latitude": 16.16397,
        "longitude": 79.22063
      },
      {
        "latitude": 16.19477,
        "longitude": 79.25761
      },
      {
        "latitude": 16.22943,
        "longitude": 79.32449
      },
      {
        "latitude": 16.23379,
        "longitude": 79.36994
      },
      {
        "latitude": 16.30385,
        "longitude": 79.44644
      },
      {
        "latitude": 16.29164,
        "longitude": 79.47222
      },
      {
        "latitude": 16.29152,
        "longitude": 79.49615
      },
      {
        "latitude": 16.30703,
        "longitude": 79.53536
      },
      {
        "latitude": 16.28457,
        "longitude": 79.54996
      },
      {
        "latitude": 16.27749,
        "longitude": 79.566
      },
      {
        "latitude": 16.19433,
        "longitude": 79.55882
      },
      {
        "latitude": 16.16413,
        "longitude": 79.53605
      },
      {
        "latitude": 16.13346,
        "longitude": 79.53791
      },
      {
        "latitude": 16.10078,
        "longitude": 79.55593
      },
      {
        "latitude": 16.0666,
        "longitude": 79.54757
      },
      {
        "latitude": 16.03294,
        "longitude": 79.56374
      },
      {
        "latitude": 16.01226,
        "longitude": 79.5628
      },
      {
        "latitude": 16.00507,
        "longitude": 79.57232
      },
      {
        "latitude": 15.94848,
        "longitude": 79.55885
      },
      {
        "latitude": 15.93728,
        "longitude": 79.57204
      },
      {
        "latitude": 15.94084,
        "longitude": 79.59028
      },
      {
        "latitude": 15.93327,
        "longitude": 79.6145
      },
      {
        "latitude": 15.92236,
        "longitude": 79.6118
      },
      {
        "latitude": 15.9071,
        "longitude": 79.63551
      },
      {
        "latitude": 15.921,
        "longitude": 79.65547
      },
      {
        "latitude": 15.91761,
        "longitude": 79.66277
      },
      {
        "latitude": 15.89819,
        "longitude": 79.69326
      },
      {
        "latitude": 15.87604,
        "longitude": 79.68898
      },
      {
        "latitude": 15.86264,
        "longitude": 79.71782
      },
      {
        "latitude": 15.83704,
        "longitude": 79.71
      },
      {
        "latitude": 15.82335,
        "longitude": 79.76369
      },
      {
        "latitude": 15.82524,
        "longitude": 79.77096
      },
      {
        "latitude": 15.84203,
        "longitude": 79.77299
      },
      {
        "latitude": 15.84736,
        "longitude": 79.75374
      },
      {
        "latitude": 15.8592,
        "longitude": 79.74708
      },
      {
        "latitude": 15.89955,
        "longitude": 79.75501
      },
      {
        "latitude": 15.91661,
        "longitude": 79.78466
      },
      {
        "latitude": 15.9415,
        "longitude": 79.79146
      },
      {
        "latitude": 15.92875,
        "longitude": 79.84893
      },
      {
        "latitude": 15.92289,
        "longitude": 79.84679
      },
      {
        "latitude": 15.91689,
        "longitude": 79.86974
      },
      {
        "latitude": 15.94048,
        "longitude": 79.88109
      },
      {
        "latitude": 15.93931,
        "longitude": 79.89397
      },
      {
        "latitude": 15.94697,
        "longitude": 79.89651
      },
      {
        "latitude": 15.94248,
        "longitude": 79.90311
      },
      {
        "latitude": 15.95399,
        "longitude": 79.9082
      },
      {
        "latitude": 15.96746,
        "longitude": 79.91174
      },
      {
        "latitude": 15.97158,
        "longitude": 79.89805
      },
      {
        "latitude": 15.98335,
        "longitude": 79.9034
      },
      {
        "latitude": 15.9872,
        "longitude": 79.89106
      },
      {
        "latitude": 15.99535,
        "longitude": 79.89098
      },
      {
        "latitude": 15.99977,
        "longitude": 79.87926
      },
      {
        "latitude": 15.99363,
        "longitude": 79.86271
      },
      {
        "latitude": 16.0306,
        "longitude": 79.86957
      },
      {
        "latitude": 16.04734,
        "longitude": 79.91682
      },
      {
        "latitude": 16.0603,
        "longitude": 79.92022
      },
      {
        "latitude": 16.07507,
        "longitude": 79.9155
      },
      {
        "latitude": 16.0774,
        "longitude": 79.89521
      },
      {
        "latitude": 16.08747,
        "longitude": 79.89489
      },
      {
        "latitude": 16.0861,
        "longitude": 79.88331
      },
      {
        "latitude": 16.09649,
        "longitude": 79.86819
      },
      {
        "latitude": 16.12887,
        "longitude": 79.87492
      },
      {
        "latitude": 16.13516,
        "longitude": 79.86592
      },
      {
        "latitude": 16.15467,
        "longitude": 79.87841
      },
      {
        "latitude": 16.13215,
        "longitude": 79.93267
      },
      {
        "latitude": 16.14365,
        "longitude": 79.94867
      },
      {
        "latitude": 16.1637,
        "longitude": 79.95269
      },
      {
        "latitude": 16.1544,
        "longitude": 79.97215
      },
      {
        "latitude": 16.14577,
        "longitude": 79.97398
      },
      {
        "latitude": 16.14017,
        "longitude": 80.00057
      },
      {
        "latitude": 16.11936,
        "longitude": 80.01012
      },
      {
        "latitude": 16.11483,
        "longitude": 80.01996
      },
      {
        "latitude": 16.13105,
        "longitude": 80.05016
      },
      {
        "latitude": 16.09269,
        "longitude": 80.04038
      },
      {
        "latitude": 16.08554,
        "longitude": 80.04722
      },
      {
        "latitude": 16.0923,
        "longitude": 80.07404
      },
      {
        "latitude": 16.07613,
        "longitude": 80.07054
      },
      {
        "latitude": 16.06301,
        "longitude": 80.08228
      },
      {
        "latitude": 16.02086,
        "longitude": 80.08607
      },
      {
        "latitude": 16.01133,
        "longitude": 80.09738
      },
      {
        "latitude": 16.02069,
        "longitude": 80.11995
      },
      {
        "latitude": 16.01585,
        "longitude": 80.13957
      },
      {
        "latitude": 16.01996,
        "longitude": 80.13283
      },
      {
        "latitude": 16.04573,
        "longitude": 80.13719
      },
      {
        "latitude": 16.03461,
        "longitude": 80.18216
      },
      {
        "latitude": 16.02587,
        "longitude": 80.18444
      },
      {
        "latitude": 16.0386,
        "longitude": 80.1897
      },
      {
        "latitude": 16.03221,
        "longitude": 80.22969
      },
      {
        "latitude": 16.08779,
        "longitude": 80.22642
      },
      {
        "latitude": 16.08356,
        "longitude": 80.23475
      },
      {
        "latitude": 16.09778,
        "longitude": 80.25662
      },
      {
        "latitude": 16.09357,
        "longitude": 80.28455
      },
      {
        "latitude": 16.10344,
        "longitude": 80.28978
      },
      {
        "latitude": 16.12554,
        "longitude": 80.26603
      },
      {
        "latitude": 16.1428,
        "longitude": 80.27862
      },
      {
        "latitude": 16.1559,
        "longitude": 80.27127
      },
      {
        "latitude": 16.16417,
        "longitude": 80.29142
      },
      {
        "latitude": 16.18955,
        "longitude": 80.29646
      },
      {
        "latitude": 16.19941,
        "longitude": 80.27459
      },
      {
        "latitude": 16.20654,
        "longitude": 80.27625
      },
      {
        "latitude": 16.21783,
        "longitude": 80.2801
      },
      {
        "latitude": 16.21538,
        "longitude": 80.28921
      },
      {
        "latitude": 16.27178,
        "longitude": 80.33954
      },
      {
        "latitude": 16.29988,
        "longitude": 80.35202
      },
      {
        "latitude": 16.31511,
        "longitude": 80.34904
      },
      {
        "latitude": 16.29996,
        "longitude": 80.34121
      },
      {
        "latitude": 16.3155,
        "longitude": 80.32969
      },
      {
        "latitude": 16.30019,
        "longitude": 80.3121
      },
      {
        "latitude": 16.2861,
        "longitude": 80.31041
      },
      {
        "latitude": 16.26606,
        "longitude": 80.28013
      },
      {
        "latitude": 16.27383,
        "longitude": 80.24464
      },
      {
        "latitude": 16.24635,
        "longitude": 80.23076
      },
      {
        "latitude": 16.24957,
        "longitude": 80.21883
      },
      {
        "latitude": 16.25804,
        "longitude": 80.22018
      },
      {
        "latitude": 16.26805,
        "longitude": 80.19213
      },
      {
        "latitude": 16.27668,
        "longitude": 80.19067
      },
      {
        "latitude": 16.27852,
        "longitude": 80.17666
      },
      {
        "latitude": 16.26353,
        "longitude": 80.17834
      },
      {
        "latitude": 16.27029,
        "longitude": 80.16336
      },
      {
        "latitude": 16.25858,
        "longitude": 80.15243
      },
      {
        "latitude": 16.27033,
        "longitude": 80.12734
      },
      {
        "latitude": 16.30474,
        "longitude": 80.12257
      },
      {
        "latitude": 16.31036,
        "longitude": 80.12472
      },
      {
        "latitude": 16.30353,
        "longitude": 80.15742
      },
      {
        "latitude": 16.32621,
        "longitude": 80.16029
      },
      {
        "latitude": 16.3237,
        "longitude": 80.17486
      },
      {
        "latitude": 16.35889,
        "longitude": 80.18152
      },
      {
        "latitude": 16.33909,
        "longitude": 80.21741
      },
      {
        "latitude": 16.3659,
        "longitude": 80.23102
      },
      {
        "latitude": 16.36972,
        "longitude": 80.2254
      },
      {
        "latitude": 16.38244,
        "longitude": 80.23023
      },
      {
        "latitude": 16.39485,
        "longitude": 80.21986
      },
      {
        "latitude": 16.41589,
        "longitude": 80.23946
      },
      {
        "latitude": 16.40996,
        "longitude": 80.26968
      },
      {
        "latitude": 16.42922,
        "longitude": 80.28064
      },
      {
        "latitude": 16.42568,
        "longitude": 80.30331
      },
      {
        "latitude": 16.45432,
        "longitude": 80.30874
      },
      {
        "latitude": 16.46319,
        "longitude": 80.3179
      },
      {
        "latitude": 16.46645,
        "longitude": 80.34093
      },
      {
        "latitude": 16.45856,
        "longitude": 80.36744
      },
      {
        "latitude": 16.46427,
        "longitude": 80.3781
      },
      {
        "latitude": 16.47833,
        "longitude": 80.38121
      },
      {
        "latitude": 16.47655,
        "longitude": 80.42635
      },
      {
        "latitude": 16.5057,
        "longitude": 80.4197
      },
      {
        "latitude": 16.50765,
        "longitude": 80.40728
      },
      {
        "latitude": 16.52559,
        "longitude": 80.40673
      },
      {
        "latitude": 16.55862,
        "longitude": 80.42798
      },
      {
        "latitude": 16.58789,
        "longitude": 80.42732
      },
      {
        "latitude": 16.58759,
        "longitude": 80.36726
      },
      {
        "latitude": 16.61166,
        "longitude": 80.33089
      },
      {
        "latitude": 16.61105,
        "longitude": 80.2523
      },
      {
        "latitude": 16.64274,
        "longitude": 80.18023
      },
      {
        "latitude": 16.6502,
        "longitude": 80.14096
      },
      {
        "latitude": 16.66879,
        "longitude": 80.13658
      },
      {
        "latitude": 16.68846,
        "longitude": 80.1483
      },
      {
        "latitude": 16.79542,
        "longitude": 80.13074
      },
      {
        "latitude": 16.82066,
        "longitude": 80.1172
      },
      {
        "latitude": 16.82356,
        "longitude": 80.103
      },
      {
        "latitude": 16.81819,
        "longitude": 80.07265
      },
      {
        "latitude": 16.74157,
        "longitude": 80.0527
      },
      {
        "latitude": 16.7144,
        "longitude": 80.03014
      },
      {
        "latitude": 16.70218,
        "longitude": 79.99769
      },
      {
        "latitude": 16.64624,
        "longitude": 79.96585
      },
      {
        "latitude": 16.63499,
        "longitude": 79.94762
      },
      {
        "latitude": 16.63536,
        "longitude": 79.90741
      },
      {
        "latitude": 16.65275,
        "longitude": 79.89215
      },
      {
        "latitude": 16.69756,
        "longitude": 79.8774
      },
      {
        "latitude": 16.70596,
        "longitude": 79.85041
      },
      {
        "latitude": 16.69208,
        "longitude": 79.81709
      },
      {
        "latitude": 16.72581,
        "longitude": 79.79221
      },
      {
        "latitude": 16.73151,
        "longitude": 79.7761
      },
      {
        "latitude": 16.71883,
        "longitude": 79.74323
      },
      {
        "latitude": 16.69169,
        "longitude": 79.7243
      },
      {
        "latitude": 16.6944,
        "longitude": 79.68057
      },
      {
        "latitude": 16.68646,
        "longitude": 79.66129
      },
      {
        "latitude": 16.66103,
        "longitude": 79.6351
      },
      {
        "latitude": 16.67342,
        "longitude": 79.59843
      },
      {
        "latitude": 16.64918,
        "longitude": 79.5744
      },
      {
        "latitude": 16.63386,
        "longitude": 79.54429
      },
      {
        "latitude": 16.63658,
        "longitude": 79.50313
      },
      {
        "latitude": 16.62357,
        "longitude": 79.4842
      },
      {
        "latitude": 16.62014,
        "longitude": 79.44778
      },
      {
        "latitude": 16.59134,
        "longitude": 79.43328
      },
      {
        "latitude": 16.58004,
        "longitude": 79.4175
      },
      {
        "latitude": 16.583,
        "longitude": 79.3405
      },
      {
        "latitude": 16.5618,
        "longitude": 79.28927
      },
      {
        "latitude": 16.56721,
        "longitude": 79.25867
      },
      {
        "latitude": 16.53463,
        "longitude": 79.24799
      },
      {
        "latitude": 16.52532,
        "longitude": 79.22832
      },
      {
        "latitude": 16.50046,
        "longitude": 79.21674
      },
      {
        "latitude": 16.48213,
        "longitude": 79.21514
      },
      {
        "latitude": 16.45975,
        "longitude": 79.23347
      },
      {
        "latitude": 16.44896,
        "longitude": 79.21195
      },
      {
        "latitude": 16.38485,
        "longitude": 79.20769
      }
    ],
    "polygons": [
      [
        {
          "latitude": 16.38485,
          "longitude": 79.20769
        },
        {
          "latitude": 16.35502,
          "longitude": 79.21129
        },
        {
          "latitude": 16.335,
          "longitude": 79.23426
        },
        {
          "latitude": 16.23584,
          "longitude": 79.22208
        },
        {
          "latitude": 16.22768,
          "longitude": 79.21463
        },
        {
          "latitude": 16.16397,
          "longitude": 79.22063
        },
        {
          "latitude": 16.19477,
          "longitude": 79.25761
        },
        {
          "latitude": 16.22943,
          "longitude": 79.32449
        },
        {
          "latitude": 16.23379,
          "longitude": 79.36994
        },
        {
          "latitude": 16.30385,
          "longitude": 79.44644
        },
        {
          "latitude": 16.29164,
          "longitude": 79.47222
        },
        {
          "latitude": 16.29152,
          "longitude": 79.49615
        },
        {
          "latitude": 16.30703,
          "longitude": 79.53536
        },
        {
          "latitude": 16.28457,
          "longitude": 79.54996
        },
        {
          "latitude": 16.27749,
          "longitude": 79.566
        },
        {
          "latitude": 16.19433,
          "longitude": 79.55882
        },
        {
          "latitude": 16.16413,
          "longitude": 79.53605
        },
        {
          "latitude": 16.13346,
          "longitude": 79.53791
        },
        {
          "latitude": 16.10078,
          "longitude": 79.55593
        },
        {
          "latitude": 16.0666,
          "longitude": 79.54757
        },
        {
          "latitude": 16.03294,
          "longitude": 79.56374
        },
        {
          "latitude": 16.01226,
          "longitude": 79.5628
        },
        {
          "latitude": 16.00507,
          "longitude": 79.57232
        },
        {
          "latitude": 15.94848,
          "longitude": 79.55885
        },
        {
          "latitude": 15.93728,
          "longitude": 79.57204
        },
        {
          "latitude": 15.94084,
          "longitude": 79.59028
        },
        {
          "latitude": 15.93327,
          "longitude": 79.6145
        },
        {
          "latitude": 15.92236,
          "longitude": 79.6118
        },
        {
          "latitude": 15.9071,
          "longitude": 79.63551
        },
        {
          "latitude": 15.921,
          "longitude": 79.65547
        },
        {
          "latitude": 15.91761,
          "longitude": 79.66277
        },
        {
          "latitude": 15.89819,
          "longitude": 79.69326
        },
        {
          "latitude": 15.87604,
          "longitude": 79.68898
        },
        {
          "latitude": 15.86264,
          "longitude": 79.71782
        },
        {
          "latitude": 15.83704,
          "longitude": 79.71
        },
        {
          "latitude": 15.82335,
          "longitude": 79.76369
        },
        {
          "latitude": 15.82524,
          "longitude": 79.77096
        },
        {
          "latitude": 15.84203,
          "longitude": 79.77299
        },
        {
          "latitude": 15.84736,
          "longitude": 79.75374
        },
        {
          "latitude": 15.8592,
          "longitude": 79.74708
        },
        {
          "latitude": 15.89955,
          "longitude": 79.75501
        },
        {
          "latitude": 15.91661,
          "longitude": 79.78466
        },
        {
          "latitude": 15.9415,
          "longitude": 79.79146
        },
        {
          "latitude": 15.92875,
          "longitude": 79.84893
        },
        {
          "latitude": 15.92289,
          "longitude": 79.84679
        },
        {
          "latitude": 15.91689,
          "longitude": 79.86974
        },
        {
          "latitude": 15.94048,
          "longitude": 79.88109
        },
        {
          "latitude": 15.93931,
          "longitude": 79.89397
        },
        {
          "latitude": 15.94697,
          "longitude": 79.89651
        },
        {
          "latitude": 15.94248,
          "longitude": 79.90311
        },
        {
          "latitude": 15.95399,
          "longitude": 79.9082
        },
        {
          "latitude": 15.96746,
          "longitude": 79.91174
        },
        {
          "latitude": 15.97158,
          "longitude": 79.89805
        },
        {
          "latitude": 15.98335,
          "longitude": 79.9034
        },
        {
          "latitude": 15.9872,
          "longitude": 79.89106
        },
        {
          "latitude": 15.99535,
          "longitude": 79.89098
        },
        {
          "latitude": 15.99977,
          "longitude": 79.87926
        },
        {
          "latitude": 15.99363,
          "longitude": 79.86271
        },
        {
          "latitude": 16.0306,
          "longitude": 79.86957
        },
        {
          "latitude": 16.04734,
          "longitude": 79.91682
        },
        {
          "latitude": 16.0603,
          "longitude": 79.92022
        },
        {
          "latitude": 16.07507,
          "longitude": 79.9155
        },
        {
          "latitude": 16.0774,
          "longitude": 79.89521
        },
        {
          "latitude": 16.08747,
          "longitude": 79.89489
        },
        {
          "latitude": 16.0861,
          "longitude": 79.88331
        },
        {
          "latitude": 16.09649,
          "longitude": 79.86819
        },
        {
          "latitude": 16.12887,
          "longitude": 79.87492
        },
        {
          "latitude": 16.13516,
          "longitude": 79.86592
        },
        {
          "latitude": 16.15467,
          "longitude": 79.87841
        },
        {
          "latitude": 16.13215,
          "longitude": 79.93267
        },
        {
          "latitude": 16.14365,
          "longitude": 79.94867
        },
        {
          "latitude": 16.1637,
          "longitude": 79.95269
        },
        {
          "latitude": 16.1544,
          "longitude": 79.97215
        },
        {
          "latitude": 16.14577,
          "longitude": 79.97398
        },
        {
          "latitude": 16.14017,
          "longitude": 80.00057
        },
        {
          "latitude": 16.11936,
          "longitude": 80.01012
        },
        {
          "latitude": 16.11483,
          "longitude": 80.01996
        },
        {
          "latitude": 16.13105,
          "longitude": 80.05016
        },
        {
          "latitude": 16.09269,
          "longitude": 80.04038
        },
        {
          "latitude": 16.08554,
          "longitude": 80.04722
        },
        {
          "latitude": 16.0923,
          "longitude": 80.07404
        },
        {
          "latitude": 16.07613,
          "longitude": 80.07054
        },
        {
          "latitude": 16.06301,
          "longitude": 80.08228
        },
        {
          "latitude": 16.02086,
          "longitude": 80.08607
        },
        {
          "latitude": 16.01133,
          "longitude": 80.09738
        },
        {
          "latitude": 16.02069,
          "longitude": 80.11995
        },
        {
          "latitude": 16.01585,
          "longitude": 80.13957
        },
        {
          "latitude": 16.01996,
          "longitude": 80.13283
        },
        {
          "latitude": 16.04573,
          "longitude": 80.13719
        },
        {
          "latitude": 16.03461,
          "longitude": 80.18216
        },
        {
          "latitude": 16.02587,
          "longitude": 80.18444
        },
        {
          "latitude": 16.0386,
          "longitude": 80.1897
        },
        {
          "latitude": 16.03221,
          "longitude": 80.22969
        },
        {
          "latitude": 16.08779,
          "longitude": 80.22642
        },
        {
          "latitude": 16.08356,
          "longitude": 80.23475
        },
        {
          "latitude": 16.09778,
          "longitude": 80.25662
        },
        {
          "latitude": 16.09357,
          "longitude": 80.28455
        },
        {
          "latitude": 16.10344,
          "longitude": 80.28978
        },
        {
          "latitude": 16.12554,
          "longitude": 80.26603
        },
        {
          "latitude": 16.1428,
          "longitude": 80.27862
        },
        {
          "latitude": 16.1559,
          "longitude": 80.27127
        },
        {
          "latitude": 16.16417,
          "longitude": 80.29142
        },
        {
          "latitude": 16.18955,
          "longitude": 80.29646
        },
        {
          "latitude": 16.19941,
          "longitude": 80.27459
        },
        {
          "latitude": 16.20654,
          "longitude": 80.27625
        },
        {
          "latitude": 16.21783,
          "longitude": 80.2801
        },
        {
          "latitude": 16.21538,
          "longitude": 80.28921
        },
        {
          "latitude": 16.27178,
          "longitude": 80.33954
        },
        {
          "latitude": 16.29988,
          "longitude": 80.35202
        },
        {
          "latitude": 16.31511,
          "longitude": 80.34904
        },
        {
          "latitude": 16.29996,
          "longitude": 80.34121
        },
        {
          "latitude": 16.3155,
          "longitude": 80.32969
        },
        {
          "latitude": 16.30019,
          "longitude": 80.3121
        },
        {
          "latitude": 16.2861,
          "longitude": 80.31041
        },
        {
          "latitude": 16.26606,
          "longitude": 80.28013
        },
        {
          "latitude": 16.27383,
          "longitude": 80.24464
        },
        {
          "latitude": 16.24635,
          "longitude": 80.23076
        },
        {
          "latitude": 16.24957,
          "longitude": 80.21883
        },
        {
          "latitude": 16.25804,
          "longitude": 80.22018
        },
        {
          "latitude": 16.26805,
          "longitude": 80.19213
        },
        {
          "latitude": 16.27668,
          "longitude": 80.19067
        },
        {
          "latitude": 16.27852,
          "longitude": 80.17666
        },
        {
          "latitude": 16.26353,
          "longitude": 80.17834
        },
        {
          "latitude": 16.27029,
          "longitude": 80.16336
        },
        {
          "latitude": 16.25858,
          "longitude": 80.15243
        },
        {
          "latitude": 16.27033,
          "longitude": 80.12734
        },
        {
          "latitude": 16.30474,
          "longitude": 80.12257
        },
        {
          "latitude": 16.31036,
          "longitude": 80.12472
        },
        {
          "latitude": 16.30353,
          "longitude": 80.15742
        },
        {
          "latitude": 16.32621,
          "longitude": 80.16029
        },
        {
          "latitude": 16.3237,
          "longitude": 80.17486
        },
        {
          "latitude": 16.35889,
          "longitude": 80.18152
        },
        {
          "latitude": 16.33909,
          "longitude": 80.21741
        },
        {
          "latitude": 16.3659,
          "longitude": 80.23102
        },
        {
          "latitude": 16.36972,
          "longitude": 80.2254
        },
        {
          "latitude": 16.38244,
          "longitude": 80.23023
        },
        {
          "latitude": 16.39485,
          "longitude": 80.21986
        },
        {
          "latitude": 16.41589,
          "longitude": 80.23946
        },
        {
          "latitude": 16.40996,
          "longitude": 80.26968
        },
        {
          "latitude": 16.42922,
          "longitude": 80.28064
        },
        {
          "latitude": 16.42568,
          "longitude": 80.30331
        },
        {
          "latitude": 16.45432,
          "longitude": 80.30874
        },
        {
          "latitude": 16.46319,
          "longitude": 80.3179
        },
        {
          "latitude": 16.46645,
          "longitude": 80.34093
        },
        {
          "latitude": 16.45856,
          "longitude": 80.36744
        },
        {
          "latitude": 16.46427,
          "longitude": 80.3781
        },
        {
          "latitude": 16.47833,
          "longitude": 80.38121
        },
        {
          "latitude": 16.47655,
          "longitude": 80.42635
        },
        {
          "latitude": 16.5057,
          "longitude": 80.4197
        },
        {
          "latitude": 16.50765,
          "longitude": 80.40728
        },
        {
          "latitude": 16.52559,
          "longitude": 80.40673
        },
        {
          "latitude": 16.55862,
          "longitude": 80.42798
        },
        {
          "latitude": 16.58789,
          "longitude": 80.42732
        },
        {
          "latitude": 16.58759,
          "longitude": 80.36726
        },
        {
          "latitude": 16.61166,
          "longitude": 80.33089
        },
        {
          "latitude": 16.61105,
          "longitude": 80.2523
        },
        {
          "latitude": 16.64274,
          "longitude": 80.18023
        },
        {
          "latitude": 16.6502,
          "longitude": 80.14096
        },
        {
          "latitude": 16.66879,
          "longitude": 80.13658
        },
        {
          "latitude": 16.68846,
          "longitude": 80.1483
        },
        {
          "latitude": 16.79542,
          "longitude": 80.13074
        },
        {
          "latitude": 16.82066,
          "longitude": 80.1172
        },
        {
          "latitude": 16.82356,
          "longitude": 80.103
        },
        {
          "latitude": 16.81819,
          "longitude": 80.07265
        },
        {
          "latitude": 16.74157,
          "longitude": 80.0527
        },
        {
          "latitude": 16.7144,
          "longitude": 80.03014
        },
        {
          "latitude": 16.70218,
          "longitude": 79.99769
        },
        {
          "latitude": 16.64624,
          "longitude": 79.96585
        },
        {
          "latitude": 16.63499,
          "longitude": 79.94762
        },
        {
          "latitude": 16.63536,
          "longitude": 79.90741
        },
        {
          "latitude": 16.65275,
          "longitude": 79.89215
        },
        {
          "latitude": 16.69756,
          "longitude": 79.8774
        },
        {
          "latitude": 16.70596,
          "longitude": 79.85041
        },
        {
          "latitude": 16.69208,
          "longitude": 79.81709
        },
        {
          "latitude": 16.72581,
          "longitude": 79.79221
        },
        {
          "latitude": 16.73151,
          "longitude": 79.7761
        },
        {
          "latitude": 16.71883,
          "longitude": 79.74323
        },
        {
          "latitude": 16.69169,
          "longitude": 79.7243
        },
        {
          "latitude": 16.6944,
          "longitude": 79.68057
        },
        {
          "latitude": 16.68646,
          "longitude": 79.66129
        },
        {
          "latitude": 16.66103,
          "longitude": 79.6351
        },
        {
          "latitude": 16.67342,
          "longitude": 79.59843
        },
        {
          "latitude": 16.64918,
          "longitude": 79.5744
        },
        {
          "latitude": 16.63386,
          "longitude": 79.54429
        },
        {
          "latitude": 16.63658,
          "longitude": 79.50313
        },
        {
          "latitude": 16.62357,
          "longitude": 79.4842
        },
        {
          "latitude": 16.62014,
          "longitude": 79.44778
        },
        {
          "latitude": 16.59134,
          "longitude": 79.43328
        },
        {
          "latitude": 16.58004,
          "longitude": 79.4175
        },
        {
          "latitude": 16.583,
          "longitude": 79.3405
        },
        {
          "latitude": 16.5618,
          "longitude": 79.28927
        },
        {
          "latitude": 16.56721,
          "longitude": 79.25867
        },
        {
          "latitude": 16.53463,
          "longitude": 79.24799
        },
        {
          "latitude": 16.52532,
          "longitude": 79.22832
        },
        {
          "latitude": 16.50046,
          "longitude": 79.21674
        },
        {
          "latitude": 16.48213,
          "longitude": 79.21514
        },
        {
          "latitude": 16.45975,
          "longitude": 79.23347
        },
        {
          "latitude": 16.44896,
          "longitude": 79.21195
        },
        {
          "latitude": 16.38485,
          "longitude": 79.20769
        }
      ]
    ]
  },
  {
    "id": "parvathipuram_manyam",
    "name": "Parvathipuram Manyam",
    "headquarters": "Parvathipuram",
    "center": {
      "latitude": 18.7474,
      "longitude": 83.4826
    },
    "region": "North Coastal",
    "polygon": [
      {
        "latitude": 18.61637,
        "longitude": 82.99957
      },
      {
        "latitude": 18.58965,
        "longitude": 83.02378
      },
      {
        "latitude": 18.601,
        "longitude": 83.05266
      },
      {
        "latitude": 18.58811,
        "longitude": 83.05309
      },
      {
        "latitude": 18.58649,
        "longitude": 83.04009
      },
      {
        "latitude": 18.57358,
        "longitude": 83.02981
      },
      {
        "latitude": 18.54412,
        "longitude": 83.0454
      },
      {
        "latitude": 18.54205,
        "longitude": 83.06193
      },
      {
        "latitude": 18.55402,
        "longitude": 83.08094
      },
      {
        "latitude": 18.54728,
        "longitude": 83.09483
      },
      {
        "latitude": 18.49566,
        "longitude": 83.05521
      },
      {
        "latitude": 18.48561,
        "longitude": 83.05511
      },
      {
        "latitude": 18.45624,
        "longitude": 83.02095
      },
      {
        "latitude": 18.44079,
        "longitude": 83.04094
      },
      {
        "latitude": 18.42423,
        "longitude": 83.04253
      },
      {
        "latitude": 18.43668,
        "longitude": 83.05856
      },
      {
        "latitude": 18.43009,
        "longitude": 83.06731
      },
      {
        "latitude": 18.41937,
        "longitude": 83.05744
      },
      {
        "latitude": 18.40941,
        "longitude": 83.06425
      },
      {
        "latitude": 18.40243,
        "longitude": 83.08007
      },
      {
        "latitude": 18.41163,
        "longitude": 83.08843
      },
      {
        "latitude": 18.41201,
        "longitude": 83.10552
      },
      {
        "latitude": 18.3666,
        "longitude": 83.0763
      },
      {
        "latitude": 18.34602,
        "longitude": 83.08068
      },
      {
        "latitude": 18.34164,
        "longitude": 83.09359
      },
      {
        "latitude": 18.35208,
        "longitude": 83.09546
      },
      {
        "latitude": 18.35636,
        "longitude": 83.10604
      },
      {
        "latitude": 18.34771,
        "longitude": 83.11329
      },
      {
        "latitude": 18.34904,
        "longitude": 83.13441
      },
      {
        "latitude": 18.34028,
        "longitude": 83.15482
      },
      {
        "latitude": 18.37173,
        "longitude": 83.17581
      },
      {
        "latitude": 18.37098,
        "longitude": 83.18514
      },
      {
        "latitude": 18.38628,
        "longitude": 83.19855
      },
      {
        "latitude": 18.39816,
        "longitude": 83.22471
      },
      {
        "latitude": 18.40414,
        "longitude": 83.22236
      },
      {
        "latitude": 18.40285,
        "longitude": 83.20947
      },
      {
        "latitude": 18.44141,
        "longitude": 83.20209
      },
      {
        "latitude": 18.43878,
        "longitude": 83.21895
      },
      {
        "latitude": 18.45091,
        "longitude": 83.23107
      },
      {
        "latitude": 18.44625,
        "longitude": 83.24
      },
      {
        "latitude": 18.47127,
        "longitude": 83.26406
      },
      {
        "latitude": 18.47897,
        "longitude": 83.25402
      },
      {
        "latitude": 18.46506,
        "longitude": 83.24152
      },
      {
        "latitude": 18.48693,
        "longitude": 83.22956
      },
      {
        "latitude": 18.47956,
        "longitude": 83.22214
      },
      {
        "latitude": 18.4922,
        "longitude": 83.21895
      },
      {
        "latitude": 18.53913,
        "longitude": 83.25016
      },
      {
        "latitude": 18.54303,
        "longitude": 83.273
      },
      {
        "latitude": 18.55034,
        "longitude": 83.27573
      },
      {
        "latitude": 18.55896,
        "longitude": 83.2513
      },
      {
        "latitude": 18.58359,
        "longitude": 83.26128
      },
      {
        "latitude": 18.58802,
        "longitude": 83.24689
      },
      {
        "latitude": 18.62588,
        "longitude": 83.27989
      },
      {
        "latitude": 18.62722,
        "longitude": 83.28882
      },
      {
        "latitude": 18.61957,
        "longitude": 83.29139
      },
      {
        "latitude": 18.63123,
        "longitude": 83.31017
      },
      {
        "latitude": 18.65973,
        "longitude": 83.32436
      },
      {
        "latitude": 18.64128,
        "longitude": 83.34804
      },
      {
        "latitude": 18.60895,
        "longitude": 83.34652
      },
      {
        "latitude": 18.5989,
        "longitude": 83.36763
      },
      {
        "latitude": 18.61162,
        "longitude": 83.37787
      },
      {
        "latitude": 18.60487,
        "longitude": 83.40672
      },
      {
        "latitude": 18.62197,
        "longitude": 83.4142
      },
      {
        "latitude": 18.60441,
        "longitude": 83.42689
      },
      {
        "latitude": 18.62636,
        "longitude": 83.44453
      },
      {
        "latitude": 18.61706,
        "longitude": 83.47594
      },
      {
        "latitude": 18.59109,
        "longitude": 83.49492
      },
      {
        "latitude": 18.57309,
        "longitude": 83.48783
      },
      {
        "latitude": 18.5772,
        "longitude": 83.47392
      },
      {
        "latitude": 18.56551,
        "longitude": 83.47268
      },
      {
        "latitude": 18.55914,
        "longitude": 83.49714
      },
      {
        "latitude": 18.54382,
        "longitude": 83.49991
      },
      {
        "latitude": 18.53749,
        "longitude": 83.51671
      },
      {
        "latitude": 18.51834,
        "longitude": 83.51712
      },
      {
        "latitude": 18.53585,
        "longitude": 83.54784
      },
      {
        "latitude": 18.55178,
        "longitude": 83.52593
      },
      {
        "latitude": 18.57904,
        "longitude": 83.54184
      },
      {
        "latitude": 18.59124,
        "longitude": 83.57023
      },
      {
        "latitude": 18.59588,
        "longitude": 83.5503
      },
      {
        "latitude": 18.62634,
        "longitude": 83.54835
      },
      {
        "latitude": 18.63286,
        "longitude": 83.55624
      },
      {
        "latitude": 18.64738,
        "longitude": 83.55002
      },
      {
        "latitude": 18.66809,
        "longitude": 83.56107
      },
      {
        "latitude": 18.68246,
        "longitude": 83.55386
      },
      {
        "latitude": 18.68689,
        "longitude": 83.54164
      },
      {
        "latitude": 18.71139,
        "longitude": 83.5397
      },
      {
        "latitude": 18.69599,
        "longitude": 83.57137
      },
      {
        "latitude": 18.67535,
        "longitude": 83.57365
      },
      {
        "latitude": 18.65774,
        "longitude": 83.60484
      },
      {
        "latitude": 18.64944,
        "longitude": 83.60393
      },
      {
        "latitude": 18.64001,
        "longitude": 83.62044
      },
      {
        "latitude": 18.61708,
        "longitude": 83.63443
      },
      {
        "latitude": 18.60509,
        "longitude": 83.63542
      },
      {
        "latitude": 18.58241,
        "longitude": 83.66112
      },
      {
        "latitude": 18.57088,
        "longitude": 83.72034
      },
      {
        "latitude": 18.55966,
        "longitude": 83.72479
      },
      {
        "latitude": 18.58314,
        "longitude": 83.7434
      },
      {
        "latitude": 18.58253,
        "longitude": 83.7525
      },
      {
        "latitude": 18.56925,
        "longitude": 83.75526
      },
      {
        "latitude": 18.56669,
        "longitude": 83.76783
      },
      {
        "latitude": 18.59853,
        "longitude": 83.7784
      },
      {
        "latitude": 18.60649,
        "longitude": 83.79403
      },
      {
        "latitude": 18.61959,
        "longitude": 83.78227
      },
      {
        "latitude": 18.62981,
        "longitude": 83.79147
      },
      {
        "latitude": 18.62512,
        "longitude": 83.79522
      },
      {
        "latitude": 18.63585,
        "longitude": 83.7979
      },
      {
        "latitude": 18.60165,
        "longitude": 83.83186
      },
      {
        "latitude": 18.56754,
        "longitude": 83.83261
      },
      {
        "latitude": 18.55774,
        "longitude": 83.82453
      },
      {
        "latitude": 18.54004,
        "longitude": 83.83782
      },
      {
        "latitude": 18.54419,
        "longitude": 83.84288
      },
      {
        "latitude": 18.53096,
        "longitude": 83.85815
      },
      {
        "latitude": 18.53773,
        "longitude": 83.86893
      },
      {
        "latitude": 18.53847,
        "longitude": 83.86119
      },
      {
        "latitude": 18.54862,
        "longitude": 83.86776
      },
      {
        "latitude": 18.55321,
        "longitude": 83.88032
      },
      {
        "latitude": 18.54001,
        "longitude": 83.88536
      },
      {
        "latitude": 18.53277,
        "longitude": 83.90234
      },
      {
        "latitude": 18.54319,
        "longitude": 83.91501
      },
      {
        "latitude": 18.56186,
        "longitude": 83.90412
      },
      {
        "latitude": 18.56767,
        "longitude": 83.91366
      },
      {
        "latitude": 18.58766,
        "longitude": 83.90868
      },
      {
        "latitude": 18.60039,
        "longitude": 83.89974
      },
      {
        "latitude": 18.59781,
        "longitude": 83.89321
      },
      {
        "latitude": 18.6147,
        "longitude": 83.8867
      },
      {
        "latitude": 18.63463,
        "longitude": 83.88903
      },
      {
        "latitude": 18.65879,
        "longitude": 83.85774
      },
      {
        "latitude": 18.69272,
        "longitude": 83.83973
      },
      {
        "latitude": 18.7258,
        "longitude": 83.83391
      },
      {
        "latitude": 18.74562,
        "longitude": 83.86907
      },
      {
        "latitude": 18.72675,
        "longitude": 83.88922
      },
      {
        "latitude": 18.76446,
        "longitude": 83.86934
      },
      {
        "latitude": 18.77197,
        "longitude": 83.83653
      },
      {
        "latitude": 18.78818,
        "longitude": 83.84831
      },
      {
        "latitude": 18.79599,
        "longitude": 83.88805
      },
      {
        "latitude": 18.80235,
        "longitude": 83.87822
      },
      {
        "latitude": 18.81663,
        "longitude": 83.87838
      },
      {
        "latitude": 18.81047,
        "longitude": 83.88893
      },
      {
        "latitude": 18.82596,
        "longitude": 83.89085
      },
      {
        "latitude": 18.86442,
        "longitude": 83.84831
      },
      {
        "latitude": 18.91358,
        "longitude": 83.84579
      },
      {
        "latitude": 18.91629,
        "longitude": 83.82658
      },
      {
        "latitude": 18.96023,
        "longitude": 83.82176
      },
      {
        "latitude": 18.99228,
        "longitude": 83.80893
      },
      {
        "latitude": 19.00295,
        "longitude": 83.79594
      },
      {
        "latitude": 19.01697,
        "longitude": 83.79509
      },
      {
        "latitude": 19.01623,
        "longitude": 83.7782
      },
      {
        "latitude": 19.00769,
        "longitude": 83.78236
      },
      {
        "latitude": 18.99868,
        "longitude": 83.75155
      },
      {
        "latitude": 18.98889,
        "longitude": 83.74514
      },
      {
        "latitude": 18.95061,
        "longitude": 83.75896
      },
      {
        "latitude": 18.95476,
        "longitude": 83.76965
      },
      {
        "latitude": 18.91587,
        "longitude": 83.78789
      },
      {
        "latitude": 18.91136,
        "longitude": 83.77824
      },
      {
        "latitude": 18.92728,
        "longitude": 83.76317
      },
      {
        "latitude": 18.92513,
        "longitude": 83.75386
      },
      {
        "latitude": 18.98771,
        "longitude": 83.73301
      },
      {
        "latitude": 18.99299,
        "longitude": 83.7142
      },
      {
        "latitude": 19.00264,
        "longitude": 83.70948
      },
      {
        "latitude": 19.02196,
        "longitude": 83.73002
      },
      {
        "latitude": 19.02545,
        "longitude": 83.70014
      },
      {
        "latitude": 19.05853,
        "longitude": 83.68525
      },
      {
        "latitude": 19.08114,
        "longitude": 83.66102
      },
      {
        "latitude": 19.09895,
        "longitude": 83.66282
      },
      {
        "latitude": 19.1184,
        "longitude": 83.64704
      },
      {
        "latitude": 19.12962,
        "longitude": 83.65496
      },
      {
        "latitude": 19.13148,
        "longitude": 83.63701
      },
      {
        "latitude": 19.14084,
        "longitude": 83.6317
      },
      {
        "latitude": 19.15316,
        "longitude": 83.63768
      },
      {
        "latitude": 19.16267,
        "longitude": 83.62603
      },
      {
        "latitude": 19.14168,
        "longitude": 83.6208
      },
      {
        "latitude": 19.13016,
        "longitude": 83.59913
      },
      {
        "latitude": 19.09606,
        "longitude": 83.61061
      },
      {
        "latitude": 19.08656,
        "longitude": 83.58559
      },
      {
        "latitude": 19.05757,
        "longitude": 83.58446
      },
      {
        "latitude": 19.05785,
        "longitude": 83.56342
      },
      {
        "latitude": 19.07174,
        "longitude": 83.567
      },
      {
        "latitude": 19.08707,
        "longitude": 83.56017
      },
      {
        "latitude": 19.08052,
        "longitude": 83.54905
      },
      {
        "latitude": 19.0562,
        "longitude": 83.55757
      },
      {
        "latitude": 19.04149,
        "longitude": 83.54174
      },
      {
        "latitude": 19.0095,
        "longitude": 83.5367
      },
      {
        "latitude": 19.02066,
        "longitude": 83.50094
      },
      {
        "latitude": 19.03524,
        "longitude": 83.49677
      },
      {
        "latitude": 19.02846,
        "longitude": 83.51482
      },
      {
        "latitude": 19.03907,
        "longitude": 83.5193
      },
      {
        "latitude": 19.07032,
        "longitude": 83.51171
      },
      {
        "latitude": 19.05994,
        "longitude": 83.50048
      },
      {
        "latitude": 19.07783,
        "longitude": 83.48098
      },
      {
        "latitude": 19.09107,
        "longitude": 83.48404
      },
      {
        "latitude": 19.09224,
        "longitude": 83.46798
      },
      {
        "latitude": 19.0785,
        "longitude": 83.47837
      },
      {
        "latitude": 19.07911,
        "longitude": 83.46631
      },
      {
        "latitude": 19.06283,
        "longitude": 83.46237
      },
      {
        "latitude": 19.06016,
        "longitude": 83.46944
      },
      {
        "latitude": 19.04085,
        "longitude": 83.46859
      },
      {
        "latitude": 19.03135,
        "longitude": 83.48056
      },
      {
        "latitude": 19.0128,
        "longitude": 83.47945
      },
      {
        "latitude": 19.01096,
        "longitude": 83.44895
      },
      {
        "latitude": 18.99126,
        "longitude": 83.45527
      },
      {
        "latitude": 18.99108,
        "longitude": 83.46783
      },
      {
        "latitude": 18.96932,
        "longitude": 83.46981
      },
      {
        "latitude": 18.95478,
        "longitude": 83.46183
      },
      {
        "latitude": 18.95776,
        "longitude": 83.44586
      },
      {
        "latitude": 18.97639,
        "longitude": 83.43888
      },
      {
        "latitude": 18.98918,
        "longitude": 83.41532
      },
      {
        "latitude": 19,
        "longitude": 83.41975
      },
      {
        "latitude": 19.0094,
        "longitude": 83.40153
      },
      {
        "latitude": 19.0048,
        "longitude": 83.36759
      },
      {
        "latitude": 19.0157,
        "longitude": 83.36717
      },
      {
        "latitude": 19.01946,
        "longitude": 83.3581
      },
      {
        "latitude": 19.01688,
        "longitude": 83.34233
      },
      {
        "latitude": 18.99689,
        "longitude": 83.3389
      },
      {
        "latitude": 18.99885,
        "longitude": 83.31072
      },
      {
        "latitude": 18.97301,
        "longitude": 83.31892
      },
      {
        "latitude": 18.96871,
        "longitude": 83.3349
      },
      {
        "latitude": 18.95872,
        "longitude": 83.33234
      },
      {
        "latitude": 18.95258,
        "longitude": 83.33911
      },
      {
        "latitude": 18.94466,
        "longitude": 83.32718
      },
      {
        "latitude": 18.93263,
        "longitude": 83.3258
      },
      {
        "latitude": 18.92636,
        "longitude": 83.3484
      },
      {
        "latitude": 18.94123,
        "longitude": 83.34379
      },
      {
        "latitude": 18.94345,
        "longitude": 83.35024
      },
      {
        "latitude": 18.96734,
        "longitude": 83.35382
      },
      {
        "latitude": 18.96294,
        "longitude": 83.36738
      },
      {
        "latitude": 18.94268,
        "longitude": 83.3713
      },
      {
        "latitude": 18.93311,
        "longitude": 83.38739
      },
      {
        "latitude": 18.9261,
        "longitude": 83.3706
      },
      {
        "latitude": 18.94182,
        "longitude": 83.37026
      },
      {
        "latitude": 18.94355,
        "longitude": 83.35242
      },
      {
        "latitude": 18.91474,
        "longitude": 83.35972
      },
      {
        "latitude": 18.90926,
        "longitude": 83.39142
      },
      {
        "latitude": 18.89701,
        "longitude": 83.37832
      },
      {
        "latitude": 18.87884,
        "longitude": 83.397
      },
      {
        "latitude": 18.87504,
        "longitude": 83.41499
      },
      {
        "latitude": 18.86184,
        "longitude": 83.40498
      },
      {
        "latitude": 18.84236,
        "longitude": 83.40586
      },
      {
        "latitude": 18.83053,
        "longitude": 83.37838
      },
      {
        "latitude": 18.84318,
        "longitude": 83.3658
      },
      {
        "latitude": 18.81797,
        "longitude": 83.32828
      },
      {
        "latitude": 18.80625,
        "longitude": 83.33071
      },
      {
        "latitude": 18.80931,
        "longitude": 83.30896
      },
      {
        "latitude": 18.79788,
        "longitude": 83.28457
      },
      {
        "latitude": 18.78267,
        "longitude": 83.27537
      },
      {
        "latitude": 18.7741,
        "longitude": 83.28138
      },
      {
        "latitude": 18.76446,
        "longitude": 83.27135
      },
      {
        "latitude": 18.77509,
        "longitude": 83.22461
      },
      {
        "latitude": 18.75524,
        "longitude": 83.22772
      },
      {
        "latitude": 18.73049,
        "longitude": 83.21245
      },
      {
        "latitude": 18.75115,
        "longitude": 83.20683
      },
      {
        "latitude": 18.7541,
        "longitude": 83.19206
      },
      {
        "latitude": 18.7707,
        "longitude": 83.17713
      },
      {
        "latitude": 18.76682,
        "longitude": 83.1592
      },
      {
        "latitude": 18.78451,
        "longitude": 83.13879
      },
      {
        "latitude": 18.76838,
        "longitude": 83.11705
      },
      {
        "latitude": 18.75806,
        "longitude": 83.12372
      },
      {
        "latitude": 18.70554,
        "longitude": 83.07279
      },
      {
        "latitude": 18.66531,
        "longitude": 83.05802
      },
      {
        "latitude": 18.65002,
        "longitude": 83.01672
      },
      {
        "latitude": 18.63512,
        "longitude": 83.01963
      },
      {
        "latitude": 18.61637,
        "longitude": 82.99957
      }
    ],
    "polygons": [
      [
        {
          "latitude": 18.61637,
          "longitude": 82.99957
        },
        {
          "latitude": 18.58965,
          "longitude": 83.02378
        },
        {
          "latitude": 18.601,
          "longitude": 83.05266
        },
        {
          "latitude": 18.58811,
          "longitude": 83.05309
        },
        {
          "latitude": 18.58649,
          "longitude": 83.04009
        },
        {
          "latitude": 18.57358,
          "longitude": 83.02981
        },
        {
          "latitude": 18.54412,
          "longitude": 83.0454
        },
        {
          "latitude": 18.54205,
          "longitude": 83.06193
        },
        {
          "latitude": 18.55402,
          "longitude": 83.08094
        },
        {
          "latitude": 18.54728,
          "longitude": 83.09483
        },
        {
          "latitude": 18.49566,
          "longitude": 83.05521
        },
        {
          "latitude": 18.48561,
          "longitude": 83.05511
        },
        {
          "latitude": 18.45624,
          "longitude": 83.02095
        },
        {
          "latitude": 18.44079,
          "longitude": 83.04094
        },
        {
          "latitude": 18.42423,
          "longitude": 83.04253
        },
        {
          "latitude": 18.43668,
          "longitude": 83.05856
        },
        {
          "latitude": 18.43009,
          "longitude": 83.06731
        },
        {
          "latitude": 18.41937,
          "longitude": 83.05744
        },
        {
          "latitude": 18.40941,
          "longitude": 83.06425
        },
        {
          "latitude": 18.40243,
          "longitude": 83.08007
        },
        {
          "latitude": 18.41163,
          "longitude": 83.08843
        },
        {
          "latitude": 18.41201,
          "longitude": 83.10552
        },
        {
          "latitude": 18.3666,
          "longitude": 83.0763
        },
        {
          "latitude": 18.34602,
          "longitude": 83.08068
        },
        {
          "latitude": 18.34164,
          "longitude": 83.09359
        },
        {
          "latitude": 18.35208,
          "longitude": 83.09546
        },
        {
          "latitude": 18.35636,
          "longitude": 83.10604
        },
        {
          "latitude": 18.34771,
          "longitude": 83.11329
        },
        {
          "latitude": 18.34904,
          "longitude": 83.13441
        },
        {
          "latitude": 18.34028,
          "longitude": 83.15482
        },
        {
          "latitude": 18.37173,
          "longitude": 83.17581
        },
        {
          "latitude": 18.37098,
          "longitude": 83.18514
        },
        {
          "latitude": 18.38628,
          "longitude": 83.19855
        },
        {
          "latitude": 18.39816,
          "longitude": 83.22471
        },
        {
          "latitude": 18.40414,
          "longitude": 83.22236
        },
        {
          "latitude": 18.40285,
          "longitude": 83.20947
        },
        {
          "latitude": 18.44141,
          "longitude": 83.20209
        },
        {
          "latitude": 18.43878,
          "longitude": 83.21895
        },
        {
          "latitude": 18.45091,
          "longitude": 83.23107
        },
        {
          "latitude": 18.44625,
          "longitude": 83.24
        },
        {
          "latitude": 18.47127,
          "longitude": 83.26406
        },
        {
          "latitude": 18.47897,
          "longitude": 83.25402
        },
        {
          "latitude": 18.46506,
          "longitude": 83.24152
        },
        {
          "latitude": 18.48693,
          "longitude": 83.22956
        },
        {
          "latitude": 18.47956,
          "longitude": 83.22214
        },
        {
          "latitude": 18.4922,
          "longitude": 83.21895
        },
        {
          "latitude": 18.53913,
          "longitude": 83.25016
        },
        {
          "latitude": 18.54303,
          "longitude": 83.273
        },
        {
          "latitude": 18.55034,
          "longitude": 83.27573
        },
        {
          "latitude": 18.55896,
          "longitude": 83.2513
        },
        {
          "latitude": 18.58359,
          "longitude": 83.26128
        },
        {
          "latitude": 18.58802,
          "longitude": 83.24689
        },
        {
          "latitude": 18.62588,
          "longitude": 83.27989
        },
        {
          "latitude": 18.62722,
          "longitude": 83.28882
        },
        {
          "latitude": 18.61957,
          "longitude": 83.29139
        },
        {
          "latitude": 18.63123,
          "longitude": 83.31017
        },
        {
          "latitude": 18.65973,
          "longitude": 83.32436
        },
        {
          "latitude": 18.64128,
          "longitude": 83.34804
        },
        {
          "latitude": 18.60895,
          "longitude": 83.34652
        },
        {
          "latitude": 18.5989,
          "longitude": 83.36763
        },
        {
          "latitude": 18.61162,
          "longitude": 83.37787
        },
        {
          "latitude": 18.60487,
          "longitude": 83.40672
        },
        {
          "latitude": 18.62197,
          "longitude": 83.4142
        },
        {
          "latitude": 18.60441,
          "longitude": 83.42689
        },
        {
          "latitude": 18.62636,
          "longitude": 83.44453
        },
        {
          "latitude": 18.61706,
          "longitude": 83.47594
        },
        {
          "latitude": 18.59109,
          "longitude": 83.49492
        },
        {
          "latitude": 18.57309,
          "longitude": 83.48783
        },
        {
          "latitude": 18.5772,
          "longitude": 83.47392
        },
        {
          "latitude": 18.56551,
          "longitude": 83.47268
        },
        {
          "latitude": 18.55914,
          "longitude": 83.49714
        },
        {
          "latitude": 18.54382,
          "longitude": 83.49991
        },
        {
          "latitude": 18.53749,
          "longitude": 83.51671
        },
        {
          "latitude": 18.51834,
          "longitude": 83.51712
        },
        {
          "latitude": 18.53585,
          "longitude": 83.54784
        },
        {
          "latitude": 18.55178,
          "longitude": 83.52593
        },
        {
          "latitude": 18.57904,
          "longitude": 83.54184
        },
        {
          "latitude": 18.59124,
          "longitude": 83.57023
        },
        {
          "latitude": 18.59588,
          "longitude": 83.5503
        },
        {
          "latitude": 18.62634,
          "longitude": 83.54835
        },
        {
          "latitude": 18.63286,
          "longitude": 83.55624
        },
        {
          "latitude": 18.64738,
          "longitude": 83.55002
        },
        {
          "latitude": 18.66809,
          "longitude": 83.56107
        },
        {
          "latitude": 18.68246,
          "longitude": 83.55386
        },
        {
          "latitude": 18.68689,
          "longitude": 83.54164
        },
        {
          "latitude": 18.71139,
          "longitude": 83.5397
        },
        {
          "latitude": 18.69599,
          "longitude": 83.57137
        },
        {
          "latitude": 18.67535,
          "longitude": 83.57365
        },
        {
          "latitude": 18.65774,
          "longitude": 83.60484
        },
        {
          "latitude": 18.64944,
          "longitude": 83.60393
        },
        {
          "latitude": 18.64001,
          "longitude": 83.62044
        },
        {
          "latitude": 18.61708,
          "longitude": 83.63443
        },
        {
          "latitude": 18.60509,
          "longitude": 83.63542
        },
        {
          "latitude": 18.58241,
          "longitude": 83.66112
        },
        {
          "latitude": 18.57088,
          "longitude": 83.72034
        },
        {
          "latitude": 18.55966,
          "longitude": 83.72479
        },
        {
          "latitude": 18.58314,
          "longitude": 83.7434
        },
        {
          "latitude": 18.58253,
          "longitude": 83.7525
        },
        {
          "latitude": 18.56925,
          "longitude": 83.75526
        },
        {
          "latitude": 18.56669,
          "longitude": 83.76783
        },
        {
          "latitude": 18.59853,
          "longitude": 83.7784
        },
        {
          "latitude": 18.60649,
          "longitude": 83.79403
        },
        {
          "latitude": 18.61959,
          "longitude": 83.78227
        },
        {
          "latitude": 18.62981,
          "longitude": 83.79147
        },
        {
          "latitude": 18.62512,
          "longitude": 83.79522
        },
        {
          "latitude": 18.63585,
          "longitude": 83.7979
        },
        {
          "latitude": 18.60165,
          "longitude": 83.83186
        },
        {
          "latitude": 18.56754,
          "longitude": 83.83261
        },
        {
          "latitude": 18.55774,
          "longitude": 83.82453
        },
        {
          "latitude": 18.54004,
          "longitude": 83.83782
        },
        {
          "latitude": 18.54419,
          "longitude": 83.84288
        },
        {
          "latitude": 18.53096,
          "longitude": 83.85815
        },
        {
          "latitude": 18.53773,
          "longitude": 83.86893
        },
        {
          "latitude": 18.53847,
          "longitude": 83.86119
        },
        {
          "latitude": 18.54862,
          "longitude": 83.86776
        },
        {
          "latitude": 18.55321,
          "longitude": 83.88032
        },
        {
          "latitude": 18.54001,
          "longitude": 83.88536
        },
        {
          "latitude": 18.53277,
          "longitude": 83.90234
        },
        {
          "latitude": 18.54319,
          "longitude": 83.91501
        },
        {
          "latitude": 18.56186,
          "longitude": 83.90412
        },
        {
          "latitude": 18.56767,
          "longitude": 83.91366
        },
        {
          "latitude": 18.58766,
          "longitude": 83.90868
        },
        {
          "latitude": 18.60039,
          "longitude": 83.89974
        },
        {
          "latitude": 18.59781,
          "longitude": 83.89321
        },
        {
          "latitude": 18.6147,
          "longitude": 83.8867
        },
        {
          "latitude": 18.63463,
          "longitude": 83.88903
        },
        {
          "latitude": 18.65879,
          "longitude": 83.85774
        },
        {
          "latitude": 18.69272,
          "longitude": 83.83973
        },
        {
          "latitude": 18.7258,
          "longitude": 83.83391
        },
        {
          "latitude": 18.74562,
          "longitude": 83.86907
        },
        {
          "latitude": 18.72675,
          "longitude": 83.88922
        },
        {
          "latitude": 18.76446,
          "longitude": 83.86934
        },
        {
          "latitude": 18.77197,
          "longitude": 83.83653
        },
        {
          "latitude": 18.78818,
          "longitude": 83.84831
        },
        {
          "latitude": 18.79599,
          "longitude": 83.88805
        },
        {
          "latitude": 18.80235,
          "longitude": 83.87822
        },
        {
          "latitude": 18.81663,
          "longitude": 83.87838
        },
        {
          "latitude": 18.81047,
          "longitude": 83.88893
        },
        {
          "latitude": 18.82596,
          "longitude": 83.89085
        },
        {
          "latitude": 18.86442,
          "longitude": 83.84831
        },
        {
          "latitude": 18.91358,
          "longitude": 83.84579
        },
        {
          "latitude": 18.91629,
          "longitude": 83.82658
        },
        {
          "latitude": 18.96023,
          "longitude": 83.82176
        },
        {
          "latitude": 18.99228,
          "longitude": 83.80893
        },
        {
          "latitude": 19.00295,
          "longitude": 83.79594
        },
        {
          "latitude": 19.01697,
          "longitude": 83.79509
        },
        {
          "latitude": 19.01623,
          "longitude": 83.7782
        },
        {
          "latitude": 19.00769,
          "longitude": 83.78236
        },
        {
          "latitude": 18.99868,
          "longitude": 83.75155
        },
        {
          "latitude": 18.98889,
          "longitude": 83.74514
        },
        {
          "latitude": 18.95061,
          "longitude": 83.75896
        },
        {
          "latitude": 18.95476,
          "longitude": 83.76965
        },
        {
          "latitude": 18.91587,
          "longitude": 83.78789
        },
        {
          "latitude": 18.91136,
          "longitude": 83.77824
        },
        {
          "latitude": 18.92728,
          "longitude": 83.76317
        },
        {
          "latitude": 18.92513,
          "longitude": 83.75386
        },
        {
          "latitude": 18.98771,
          "longitude": 83.73301
        },
        {
          "latitude": 18.99299,
          "longitude": 83.7142
        },
        {
          "latitude": 19.00264,
          "longitude": 83.70948
        },
        {
          "latitude": 19.02196,
          "longitude": 83.73002
        },
        {
          "latitude": 19.02545,
          "longitude": 83.70014
        },
        {
          "latitude": 19.05853,
          "longitude": 83.68525
        },
        {
          "latitude": 19.08114,
          "longitude": 83.66102
        },
        {
          "latitude": 19.09895,
          "longitude": 83.66282
        },
        {
          "latitude": 19.1184,
          "longitude": 83.64704
        },
        {
          "latitude": 19.12962,
          "longitude": 83.65496
        },
        {
          "latitude": 19.13148,
          "longitude": 83.63701
        },
        {
          "latitude": 19.14084,
          "longitude": 83.6317
        },
        {
          "latitude": 19.15316,
          "longitude": 83.63768
        },
        {
          "latitude": 19.16267,
          "longitude": 83.62603
        },
        {
          "latitude": 19.14168,
          "longitude": 83.6208
        },
        {
          "latitude": 19.13016,
          "longitude": 83.59913
        },
        {
          "latitude": 19.09606,
          "longitude": 83.61061
        },
        {
          "latitude": 19.08656,
          "longitude": 83.58559
        },
        {
          "latitude": 19.05757,
          "longitude": 83.58446
        },
        {
          "latitude": 19.05785,
          "longitude": 83.56342
        },
        {
          "latitude": 19.07174,
          "longitude": 83.567
        },
        {
          "latitude": 19.08707,
          "longitude": 83.56017
        },
        {
          "latitude": 19.08052,
          "longitude": 83.54905
        },
        {
          "latitude": 19.0562,
          "longitude": 83.55757
        },
        {
          "latitude": 19.04149,
          "longitude": 83.54174
        },
        {
          "latitude": 19.0095,
          "longitude": 83.5367
        },
        {
          "latitude": 19.02066,
          "longitude": 83.50094
        },
        {
          "latitude": 19.03524,
          "longitude": 83.49677
        },
        {
          "latitude": 19.02846,
          "longitude": 83.51482
        },
        {
          "latitude": 19.03907,
          "longitude": 83.5193
        },
        {
          "latitude": 19.07032,
          "longitude": 83.51171
        },
        {
          "latitude": 19.05994,
          "longitude": 83.50048
        },
        {
          "latitude": 19.07783,
          "longitude": 83.48098
        },
        {
          "latitude": 19.09107,
          "longitude": 83.48404
        },
        {
          "latitude": 19.09224,
          "longitude": 83.46798
        },
        {
          "latitude": 19.0785,
          "longitude": 83.47837
        },
        {
          "latitude": 19.07911,
          "longitude": 83.46631
        },
        {
          "latitude": 19.06283,
          "longitude": 83.46237
        },
        {
          "latitude": 19.06016,
          "longitude": 83.46944
        },
        {
          "latitude": 19.04085,
          "longitude": 83.46859
        },
        {
          "latitude": 19.03135,
          "longitude": 83.48056
        },
        {
          "latitude": 19.0128,
          "longitude": 83.47945
        },
        {
          "latitude": 19.01096,
          "longitude": 83.44895
        },
        {
          "latitude": 18.99126,
          "longitude": 83.45527
        },
        {
          "latitude": 18.99108,
          "longitude": 83.46783
        },
        {
          "latitude": 18.96932,
          "longitude": 83.46981
        },
        {
          "latitude": 18.95478,
          "longitude": 83.46183
        },
        {
          "latitude": 18.95776,
          "longitude": 83.44586
        },
        {
          "latitude": 18.97639,
          "longitude": 83.43888
        },
        {
          "latitude": 18.98918,
          "longitude": 83.41532
        },
        {
          "latitude": 19,
          "longitude": 83.41975
        },
        {
          "latitude": 19.0094,
          "longitude": 83.40153
        },
        {
          "latitude": 19.0048,
          "longitude": 83.36759
        },
        {
          "latitude": 19.0157,
          "longitude": 83.36717
        },
        {
          "latitude": 19.01946,
          "longitude": 83.3581
        },
        {
          "latitude": 19.01688,
          "longitude": 83.34233
        },
        {
          "latitude": 18.99689,
          "longitude": 83.3389
        },
        {
          "latitude": 18.99885,
          "longitude": 83.31072
        },
        {
          "latitude": 18.97301,
          "longitude": 83.31892
        },
        {
          "latitude": 18.96871,
          "longitude": 83.3349
        },
        {
          "latitude": 18.95872,
          "longitude": 83.33234
        },
        {
          "latitude": 18.95258,
          "longitude": 83.33911
        },
        {
          "latitude": 18.94466,
          "longitude": 83.32718
        },
        {
          "latitude": 18.93263,
          "longitude": 83.3258
        },
        {
          "latitude": 18.92636,
          "longitude": 83.3484
        },
        {
          "latitude": 18.94123,
          "longitude": 83.34379
        },
        {
          "latitude": 18.94345,
          "longitude": 83.35024
        },
        {
          "latitude": 18.96734,
          "longitude": 83.35382
        },
        {
          "latitude": 18.96294,
          "longitude": 83.36738
        },
        {
          "latitude": 18.94268,
          "longitude": 83.3713
        },
        {
          "latitude": 18.93311,
          "longitude": 83.38739
        },
        {
          "latitude": 18.9261,
          "longitude": 83.3706
        },
        {
          "latitude": 18.94182,
          "longitude": 83.37026
        },
        {
          "latitude": 18.94355,
          "longitude": 83.35242
        },
        {
          "latitude": 18.91474,
          "longitude": 83.35972
        },
        {
          "latitude": 18.90926,
          "longitude": 83.39142
        },
        {
          "latitude": 18.89701,
          "longitude": 83.37832
        },
        {
          "latitude": 18.87884,
          "longitude": 83.397
        },
        {
          "latitude": 18.87504,
          "longitude": 83.41499
        },
        {
          "latitude": 18.86184,
          "longitude": 83.40498
        },
        {
          "latitude": 18.84236,
          "longitude": 83.40586
        },
        {
          "latitude": 18.83053,
          "longitude": 83.37838
        },
        {
          "latitude": 18.84318,
          "longitude": 83.3658
        },
        {
          "latitude": 18.81797,
          "longitude": 83.32828
        },
        {
          "latitude": 18.80625,
          "longitude": 83.33071
        },
        {
          "latitude": 18.80931,
          "longitude": 83.30896
        },
        {
          "latitude": 18.79788,
          "longitude": 83.28457
        },
        {
          "latitude": 18.78267,
          "longitude": 83.27537
        },
        {
          "latitude": 18.7741,
          "longitude": 83.28138
        },
        {
          "latitude": 18.76446,
          "longitude": 83.27135
        },
        {
          "latitude": 18.77509,
          "longitude": 83.22461
        },
        {
          "latitude": 18.75524,
          "longitude": 83.22772
        },
        {
          "latitude": 18.73049,
          "longitude": 83.21245
        },
        {
          "latitude": 18.75115,
          "longitude": 83.20683
        },
        {
          "latitude": 18.7541,
          "longitude": 83.19206
        },
        {
          "latitude": 18.7707,
          "longitude": 83.17713
        },
        {
          "latitude": 18.76682,
          "longitude": 83.1592
        },
        {
          "latitude": 18.78451,
          "longitude": 83.13879
        },
        {
          "latitude": 18.76838,
          "longitude": 83.11705
        },
        {
          "latitude": 18.75806,
          "longitude": 83.12372
        },
        {
          "latitude": 18.70554,
          "longitude": 83.07279
        },
        {
          "latitude": 18.66531,
          "longitude": 83.05802
        },
        {
          "latitude": 18.65002,
          "longitude": 83.01672
        },
        {
          "latitude": 18.63512,
          "longitude": 83.01963
        },
        {
          "latitude": 18.61637,
          "longitude": 82.99957
        }
      ],
      [
        {
          "latitude": 18.54724,
          "longitude": 83.55801
        },
        {
          "latitude": 18.52847,
          "longitude": 83.57223
        },
        {
          "latitude": 18.52547,
          "longitude": 83.63069
        },
        {
          "latitude": 18.54639,
          "longitude": 83.63407
        },
        {
          "latitude": 18.56039,
          "longitude": 83.62868
        },
        {
          "latitude": 18.56668,
          "longitude": 83.57316
        },
        {
          "latitude": 18.56141,
          "longitude": 83.56246
        },
        {
          "latitude": 18.54724,
          "longitude": 83.55801
        }
      ]
    ]
  },
  {
    "id": "nellore",
    "name": "Sri Potti Sriramulu Nellore",
    "headquarters": "Nellore",
    "center": {
      "latitude": 14.691,
      "longitude": 79.6863
    },
    "region": "Coastal Andhra",
    "polygon": [
      {
        "latitude": 14.98517,
        "longitude": 79.08099
      },
      {
        "latitude": 14.906,
        "longitude": 79.10172
      },
      {
        "latitude": 14.86927,
        "longitude": 79.13348
      },
      {
        "latitude": 14.79609,
        "longitude": 79.15016
      },
      {
        "latitude": 14.71328,
        "longitude": 79.18551
      },
      {
        "latitude": 14.6907,
        "longitude": 79.18397
      },
      {
        "latitude": 14.68451,
        "longitude": 79.17369
      },
      {
        "latitude": 14.66133,
        "longitude": 79.18662
      },
      {
        "latitude": 14.64599,
        "longitude": 79.18139
      },
      {
        "latitude": 14.61863,
        "longitude": 79.18896
      },
      {
        "latitude": 14.61573,
        "longitude": 79.20003
      },
      {
        "latitude": 14.59035,
        "longitude": 79.21991
      },
      {
        "latitude": 14.6041,
        "longitude": 79.22956
      },
      {
        "latitude": 14.59469,
        "longitude": 79.24192
      },
      {
        "latitude": 14.57268,
        "longitude": 79.24846
      },
      {
        "latitude": 14.5341,
        "longitude": 79.27816
      },
      {
        "latitude": 14.48652,
        "longitude": 79.29312
      },
      {
        "latitude": 14.47828,
        "longitude": 79.31656
      },
      {
        "latitude": 14.42728,
        "longitude": 79.3301
      },
      {
        "latitude": 14.37969,
        "longitude": 79.36433
      },
      {
        "latitude": 14.3526,
        "longitude": 79.36617
      },
      {
        "latitude": 14.34215,
        "longitude": 79.38949
      },
      {
        "latitude": 14.27955,
        "longitude": 79.42235
      },
      {
        "latitude": 14.26589,
        "longitude": 79.41977
      },
      {
        "latitude": 14.2443,
        "longitude": 79.43574
      },
      {
        "latitude": 14.20727,
        "longitude": 79.4227
      },
      {
        "latitude": 14.18583,
        "longitude": 79.42843
      },
      {
        "latitude": 14.17298,
        "longitude": 79.52902
      },
      {
        "latitude": 14.14336,
        "longitude": 79.58734
      },
      {
        "latitude": 14.13272,
        "longitude": 79.59956
      },
      {
        "latitude": 14.1205,
        "longitude": 79.59954
      },
      {
        "latitude": 14.10712,
        "longitude": 79.63036
      },
      {
        "latitude": 14.11624,
        "longitude": 79.64205
      },
      {
        "latitude": 14.15311,
        "longitude": 79.64041
      },
      {
        "latitude": 14.15453,
        "longitude": 79.65641
      },
      {
        "latitude": 14.15069,
        "longitude": 79.6653
      },
      {
        "latitude": 14.12133,
        "longitude": 79.66831
      },
      {
        "latitude": 14.10967,
        "longitude": 79.70788
      },
      {
        "latitude": 14.128,
        "longitude": 79.73457
      },
      {
        "latitude": 14.15606,
        "longitude": 79.745
      },
      {
        "latitude": 14.17539,
        "longitude": 79.76369
      },
      {
        "latitude": 14.1844,
        "longitude": 79.7784
      },
      {
        "latitude": 14.18356,
        "longitude": 79.8006
      },
      {
        "latitude": 14.21117,
        "longitude": 79.79591
      },
      {
        "latitude": 14.22465,
        "longitude": 79.77454
      },
      {
        "latitude": 14.26668,
        "longitude": 79.80005
      },
      {
        "latitude": 14.25686,
        "longitude": 79.81769
      },
      {
        "latitude": 14.22645,
        "longitude": 79.81807
      },
      {
        "latitude": 14.20942,
        "longitude": 79.84864
      },
      {
        "latitude": 14.1765,
        "longitude": 79.85603
      },
      {
        "latitude": 14.14248,
        "longitude": 79.93367
      },
      {
        "latitude": 14.16138,
        "longitude": 79.94173
      },
      {
        "latitude": 14.15309,
        "longitude": 79.95369
      },
      {
        "latitude": 14.16593,
        "longitude": 79.97421
      },
      {
        "latitude": 14.18604,
        "longitude": 79.97626
      },
      {
        "latitude": 14.1934,
        "longitude": 79.98666
      },
      {
        "latitude": 14.18162,
        "longitude": 79.98915
      },
      {
        "latitude": 14.19669,
        "longitude": 80.0137
      },
      {
        "latitude": 14.1849,
        "longitude": 80.02421
      },
      {
        "latitude": 14.19445,
        "longitude": 80.03636
      },
      {
        "latitude": 14.20317,
        "longitude": 80.03065
      },
      {
        "latitude": 14.19809,
        "longitude": 80.04741
      },
      {
        "latitude": 14.2202,
        "longitude": 80.05885
      },
      {
        "latitude": 14.20934,
        "longitude": 80.0659
      },
      {
        "latitude": 14.22439,
        "longitude": 80.07077
      },
      {
        "latitude": 14.23455,
        "longitude": 80.1036
      },
      {
        "latitude": 14.25486,
        "longitude": 80.10149
      },
      {
        "latitude": 14.25171,
        "longitude": 80.12379
      },
      {
        "latitude": 14.25838,
        "longitude": 80.13886
      },
      {
        "latitude": 14.35526,
        "longitude": 80.16861
      },
      {
        "latitude": 14.49538,
        "longitude": 80.17732
      },
      {
        "latitude": 14.5861,
        "longitude": 80.1948
      },
      {
        "latitude": 14.61206,
        "longitude": 80.17121
      },
      {
        "latitude": 14.7039,
        "longitude": 80.14209
      },
      {
        "latitude": 14.74304,
        "longitude": 80.11159
      },
      {
        "latitude": 14.77364,
        "longitude": 80.09982
      },
      {
        "latitude": 14.88363,
        "longitude": 80.0844
      },
      {
        "latitude": 15.01213,
        "longitude": 80.05284
      },
      {
        "latitude": 15.09321,
        "longitude": 80.04872
      },
      {
        "latitude": 15.21893,
        "longitude": 80.08951
      },
      {
        "latitude": 15.21356,
        "longitude": 80.06938
      },
      {
        "latitude": 15.20036,
        "longitude": 80.06882
      },
      {
        "latitude": 15.21457,
        "longitude": 80.04011
      },
      {
        "latitude": 15.21528,
        "longitude": 80.01349
      },
      {
        "latitude": 15.19831,
        "longitude": 80.00685
      },
      {
        "latitude": 15.19846,
        "longitude": 79.97629
      },
      {
        "latitude": 15.21906,
        "longitude": 79.97093
      },
      {
        "latitude": 15.2733,
        "longitude": 79.98394
      },
      {
        "latitude": 15.29015,
        "longitude": 79.95444
      },
      {
        "latitude": 15.31617,
        "longitude": 79.95601
      },
      {
        "latitude": 15.31643,
        "longitude": 79.94254
      },
      {
        "latitude": 15.30002,
        "longitude": 79.93136
      },
      {
        "latitude": 15.30018,
        "longitude": 79.91771
      },
      {
        "latitude": 15.33164,
        "longitude": 79.90879
      },
      {
        "latitude": 15.30258,
        "longitude": 79.89522
      },
      {
        "latitude": 15.31376,
        "longitude": 79.88184
      },
      {
        "latitude": 15.3093,
        "longitude": 79.86472
      },
      {
        "latitude": 15.28078,
        "longitude": 79.86745
      },
      {
        "latitude": 15.27628,
        "longitude": 79.85735
      },
      {
        "latitude": 15.21084,
        "longitude": 79.83854
      },
      {
        "latitude": 15.21678,
        "longitude": 79.81365
      },
      {
        "latitude": 15.20703,
        "longitude": 79.81139
      },
      {
        "latitude": 15.19476,
        "longitude": 79.77289
      },
      {
        "latitude": 15.23459,
        "longitude": 79.68944
      },
      {
        "latitude": 15.24912,
        "longitude": 79.68055
      },
      {
        "latitude": 15.24583,
        "longitude": 79.65363
      },
      {
        "latitude": 15.1727,
        "longitude": 79.6217
      },
      {
        "latitude": 15.16559,
        "longitude": 79.62253
      },
      {
        "latitude": 15.17677,
        "longitude": 79.63383
      },
      {
        "latitude": 15.17232,
        "longitude": 79.64566
      },
      {
        "latitude": 15.15468,
        "longitude": 79.6497
      },
      {
        "latitude": 15.14878,
        "longitude": 79.62375
      },
      {
        "latitude": 15.10025,
        "longitude": 79.63303
      },
      {
        "latitude": 15.05764,
        "longitude": 79.60794
      },
      {
        "latitude": 15.0437,
        "longitude": 79.62913
      },
      {
        "latitude": 15.03405,
        "longitude": 79.62598
      },
      {
        "latitude": 15.04388,
        "longitude": 79.56429
      },
      {
        "latitude": 15.02224,
        "longitude": 79.55835
      },
      {
        "latitude": 15.03861,
        "longitude": 79.51852
      },
      {
        "latitude": 15.05712,
        "longitude": 79.50169
      },
      {
        "latitude": 15.05756,
        "longitude": 79.47613
      },
      {
        "latitude": 15.0682,
        "longitude": 79.4677
      },
      {
        "latitude": 15.05719,
        "longitude": 79.42248
      },
      {
        "latitude": 15.07402,
        "longitude": 79.4198
      },
      {
        "latitude": 15.07607,
        "longitude": 79.39087
      },
      {
        "latitude": 15.09239,
        "longitude": 79.39254
      },
      {
        "latitude": 15.08631,
        "longitude": 79.36783
      },
      {
        "latitude": 15.11771,
        "longitude": 79.35218
      },
      {
        "latitude": 15.08634,
        "longitude": 79.34386
      },
      {
        "latitude": 15.09446,
        "longitude": 79.32726
      },
      {
        "latitude": 15.10084,
        "longitude": 79.33579
      },
      {
        "latitude": 15.11785,
        "longitude": 79.33537
      },
      {
        "latitude": 15.08872,
        "longitude": 79.30729
      },
      {
        "latitude": 15.09504,
        "longitude": 79.30909
      },
      {
        "latitude": 15.09947,
        "longitude": 79.29211
      },
      {
        "latitude": 15.0982,
        "longitude": 79.26556
      },
      {
        "latitude": 15.10779,
        "longitude": 79.26207
      },
      {
        "latitude": 15.08714,
        "longitude": 79.21437
      },
      {
        "latitude": 15.09217,
        "longitude": 79.16369
      },
      {
        "latitude": 15.10294,
        "longitude": 79.13672
      },
      {
        "latitude": 15.10173,
        "longitude": 79.12804
      },
      {
        "latitude": 15.08838,
        "longitude": 79.12958
      },
      {
        "latitude": 15.08632,
        "longitude": 79.10019
      },
      {
        "latitude": 15.04999,
        "longitude": 79.08781
      },
      {
        "latitude": 14.98517,
        "longitude": 79.08099
      }
    ],
    "polygons": [
      [
        {
          "latitude": 14.98517,
          "longitude": 79.08099
        },
        {
          "latitude": 14.906,
          "longitude": 79.10172
        },
        {
          "latitude": 14.86927,
          "longitude": 79.13348
        },
        {
          "latitude": 14.79609,
          "longitude": 79.15016
        },
        {
          "latitude": 14.71328,
          "longitude": 79.18551
        },
        {
          "latitude": 14.6907,
          "longitude": 79.18397
        },
        {
          "latitude": 14.68451,
          "longitude": 79.17369
        },
        {
          "latitude": 14.66133,
          "longitude": 79.18662
        },
        {
          "latitude": 14.64599,
          "longitude": 79.18139
        },
        {
          "latitude": 14.61863,
          "longitude": 79.18896
        },
        {
          "latitude": 14.61573,
          "longitude": 79.20003
        },
        {
          "latitude": 14.59035,
          "longitude": 79.21991
        },
        {
          "latitude": 14.6041,
          "longitude": 79.22956
        },
        {
          "latitude": 14.59469,
          "longitude": 79.24192
        },
        {
          "latitude": 14.57268,
          "longitude": 79.24846
        },
        {
          "latitude": 14.5341,
          "longitude": 79.27816
        },
        {
          "latitude": 14.48652,
          "longitude": 79.29312
        },
        {
          "latitude": 14.47828,
          "longitude": 79.31656
        },
        {
          "latitude": 14.42728,
          "longitude": 79.3301
        },
        {
          "latitude": 14.37969,
          "longitude": 79.36433
        },
        {
          "latitude": 14.3526,
          "longitude": 79.36617
        },
        {
          "latitude": 14.34215,
          "longitude": 79.38949
        },
        {
          "latitude": 14.27955,
          "longitude": 79.42235
        },
        {
          "latitude": 14.26589,
          "longitude": 79.41977
        },
        {
          "latitude": 14.2443,
          "longitude": 79.43574
        },
        {
          "latitude": 14.20727,
          "longitude": 79.4227
        },
        {
          "latitude": 14.18583,
          "longitude": 79.42843
        },
        {
          "latitude": 14.17298,
          "longitude": 79.52902
        },
        {
          "latitude": 14.14336,
          "longitude": 79.58734
        },
        {
          "latitude": 14.13272,
          "longitude": 79.59956
        },
        {
          "latitude": 14.1205,
          "longitude": 79.59954
        },
        {
          "latitude": 14.10712,
          "longitude": 79.63036
        },
        {
          "latitude": 14.11624,
          "longitude": 79.64205
        },
        {
          "latitude": 14.15311,
          "longitude": 79.64041
        },
        {
          "latitude": 14.15453,
          "longitude": 79.65641
        },
        {
          "latitude": 14.15069,
          "longitude": 79.6653
        },
        {
          "latitude": 14.12133,
          "longitude": 79.66831
        },
        {
          "latitude": 14.10967,
          "longitude": 79.70788
        },
        {
          "latitude": 14.128,
          "longitude": 79.73457
        },
        {
          "latitude": 14.15606,
          "longitude": 79.745
        },
        {
          "latitude": 14.17539,
          "longitude": 79.76369
        },
        {
          "latitude": 14.1844,
          "longitude": 79.7784
        },
        {
          "latitude": 14.18356,
          "longitude": 79.8006
        },
        {
          "latitude": 14.21117,
          "longitude": 79.79591
        },
        {
          "latitude": 14.22465,
          "longitude": 79.77454
        },
        {
          "latitude": 14.26668,
          "longitude": 79.80005
        },
        {
          "latitude": 14.25686,
          "longitude": 79.81769
        },
        {
          "latitude": 14.22645,
          "longitude": 79.81807
        },
        {
          "latitude": 14.20942,
          "longitude": 79.84864
        },
        {
          "latitude": 14.1765,
          "longitude": 79.85603
        },
        {
          "latitude": 14.14248,
          "longitude": 79.93367
        },
        {
          "latitude": 14.16138,
          "longitude": 79.94173
        },
        {
          "latitude": 14.15309,
          "longitude": 79.95369
        },
        {
          "latitude": 14.16593,
          "longitude": 79.97421
        },
        {
          "latitude": 14.18604,
          "longitude": 79.97626
        },
        {
          "latitude": 14.1934,
          "longitude": 79.98666
        },
        {
          "latitude": 14.18162,
          "longitude": 79.98915
        },
        {
          "latitude": 14.19669,
          "longitude": 80.0137
        },
        {
          "latitude": 14.1849,
          "longitude": 80.02421
        },
        {
          "latitude": 14.19445,
          "longitude": 80.03636
        },
        {
          "latitude": 14.20317,
          "longitude": 80.03065
        },
        {
          "latitude": 14.19809,
          "longitude": 80.04741
        },
        {
          "latitude": 14.2202,
          "longitude": 80.05885
        },
        {
          "latitude": 14.20934,
          "longitude": 80.0659
        },
        {
          "latitude": 14.22439,
          "longitude": 80.07077
        },
        {
          "latitude": 14.23455,
          "longitude": 80.1036
        },
        {
          "latitude": 14.25486,
          "longitude": 80.10149
        },
        {
          "latitude": 14.25171,
          "longitude": 80.12379
        },
        {
          "latitude": 14.25838,
          "longitude": 80.13886
        },
        {
          "latitude": 14.35526,
          "longitude": 80.16861
        },
        {
          "latitude": 14.49538,
          "longitude": 80.17732
        },
        {
          "latitude": 14.5861,
          "longitude": 80.1948
        },
        {
          "latitude": 14.61206,
          "longitude": 80.17121
        },
        {
          "latitude": 14.7039,
          "longitude": 80.14209
        },
        {
          "latitude": 14.74304,
          "longitude": 80.11159
        },
        {
          "latitude": 14.77364,
          "longitude": 80.09982
        },
        {
          "latitude": 14.88363,
          "longitude": 80.0844
        },
        {
          "latitude": 15.01213,
          "longitude": 80.05284
        },
        {
          "latitude": 15.09321,
          "longitude": 80.04872
        },
        {
          "latitude": 15.21893,
          "longitude": 80.08951
        },
        {
          "latitude": 15.21356,
          "longitude": 80.06938
        },
        {
          "latitude": 15.20036,
          "longitude": 80.06882
        },
        {
          "latitude": 15.21457,
          "longitude": 80.04011
        },
        {
          "latitude": 15.21528,
          "longitude": 80.01349
        },
        {
          "latitude": 15.19831,
          "longitude": 80.00685
        },
        {
          "latitude": 15.19846,
          "longitude": 79.97629
        },
        {
          "latitude": 15.21906,
          "longitude": 79.97093
        },
        {
          "latitude": 15.2733,
          "longitude": 79.98394
        },
        {
          "latitude": 15.29015,
          "longitude": 79.95444
        },
        {
          "latitude": 15.31617,
          "longitude": 79.95601
        },
        {
          "latitude": 15.31643,
          "longitude": 79.94254
        },
        {
          "latitude": 15.30002,
          "longitude": 79.93136
        },
        {
          "latitude": 15.30018,
          "longitude": 79.91771
        },
        {
          "latitude": 15.33164,
          "longitude": 79.90879
        },
        {
          "latitude": 15.30258,
          "longitude": 79.89522
        },
        {
          "latitude": 15.31376,
          "longitude": 79.88184
        },
        {
          "latitude": 15.3093,
          "longitude": 79.86472
        },
        {
          "latitude": 15.28078,
          "longitude": 79.86745
        },
        {
          "latitude": 15.27628,
          "longitude": 79.85735
        },
        {
          "latitude": 15.21084,
          "longitude": 79.83854
        },
        {
          "latitude": 15.21678,
          "longitude": 79.81365
        },
        {
          "latitude": 15.20703,
          "longitude": 79.81139
        },
        {
          "latitude": 15.19476,
          "longitude": 79.77289
        },
        {
          "latitude": 15.23459,
          "longitude": 79.68944
        },
        {
          "latitude": 15.24912,
          "longitude": 79.68055
        },
        {
          "latitude": 15.24583,
          "longitude": 79.65363
        },
        {
          "latitude": 15.1727,
          "longitude": 79.6217
        },
        {
          "latitude": 15.16559,
          "longitude": 79.62253
        },
        {
          "latitude": 15.17677,
          "longitude": 79.63383
        },
        {
          "latitude": 15.17232,
          "longitude": 79.64566
        },
        {
          "latitude": 15.15468,
          "longitude": 79.6497
        },
        {
          "latitude": 15.14878,
          "longitude": 79.62375
        },
        {
          "latitude": 15.10025,
          "longitude": 79.63303
        },
        {
          "latitude": 15.05764,
          "longitude": 79.60794
        },
        {
          "latitude": 15.0437,
          "longitude": 79.62913
        },
        {
          "latitude": 15.03405,
          "longitude": 79.62598
        },
        {
          "latitude": 15.04388,
          "longitude": 79.56429
        },
        {
          "latitude": 15.02224,
          "longitude": 79.55835
        },
        {
          "latitude": 15.03861,
          "longitude": 79.51852
        },
        {
          "latitude": 15.05712,
          "longitude": 79.50169
        },
        {
          "latitude": 15.05756,
          "longitude": 79.47613
        },
        {
          "latitude": 15.0682,
          "longitude": 79.4677
        },
        {
          "latitude": 15.05719,
          "longitude": 79.42248
        },
        {
          "latitude": 15.07402,
          "longitude": 79.4198
        },
        {
          "latitude": 15.07607,
          "longitude": 79.39087
        },
        {
          "latitude": 15.09239,
          "longitude": 79.39254
        },
        {
          "latitude": 15.08631,
          "longitude": 79.36783
        },
        {
          "latitude": 15.11771,
          "longitude": 79.35218
        },
        {
          "latitude": 15.08634,
          "longitude": 79.34386
        },
        {
          "latitude": 15.09446,
          "longitude": 79.32726
        },
        {
          "latitude": 15.10084,
          "longitude": 79.33579
        },
        {
          "latitude": 15.11785,
          "longitude": 79.33537
        },
        {
          "latitude": 15.08872,
          "longitude": 79.30729
        },
        {
          "latitude": 15.09504,
          "longitude": 79.30909
        },
        {
          "latitude": 15.09947,
          "longitude": 79.29211
        },
        {
          "latitude": 15.0982,
          "longitude": 79.26556
        },
        {
          "latitude": 15.10779,
          "longitude": 79.26207
        },
        {
          "latitude": 15.08714,
          "longitude": 79.21437
        },
        {
          "latitude": 15.09217,
          "longitude": 79.16369
        },
        {
          "latitude": 15.10294,
          "longitude": 79.13672
        },
        {
          "latitude": 15.10173,
          "longitude": 79.12804
        },
        {
          "latitude": 15.08838,
          "longitude": 79.12958
        },
        {
          "latitude": 15.08632,
          "longitude": 79.10019
        },
        {
          "latitude": 15.04999,
          "longitude": 79.08781
        },
        {
          "latitude": 14.98517,
          "longitude": 79.08099
        }
      ],
      [
        {
          "latitude": 15.28116,
          "longitude": 79.8834
        },
        {
          "latitude": 15.27729,
          "longitude": 79.90666
        },
        {
          "latitude": 15.27294,
          "longitude": 79.89562
        },
        {
          "latitude": 15.28116,
          "longitude": 79.8834
        }
      ]
    ]
  },
  {
    "id": "sri_sathya_sai",
    "name": "Sri Sathya Sai",
    "headquarters": "Puttaparthi",
    "center": {
      "latitude": 14.1368,
      "longitude": 77.7632
    },
    "region": "Rayalaseema",
    "polygon": [
      {
        "latitude": 14.13623,
        "longitude": 76.88859
      },
      {
        "latitude": 14.12774,
        "longitude": 76.9165
      },
      {
        "latitude": 14.13641,
        "longitude": 76.92645
      },
      {
        "latitude": 14.12007,
        "longitude": 76.94562
      },
      {
        "latitude": 14.0917,
        "longitude": 76.95205
      },
      {
        "latitude": 14.08201,
        "longitude": 76.97561
      },
      {
        "latitude": 14.05786,
        "longitude": 76.97372
      },
      {
        "latitude": 14.05356,
        "longitude": 76.93511
      },
      {
        "latitude": 14.03178,
        "longitude": 76.93313
      },
      {
        "latitude": 13.98947,
        "longitude": 77.00031
      },
      {
        "latitude": 13.9614,
        "longitude": 76.9967
      },
      {
        "latitude": 13.93343,
        "longitude": 77.04166
      },
      {
        "latitude": 13.9066,
        "longitude": 77.0473
      },
      {
        "latitude": 13.9026,
        "longitude": 77.02303
      },
      {
        "latitude": 13.86031,
        "longitude": 77.01422
      },
      {
        "latitude": 13.84893,
        "longitude": 76.99226
      },
      {
        "latitude": 13.82497,
        "longitude": 76.97749
      },
      {
        "latitude": 13.81822,
        "longitude": 76.9763
      },
      {
        "latitude": 13.80761,
        "longitude": 76.99072
      },
      {
        "latitude": 13.79058,
        "longitude": 76.98517
      },
      {
        "latitude": 13.74629,
        "longitude": 76.99764
      },
      {
        "latitude": 13.73851,
        "longitude": 77.0165
      },
      {
        "latitude": 13.77922,
        "longitude": 77.02447
      },
      {
        "latitude": 13.77779,
        "longitude": 77.04337
      },
      {
        "latitude": 13.74383,
        "longitude": 77.0647
      },
      {
        "latitude": 13.74244,
        "longitude": 77.08564
      },
      {
        "latitude": 13.76714,
        "longitude": 77.09045
      },
      {
        "latitude": 13.7583,
        "longitude": 77.13684
      },
      {
        "latitude": 13.76621,
        "longitude": 77.15112
      },
      {
        "latitude": 13.76201,
        "longitude": 77.17305
      },
      {
        "latitude": 13.78268,
        "longitude": 77.17851
      },
      {
        "latitude": 13.80603,
        "longitude": 77.15752
      },
      {
        "latitude": 13.82962,
        "longitude": 77.16869
      },
      {
        "latitude": 13.83413,
        "longitude": 77.15368
      },
      {
        "latitude": 13.84435,
        "longitude": 77.15602
      },
      {
        "latitude": 13.8462,
        "longitude": 77.13217
      },
      {
        "latitude": 13.85646,
        "longitude": 77.1282
      },
      {
        "latitude": 13.86848,
        "longitude": 77.14764
      },
      {
        "latitude": 13.86449,
        "longitude": 77.16858
      },
      {
        "latitude": 13.90662,
        "longitude": 77.16194
      },
      {
        "latitude": 13.92061,
        "longitude": 77.16992
      },
      {
        "latitude": 13.92519,
        "longitude": 77.18471
      },
      {
        "latitude": 13.91187,
        "longitude": 77.19084
      },
      {
        "latitude": 13.86984,
        "longitude": 77.18139
      },
      {
        "latitude": 13.86304,
        "longitude": 77.20043
      },
      {
        "latitude": 13.88619,
        "longitude": 77.21313
      },
      {
        "latitude": 13.86772,
        "longitude": 77.21985
      },
      {
        "latitude": 13.90414,
        "longitude": 77.23562
      },
      {
        "latitude": 13.90121,
        "longitude": 77.24827
      },
      {
        "latitude": 13.86793,
        "longitude": 77.24627
      },
      {
        "latitude": 13.86314,
        "longitude": 77.25912
      },
      {
        "latitude": 13.84652,
        "longitude": 77.2567
      },
      {
        "latitude": 13.84748,
        "longitude": 77.28829
      },
      {
        "latitude": 13.8665,
        "longitude": 77.3113
      },
      {
        "latitude": 13.85592,
        "longitude": 77.32145
      },
      {
        "latitude": 13.83324,
        "longitude": 77.32538
      },
      {
        "latitude": 13.83275,
        "longitude": 77.33685
      },
      {
        "latitude": 13.85422,
        "longitude": 77.36279
      },
      {
        "latitude": 13.84931,
        "longitude": 77.37867
      },
      {
        "latitude": 13.83936,
        "longitude": 77.3819
      },
      {
        "latitude": 13.84322,
        "longitude": 77.43252
      },
      {
        "latitude": 13.80875,
        "longitude": 77.41643
      },
      {
        "latitude": 13.8068,
        "longitude": 77.42865
      },
      {
        "latitude": 13.79909,
        "longitude": 77.42257
      },
      {
        "latitude": 13.7967,
        "longitude": 77.43703
      },
      {
        "latitude": 13.81102,
        "longitude": 77.44533
      },
      {
        "latitude": 13.8081,
        "longitude": 77.46454
      },
      {
        "latitude": 13.78883,
        "longitude": 77.4564
      },
      {
        "latitude": 13.75802,
        "longitude": 77.47056
      },
      {
        "latitude": 13.71104,
        "longitude": 77.46492
      },
      {
        "latitude": 13.71096,
        "longitude": 77.44989
      },
      {
        "latitude": 13.68264,
        "longitude": 77.45532
      },
      {
        "latitude": 13.69014,
        "longitude": 77.49193
      },
      {
        "latitude": 13.71477,
        "longitude": 77.48507
      },
      {
        "latitude": 13.71322,
        "longitude": 77.51439
      },
      {
        "latitude": 13.69738,
        "longitude": 77.51242
      },
      {
        "latitude": 13.69278,
        "longitude": 77.52733
      },
      {
        "latitude": 13.72527,
        "longitude": 77.53595
      },
      {
        "latitude": 13.74472,
        "longitude": 77.52207
      },
      {
        "latitude": 13.75329,
        "longitude": 77.52556
      },
      {
        "latitude": 13.75289,
        "longitude": 77.54745
      },
      {
        "latitude": 13.7233,
        "longitude": 77.55989
      },
      {
        "latitude": 13.73835,
        "longitude": 77.57334
      },
      {
        "latitude": 13.73344,
        "longitude": 77.5875
      },
      {
        "latitude": 13.75075,
        "longitude": 77.59998
      },
      {
        "latitude": 13.75205,
        "longitude": 77.61354
      },
      {
        "latitude": 13.73395,
        "longitude": 77.62649
      },
      {
        "latitude": 13.73829,
        "longitude": 77.63815
      },
      {
        "latitude": 13.74767,
        "longitude": 77.64169
      },
      {
        "latitude": 13.75535,
        "longitude": 77.61893
      },
      {
        "latitude": 13.76232,
        "longitude": 77.61759
      },
      {
        "latitude": 13.78413,
        "longitude": 77.65149
      },
      {
        "latitude": 13.78678,
        "longitude": 77.68008
      },
      {
        "latitude": 13.76049,
        "longitude": 77.67155
      },
      {
        "latitude": 13.76979,
        "longitude": 77.7033
      },
      {
        "latitude": 13.74024,
        "longitude": 77.70844
      },
      {
        "latitude": 13.74265,
        "longitude": 77.71536
      },
      {
        "latitude": 13.76863,
        "longitude": 77.72221
      },
      {
        "latitude": 13.80027,
        "longitude": 77.71931
      },
      {
        "latitude": 13.81242,
        "longitude": 77.74073
      },
      {
        "latitude": 13.81829,
        "longitude": 77.78154
      },
      {
        "latitude": 13.83047,
        "longitude": 77.78909
      },
      {
        "latitude": 13.84408,
        "longitude": 77.78227
      },
      {
        "latitude": 13.84897,
        "longitude": 77.81203
      },
      {
        "latitude": 13.86321,
        "longitude": 77.8202
      },
      {
        "latitude": 13.86989,
        "longitude": 77.83708
      },
      {
        "latitude": 13.87444,
        "longitude": 77.82733
      },
      {
        "latitude": 13.88097,
        "longitude": 77.83554
      },
      {
        "latitude": 13.89567,
        "longitude": 77.83196
      },
      {
        "latitude": 13.9001,
        "longitude": 77.81943
      },
      {
        "latitude": 13.91462,
        "longitude": 77.8135
      },
      {
        "latitude": 13.93193,
        "longitude": 77.81485
      },
      {
        "latitude": 13.94472,
        "longitude": 77.82659
      },
      {
        "latitude": 13.93581,
        "longitude": 77.8404
      },
      {
        "latitude": 13.94104,
        "longitude": 77.8957
      },
      {
        "latitude": 13.92036,
        "longitude": 77.89582
      },
      {
        "latitude": 13.90532,
        "longitude": 77.92677
      },
      {
        "latitude": 13.93523,
        "longitude": 77.94593
      },
      {
        "latitude": 13.93672,
        "longitude": 77.95734
      },
      {
        "latitude": 13.96016,
        "longitude": 77.96743
      },
      {
        "latitude": 13.95769,
        "longitude": 77.98262
      },
      {
        "latitude": 13.8978,
        "longitude": 77.98466
      },
      {
        "latitude": 13.88645,
        "longitude": 77.94908
      },
      {
        "latitude": 13.82735,
        "longitude": 77.95299
      },
      {
        "latitude": 13.82949,
        "longitude": 77.97611
      },
      {
        "latitude": 13.86881,
        "longitude": 77.99207
      },
      {
        "latitude": 13.87202,
        "longitude": 78
      },
      {
        "latitude": 13.86169,
        "longitude": 78.04605
      },
      {
        "latitude": 13.89645,
        "longitude": 78.0491
      },
      {
        "latitude": 13.88227,
        "longitude": 78.07716
      },
      {
        "latitude": 13.86163,
        "longitude": 78.08243
      },
      {
        "latitude": 13.8632,
        "longitude": 78.11447
      },
      {
        "latitude": 13.83136,
        "longitude": 78.12518
      },
      {
        "latitude": 13.80922,
        "longitude": 78.11406
      },
      {
        "latitude": 13.78668,
        "longitude": 78.12518
      },
      {
        "latitude": 13.78216,
        "longitude": 78.1479
      },
      {
        "latitude": 13.78959,
        "longitude": 78.18912
      },
      {
        "latitude": 13.77996,
        "longitude": 78.23622
      },
      {
        "latitude": 13.79144,
        "longitude": 78.26187
      },
      {
        "latitude": 13.83465,
        "longitude": 78.25687
      },
      {
        "latitude": 13.846,
        "longitude": 78.24116
      },
      {
        "latitude": 13.85782,
        "longitude": 78.26526
      },
      {
        "latitude": 13.88965,
        "longitude": 78.27853
      },
      {
        "latitude": 13.8956,
        "longitude": 78.27309
      },
      {
        "latitude": 13.89385,
        "longitude": 78.29873
      },
      {
        "latitude": 13.90826,
        "longitude": 78.30101
      },
      {
        "latitude": 13.92118,
        "longitude": 78.31854
      },
      {
        "latitude": 13.91814,
        "longitude": 78.33191
      },
      {
        "latitude": 13.93712,
        "longitude": 78.33768
      },
      {
        "latitude": 13.93549,
        "longitude": 78.3472
      },
      {
        "latitude": 13.95701,
        "longitude": 78.3706
      },
      {
        "latitude": 13.94517,
        "longitude": 78.37253
      },
      {
        "latitude": 13.93928,
        "longitude": 78.38692
      },
      {
        "latitude": 13.96387,
        "longitude": 78.42074
      },
      {
        "latitude": 13.97944,
        "longitude": 78.4277
      },
      {
        "latitude": 13.98761,
        "longitude": 78.46075
      },
      {
        "latitude": 14.00769,
        "longitude": 78.47007
      },
      {
        "latitude": 14.019,
        "longitude": 78.44087
      },
      {
        "latitude": 14.04371,
        "longitude": 78.44035
      },
      {
        "latitude": 14.05277,
        "longitude": 78.44933
      },
      {
        "latitude": 14.0811,
        "longitude": 78.44292
      },
      {
        "latitude": 14.08484,
        "longitude": 78.45464
      },
      {
        "latitude": 14.10809,
        "longitude": 78.46172
      },
      {
        "latitude": 14.13851,
        "longitude": 78.44378
      },
      {
        "latitude": 14.14044,
        "longitude": 78.42712
      },
      {
        "latitude": 14.14902,
        "longitude": 78.42211
      },
      {
        "latitude": 14.16878,
        "longitude": 78.41997
      },
      {
        "latitude": 14.19689,
        "longitude": 78.42975
      },
      {
        "latitude": 14.20184,
        "longitude": 78.40596
      },
      {
        "latitude": 14.28388,
        "longitude": 78.42081
      },
      {
        "latitude": 14.27756,
        "longitude": 78.39517
      },
      {
        "latitude": 14.2936,
        "longitude": 78.35741
      },
      {
        "latitude": 14.2924,
        "longitude": 78.28535
      },
      {
        "latitude": 14.30541,
        "longitude": 78.27743
      },
      {
        "latitude": 14.30522,
        "longitude": 78.25379
      },
      {
        "latitude": 14.31561,
        "longitude": 78.22914
      },
      {
        "latitude": 14.35023,
        "longitude": 78.18876
      },
      {
        "latitude": 14.393,
        "longitude": 78.10746
      },
      {
        "latitude": 14.42188,
        "longitude": 78.08524
      },
      {
        "latitude": 14.48951,
        "longitude": 78.0008
      },
      {
        "latitude": 14.5318,
        "longitude": 77.97289
      },
      {
        "latitude": 14.53782,
        "longitude": 77.97722
      },
      {
        "latitude": 14.57044,
        "longitude": 77.94408
      },
      {
        "latitude": 14.58868,
        "longitude": 77.96584
      },
      {
        "latitude": 14.56973,
        "longitude": 77.97469
      },
      {
        "latitude": 14.56729,
        "longitude": 77.98881
      },
      {
        "latitude": 14.59547,
        "longitude": 77.98218
      },
      {
        "latitude": 14.61167,
        "longitude": 77.99103
      },
      {
        "latitude": 14.63533,
        "longitude": 77.95792
      },
      {
        "latitude": 14.64846,
        "longitude": 77.89392
      },
      {
        "latitude": 14.64386,
        "longitude": 77.87854
      },
      {
        "latitude": 14.65438,
        "longitude": 77.87019
      },
      {
        "latitude": 14.638,
        "longitude": 77.85025
      },
      {
        "latitude": 14.61409,
        "longitude": 77.8558
      },
      {
        "latitude": 14.61289,
        "longitude": 77.84027
      },
      {
        "latitude": 14.60913,
        "longitude": 77.85515
      },
      {
        "latitude": 14.60054,
        "longitude": 77.85213
      },
      {
        "latitude": 14.6014,
        "longitude": 77.81765
      },
      {
        "latitude": 14.61605,
        "longitude": 77.80446
      },
      {
        "latitude": 14.61342,
        "longitude": 77.79524
      },
      {
        "latitude": 14.59569,
        "longitude": 77.77357
      },
      {
        "latitude": 14.59305,
        "longitude": 77.73735
      },
      {
        "latitude": 14.5767,
        "longitude": 77.73637
      },
      {
        "latitude": 14.57612,
        "longitude": 77.71481
      },
      {
        "latitude": 14.54619,
        "longitude": 77.70431
      },
      {
        "latitude": 14.53748,
        "longitude": 77.69371
      },
      {
        "latitude": 14.53661,
        "longitude": 77.65491
      },
      {
        "latitude": 14.51834,
        "longitude": 77.64978
      },
      {
        "latitude": 14.50914,
        "longitude": 77.67498
      },
      {
        "latitude": 14.49825,
        "longitude": 77.67696
      },
      {
        "latitude": 14.4829,
        "longitude": 77.65739
      },
      {
        "latitude": 14.48958,
        "longitude": 77.63425
      },
      {
        "latitude": 14.47845,
        "longitude": 77.61633
      },
      {
        "latitude": 14.45997,
        "longitude": 77.60859
      },
      {
        "latitude": 14.46055,
        "longitude": 77.58486
      },
      {
        "latitude": 14.45288,
        "longitude": 77.57149
      },
      {
        "latitude": 14.46264,
        "longitude": 77.57112
      },
      {
        "latitude": 14.45981,
        "longitude": 77.5473
      },
      {
        "latitude": 14.47587,
        "longitude": 77.53164
      },
      {
        "latitude": 14.48492,
        "longitude": 77.53239
      },
      {
        "latitude": 14.48955,
        "longitude": 77.51806
      },
      {
        "latitude": 14.47155,
        "longitude": 77.49138
      },
      {
        "latitude": 14.47937,
        "longitude": 77.47931
      },
      {
        "latitude": 14.48993,
        "longitude": 77.4848
      },
      {
        "latitude": 14.51494,
        "longitude": 77.47232
      },
      {
        "latitude": 14.53356,
        "longitude": 77.4786
      },
      {
        "latitude": 14.57034,
        "longitude": 77.47151
      },
      {
        "latitude": 14.5728,
        "longitude": 77.46356
      },
      {
        "latitude": 14.55313,
        "longitude": 77.42651
      },
      {
        "latitude": 14.55413,
        "longitude": 77.39
      },
      {
        "latitude": 14.53933,
        "longitude": 77.35631
      },
      {
        "latitude": 14.49831,
        "longitude": 77.37741
      },
      {
        "latitude": 14.48391,
        "longitude": 77.35908
      },
      {
        "latitude": 14.46222,
        "longitude": 77.36319
      },
      {
        "latitude": 14.45266,
        "longitude": 77.33291
      },
      {
        "latitude": 14.43612,
        "longitude": 77.32451
      },
      {
        "latitude": 14.38138,
        "longitude": 77.31661
      },
      {
        "latitude": 14.35303,
        "longitude": 77.33276
      },
      {
        "latitude": 14.33776,
        "longitude": 77.32834
      },
      {
        "latitude": 14.33492,
        "longitude": 77.31664
      },
      {
        "latitude": 14.31183,
        "longitude": 77.32026
      },
      {
        "latitude": 14.30253,
        "longitude": 77.34233
      },
      {
        "latitude": 14.30853,
        "longitude": 77.34962
      },
      {
        "latitude": 14.27664,
        "longitude": 77.35761
      },
      {
        "latitude": 14.27583,
        "longitude": 77.36386
      },
      {
        "latitude": 14.23401,
        "longitude": 77.35949
      },
      {
        "latitude": 14.22648,
        "longitude": 77.37917
      },
      {
        "latitude": 14.19884,
        "longitude": 77.3926
      },
      {
        "latitude": 14.21162,
        "longitude": 77.41939
      },
      {
        "latitude": 14.26669,
        "longitude": 77.40543
      },
      {
        "latitude": 14.27187,
        "longitude": 77.38698
      },
      {
        "latitude": 14.32272,
        "longitude": 77.37908
      },
      {
        "latitude": 14.33775,
        "longitude": 77.40649
      },
      {
        "latitude": 14.32864,
        "longitude": 77.42844
      },
      {
        "latitude": 14.31296,
        "longitude": 77.4313
      },
      {
        "latitude": 14.31747,
        "longitude": 77.44626
      },
      {
        "latitude": 14.28071,
        "longitude": 77.45032
      },
      {
        "latitude": 14.29216,
        "longitude": 77.47897
      },
      {
        "latitude": 14.27885,
        "longitude": 77.49832
      },
      {
        "latitude": 14.25977,
        "longitude": 77.50341
      },
      {
        "latitude": 14.23088,
        "longitude": 77.49258
      },
      {
        "latitude": 14.19541,
        "longitude": 77.50509
      },
      {
        "latitude": 14.18549,
        "longitude": 77.51815
      },
      {
        "latitude": 14.15755,
        "longitude": 77.50329
      },
      {
        "latitude": 14.16527,
        "longitude": 77.46811
      },
      {
        "latitude": 14.17197,
        "longitude": 77.46712
      },
      {
        "latitude": 14.17414,
        "longitude": 77.39378
      },
      {
        "latitude": 14.16071,
        "longitude": 77.39494
      },
      {
        "latitude": 14.13586,
        "longitude": 77.37905
      },
      {
        "latitude": 14.13112,
        "longitude": 77.35199
      },
      {
        "latitude": 14.10355,
        "longitude": 77.3474
      },
      {
        "latitude": 14.12669,
        "longitude": 77.39096
      },
      {
        "latitude": 14.12004,
        "longitude": 77.40124
      },
      {
        "latitude": 14.06224,
        "longitude": 77.36015
      },
      {
        "latitude": 14.06016,
        "longitude": 77.34036
      },
      {
        "latitude": 14.03055,
        "longitude": 77.3323
      },
      {
        "latitude": 14.01664,
        "longitude": 77.39027
      },
      {
        "latitude": 13.97613,
        "longitude": 77.38155
      },
      {
        "latitude": 13.98611,
        "longitude": 77.42589
      },
      {
        "latitude": 13.97552,
        "longitude": 77.43788
      },
      {
        "latitude": 13.94792,
        "longitude": 77.43546
      },
      {
        "latitude": 13.94598,
        "longitude": 77.41199
      },
      {
        "latitude": 13.92405,
        "longitude": 77.41599
      },
      {
        "latitude": 13.91541,
        "longitude": 77.43514
      },
      {
        "latitude": 13.88985,
        "longitude": 77.40556
      },
      {
        "latitude": 13.88852,
        "longitude": 77.39884
      },
      {
        "latitude": 13.90643,
        "longitude": 77.39777
      },
      {
        "latitude": 13.90377,
        "longitude": 77.35773
      },
      {
        "latitude": 13.91599,
        "longitude": 77.3477
      },
      {
        "latitude": 13.95319,
        "longitude": 77.37151
      },
      {
        "latitude": 13.95854,
        "longitude": 77.34959
      },
      {
        "latitude": 13.99101,
        "longitude": 77.36096
      },
      {
        "latitude": 13.99587,
        "longitude": 77.33628
      },
      {
        "latitude": 14.02999,
        "longitude": 77.32223
      },
      {
        "latitude": 14.03223,
        "longitude": 77.30669
      },
      {
        "latitude": 14.01168,
        "longitude": 77.2751
      },
      {
        "latitude": 14.03241,
        "longitude": 77.27876
      },
      {
        "latitude": 14.03448,
        "longitude": 77.27036
      },
      {
        "latitude": 14.01194,
        "longitude": 77.24535
      },
      {
        "latitude": 14.01299,
        "longitude": 77.174
      },
      {
        "latitude": 14.00085,
        "longitude": 77.17286
      },
      {
        "latitude": 14.00044,
        "longitude": 77.15177
      },
      {
        "latitude": 14.00385,
        "longitude": 77.14108
      },
      {
        "latitude": 14.04702,
        "longitude": 77.1274
      },
      {
        "latitude": 14.04264,
        "longitude": 77.07892
      },
      {
        "latitude": 14.05327,
        "longitude": 77.07613
      },
      {
        "latitude": 14.05685,
        "longitude": 77.03164
      },
      {
        "latitude": 14.06612,
        "longitude": 77.02555
      },
      {
        "latitude": 14.08817,
        "longitude": 77.0298
      },
      {
        "latitude": 14.1,
        "longitude": 77.01468
      },
      {
        "latitude": 14.12502,
        "longitude": 77.02622
      },
      {
        "latitude": 14.13129,
        "longitude": 77.02022
      },
      {
        "latitude": 14.17744,
        "longitude": 77.02206
      },
      {
        "latitude": 14.18397,
        "longitude": 77.00546
      },
      {
        "latitude": 14.18062,
        "longitude": 76.96342
      },
      {
        "latitude": 14.19728,
        "longitude": 76.949
      },
      {
        "latitude": 14.17223,
        "longitude": 76.9424
      },
      {
        "latitude": 14.16372,
        "longitude": 76.92116
      },
      {
        "latitude": 14.16689,
        "longitude": 76.89629
      },
      {
        "latitude": 14.13623,
        "longitude": 76.88859
      }
    ],
    "polygons": [
      [
        {
          "latitude": 14.13623,
          "longitude": 76.88859
        },
        {
          "latitude": 14.12774,
          "longitude": 76.9165
        },
        {
          "latitude": 14.13641,
          "longitude": 76.92645
        },
        {
          "latitude": 14.12007,
          "longitude": 76.94562
        },
        {
          "latitude": 14.0917,
          "longitude": 76.95205
        },
        {
          "latitude": 14.08201,
          "longitude": 76.97561
        },
        {
          "latitude": 14.05786,
          "longitude": 76.97372
        },
        {
          "latitude": 14.05356,
          "longitude": 76.93511
        },
        {
          "latitude": 14.03178,
          "longitude": 76.93313
        },
        {
          "latitude": 13.98947,
          "longitude": 77.00031
        },
        {
          "latitude": 13.9614,
          "longitude": 76.9967
        },
        {
          "latitude": 13.93343,
          "longitude": 77.04166
        },
        {
          "latitude": 13.9066,
          "longitude": 77.0473
        },
        {
          "latitude": 13.9026,
          "longitude": 77.02303
        },
        {
          "latitude": 13.86031,
          "longitude": 77.01422
        },
        {
          "latitude": 13.84893,
          "longitude": 76.99226
        },
        {
          "latitude": 13.82497,
          "longitude": 76.97749
        },
        {
          "latitude": 13.81822,
          "longitude": 76.9763
        },
        {
          "latitude": 13.80761,
          "longitude": 76.99072
        },
        {
          "latitude": 13.79058,
          "longitude": 76.98517
        },
        {
          "latitude": 13.74629,
          "longitude": 76.99764
        },
        {
          "latitude": 13.73851,
          "longitude": 77.0165
        },
        {
          "latitude": 13.77922,
          "longitude": 77.02447
        },
        {
          "latitude": 13.77779,
          "longitude": 77.04337
        },
        {
          "latitude": 13.74383,
          "longitude": 77.0647
        },
        {
          "latitude": 13.74244,
          "longitude": 77.08564
        },
        {
          "latitude": 13.76714,
          "longitude": 77.09045
        },
        {
          "latitude": 13.7583,
          "longitude": 77.13684
        },
        {
          "latitude": 13.76621,
          "longitude": 77.15112
        },
        {
          "latitude": 13.76201,
          "longitude": 77.17305
        },
        {
          "latitude": 13.78268,
          "longitude": 77.17851
        },
        {
          "latitude": 13.80603,
          "longitude": 77.15752
        },
        {
          "latitude": 13.82962,
          "longitude": 77.16869
        },
        {
          "latitude": 13.83413,
          "longitude": 77.15368
        },
        {
          "latitude": 13.84435,
          "longitude": 77.15602
        },
        {
          "latitude": 13.8462,
          "longitude": 77.13217
        },
        {
          "latitude": 13.85646,
          "longitude": 77.1282
        },
        {
          "latitude": 13.86848,
          "longitude": 77.14764
        },
        {
          "latitude": 13.86449,
          "longitude": 77.16858
        },
        {
          "latitude": 13.90662,
          "longitude": 77.16194
        },
        {
          "latitude": 13.92061,
          "longitude": 77.16992
        },
        {
          "latitude": 13.92519,
          "longitude": 77.18471
        },
        {
          "latitude": 13.91187,
          "longitude": 77.19084
        },
        {
          "latitude": 13.86984,
          "longitude": 77.18139
        },
        {
          "latitude": 13.86304,
          "longitude": 77.20043
        },
        {
          "latitude": 13.88619,
          "longitude": 77.21313
        },
        {
          "latitude": 13.86772,
          "longitude": 77.21985
        },
        {
          "latitude": 13.90414,
          "longitude": 77.23562
        },
        {
          "latitude": 13.90121,
          "longitude": 77.24827
        },
        {
          "latitude": 13.86793,
          "longitude": 77.24627
        },
        {
          "latitude": 13.86314,
          "longitude": 77.25912
        },
        {
          "latitude": 13.84652,
          "longitude": 77.2567
        },
        {
          "latitude": 13.84748,
          "longitude": 77.28829
        },
        {
          "latitude": 13.8665,
          "longitude": 77.3113
        },
        {
          "latitude": 13.85592,
          "longitude": 77.32145
        },
        {
          "latitude": 13.83324,
          "longitude": 77.32538
        },
        {
          "latitude": 13.83275,
          "longitude": 77.33685
        },
        {
          "latitude": 13.85422,
          "longitude": 77.36279
        },
        {
          "latitude": 13.84931,
          "longitude": 77.37867
        },
        {
          "latitude": 13.83936,
          "longitude": 77.3819
        },
        {
          "latitude": 13.84322,
          "longitude": 77.43252
        },
        {
          "latitude": 13.80875,
          "longitude": 77.41643
        },
        {
          "latitude": 13.8068,
          "longitude": 77.42865
        },
        {
          "latitude": 13.79909,
          "longitude": 77.42257
        },
        {
          "latitude": 13.7967,
          "longitude": 77.43703
        },
        {
          "latitude": 13.81102,
          "longitude": 77.44533
        },
        {
          "latitude": 13.8081,
          "longitude": 77.46454
        },
        {
          "latitude": 13.78883,
          "longitude": 77.4564
        },
        {
          "latitude": 13.75802,
          "longitude": 77.47056
        },
        {
          "latitude": 13.71104,
          "longitude": 77.46492
        },
        {
          "latitude": 13.71096,
          "longitude": 77.44989
        },
        {
          "latitude": 13.68264,
          "longitude": 77.45532
        },
        {
          "latitude": 13.69014,
          "longitude": 77.49193
        },
        {
          "latitude": 13.71477,
          "longitude": 77.48507
        },
        {
          "latitude": 13.71322,
          "longitude": 77.51439
        },
        {
          "latitude": 13.69738,
          "longitude": 77.51242
        },
        {
          "latitude": 13.69278,
          "longitude": 77.52733
        },
        {
          "latitude": 13.72527,
          "longitude": 77.53595
        },
        {
          "latitude": 13.74472,
          "longitude": 77.52207
        },
        {
          "latitude": 13.75329,
          "longitude": 77.52556
        },
        {
          "latitude": 13.75289,
          "longitude": 77.54745
        },
        {
          "latitude": 13.7233,
          "longitude": 77.55989
        },
        {
          "latitude": 13.73835,
          "longitude": 77.57334
        },
        {
          "latitude": 13.73344,
          "longitude": 77.5875
        },
        {
          "latitude": 13.75075,
          "longitude": 77.59998
        },
        {
          "latitude": 13.75205,
          "longitude": 77.61354
        },
        {
          "latitude": 13.73395,
          "longitude": 77.62649
        },
        {
          "latitude": 13.73829,
          "longitude": 77.63815
        },
        {
          "latitude": 13.74767,
          "longitude": 77.64169
        },
        {
          "latitude": 13.75535,
          "longitude": 77.61893
        },
        {
          "latitude": 13.76232,
          "longitude": 77.61759
        },
        {
          "latitude": 13.78413,
          "longitude": 77.65149
        },
        {
          "latitude": 13.78678,
          "longitude": 77.68008
        },
        {
          "latitude": 13.76049,
          "longitude": 77.67155
        },
        {
          "latitude": 13.76979,
          "longitude": 77.7033
        },
        {
          "latitude": 13.74024,
          "longitude": 77.70844
        },
        {
          "latitude": 13.74265,
          "longitude": 77.71536
        },
        {
          "latitude": 13.76863,
          "longitude": 77.72221
        },
        {
          "latitude": 13.80027,
          "longitude": 77.71931
        },
        {
          "latitude": 13.81242,
          "longitude": 77.74073
        },
        {
          "latitude": 13.81829,
          "longitude": 77.78154
        },
        {
          "latitude": 13.83047,
          "longitude": 77.78909
        },
        {
          "latitude": 13.84408,
          "longitude": 77.78227
        },
        {
          "latitude": 13.84897,
          "longitude": 77.81203
        },
        {
          "latitude": 13.86321,
          "longitude": 77.8202
        },
        {
          "latitude": 13.86989,
          "longitude": 77.83708
        },
        {
          "latitude": 13.87444,
          "longitude": 77.82733
        },
        {
          "latitude": 13.88097,
          "longitude": 77.83554
        },
        {
          "latitude": 13.89567,
          "longitude": 77.83196
        },
        {
          "latitude": 13.9001,
          "longitude": 77.81943
        },
        {
          "latitude": 13.91462,
          "longitude": 77.8135
        },
        {
          "latitude": 13.93193,
          "longitude": 77.81485
        },
        {
          "latitude": 13.94472,
          "longitude": 77.82659
        },
        {
          "latitude": 13.93581,
          "longitude": 77.8404
        },
        {
          "latitude": 13.94104,
          "longitude": 77.8957
        },
        {
          "latitude": 13.92036,
          "longitude": 77.89582
        },
        {
          "latitude": 13.90532,
          "longitude": 77.92677
        },
        {
          "latitude": 13.93523,
          "longitude": 77.94593
        },
        {
          "latitude": 13.93672,
          "longitude": 77.95734
        },
        {
          "latitude": 13.96016,
          "longitude": 77.96743
        },
        {
          "latitude": 13.95769,
          "longitude": 77.98262
        },
        {
          "latitude": 13.8978,
          "longitude": 77.98466
        },
        {
          "latitude": 13.88645,
          "longitude": 77.94908
        },
        {
          "latitude": 13.82735,
          "longitude": 77.95299
        },
        {
          "latitude": 13.82949,
          "longitude": 77.97611
        },
        {
          "latitude": 13.86881,
          "longitude": 77.99207
        },
        {
          "latitude": 13.87202,
          "longitude": 78
        },
        {
          "latitude": 13.86169,
          "longitude": 78.04605
        },
        {
          "latitude": 13.89645,
          "longitude": 78.0491
        },
        {
          "latitude": 13.88227,
          "longitude": 78.07716
        },
        {
          "latitude": 13.86163,
          "longitude": 78.08243
        },
        {
          "latitude": 13.8632,
          "longitude": 78.11447
        },
        {
          "latitude": 13.83136,
          "longitude": 78.12518
        },
        {
          "latitude": 13.80922,
          "longitude": 78.11406
        },
        {
          "latitude": 13.78668,
          "longitude": 78.12518
        },
        {
          "latitude": 13.78216,
          "longitude": 78.1479
        },
        {
          "latitude": 13.78959,
          "longitude": 78.18912
        },
        {
          "latitude": 13.77996,
          "longitude": 78.23622
        },
        {
          "latitude": 13.79144,
          "longitude": 78.26187
        },
        {
          "latitude": 13.83465,
          "longitude": 78.25687
        },
        {
          "latitude": 13.846,
          "longitude": 78.24116
        },
        {
          "latitude": 13.85782,
          "longitude": 78.26526
        },
        {
          "latitude": 13.88965,
          "longitude": 78.27853
        },
        {
          "latitude": 13.8956,
          "longitude": 78.27309
        },
        {
          "latitude": 13.89385,
          "longitude": 78.29873
        },
        {
          "latitude": 13.90826,
          "longitude": 78.30101
        },
        {
          "latitude": 13.92118,
          "longitude": 78.31854
        },
        {
          "latitude": 13.91814,
          "longitude": 78.33191
        },
        {
          "latitude": 13.93712,
          "longitude": 78.33768
        },
        {
          "latitude": 13.93549,
          "longitude": 78.3472
        },
        {
          "latitude": 13.95701,
          "longitude": 78.3706
        },
        {
          "latitude": 13.94517,
          "longitude": 78.37253
        },
        {
          "latitude": 13.93928,
          "longitude": 78.38692
        },
        {
          "latitude": 13.96387,
          "longitude": 78.42074
        },
        {
          "latitude": 13.97944,
          "longitude": 78.4277
        },
        {
          "latitude": 13.98761,
          "longitude": 78.46075
        },
        {
          "latitude": 14.00769,
          "longitude": 78.47007
        },
        {
          "latitude": 14.019,
          "longitude": 78.44087
        },
        {
          "latitude": 14.04371,
          "longitude": 78.44035
        },
        {
          "latitude": 14.05277,
          "longitude": 78.44933
        },
        {
          "latitude": 14.0811,
          "longitude": 78.44292
        },
        {
          "latitude": 14.08484,
          "longitude": 78.45464
        },
        {
          "latitude": 14.10809,
          "longitude": 78.46172
        },
        {
          "latitude": 14.13851,
          "longitude": 78.44378
        },
        {
          "latitude": 14.14044,
          "longitude": 78.42712
        },
        {
          "latitude": 14.14902,
          "longitude": 78.42211
        },
        {
          "latitude": 14.16878,
          "longitude": 78.41997
        },
        {
          "latitude": 14.19689,
          "longitude": 78.42975
        },
        {
          "latitude": 14.20184,
          "longitude": 78.40596
        },
        {
          "latitude": 14.28388,
          "longitude": 78.42081
        },
        {
          "latitude": 14.27756,
          "longitude": 78.39517
        },
        {
          "latitude": 14.2936,
          "longitude": 78.35741
        },
        {
          "latitude": 14.2924,
          "longitude": 78.28535
        },
        {
          "latitude": 14.30541,
          "longitude": 78.27743
        },
        {
          "latitude": 14.30522,
          "longitude": 78.25379
        },
        {
          "latitude": 14.31561,
          "longitude": 78.22914
        },
        {
          "latitude": 14.35023,
          "longitude": 78.18876
        },
        {
          "latitude": 14.393,
          "longitude": 78.10746
        },
        {
          "latitude": 14.42188,
          "longitude": 78.08524
        },
        {
          "latitude": 14.48951,
          "longitude": 78.0008
        },
        {
          "latitude": 14.5318,
          "longitude": 77.97289
        },
        {
          "latitude": 14.53782,
          "longitude": 77.97722
        },
        {
          "latitude": 14.57044,
          "longitude": 77.94408
        },
        {
          "latitude": 14.58868,
          "longitude": 77.96584
        },
        {
          "latitude": 14.56973,
          "longitude": 77.97469
        },
        {
          "latitude": 14.56729,
          "longitude": 77.98881
        },
        {
          "latitude": 14.59547,
          "longitude": 77.98218
        },
        {
          "latitude": 14.61167,
          "longitude": 77.99103
        },
        {
          "latitude": 14.63533,
          "longitude": 77.95792
        },
        {
          "latitude": 14.64846,
          "longitude": 77.89392
        },
        {
          "latitude": 14.64386,
          "longitude": 77.87854
        },
        {
          "latitude": 14.65438,
          "longitude": 77.87019
        },
        {
          "latitude": 14.638,
          "longitude": 77.85025
        },
        {
          "latitude": 14.61409,
          "longitude": 77.8558
        },
        {
          "latitude": 14.61289,
          "longitude": 77.84027
        },
        {
          "latitude": 14.60913,
          "longitude": 77.85515
        },
        {
          "latitude": 14.60054,
          "longitude": 77.85213
        },
        {
          "latitude": 14.6014,
          "longitude": 77.81765
        },
        {
          "latitude": 14.61605,
          "longitude": 77.80446
        },
        {
          "latitude": 14.61342,
          "longitude": 77.79524
        },
        {
          "latitude": 14.59569,
          "longitude": 77.77357
        },
        {
          "latitude": 14.59305,
          "longitude": 77.73735
        },
        {
          "latitude": 14.5767,
          "longitude": 77.73637
        },
        {
          "latitude": 14.57612,
          "longitude": 77.71481
        },
        {
          "latitude": 14.54619,
          "longitude": 77.70431
        },
        {
          "latitude": 14.53748,
          "longitude": 77.69371
        },
        {
          "latitude": 14.53661,
          "longitude": 77.65491
        },
        {
          "latitude": 14.51834,
          "longitude": 77.64978
        },
        {
          "latitude": 14.50914,
          "longitude": 77.67498
        },
        {
          "latitude": 14.49825,
          "longitude": 77.67696
        },
        {
          "latitude": 14.4829,
          "longitude": 77.65739
        },
        {
          "latitude": 14.48958,
          "longitude": 77.63425
        },
        {
          "latitude": 14.47845,
          "longitude": 77.61633
        },
        {
          "latitude": 14.45997,
          "longitude": 77.60859
        },
        {
          "latitude": 14.46055,
          "longitude": 77.58486
        },
        {
          "latitude": 14.45288,
          "longitude": 77.57149
        },
        {
          "latitude": 14.46264,
          "longitude": 77.57112
        },
        {
          "latitude": 14.45981,
          "longitude": 77.5473
        },
        {
          "latitude": 14.47587,
          "longitude": 77.53164
        },
        {
          "latitude": 14.48492,
          "longitude": 77.53239
        },
        {
          "latitude": 14.48955,
          "longitude": 77.51806
        },
        {
          "latitude": 14.47155,
          "longitude": 77.49138
        },
        {
          "latitude": 14.47937,
          "longitude": 77.47931
        },
        {
          "latitude": 14.48993,
          "longitude": 77.4848
        },
        {
          "latitude": 14.51494,
          "longitude": 77.47232
        },
        {
          "latitude": 14.53356,
          "longitude": 77.4786
        },
        {
          "latitude": 14.57034,
          "longitude": 77.47151
        },
        {
          "latitude": 14.5728,
          "longitude": 77.46356
        },
        {
          "latitude": 14.55313,
          "longitude": 77.42651
        },
        {
          "latitude": 14.55413,
          "longitude": 77.39
        },
        {
          "latitude": 14.53933,
          "longitude": 77.35631
        },
        {
          "latitude": 14.49831,
          "longitude": 77.37741
        },
        {
          "latitude": 14.48391,
          "longitude": 77.35908
        },
        {
          "latitude": 14.46222,
          "longitude": 77.36319
        },
        {
          "latitude": 14.45266,
          "longitude": 77.33291
        },
        {
          "latitude": 14.43612,
          "longitude": 77.32451
        },
        {
          "latitude": 14.38138,
          "longitude": 77.31661
        },
        {
          "latitude": 14.35303,
          "longitude": 77.33276
        },
        {
          "latitude": 14.33776,
          "longitude": 77.32834
        },
        {
          "latitude": 14.33492,
          "longitude": 77.31664
        },
        {
          "latitude": 14.31183,
          "longitude": 77.32026
        },
        {
          "latitude": 14.30253,
          "longitude": 77.34233
        },
        {
          "latitude": 14.30853,
          "longitude": 77.34962
        },
        {
          "latitude": 14.27664,
          "longitude": 77.35761
        },
        {
          "latitude": 14.27583,
          "longitude": 77.36386
        },
        {
          "latitude": 14.23401,
          "longitude": 77.35949
        },
        {
          "latitude": 14.22648,
          "longitude": 77.37917
        },
        {
          "latitude": 14.19884,
          "longitude": 77.3926
        },
        {
          "latitude": 14.21162,
          "longitude": 77.41939
        },
        {
          "latitude": 14.26669,
          "longitude": 77.40543
        },
        {
          "latitude": 14.27187,
          "longitude": 77.38698
        },
        {
          "latitude": 14.32272,
          "longitude": 77.37908
        },
        {
          "latitude": 14.33775,
          "longitude": 77.40649
        },
        {
          "latitude": 14.32864,
          "longitude": 77.42844
        },
        {
          "latitude": 14.31296,
          "longitude": 77.4313
        },
        {
          "latitude": 14.31747,
          "longitude": 77.44626
        },
        {
          "latitude": 14.28071,
          "longitude": 77.45032
        },
        {
          "latitude": 14.29216,
          "longitude": 77.47897
        },
        {
          "latitude": 14.27885,
          "longitude": 77.49832
        },
        {
          "latitude": 14.25977,
          "longitude": 77.50341
        },
        {
          "latitude": 14.23088,
          "longitude": 77.49258
        },
        {
          "latitude": 14.19541,
          "longitude": 77.50509
        },
        {
          "latitude": 14.18549,
          "longitude": 77.51815
        },
        {
          "latitude": 14.15755,
          "longitude": 77.50329
        },
        {
          "latitude": 14.16527,
          "longitude": 77.46811
        },
        {
          "latitude": 14.17197,
          "longitude": 77.46712
        },
        {
          "latitude": 14.17414,
          "longitude": 77.39378
        },
        {
          "latitude": 14.16071,
          "longitude": 77.39494
        },
        {
          "latitude": 14.13586,
          "longitude": 77.37905
        },
        {
          "latitude": 14.13112,
          "longitude": 77.35199
        },
        {
          "latitude": 14.10355,
          "longitude": 77.3474
        },
        {
          "latitude": 14.12669,
          "longitude": 77.39096
        },
        {
          "latitude": 14.12004,
          "longitude": 77.40124
        },
        {
          "latitude": 14.06224,
          "longitude": 77.36015
        },
        {
          "latitude": 14.06016,
          "longitude": 77.34036
        },
        {
          "latitude": 14.03055,
          "longitude": 77.3323
        },
        {
          "latitude": 14.01664,
          "longitude": 77.39027
        },
        {
          "latitude": 13.97613,
          "longitude": 77.38155
        },
        {
          "latitude": 13.98611,
          "longitude": 77.42589
        },
        {
          "latitude": 13.97552,
          "longitude": 77.43788
        },
        {
          "latitude": 13.94792,
          "longitude": 77.43546
        },
        {
          "latitude": 13.94598,
          "longitude": 77.41199
        },
        {
          "latitude": 13.92405,
          "longitude": 77.41599
        },
        {
          "latitude": 13.91541,
          "longitude": 77.43514
        },
        {
          "latitude": 13.88985,
          "longitude": 77.40556
        },
        {
          "latitude": 13.88852,
          "longitude": 77.39884
        },
        {
          "latitude": 13.90643,
          "longitude": 77.39777
        },
        {
          "latitude": 13.90377,
          "longitude": 77.35773
        },
        {
          "latitude": 13.91599,
          "longitude": 77.3477
        },
        {
          "latitude": 13.95319,
          "longitude": 77.37151
        },
        {
          "latitude": 13.95854,
          "longitude": 77.34959
        },
        {
          "latitude": 13.99101,
          "longitude": 77.36096
        },
        {
          "latitude": 13.99587,
          "longitude": 77.33628
        },
        {
          "latitude": 14.02999,
          "longitude": 77.32223
        },
        {
          "latitude": 14.03223,
          "longitude": 77.30669
        },
        {
          "latitude": 14.01168,
          "longitude": 77.2751
        },
        {
          "latitude": 14.03241,
          "longitude": 77.27876
        },
        {
          "latitude": 14.03448,
          "longitude": 77.27036
        },
        {
          "latitude": 14.01194,
          "longitude": 77.24535
        },
        {
          "latitude": 14.01299,
          "longitude": 77.174
        },
        {
          "latitude": 14.00085,
          "longitude": 77.17286
        },
        {
          "latitude": 14.00044,
          "longitude": 77.15177
        },
        {
          "latitude": 14.00385,
          "longitude": 77.14108
        },
        {
          "latitude": 14.04702,
          "longitude": 77.1274
        },
        {
          "latitude": 14.04264,
          "longitude": 77.07892
        },
        {
          "latitude": 14.05327,
          "longitude": 77.07613
        },
        {
          "latitude": 14.05685,
          "longitude": 77.03164
        },
        {
          "latitude": 14.06612,
          "longitude": 77.02555
        },
        {
          "latitude": 14.08817,
          "longitude": 77.0298
        },
        {
          "latitude": 14.1,
          "longitude": 77.01468
        },
        {
          "latitude": 14.12502,
          "longitude": 77.02622
        },
        {
          "latitude": 14.13129,
          "longitude": 77.02022
        },
        {
          "latitude": 14.17744,
          "longitude": 77.02206
        },
        {
          "latitude": 14.18397,
          "longitude": 77.00546
        },
        {
          "latitude": 14.18062,
          "longitude": 76.96342
        },
        {
          "latitude": 14.19728,
          "longitude": 76.949
        },
        {
          "latitude": 14.17223,
          "longitude": 76.9424
        },
        {
          "latitude": 14.16372,
          "longitude": 76.92116
        },
        {
          "latitude": 14.16689,
          "longitude": 76.89629
        },
        {
          "latitude": 14.13623,
          "longitude": 76.88859
        }
      ]
    ]
  },
  {
    "id": "srikakulam",
    "name": "Srikakulam",
    "headquarters": "Srikakulam",
    "center": {
      "latitude": 18.5848,
      "longitude": 84.1144
    },
    "region": "North Coastal",
    "polygon": [
      {
        "latitude": 18.3558,
        "longitude": 83.58502
      },
      {
        "latitude": 18.33977,
        "longitude": 83.61014
      },
      {
        "latitude": 18.32901,
        "longitude": 83.60039
      },
      {
        "latitude": 18.33369,
        "longitude": 83.62354
      },
      {
        "latitude": 18.32202,
        "longitude": 83.62164
      },
      {
        "latitude": 18.31696,
        "longitude": 83.66849
      },
      {
        "latitude": 18.30591,
        "longitude": 83.69616
      },
      {
        "latitude": 18.29418,
        "longitude": 83.70292
      },
      {
        "latitude": 18.2825,
        "longitude": 83.67365
      },
      {
        "latitude": 18.27043,
        "longitude": 83.6644
      },
      {
        "latitude": 18.23143,
        "longitude": 83.66368
      },
      {
        "latitude": 18.21105,
        "longitude": 83.64959
      },
      {
        "latitude": 18.2177,
        "longitude": 83.62581
      },
      {
        "latitude": 18.2076,
        "longitude": 83.60251
      },
      {
        "latitude": 18.17822,
        "longitude": 83.61502
      },
      {
        "latitude": 18.1574,
        "longitude": 83.60276
      },
      {
        "latitude": 18.13097,
        "longitude": 83.62353
      },
      {
        "latitude": 18.11541,
        "longitude": 83.6202
      },
      {
        "latitude": 18.10424,
        "longitude": 83.64479
      },
      {
        "latitude": 18.07829,
        "longitude": 83.66402
      },
      {
        "latitude": 18.1293,
        "longitude": 83.75059
      },
      {
        "latitude": 18.27664,
        "longitude": 84.07095
      },
      {
        "latitude": 18.31095,
        "longitude": 84.12374
      },
      {
        "latitude": 18.34341,
        "longitude": 84.12716
      },
      {
        "latitude": 18.37347,
        "longitude": 84.14741
      },
      {
        "latitude": 18.47548,
        "longitude": 84.25434
      },
      {
        "latitude": 18.55496,
        "longitude": 84.35472
      },
      {
        "latitude": 18.59318,
        "longitude": 84.36838
      },
      {
        "latitude": 18.65955,
        "longitude": 84.43984
      },
      {
        "latitude": 18.69296,
        "longitude": 84.4532
      },
      {
        "latitude": 18.74019,
        "longitude": 84.49308
      },
      {
        "latitude": 18.79054,
        "longitude": 84.55148
      },
      {
        "latitude": 18.8178,
        "longitude": 84.55783
      },
      {
        "latitude": 18.88977,
        "longitude": 84.60361
      },
      {
        "latitude": 18.9572,
        "longitude": 84.67544
      },
      {
        "latitude": 19.05492,
        "longitude": 84.74986
      },
      {
        "latitude": 19.07719,
        "longitude": 84.76508
      },
      {
        "latitude": 19.12644,
        "longitude": 84.69783
      },
      {
        "latitude": 19.14103,
        "longitude": 84.70612
      },
      {
        "latitude": 19.14706,
        "longitude": 84.70118
      },
      {
        "latitude": 19.14646,
        "longitude": 84.71052
      },
      {
        "latitude": 19.15761,
        "longitude": 84.71254
      },
      {
        "latitude": 19.16604,
        "longitude": 84.67091
      },
      {
        "latitude": 19.12986,
        "longitude": 84.66732
      },
      {
        "latitude": 19.13245,
        "longitude": 84.59553
      },
      {
        "latitude": 19.10078,
        "longitude": 84.60954
      },
      {
        "latitude": 19.09909,
        "longitude": 84.62548
      },
      {
        "latitude": 19.08491,
        "longitude": 84.62549
      },
      {
        "latitude": 19.0821,
        "longitude": 84.6312
      },
      {
        "latitude": 19.09626,
        "longitude": 84.64704
      },
      {
        "latitude": 19.09443,
        "longitude": 84.65897
      },
      {
        "latitude": 19.07633,
        "longitude": 84.67085
      },
      {
        "latitude": 19.07461,
        "longitude": 84.66308
      },
      {
        "latitude": 19.06304,
        "longitude": 84.66113
      },
      {
        "latitude": 19.06587,
        "longitude": 84.61831
      },
      {
        "latitude": 19.05985,
        "longitude": 84.62243
      },
      {
        "latitude": 19.05657,
        "longitude": 84.61343
      },
      {
        "latitude": 19.02479,
        "longitude": 84.6009
      },
      {
        "latitude": 19.03009,
        "longitude": 84.58167
      },
      {
        "latitude": 19.07273,
        "longitude": 84.5831
      },
      {
        "latitude": 19.06757,
        "longitude": 84.5747
      },
      {
        "latitude": 19.07372,
        "longitude": 84.57286
      },
      {
        "latitude": 19.05658,
        "longitude": 84.5566
      },
      {
        "latitude": 19.04843,
        "longitude": 84.51638
      },
      {
        "latitude": 19.01629,
        "longitude": 84.48299
      },
      {
        "latitude": 18.98935,
        "longitude": 84.47601
      },
      {
        "latitude": 19.01224,
        "longitude": 84.42493
      },
      {
        "latitude": 18.99478,
        "longitude": 84.43187
      },
      {
        "latitude": 18.9917,
        "longitude": 84.44329
      },
      {
        "latitude": 18.97764,
        "longitude": 84.45204
      },
      {
        "latitude": 18.96905,
        "longitude": 84.43081
      },
      {
        "latitude": 18.94845,
        "longitude": 84.42462
      },
      {
        "latitude": 18.93137,
        "longitude": 84.42829
      },
      {
        "latitude": 18.93147,
        "longitude": 84.43767
      },
      {
        "latitude": 18.91961,
        "longitude": 84.43708
      },
      {
        "latitude": 18.90894,
        "longitude": 84.42755
      },
      {
        "latitude": 18.91663,
        "longitude": 84.41787
      },
      {
        "latitude": 18.89722,
        "longitude": 84.41822
      },
      {
        "latitude": 18.90231,
        "longitude": 84.37979
      },
      {
        "latitude": 18.89178,
        "longitude": 84.39595
      },
      {
        "latitude": 18.87878,
        "longitude": 84.39456
      },
      {
        "latitude": 18.89148,
        "longitude": 84.36216
      },
      {
        "latitude": 18.87314,
        "longitude": 84.38302
      },
      {
        "latitude": 18.86078,
        "longitude": 84.37314
      },
      {
        "latitude": 18.86056,
        "longitude": 84.36203
      },
      {
        "latitude": 18.88796,
        "longitude": 84.33657
      },
      {
        "latitude": 18.84782,
        "longitude": 84.34638
      },
      {
        "latitude": 18.83763,
        "longitude": 84.36444
      },
      {
        "latitude": 18.81961,
        "longitude": 84.34892
      },
      {
        "latitude": 18.81709,
        "longitude": 84.33106
      },
      {
        "latitude": 18.80134,
        "longitude": 84.34356
      },
      {
        "latitude": 18.79786,
        "longitude": 84.32649
      },
      {
        "latitude": 18.78722,
        "longitude": 84.32006
      },
      {
        "latitude": 18.80326,
        "longitude": 84.28907
      },
      {
        "latitude": 18.79126,
        "longitude": 84.28447
      },
      {
        "latitude": 18.783,
        "longitude": 84.26319
      },
      {
        "latitude": 18.79877,
        "longitude": 84.22631
      },
      {
        "latitude": 18.79543,
        "longitude": 84.2144
      },
      {
        "latitude": 18.79011,
        "longitude": 84.21808
      },
      {
        "latitude": 18.79168,
        "longitude": 84.19534
      },
      {
        "latitude": 18.7777,
        "longitude": 84.18994
      },
      {
        "latitude": 18.78785,
        "longitude": 84.15926
      },
      {
        "latitude": 18.77727,
        "longitude": 84.14039
      },
      {
        "latitude": 18.76152,
        "longitude": 84.13758
      },
      {
        "latitude": 18.76795,
        "longitude": 84.12238
      },
      {
        "latitude": 18.75678,
        "longitude": 84.08946
      },
      {
        "latitude": 18.76399,
        "longitude": 84.08959
      },
      {
        "latitude": 18.76445,
        "longitude": 84.07642
      },
      {
        "latitude": 18.78231,
        "longitude": 84.06799
      },
      {
        "latitude": 18.78242,
        "longitude": 84.05991
      },
      {
        "latitude": 18.79918,
        "longitude": 84.05988
      },
      {
        "latitude": 18.80161,
        "longitude": 84.04669
      },
      {
        "latitude": 18.81644,
        "longitude": 84.03849
      },
      {
        "latitude": 18.81706,
        "longitude": 84.01547
      },
      {
        "latitude": 18.80875,
        "longitude": 84.01573
      },
      {
        "latitude": 18.81468,
        "longitude": 83.96559
      },
      {
        "latitude": 18.80518,
        "longitude": 83.95016
      },
      {
        "latitude": 18.82782,
        "longitude": 83.91662
      },
      {
        "latitude": 18.8244,
        "longitude": 83.89963
      },
      {
        "latitude": 18.81015,
        "longitude": 83.88785
      },
      {
        "latitude": 18.81753,
        "longitude": 83.87916
      },
      {
        "latitude": 18.80235,
        "longitude": 83.87822
      },
      {
        "latitude": 18.79599,
        "longitude": 83.88805
      },
      {
        "latitude": 18.78818,
        "longitude": 83.84831
      },
      {
        "latitude": 18.77197,
        "longitude": 83.83653
      },
      {
        "latitude": 18.76446,
        "longitude": 83.86934
      },
      {
        "latitude": 18.72675,
        "longitude": 83.88922
      },
      {
        "latitude": 18.74545,
        "longitude": 83.86857
      },
      {
        "latitude": 18.73586,
        "longitude": 83.86106
      },
      {
        "latitude": 18.73222,
        "longitude": 83.83658
      },
      {
        "latitude": 18.70711,
        "longitude": 83.83609
      },
      {
        "latitude": 18.65879,
        "longitude": 83.85774
      },
      {
        "latitude": 18.63463,
        "longitude": 83.88903
      },
      {
        "latitude": 18.6147,
        "longitude": 83.8867
      },
      {
        "latitude": 18.59781,
        "longitude": 83.89321
      },
      {
        "latitude": 18.60039,
        "longitude": 83.89974
      },
      {
        "latitude": 18.58766,
        "longitude": 83.90868
      },
      {
        "latitude": 18.56767,
        "longitude": 83.91366
      },
      {
        "latitude": 18.56186,
        "longitude": 83.90412
      },
      {
        "latitude": 18.54076,
        "longitude": 83.91422
      },
      {
        "latitude": 18.53283,
        "longitude": 83.90212
      },
      {
        "latitude": 18.54001,
        "longitude": 83.88536
      },
      {
        "latitude": 18.55321,
        "longitude": 83.88032
      },
      {
        "latitude": 18.54862,
        "longitude": 83.86776
      },
      {
        "latitude": 18.53847,
        "longitude": 83.86119
      },
      {
        "latitude": 18.53773,
        "longitude": 83.86893
      },
      {
        "latitude": 18.53096,
        "longitude": 83.85815
      },
      {
        "latitude": 18.54419,
        "longitude": 83.84288
      },
      {
        "latitude": 18.54004,
        "longitude": 83.83782
      },
      {
        "latitude": 18.55774,
        "longitude": 83.82453
      },
      {
        "latitude": 18.56754,
        "longitude": 83.83261
      },
      {
        "latitude": 18.60165,
        "longitude": 83.83186
      },
      {
        "latitude": 18.63585,
        "longitude": 83.7979
      },
      {
        "latitude": 18.62512,
        "longitude": 83.79522
      },
      {
        "latitude": 18.62981,
        "longitude": 83.79147
      },
      {
        "latitude": 18.61959,
        "longitude": 83.78227
      },
      {
        "latitude": 18.60649,
        "longitude": 83.79403
      },
      {
        "latitude": 18.59853,
        "longitude": 83.7784
      },
      {
        "latitude": 18.5682,
        "longitude": 83.76775
      },
      {
        "latitude": 18.54178,
        "longitude": 83.78296
      },
      {
        "latitude": 18.54545,
        "longitude": 83.80218
      },
      {
        "latitude": 18.50654,
        "longitude": 83.78805
      },
      {
        "latitude": 18.47456,
        "longitude": 83.81883
      },
      {
        "latitude": 18.43649,
        "longitude": 83.80941
      },
      {
        "latitude": 18.41929,
        "longitude": 83.83318
      },
      {
        "latitude": 18.40309,
        "longitude": 83.82291
      },
      {
        "latitude": 18.386,
        "longitude": 83.83055
      },
      {
        "latitude": 18.39505,
        "longitude": 83.80457
      },
      {
        "latitude": 18.38917,
        "longitude": 83.79742
      },
      {
        "latitude": 18.36845,
        "longitude": 83.79874
      },
      {
        "latitude": 18.37428,
        "longitude": 83.76673
      },
      {
        "latitude": 18.42762,
        "longitude": 83.7289
      },
      {
        "latitude": 18.42661,
        "longitude": 83.71503
      },
      {
        "latitude": 18.43059,
        "longitude": 83.72378
      },
      {
        "latitude": 18.43895,
        "longitude": 83.72235
      },
      {
        "latitude": 18.43489,
        "longitude": 83.71453
      },
      {
        "latitude": 18.44399,
        "longitude": 83.7078
      },
      {
        "latitude": 18.42929,
        "longitude": 83.69546
      },
      {
        "latitude": 18.38727,
        "longitude": 83.70421
      },
      {
        "latitude": 18.38555,
        "longitude": 83.64991
      },
      {
        "latitude": 18.37627,
        "longitude": 83.63326
      },
      {
        "latitude": 18.38306,
        "longitude": 83.60344
      },
      {
        "latitude": 18.3558,
        "longitude": 83.58502
      }
    ],
    "polygons": [
      [
        {
          "latitude": 18.3558,
          "longitude": 83.58502
        },
        {
          "latitude": 18.33977,
          "longitude": 83.61014
        },
        {
          "latitude": 18.32901,
          "longitude": 83.60039
        },
        {
          "latitude": 18.33369,
          "longitude": 83.62354
        },
        {
          "latitude": 18.32202,
          "longitude": 83.62164
        },
        {
          "latitude": 18.31696,
          "longitude": 83.66849
        },
        {
          "latitude": 18.30591,
          "longitude": 83.69616
        },
        {
          "latitude": 18.29418,
          "longitude": 83.70292
        },
        {
          "latitude": 18.2825,
          "longitude": 83.67365
        },
        {
          "latitude": 18.27043,
          "longitude": 83.6644
        },
        {
          "latitude": 18.23143,
          "longitude": 83.66368
        },
        {
          "latitude": 18.21105,
          "longitude": 83.64959
        },
        {
          "latitude": 18.2177,
          "longitude": 83.62581
        },
        {
          "latitude": 18.2076,
          "longitude": 83.60251
        },
        {
          "latitude": 18.17822,
          "longitude": 83.61502
        },
        {
          "latitude": 18.1574,
          "longitude": 83.60276
        },
        {
          "latitude": 18.13097,
          "longitude": 83.62353
        },
        {
          "latitude": 18.11541,
          "longitude": 83.6202
        },
        {
          "latitude": 18.10424,
          "longitude": 83.64479
        },
        {
          "latitude": 18.07829,
          "longitude": 83.66402
        },
        {
          "latitude": 18.1293,
          "longitude": 83.75059
        },
        {
          "latitude": 18.27664,
          "longitude": 84.07095
        },
        {
          "latitude": 18.31095,
          "longitude": 84.12374
        },
        {
          "latitude": 18.34341,
          "longitude": 84.12716
        },
        {
          "latitude": 18.37347,
          "longitude": 84.14741
        },
        {
          "latitude": 18.47548,
          "longitude": 84.25434
        },
        {
          "latitude": 18.55496,
          "longitude": 84.35472
        },
        {
          "latitude": 18.59318,
          "longitude": 84.36838
        },
        {
          "latitude": 18.65955,
          "longitude": 84.43984
        },
        {
          "latitude": 18.69296,
          "longitude": 84.4532
        },
        {
          "latitude": 18.74019,
          "longitude": 84.49308
        },
        {
          "latitude": 18.79054,
          "longitude": 84.55148
        },
        {
          "latitude": 18.8178,
          "longitude": 84.55783
        },
        {
          "latitude": 18.88977,
          "longitude": 84.60361
        },
        {
          "latitude": 18.9572,
          "longitude": 84.67544
        },
        {
          "latitude": 19.05492,
          "longitude": 84.74986
        },
        {
          "latitude": 19.07719,
          "longitude": 84.76508
        },
        {
          "latitude": 19.12644,
          "longitude": 84.69783
        },
        {
          "latitude": 19.14103,
          "longitude": 84.70612
        },
        {
          "latitude": 19.14706,
          "longitude": 84.70118
        },
        {
          "latitude": 19.14646,
          "longitude": 84.71052
        },
        {
          "latitude": 19.15761,
          "longitude": 84.71254
        },
        {
          "latitude": 19.16604,
          "longitude": 84.67091
        },
        {
          "latitude": 19.12986,
          "longitude": 84.66732
        },
        {
          "latitude": 19.13245,
          "longitude": 84.59553
        },
        {
          "latitude": 19.10078,
          "longitude": 84.60954
        },
        {
          "latitude": 19.09909,
          "longitude": 84.62548
        },
        {
          "latitude": 19.08491,
          "longitude": 84.62549
        },
        {
          "latitude": 19.0821,
          "longitude": 84.6312
        },
        {
          "latitude": 19.09626,
          "longitude": 84.64704
        },
        {
          "latitude": 19.09443,
          "longitude": 84.65897
        },
        {
          "latitude": 19.07633,
          "longitude": 84.67085
        },
        {
          "latitude": 19.07461,
          "longitude": 84.66308
        },
        {
          "latitude": 19.06304,
          "longitude": 84.66113
        },
        {
          "latitude": 19.06587,
          "longitude": 84.61831
        },
        {
          "latitude": 19.05985,
          "longitude": 84.62243
        },
        {
          "latitude": 19.05657,
          "longitude": 84.61343
        },
        {
          "latitude": 19.02479,
          "longitude": 84.6009
        },
        {
          "latitude": 19.03009,
          "longitude": 84.58167
        },
        {
          "latitude": 19.07273,
          "longitude": 84.5831
        },
        {
          "latitude": 19.06757,
          "longitude": 84.5747
        },
        {
          "latitude": 19.07372,
          "longitude": 84.57286
        },
        {
          "latitude": 19.05658,
          "longitude": 84.5566
        },
        {
          "latitude": 19.04843,
          "longitude": 84.51638
        },
        {
          "latitude": 19.01629,
          "longitude": 84.48299
        },
        {
          "latitude": 18.98935,
          "longitude": 84.47601
        },
        {
          "latitude": 19.01224,
          "longitude": 84.42493
        },
        {
          "latitude": 18.99478,
          "longitude": 84.43187
        },
        {
          "latitude": 18.9917,
          "longitude": 84.44329
        },
        {
          "latitude": 18.97764,
          "longitude": 84.45204
        },
        {
          "latitude": 18.96905,
          "longitude": 84.43081
        },
        {
          "latitude": 18.94845,
          "longitude": 84.42462
        },
        {
          "latitude": 18.93137,
          "longitude": 84.42829
        },
        {
          "latitude": 18.93147,
          "longitude": 84.43767
        },
        {
          "latitude": 18.91961,
          "longitude": 84.43708
        },
        {
          "latitude": 18.90894,
          "longitude": 84.42755
        },
        {
          "latitude": 18.91663,
          "longitude": 84.41787
        },
        {
          "latitude": 18.89722,
          "longitude": 84.41822
        },
        {
          "latitude": 18.90231,
          "longitude": 84.37979
        },
        {
          "latitude": 18.89178,
          "longitude": 84.39595
        },
        {
          "latitude": 18.87878,
          "longitude": 84.39456
        },
        {
          "latitude": 18.89148,
          "longitude": 84.36216
        },
        {
          "latitude": 18.87314,
          "longitude": 84.38302
        },
        {
          "latitude": 18.86078,
          "longitude": 84.37314
        },
        {
          "latitude": 18.86056,
          "longitude": 84.36203
        },
        {
          "latitude": 18.88796,
          "longitude": 84.33657
        },
        {
          "latitude": 18.84782,
          "longitude": 84.34638
        },
        {
          "latitude": 18.83763,
          "longitude": 84.36444
        },
        {
          "latitude": 18.81961,
          "longitude": 84.34892
        },
        {
          "latitude": 18.81709,
          "longitude": 84.33106
        },
        {
          "latitude": 18.80134,
          "longitude": 84.34356
        },
        {
          "latitude": 18.79786,
          "longitude": 84.32649
        },
        {
          "latitude": 18.78722,
          "longitude": 84.32006
        },
        {
          "latitude": 18.80326,
          "longitude": 84.28907
        },
        {
          "latitude": 18.79126,
          "longitude": 84.28447
        },
        {
          "latitude": 18.783,
          "longitude": 84.26319
        },
        {
          "latitude": 18.79877,
          "longitude": 84.22631
        },
        {
          "latitude": 18.79543,
          "longitude": 84.2144
        },
        {
          "latitude": 18.79011,
          "longitude": 84.21808
        },
        {
          "latitude": 18.79168,
          "longitude": 84.19534
        },
        {
          "latitude": 18.7777,
          "longitude": 84.18994
        },
        {
          "latitude": 18.78785,
          "longitude": 84.15926
        },
        {
          "latitude": 18.77727,
          "longitude": 84.14039
        },
        {
          "latitude": 18.76152,
          "longitude": 84.13758
        },
        {
          "latitude": 18.76795,
          "longitude": 84.12238
        },
        {
          "latitude": 18.75678,
          "longitude": 84.08946
        },
        {
          "latitude": 18.76399,
          "longitude": 84.08959
        },
        {
          "latitude": 18.76445,
          "longitude": 84.07642
        },
        {
          "latitude": 18.78231,
          "longitude": 84.06799
        },
        {
          "latitude": 18.78242,
          "longitude": 84.05991
        },
        {
          "latitude": 18.79918,
          "longitude": 84.05988
        },
        {
          "latitude": 18.80161,
          "longitude": 84.04669
        },
        {
          "latitude": 18.81644,
          "longitude": 84.03849
        },
        {
          "latitude": 18.81706,
          "longitude": 84.01547
        },
        {
          "latitude": 18.80875,
          "longitude": 84.01573
        },
        {
          "latitude": 18.81468,
          "longitude": 83.96559
        },
        {
          "latitude": 18.80518,
          "longitude": 83.95016
        },
        {
          "latitude": 18.82782,
          "longitude": 83.91662
        },
        {
          "latitude": 18.8244,
          "longitude": 83.89963
        },
        {
          "latitude": 18.81015,
          "longitude": 83.88785
        },
        {
          "latitude": 18.81753,
          "longitude": 83.87916
        },
        {
          "latitude": 18.80235,
          "longitude": 83.87822
        },
        {
          "latitude": 18.79599,
          "longitude": 83.88805
        },
        {
          "latitude": 18.78818,
          "longitude": 83.84831
        },
        {
          "latitude": 18.77197,
          "longitude": 83.83653
        },
        {
          "latitude": 18.76446,
          "longitude": 83.86934
        },
        {
          "latitude": 18.72675,
          "longitude": 83.88922
        },
        {
          "latitude": 18.74545,
          "longitude": 83.86857
        },
        {
          "latitude": 18.73586,
          "longitude": 83.86106
        },
        {
          "latitude": 18.73222,
          "longitude": 83.83658
        },
        {
          "latitude": 18.70711,
          "longitude": 83.83609
        },
        {
          "latitude": 18.65879,
          "longitude": 83.85774
        },
        {
          "latitude": 18.63463,
          "longitude": 83.88903
        },
        {
          "latitude": 18.6147,
          "longitude": 83.8867
        },
        {
          "latitude": 18.59781,
          "longitude": 83.89321
        },
        {
          "latitude": 18.60039,
          "longitude": 83.89974
        },
        {
          "latitude": 18.58766,
          "longitude": 83.90868
        },
        {
          "latitude": 18.56767,
          "longitude": 83.91366
        },
        {
          "latitude": 18.56186,
          "longitude": 83.90412
        },
        {
          "latitude": 18.54076,
          "longitude": 83.91422
        },
        {
          "latitude": 18.53283,
          "longitude": 83.90212
        },
        {
          "latitude": 18.54001,
          "longitude": 83.88536
        },
        {
          "latitude": 18.55321,
          "longitude": 83.88032
        },
        {
          "latitude": 18.54862,
          "longitude": 83.86776
        },
        {
          "latitude": 18.53847,
          "longitude": 83.86119
        },
        {
          "latitude": 18.53773,
          "longitude": 83.86893
        },
        {
          "latitude": 18.53096,
          "longitude": 83.85815
        },
        {
          "latitude": 18.54419,
          "longitude": 83.84288
        },
        {
          "latitude": 18.54004,
          "longitude": 83.83782
        },
        {
          "latitude": 18.55774,
          "longitude": 83.82453
        },
        {
          "latitude": 18.56754,
          "longitude": 83.83261
        },
        {
          "latitude": 18.60165,
          "longitude": 83.83186
        },
        {
          "latitude": 18.63585,
          "longitude": 83.7979
        },
        {
          "latitude": 18.62512,
          "longitude": 83.79522
        },
        {
          "latitude": 18.62981,
          "longitude": 83.79147
        },
        {
          "latitude": 18.61959,
          "longitude": 83.78227
        },
        {
          "latitude": 18.60649,
          "longitude": 83.79403
        },
        {
          "latitude": 18.59853,
          "longitude": 83.7784
        },
        {
          "latitude": 18.5682,
          "longitude": 83.76775
        },
        {
          "latitude": 18.54178,
          "longitude": 83.78296
        },
        {
          "latitude": 18.54545,
          "longitude": 83.80218
        },
        {
          "latitude": 18.50654,
          "longitude": 83.78805
        },
        {
          "latitude": 18.47456,
          "longitude": 83.81883
        },
        {
          "latitude": 18.43649,
          "longitude": 83.80941
        },
        {
          "latitude": 18.41929,
          "longitude": 83.83318
        },
        {
          "latitude": 18.40309,
          "longitude": 83.82291
        },
        {
          "latitude": 18.386,
          "longitude": 83.83055
        },
        {
          "latitude": 18.39505,
          "longitude": 83.80457
        },
        {
          "latitude": 18.38917,
          "longitude": 83.79742
        },
        {
          "latitude": 18.36845,
          "longitude": 83.79874
        },
        {
          "latitude": 18.37428,
          "longitude": 83.76673
        },
        {
          "latitude": 18.42762,
          "longitude": 83.7289
        },
        {
          "latitude": 18.42661,
          "longitude": 83.71503
        },
        {
          "latitude": 18.43059,
          "longitude": 83.72378
        },
        {
          "latitude": 18.43895,
          "longitude": 83.72235
        },
        {
          "latitude": 18.43489,
          "longitude": 83.71453
        },
        {
          "latitude": 18.44399,
          "longitude": 83.7078
        },
        {
          "latitude": 18.42929,
          "longitude": 83.69546
        },
        {
          "latitude": 18.38727,
          "longitude": 83.70421
        },
        {
          "latitude": 18.38555,
          "longitude": 83.64991
        },
        {
          "latitude": 18.37627,
          "longitude": 83.63326
        },
        {
          "latitude": 18.38306,
          "longitude": 83.60344
        },
        {
          "latitude": 18.3558,
          "longitude": 83.58502
        }
      ]
    ]
  },
  {
    "id": "tirupati",
    "name": "Tirupati",
    "headquarters": "Tirupati",
    "center": {
      "latitude": 13.7538,
      "longitude": 79.7151
    },
    "region": "Rayalaseema",
    "polygon": [
      {
        "latitude": 13.54156,
        "longitude": 78.95125
      },
      {
        "latitude": 13.52894,
        "longitude": 78.97768
      },
      {
        "latitude": 13.51595,
        "longitude": 78.9842
      },
      {
        "latitude": 13.49134,
        "longitude": 78.9813
      },
      {
        "latitude": 13.49223,
        "longitude": 78.99947
      },
      {
        "latitude": 13.47074,
        "longitude": 79.03642
      },
      {
        "latitude": 13.44885,
        "longitude": 79.05526
      },
      {
        "latitude": 13.45047,
        "longitude": 79.07151
      },
      {
        "latitude": 13.44036,
        "longitude": 79.09122
      },
      {
        "latitude": 13.42514,
        "longitude": 79.09211
      },
      {
        "latitude": 13.42178,
        "longitude": 79.14206
      },
      {
        "latitude": 13.40976,
        "longitude": 79.14257
      },
      {
        "latitude": 13.41382,
        "longitude": 79.15392
      },
      {
        "latitude": 13.40096,
        "longitude": 79.16156
      },
      {
        "latitude": 13.38474,
        "longitude": 79.14351
      },
      {
        "latitude": 13.37775,
        "longitude": 79.14773
      },
      {
        "latitude": 13.38514,
        "longitude": 79.15688
      },
      {
        "latitude": 13.37899,
        "longitude": 79.18095
      },
      {
        "latitude": 13.3937,
        "longitude": 79.18079
      },
      {
        "latitude": 13.39942,
        "longitude": 79.19958
      },
      {
        "latitude": 13.38066,
        "longitude": 79.21752
      },
      {
        "latitude": 13.39399,
        "longitude": 79.23598
      },
      {
        "latitude": 13.37772,
        "longitude": 79.23931
      },
      {
        "latitude": 13.37566,
        "longitude": 79.25038
      },
      {
        "latitude": 13.39992,
        "longitude": 79.2495
      },
      {
        "latitude": 13.3965,
        "longitude": 79.22135
      },
      {
        "latitude": 13.41083,
        "longitude": 79.22804
      },
      {
        "latitude": 13.41762,
        "longitude": 79.20426
      },
      {
        "latitude": 13.42766,
        "longitude": 79.21161
      },
      {
        "latitude": 13.41715,
        "longitude": 79.22182
      },
      {
        "latitude": 13.42348,
        "longitude": 79.22901
      },
      {
        "latitude": 13.41732,
        "longitude": 79.23332
      },
      {
        "latitude": 13.42342,
        "longitude": 79.25841
      },
      {
        "latitude": 13.42634,
        "longitude": 79.24202
      },
      {
        "latitude": 13.43739,
        "longitude": 79.2398
      },
      {
        "latitude": 13.43714,
        "longitude": 79.21707
      },
      {
        "latitude": 13.44887,
        "longitude": 79.22808
      },
      {
        "latitude": 13.44112,
        "longitude": 79.2398
      },
      {
        "latitude": 13.47012,
        "longitude": 79.26009
      },
      {
        "latitude": 13.47848,
        "longitude": 79.27755
      },
      {
        "latitude": 13.49257,
        "longitude": 79.36832
      },
      {
        "latitude": 13.48908,
        "longitude": 79.38616
      },
      {
        "latitude": 13.50299,
        "longitude": 79.40449
      },
      {
        "latitude": 13.5025,
        "longitude": 79.41508
      },
      {
        "latitude": 13.49205,
        "longitude": 79.41231
      },
      {
        "latitude": 13.48591,
        "longitude": 79.41992
      },
      {
        "latitude": 13.50669,
        "longitude": 79.45756
      },
      {
        "latitude": 13.51043,
        "longitude": 79.49088
      },
      {
        "latitude": 13.49506,
        "longitude": 79.49146
      },
      {
        "latitude": 13.49945,
        "longitude": 79.49957
      },
      {
        "latitude": 13.49089,
        "longitude": 79.51839
      },
      {
        "latitude": 13.48405,
        "longitude": 79.50251
      },
      {
        "latitude": 13.47138,
        "longitude": 79.50026
      },
      {
        "latitude": 13.47341,
        "longitude": 79.47535
      },
      {
        "latitude": 13.46657,
        "longitude": 79.47529
      },
      {
        "latitude": 13.45485,
        "longitude": 79.4863
      },
      {
        "latitude": 13.46507,
        "longitude": 79.50029
      },
      {
        "latitude": 13.46357,
        "longitude": 79.51319
      },
      {
        "latitude": 13.44569,
        "longitude": 79.52062
      },
      {
        "latitude": 13.44222,
        "longitude": 79.50988
      },
      {
        "latitude": 13.36945,
        "longitude": 79.50941
      },
      {
        "latitude": 13.35157,
        "longitude": 79.49783
      },
      {
        "latitude": 13.33261,
        "longitude": 79.49742
      },
      {
        "latitude": 13.34439,
        "longitude": 79.52594
      },
      {
        "latitude": 13.33821,
        "longitude": 79.53587
      },
      {
        "latitude": 13.36205,
        "longitude": 79.5434
      },
      {
        "latitude": 13.37986,
        "longitude": 79.57918
      },
      {
        "latitude": 13.39332,
        "longitude": 79.57843
      },
      {
        "latitude": 13.39803,
        "longitude": 79.62439
      },
      {
        "latitude": 13.38893,
        "longitude": 79.63688
      },
      {
        "latitude": 13.41048,
        "longitude": 79.6502
      },
      {
        "latitude": 13.41185,
        "longitude": 79.67215
      },
      {
        "latitude": 13.43838,
        "longitude": 79.67375
      },
      {
        "latitude": 13.44478,
        "longitude": 79.69522
      },
      {
        "latitude": 13.43988,
        "longitude": 79.71246
      },
      {
        "latitude": 13.42114,
        "longitude": 79.71499
      },
      {
        "latitude": 13.39882,
        "longitude": 79.70137
      },
      {
        "latitude": 13.38664,
        "longitude": 79.70237
      },
      {
        "latitude": 13.3855,
        "longitude": 79.71953
      },
      {
        "latitude": 13.36725,
        "longitude": 79.72188
      },
      {
        "latitude": 13.35331,
        "longitude": 79.74038
      },
      {
        "latitude": 13.32378,
        "longitude": 79.75507
      },
      {
        "latitude": 13.32142,
        "longitude": 79.76683
      },
      {
        "latitude": 13.29352,
        "longitude": 79.79174
      },
      {
        "latitude": 13.31725,
        "longitude": 79.8089
      },
      {
        "latitude": 13.31692,
        "longitude": 79.86281
      },
      {
        "latitude": 13.33107,
        "longitude": 79.86807
      },
      {
        "latitude": 13.32332,
        "longitude": 79.8829
      },
      {
        "latitude": 13.33286,
        "longitude": 79.8835
      },
      {
        "latitude": 13.34814,
        "longitude": 79.91485
      },
      {
        "latitude": 13.35987,
        "longitude": 79.91597
      },
      {
        "latitude": 13.35151,
        "longitude": 79.9313
      },
      {
        "latitude": 13.36374,
        "longitude": 79.94565
      },
      {
        "latitude": 13.38178,
        "longitude": 79.94505
      },
      {
        "latitude": 13.37917,
        "longitude": 79.95804
      },
      {
        "latitude": 13.39423,
        "longitude": 79.96257
      },
      {
        "latitude": 13.39687,
        "longitude": 79.94435
      },
      {
        "latitude": 13.40773,
        "longitude": 79.9457
      },
      {
        "latitude": 13.41645,
        "longitude": 79.93457
      },
      {
        "latitude": 13.41672,
        "longitude": 79.94184
      },
      {
        "latitude": 13.42503,
        "longitude": 79.93961
      },
      {
        "latitude": 13.42219,
        "longitude": 79.95665
      },
      {
        "latitude": 13.42967,
        "longitude": 79.97333
      },
      {
        "latitude": 13.46909,
        "longitude": 79.97241
      },
      {
        "latitude": 13.47045,
        "longitude": 79.98239
      },
      {
        "latitude": 13.47958,
        "longitude": 79.98407
      },
      {
        "latitude": 13.47864,
        "longitude": 80.00749
      },
      {
        "latitude": 13.49795,
        "longitude": 80.0159
      },
      {
        "latitude": 13.49368,
        "longitude": 80.04662
      },
      {
        "latitude": 13.51262,
        "longitude": 80.0485
      },
      {
        "latitude": 13.51847,
        "longitude": 80.03535
      },
      {
        "latitude": 13.51362,
        "longitude": 80.02696
      },
      {
        "latitude": 13.5298,
        "longitude": 80.01747
      },
      {
        "latitude": 13.52569,
        "longitude": 80.00051
      },
      {
        "latitude": 13.54646,
        "longitude": 80.00182
      },
      {
        "latitude": 13.53666,
        "longitude": 80.05611
      },
      {
        "latitude": 13.54903,
        "longitude": 80.08143
      },
      {
        "latitude": 13.53764,
        "longitude": 80.08782
      },
      {
        "latitude": 13.52787,
        "longitude": 80.078
      },
      {
        "latitude": 13.48939,
        "longitude": 80.07745
      },
      {
        "latitude": 13.49453,
        "longitude": 80.10485
      },
      {
        "latitude": 13.48951,
        "longitude": 80.10734
      },
      {
        "latitude": 13.50592,
        "longitude": 80.11273
      },
      {
        "latitude": 13.50457,
        "longitude": 80.13852
      },
      {
        "latitude": 13.49047,
        "longitude": 80.15094
      },
      {
        "latitude": 13.49066,
        "longitude": 80.20981
      },
      {
        "latitude": 13.4726,
        "longitude": 80.24175
      },
      {
        "latitude": 13.56446,
        "longitude": 80.26868
      },
      {
        "latitude": 13.61685,
        "longitude": 80.24264
      },
      {
        "latitude": 13.6588,
        "longitude": 80.2337
      },
      {
        "latitude": 13.79837,
        "longitude": 80.24989
      },
      {
        "latitude": 14.03172,
        "longitude": 80.14998
      },
      {
        "latitude": 14.08703,
        "longitude": 80.13573
      },
      {
        "latitude": 14.1736,
        "longitude": 80.12629
      },
      {
        "latitude": 14.25838,
        "longitude": 80.13886
      },
      {
        "latitude": 14.25171,
        "longitude": 80.12379
      },
      {
        "latitude": 14.25486,
        "longitude": 80.10149
      },
      {
        "latitude": 14.23455,
        "longitude": 80.1036
      },
      {
        "latitude": 14.22439,
        "longitude": 80.07077
      },
      {
        "latitude": 14.20934,
        "longitude": 80.0659
      },
      {
        "latitude": 14.2202,
        "longitude": 80.05885
      },
      {
        "latitude": 14.19809,
        "longitude": 80.04741
      },
      {
        "latitude": 14.20317,
        "longitude": 80.03065
      },
      {
        "latitude": 14.19445,
        "longitude": 80.03636
      },
      {
        "latitude": 14.1849,
        "longitude": 80.02421
      },
      {
        "latitude": 14.19669,
        "longitude": 80.0137
      },
      {
        "latitude": 14.18162,
        "longitude": 79.98915
      },
      {
        "latitude": 14.1934,
        "longitude": 79.98666
      },
      {
        "latitude": 14.18604,
        "longitude": 79.97626
      },
      {
        "latitude": 14.16593,
        "longitude": 79.97421
      },
      {
        "latitude": 14.15309,
        "longitude": 79.95369
      },
      {
        "latitude": 14.16138,
        "longitude": 79.94173
      },
      {
        "latitude": 14.14248,
        "longitude": 79.93367
      },
      {
        "latitude": 14.1765,
        "longitude": 79.85603
      },
      {
        "latitude": 14.20942,
        "longitude": 79.84864
      },
      {
        "latitude": 14.22645,
        "longitude": 79.81807
      },
      {
        "latitude": 14.25686,
        "longitude": 79.81769
      },
      {
        "latitude": 14.26668,
        "longitude": 79.80005
      },
      {
        "latitude": 14.22465,
        "longitude": 79.77454
      },
      {
        "latitude": 14.21117,
        "longitude": 79.79591
      },
      {
        "latitude": 14.18356,
        "longitude": 79.8006
      },
      {
        "latitude": 14.1844,
        "longitude": 79.7784
      },
      {
        "latitude": 14.17539,
        "longitude": 79.76369
      },
      {
        "latitude": 14.15606,
        "longitude": 79.745
      },
      {
        "latitude": 14.128,
        "longitude": 79.73457
      },
      {
        "latitude": 14.10967,
        "longitude": 79.70788
      },
      {
        "latitude": 14.12133,
        "longitude": 79.66831
      },
      {
        "latitude": 14.15069,
        "longitude": 79.6653
      },
      {
        "latitude": 14.15453,
        "longitude": 79.65641
      },
      {
        "latitude": 14.15311,
        "longitude": 79.64041
      },
      {
        "latitude": 14.11624,
        "longitude": 79.64205
      },
      {
        "latitude": 14.10712,
        "longitude": 79.63036
      },
      {
        "latitude": 14.1205,
        "longitude": 79.59954
      },
      {
        "latitude": 14.13272,
        "longitude": 79.59956
      },
      {
        "latitude": 14.14336,
        "longitude": 79.58734
      },
      {
        "latitude": 14.17298,
        "longitude": 79.52902
      },
      {
        "latitude": 14.18583,
        "longitude": 79.42843
      },
      {
        "latitude": 14.10181,
        "longitude": 79.45441
      },
      {
        "latitude": 14.02507,
        "longitude": 79.437
      },
      {
        "latitude": 13.99809,
        "longitude": 79.44317
      },
      {
        "latitude": 13.9885,
        "longitude": 79.45568
      },
      {
        "latitude": 13.97272,
        "longitude": 79.45034
      },
      {
        "latitude": 13.94727,
        "longitude": 79.45867
      },
      {
        "latitude": 13.8709,
        "longitude": 79.43434
      },
      {
        "latitude": 13.8245,
        "longitude": 79.45522
      },
      {
        "latitude": 13.79928,
        "longitude": 79.45799
      },
      {
        "latitude": 13.79695,
        "longitude": 79.47099
      },
      {
        "latitude": 13.77991,
        "longitude": 79.44853
      },
      {
        "latitude": 13.78509,
        "longitude": 79.42002
      },
      {
        "latitude": 13.76278,
        "longitude": 79.41397
      },
      {
        "latitude": 13.75531,
        "longitude": 79.3722
      },
      {
        "latitude": 13.72297,
        "longitude": 79.30537
      },
      {
        "latitude": 13.75857,
        "longitude": 79.29239
      },
      {
        "latitude": 13.75994,
        "longitude": 79.24125
      },
      {
        "latitude": 13.75054,
        "longitude": 79.24097
      },
      {
        "latitude": 13.75726,
        "longitude": 79.22379
      },
      {
        "latitude": 13.77235,
        "longitude": 79.21783
      },
      {
        "latitude": 13.793,
        "longitude": 79.19115
      },
      {
        "latitude": 13.80316,
        "longitude": 79.19426
      },
      {
        "latitude": 13.81206,
        "longitude": 79.21574
      },
      {
        "latitude": 13.86562,
        "longitude": 79.14842
      },
      {
        "latitude": 13.84962,
        "longitude": 79.12632
      },
      {
        "latitude": 13.84995,
        "longitude": 79.09636
      },
      {
        "latitude": 13.8788,
        "longitude": 79.08282
      },
      {
        "latitude": 13.88908,
        "longitude": 79.02929
      },
      {
        "latitude": 13.90298,
        "longitude": 79.02368
      },
      {
        "latitude": 13.90765,
        "longitude": 79.0082
      },
      {
        "latitude": 13.90318,
        "longitude": 79.00519
      },
      {
        "latitude": 13.89406,
        "longitude": 79.02356
      },
      {
        "latitude": 13.88002,
        "longitude": 79.02196
      },
      {
        "latitude": 13.86404,
        "longitude": 79.04983
      },
      {
        "latitude": 13.85606,
        "longitude": 79.04684
      },
      {
        "latitude": 13.8579,
        "longitude": 79.02087
      },
      {
        "latitude": 13.84963,
        "longitude": 79.02558
      },
      {
        "latitude": 13.84414,
        "longitude": 79.01079
      },
      {
        "latitude": 13.82592,
        "longitude": 79.01414
      },
      {
        "latitude": 13.81451,
        "longitude": 79.04235
      },
      {
        "latitude": 13.80385,
        "longitude": 79.04089
      },
      {
        "latitude": 13.80039,
        "longitude": 79.02363
      },
      {
        "latitude": 13.77552,
        "longitude": 79.02431
      },
      {
        "latitude": 13.77111,
        "longitude": 79.03674
      },
      {
        "latitude": 13.78263,
        "longitude": 79.0856
      },
      {
        "latitude": 13.77533,
        "longitude": 79.09135
      },
      {
        "latitude": 13.73869,
        "longitude": 79.08216
      },
      {
        "latitude": 13.71819,
        "longitude": 79.09191
      },
      {
        "latitude": 13.65894,
        "longitude": 79.07362
      },
      {
        "latitude": 13.64521,
        "longitude": 79.05261
      },
      {
        "latitude": 13.61837,
        "longitude": 79.04924
      },
      {
        "latitude": 13.61228,
        "longitude": 79.05495
      },
      {
        "latitude": 13.60334,
        "longitude": 79.1724
      },
      {
        "latitude": 13.56527,
        "longitude": 79.17017
      },
      {
        "latitude": 13.54428,
        "longitude": 79.17992
      },
      {
        "latitude": 13.52181,
        "longitude": 79.14392
      },
      {
        "latitude": 13.52174,
        "longitude": 79.11104
      },
      {
        "latitude": 13.5132,
        "longitude": 79.0987
      },
      {
        "latitude": 13.51798,
        "longitude": 79.0841
      },
      {
        "latitude": 13.53237,
        "longitude": 79.08201
      },
      {
        "latitude": 13.52953,
        "longitude": 79.06417
      },
      {
        "latitude": 13.5412,
        "longitude": 79.04304
      },
      {
        "latitude": 13.56257,
        "longitude": 79.03656
      },
      {
        "latitude": 13.56243,
        "longitude": 79.02145
      },
      {
        "latitude": 13.54364,
        "longitude": 79.01534
      },
      {
        "latitude": 13.54006,
        "longitude": 79.00414
      },
      {
        "latitude": 13.54156,
        "longitude": 78.95125
      }
    ],
    "polygons": [
      [
        {
          "latitude": 13.54156,
          "longitude": 78.95125
        },
        {
          "latitude": 13.52894,
          "longitude": 78.97768
        },
        {
          "latitude": 13.51595,
          "longitude": 78.9842
        },
        {
          "latitude": 13.49134,
          "longitude": 78.9813
        },
        {
          "latitude": 13.49223,
          "longitude": 78.99947
        },
        {
          "latitude": 13.47074,
          "longitude": 79.03642
        },
        {
          "latitude": 13.44885,
          "longitude": 79.05526
        },
        {
          "latitude": 13.45047,
          "longitude": 79.07151
        },
        {
          "latitude": 13.44036,
          "longitude": 79.09122
        },
        {
          "latitude": 13.42514,
          "longitude": 79.09211
        },
        {
          "latitude": 13.42178,
          "longitude": 79.14206
        },
        {
          "latitude": 13.40976,
          "longitude": 79.14257
        },
        {
          "latitude": 13.41382,
          "longitude": 79.15392
        },
        {
          "latitude": 13.40096,
          "longitude": 79.16156
        },
        {
          "latitude": 13.38474,
          "longitude": 79.14351
        },
        {
          "latitude": 13.37775,
          "longitude": 79.14773
        },
        {
          "latitude": 13.38514,
          "longitude": 79.15688
        },
        {
          "latitude": 13.37899,
          "longitude": 79.18095
        },
        {
          "latitude": 13.3937,
          "longitude": 79.18079
        },
        {
          "latitude": 13.39942,
          "longitude": 79.19958
        },
        {
          "latitude": 13.38066,
          "longitude": 79.21752
        },
        {
          "latitude": 13.39399,
          "longitude": 79.23598
        },
        {
          "latitude": 13.37772,
          "longitude": 79.23931
        },
        {
          "latitude": 13.37566,
          "longitude": 79.25038
        },
        {
          "latitude": 13.39992,
          "longitude": 79.2495
        },
        {
          "latitude": 13.3965,
          "longitude": 79.22135
        },
        {
          "latitude": 13.41083,
          "longitude": 79.22804
        },
        {
          "latitude": 13.41762,
          "longitude": 79.20426
        },
        {
          "latitude": 13.42766,
          "longitude": 79.21161
        },
        {
          "latitude": 13.41715,
          "longitude": 79.22182
        },
        {
          "latitude": 13.42348,
          "longitude": 79.22901
        },
        {
          "latitude": 13.41732,
          "longitude": 79.23332
        },
        {
          "latitude": 13.42342,
          "longitude": 79.25841
        },
        {
          "latitude": 13.42634,
          "longitude": 79.24202
        },
        {
          "latitude": 13.43739,
          "longitude": 79.2398
        },
        {
          "latitude": 13.43714,
          "longitude": 79.21707
        },
        {
          "latitude": 13.44887,
          "longitude": 79.22808
        },
        {
          "latitude": 13.44112,
          "longitude": 79.2398
        },
        {
          "latitude": 13.47012,
          "longitude": 79.26009
        },
        {
          "latitude": 13.47848,
          "longitude": 79.27755
        },
        {
          "latitude": 13.49257,
          "longitude": 79.36832
        },
        {
          "latitude": 13.48908,
          "longitude": 79.38616
        },
        {
          "latitude": 13.50299,
          "longitude": 79.40449
        },
        {
          "latitude": 13.5025,
          "longitude": 79.41508
        },
        {
          "latitude": 13.49205,
          "longitude": 79.41231
        },
        {
          "latitude": 13.48591,
          "longitude": 79.41992
        },
        {
          "latitude": 13.50669,
          "longitude": 79.45756
        },
        {
          "latitude": 13.51043,
          "longitude": 79.49088
        },
        {
          "latitude": 13.49506,
          "longitude": 79.49146
        },
        {
          "latitude": 13.49945,
          "longitude": 79.49957
        },
        {
          "latitude": 13.49089,
          "longitude": 79.51839
        },
        {
          "latitude": 13.48405,
          "longitude": 79.50251
        },
        {
          "latitude": 13.47138,
          "longitude": 79.50026
        },
        {
          "latitude": 13.47341,
          "longitude": 79.47535
        },
        {
          "latitude": 13.46657,
          "longitude": 79.47529
        },
        {
          "latitude": 13.45485,
          "longitude": 79.4863
        },
        {
          "latitude": 13.46507,
          "longitude": 79.50029
        },
        {
          "latitude": 13.46357,
          "longitude": 79.51319
        },
        {
          "latitude": 13.44569,
          "longitude": 79.52062
        },
        {
          "latitude": 13.44222,
          "longitude": 79.50988
        },
        {
          "latitude": 13.36945,
          "longitude": 79.50941
        },
        {
          "latitude": 13.35157,
          "longitude": 79.49783
        },
        {
          "latitude": 13.33261,
          "longitude": 79.49742
        },
        {
          "latitude": 13.34439,
          "longitude": 79.52594
        },
        {
          "latitude": 13.33821,
          "longitude": 79.53587
        },
        {
          "latitude": 13.36205,
          "longitude": 79.5434
        },
        {
          "latitude": 13.37986,
          "longitude": 79.57918
        },
        {
          "latitude": 13.39332,
          "longitude": 79.57843
        },
        {
          "latitude": 13.39803,
          "longitude": 79.62439
        },
        {
          "latitude": 13.38893,
          "longitude": 79.63688
        },
        {
          "latitude": 13.41048,
          "longitude": 79.6502
        },
        {
          "latitude": 13.41185,
          "longitude": 79.67215
        },
        {
          "latitude": 13.43838,
          "longitude": 79.67375
        },
        {
          "latitude": 13.44478,
          "longitude": 79.69522
        },
        {
          "latitude": 13.43988,
          "longitude": 79.71246
        },
        {
          "latitude": 13.42114,
          "longitude": 79.71499
        },
        {
          "latitude": 13.39882,
          "longitude": 79.70137
        },
        {
          "latitude": 13.38664,
          "longitude": 79.70237
        },
        {
          "latitude": 13.3855,
          "longitude": 79.71953
        },
        {
          "latitude": 13.36725,
          "longitude": 79.72188
        },
        {
          "latitude": 13.35331,
          "longitude": 79.74038
        },
        {
          "latitude": 13.32378,
          "longitude": 79.75507
        },
        {
          "latitude": 13.32142,
          "longitude": 79.76683
        },
        {
          "latitude": 13.29352,
          "longitude": 79.79174
        },
        {
          "latitude": 13.31725,
          "longitude": 79.8089
        },
        {
          "latitude": 13.31692,
          "longitude": 79.86281
        },
        {
          "latitude": 13.33107,
          "longitude": 79.86807
        },
        {
          "latitude": 13.32332,
          "longitude": 79.8829
        },
        {
          "latitude": 13.33286,
          "longitude": 79.8835
        },
        {
          "latitude": 13.34814,
          "longitude": 79.91485
        },
        {
          "latitude": 13.35987,
          "longitude": 79.91597
        },
        {
          "latitude": 13.35151,
          "longitude": 79.9313
        },
        {
          "latitude": 13.36374,
          "longitude": 79.94565
        },
        {
          "latitude": 13.38178,
          "longitude": 79.94505
        },
        {
          "latitude": 13.37917,
          "longitude": 79.95804
        },
        {
          "latitude": 13.39423,
          "longitude": 79.96257
        },
        {
          "latitude": 13.39687,
          "longitude": 79.94435
        },
        {
          "latitude": 13.40773,
          "longitude": 79.9457
        },
        {
          "latitude": 13.41645,
          "longitude": 79.93457
        },
        {
          "latitude": 13.41672,
          "longitude": 79.94184
        },
        {
          "latitude": 13.42503,
          "longitude": 79.93961
        },
        {
          "latitude": 13.42219,
          "longitude": 79.95665
        },
        {
          "latitude": 13.42967,
          "longitude": 79.97333
        },
        {
          "latitude": 13.46909,
          "longitude": 79.97241
        },
        {
          "latitude": 13.47045,
          "longitude": 79.98239
        },
        {
          "latitude": 13.47958,
          "longitude": 79.98407
        },
        {
          "latitude": 13.47864,
          "longitude": 80.00749
        },
        {
          "latitude": 13.49795,
          "longitude": 80.0159
        },
        {
          "latitude": 13.49368,
          "longitude": 80.04662
        },
        {
          "latitude": 13.51262,
          "longitude": 80.0485
        },
        {
          "latitude": 13.51847,
          "longitude": 80.03535
        },
        {
          "latitude": 13.51362,
          "longitude": 80.02696
        },
        {
          "latitude": 13.5298,
          "longitude": 80.01747
        },
        {
          "latitude": 13.52569,
          "longitude": 80.00051
        },
        {
          "latitude": 13.54646,
          "longitude": 80.00182
        },
        {
          "latitude": 13.53666,
          "longitude": 80.05611
        },
        {
          "latitude": 13.54903,
          "longitude": 80.08143
        },
        {
          "latitude": 13.53764,
          "longitude": 80.08782
        },
        {
          "latitude": 13.52787,
          "longitude": 80.078
        },
        {
          "latitude": 13.48939,
          "longitude": 80.07745
        },
        {
          "latitude": 13.49453,
          "longitude": 80.10485
        },
        {
          "latitude": 13.48951,
          "longitude": 80.10734
        },
        {
          "latitude": 13.50592,
          "longitude": 80.11273
        },
        {
          "latitude": 13.50457,
          "longitude": 80.13852
        },
        {
          "latitude": 13.49047,
          "longitude": 80.15094
        },
        {
          "latitude": 13.49066,
          "longitude": 80.20981
        },
        {
          "latitude": 13.4726,
          "longitude": 80.24175
        },
        {
          "latitude": 13.56446,
          "longitude": 80.26868
        },
        {
          "latitude": 13.61685,
          "longitude": 80.24264
        },
        {
          "latitude": 13.6588,
          "longitude": 80.2337
        },
        {
          "latitude": 13.79837,
          "longitude": 80.24989
        },
        {
          "latitude": 14.03172,
          "longitude": 80.14998
        },
        {
          "latitude": 14.08703,
          "longitude": 80.13573
        },
        {
          "latitude": 14.1736,
          "longitude": 80.12629
        },
        {
          "latitude": 14.25838,
          "longitude": 80.13886
        },
        {
          "latitude": 14.25171,
          "longitude": 80.12379
        },
        {
          "latitude": 14.25486,
          "longitude": 80.10149
        },
        {
          "latitude": 14.23455,
          "longitude": 80.1036
        },
        {
          "latitude": 14.22439,
          "longitude": 80.07077
        },
        {
          "latitude": 14.20934,
          "longitude": 80.0659
        },
        {
          "latitude": 14.2202,
          "longitude": 80.05885
        },
        {
          "latitude": 14.19809,
          "longitude": 80.04741
        },
        {
          "latitude": 14.20317,
          "longitude": 80.03065
        },
        {
          "latitude": 14.19445,
          "longitude": 80.03636
        },
        {
          "latitude": 14.1849,
          "longitude": 80.02421
        },
        {
          "latitude": 14.19669,
          "longitude": 80.0137
        },
        {
          "latitude": 14.18162,
          "longitude": 79.98915
        },
        {
          "latitude": 14.1934,
          "longitude": 79.98666
        },
        {
          "latitude": 14.18604,
          "longitude": 79.97626
        },
        {
          "latitude": 14.16593,
          "longitude": 79.97421
        },
        {
          "latitude": 14.15309,
          "longitude": 79.95369
        },
        {
          "latitude": 14.16138,
          "longitude": 79.94173
        },
        {
          "latitude": 14.14248,
          "longitude": 79.93367
        },
        {
          "latitude": 14.1765,
          "longitude": 79.85603
        },
        {
          "latitude": 14.20942,
          "longitude": 79.84864
        },
        {
          "latitude": 14.22645,
          "longitude": 79.81807
        },
        {
          "latitude": 14.25686,
          "longitude": 79.81769
        },
        {
          "latitude": 14.26668,
          "longitude": 79.80005
        },
        {
          "latitude": 14.22465,
          "longitude": 79.77454
        },
        {
          "latitude": 14.21117,
          "longitude": 79.79591
        },
        {
          "latitude": 14.18356,
          "longitude": 79.8006
        },
        {
          "latitude": 14.1844,
          "longitude": 79.7784
        },
        {
          "latitude": 14.17539,
          "longitude": 79.76369
        },
        {
          "latitude": 14.15606,
          "longitude": 79.745
        },
        {
          "latitude": 14.128,
          "longitude": 79.73457
        },
        {
          "latitude": 14.10967,
          "longitude": 79.70788
        },
        {
          "latitude": 14.12133,
          "longitude": 79.66831
        },
        {
          "latitude": 14.15069,
          "longitude": 79.6653
        },
        {
          "latitude": 14.15453,
          "longitude": 79.65641
        },
        {
          "latitude": 14.15311,
          "longitude": 79.64041
        },
        {
          "latitude": 14.11624,
          "longitude": 79.64205
        },
        {
          "latitude": 14.10712,
          "longitude": 79.63036
        },
        {
          "latitude": 14.1205,
          "longitude": 79.59954
        },
        {
          "latitude": 14.13272,
          "longitude": 79.59956
        },
        {
          "latitude": 14.14336,
          "longitude": 79.58734
        },
        {
          "latitude": 14.17298,
          "longitude": 79.52902
        },
        {
          "latitude": 14.18583,
          "longitude": 79.42843
        },
        {
          "latitude": 14.10181,
          "longitude": 79.45441
        },
        {
          "latitude": 14.02507,
          "longitude": 79.437
        },
        {
          "latitude": 13.99809,
          "longitude": 79.44317
        },
        {
          "latitude": 13.9885,
          "longitude": 79.45568
        },
        {
          "latitude": 13.97272,
          "longitude": 79.45034
        },
        {
          "latitude": 13.94727,
          "longitude": 79.45867
        },
        {
          "latitude": 13.8709,
          "longitude": 79.43434
        },
        {
          "latitude": 13.8245,
          "longitude": 79.45522
        },
        {
          "latitude": 13.79928,
          "longitude": 79.45799
        },
        {
          "latitude": 13.79695,
          "longitude": 79.47099
        },
        {
          "latitude": 13.77991,
          "longitude": 79.44853
        },
        {
          "latitude": 13.78509,
          "longitude": 79.42002
        },
        {
          "latitude": 13.76278,
          "longitude": 79.41397
        },
        {
          "latitude": 13.75531,
          "longitude": 79.3722
        },
        {
          "latitude": 13.72297,
          "longitude": 79.30537
        },
        {
          "latitude": 13.75857,
          "longitude": 79.29239
        },
        {
          "latitude": 13.75994,
          "longitude": 79.24125
        },
        {
          "latitude": 13.75054,
          "longitude": 79.24097
        },
        {
          "latitude": 13.75726,
          "longitude": 79.22379
        },
        {
          "latitude": 13.77235,
          "longitude": 79.21783
        },
        {
          "latitude": 13.793,
          "longitude": 79.19115
        },
        {
          "latitude": 13.80316,
          "longitude": 79.19426
        },
        {
          "latitude": 13.81206,
          "longitude": 79.21574
        },
        {
          "latitude": 13.86562,
          "longitude": 79.14842
        },
        {
          "latitude": 13.84962,
          "longitude": 79.12632
        },
        {
          "latitude": 13.84995,
          "longitude": 79.09636
        },
        {
          "latitude": 13.8788,
          "longitude": 79.08282
        },
        {
          "latitude": 13.88908,
          "longitude": 79.02929
        },
        {
          "latitude": 13.90298,
          "longitude": 79.02368
        },
        {
          "latitude": 13.90765,
          "longitude": 79.0082
        },
        {
          "latitude": 13.90318,
          "longitude": 79.00519
        },
        {
          "latitude": 13.89406,
          "longitude": 79.02356
        },
        {
          "latitude": 13.88002,
          "longitude": 79.02196
        },
        {
          "latitude": 13.86404,
          "longitude": 79.04983
        },
        {
          "latitude": 13.85606,
          "longitude": 79.04684
        },
        {
          "latitude": 13.8579,
          "longitude": 79.02087
        },
        {
          "latitude": 13.84963,
          "longitude": 79.02558
        },
        {
          "latitude": 13.84414,
          "longitude": 79.01079
        },
        {
          "latitude": 13.82592,
          "longitude": 79.01414
        },
        {
          "latitude": 13.81451,
          "longitude": 79.04235
        },
        {
          "latitude": 13.80385,
          "longitude": 79.04089
        },
        {
          "latitude": 13.80039,
          "longitude": 79.02363
        },
        {
          "latitude": 13.77552,
          "longitude": 79.02431
        },
        {
          "latitude": 13.77111,
          "longitude": 79.03674
        },
        {
          "latitude": 13.78263,
          "longitude": 79.0856
        },
        {
          "latitude": 13.77533,
          "longitude": 79.09135
        },
        {
          "latitude": 13.73869,
          "longitude": 79.08216
        },
        {
          "latitude": 13.71819,
          "longitude": 79.09191
        },
        {
          "latitude": 13.65894,
          "longitude": 79.07362
        },
        {
          "latitude": 13.64521,
          "longitude": 79.05261
        },
        {
          "latitude": 13.61837,
          "longitude": 79.04924
        },
        {
          "latitude": 13.61228,
          "longitude": 79.05495
        },
        {
          "latitude": 13.60334,
          "longitude": 79.1724
        },
        {
          "latitude": 13.56527,
          "longitude": 79.17017
        },
        {
          "latitude": 13.54428,
          "longitude": 79.17992
        },
        {
          "latitude": 13.52181,
          "longitude": 79.14392
        },
        {
          "latitude": 13.52174,
          "longitude": 79.11104
        },
        {
          "latitude": 13.5132,
          "longitude": 79.0987
        },
        {
          "latitude": 13.51798,
          "longitude": 79.0841
        },
        {
          "latitude": 13.53237,
          "longitude": 79.08201
        },
        {
          "latitude": 13.52953,
          "longitude": 79.06417
        },
        {
          "latitude": 13.5412,
          "longitude": 79.04304
        },
        {
          "latitude": 13.56257,
          "longitude": 79.03656
        },
        {
          "latitude": 13.56243,
          "longitude": 79.02145
        },
        {
          "latitude": 13.54364,
          "longitude": 79.01534
        },
        {
          "latitude": 13.54006,
          "longitude": 79.00414
        },
        {
          "latitude": 13.54156,
          "longitude": 78.95125
        }
      ]
    ]
  },
  {
    "id": "visakhapatnam",
    "name": "Visakhapatnam",
    "headquarters": "Visakhapatnam",
    "center": {
      "latitude": 17.8201,
      "longitude": 83.2884
    },
    "region": "North Coastal",
    "polygon": [
      {
        "latitude": 17.69302,
        "longitude": 83.1121
      },
      {
        "latitude": 17.6822,
        "longitude": 83.12784
      },
      {
        "latitude": 17.6588,
        "longitude": 83.12541
      },
      {
        "latitude": 17.6487,
        "longitude": 83.15279
      },
      {
        "latitude": 17.61313,
        "longitude": 83.13089
      },
      {
        "latitude": 17.54669,
        "longitude": 83.11472
      },
      {
        "latitude": 17.56072,
        "longitude": 83.16255
      },
      {
        "latitude": 17.57522,
        "longitude": 83.1742
      },
      {
        "latitude": 17.59097,
        "longitude": 83.21296
      },
      {
        "latitude": 17.61201,
        "longitude": 83.23786
      },
      {
        "latitude": 17.62961,
        "longitude": 83.23641
      },
      {
        "latitude": 17.66064,
        "longitude": 83.28209
      },
      {
        "latitude": 17.67482,
        "longitude": 83.29475
      },
      {
        "latitude": 17.69362,
        "longitude": 83.29678
      },
      {
        "latitude": 17.72315,
        "longitude": 83.34333
      },
      {
        "latitude": 17.75628,
        "longitude": 83.35446
      },
      {
        "latitude": 17.77764,
        "longitude": 83.38567
      },
      {
        "latitude": 17.79053,
        "longitude": 83.38889
      },
      {
        "latitude": 17.8095,
        "longitude": 83.41065
      },
      {
        "latitude": 17.85387,
        "longitude": 83.41745
      },
      {
        "latitude": 17.87307,
        "longitude": 83.44358
      },
      {
        "latitude": 17.91146,
        "longitude": 83.4692
      },
      {
        "latitude": 17.94762,
        "longitude": 83.52499
      },
      {
        "latitude": 17.94441,
        "longitude": 83.49557
      },
      {
        "latitude": 17.96169,
        "longitude": 83.48312
      },
      {
        "latitude": 17.96749,
        "longitude": 83.46589
      },
      {
        "latitude": 17.96,
        "longitude": 83.45128
      },
      {
        "latitude": 17.94564,
        "longitude": 83.45057
      },
      {
        "latitude": 17.94546,
        "longitude": 83.43705
      },
      {
        "latitude": 17.92802,
        "longitude": 83.44857
      },
      {
        "latitude": 17.92545,
        "longitude": 83.44403
      },
      {
        "latitude": 17.93999,
        "longitude": 83.42396
      },
      {
        "latitude": 17.96599,
        "longitude": 83.40708
      },
      {
        "latitude": 17.9852,
        "longitude": 83.41271
      },
      {
        "latitude": 17.99839,
        "longitude": 83.42894
      },
      {
        "latitude": 18.01129,
        "longitude": 83.42796
      },
      {
        "latitude": 18.01477,
        "longitude": 83.40333
      },
      {
        "latitude": 18.04791,
        "longitude": 83.39831
      },
      {
        "latitude": 18.06573,
        "longitude": 83.35406
      },
      {
        "latitude": 18.06086,
        "longitude": 83.34254
      },
      {
        "latitude": 18.05264,
        "longitude": 83.34302
      },
      {
        "latitude": 18.02619,
        "longitude": 83.31897
      },
      {
        "latitude": 18.03127,
        "longitude": 83.30645
      },
      {
        "latitude": 18.00536,
        "longitude": 83.31323
      },
      {
        "latitude": 18.00709,
        "longitude": 83.29296
      },
      {
        "latitude": 17.99555,
        "longitude": 83.29507
      },
      {
        "latitude": 18.00573,
        "longitude": 83.27312
      },
      {
        "latitude": 17.96382,
        "longitude": 83.25411
      },
      {
        "latitude": 17.94539,
        "longitude": 83.22999
      },
      {
        "latitude": 17.92581,
        "longitude": 83.23646
      },
      {
        "latitude": 17.91688,
        "longitude": 83.26255
      },
      {
        "latitude": 17.90367,
        "longitude": 83.24372
      },
      {
        "latitude": 17.8733,
        "longitude": 83.23185
      },
      {
        "latitude": 17.87982,
        "longitude": 83.21346
      },
      {
        "latitude": 17.86276,
        "longitude": 83.2085
      },
      {
        "latitude": 17.85972,
        "longitude": 83.21355
      },
      {
        "latitude": 17.84806,
        "longitude": 83.20544
      },
      {
        "latitude": 17.84613,
        "longitude": 83.16587
      },
      {
        "latitude": 17.78081,
        "longitude": 83.16459
      },
      {
        "latitude": 17.77338,
        "longitude": 83.15803
      },
      {
        "latitude": 17.75706,
        "longitude": 83.16449
      },
      {
        "latitude": 17.73516,
        "longitude": 83.15762
      },
      {
        "latitude": 17.71791,
        "longitude": 83.15135
      },
      {
        "latitude": 17.70883,
        "longitude": 83.13565
      },
      {
        "latitude": 17.71172,
        "longitude": 83.12125
      },
      {
        "latitude": 17.69689,
        "longitude": 83.12225
      },
      {
        "latitude": 17.69302,
        "longitude": 83.1121
      }
    ],
    "polygons": [
      [
        {
          "latitude": 17.69302,
          "longitude": 83.1121
        },
        {
          "latitude": 17.6822,
          "longitude": 83.12784
        },
        {
          "latitude": 17.6588,
          "longitude": 83.12541
        },
        {
          "latitude": 17.6487,
          "longitude": 83.15279
        },
        {
          "latitude": 17.61313,
          "longitude": 83.13089
        },
        {
          "latitude": 17.54669,
          "longitude": 83.11472
        },
        {
          "latitude": 17.56072,
          "longitude": 83.16255
        },
        {
          "latitude": 17.57522,
          "longitude": 83.1742
        },
        {
          "latitude": 17.59097,
          "longitude": 83.21296
        },
        {
          "latitude": 17.61201,
          "longitude": 83.23786
        },
        {
          "latitude": 17.62961,
          "longitude": 83.23641
        },
        {
          "latitude": 17.66064,
          "longitude": 83.28209
        },
        {
          "latitude": 17.67482,
          "longitude": 83.29475
        },
        {
          "latitude": 17.69362,
          "longitude": 83.29678
        },
        {
          "latitude": 17.72315,
          "longitude": 83.34333
        },
        {
          "latitude": 17.75628,
          "longitude": 83.35446
        },
        {
          "latitude": 17.77764,
          "longitude": 83.38567
        },
        {
          "latitude": 17.79053,
          "longitude": 83.38889
        },
        {
          "latitude": 17.8095,
          "longitude": 83.41065
        },
        {
          "latitude": 17.85387,
          "longitude": 83.41745
        },
        {
          "latitude": 17.87307,
          "longitude": 83.44358
        },
        {
          "latitude": 17.91146,
          "longitude": 83.4692
        },
        {
          "latitude": 17.94762,
          "longitude": 83.52499
        },
        {
          "latitude": 17.94441,
          "longitude": 83.49557
        },
        {
          "latitude": 17.96169,
          "longitude": 83.48312
        },
        {
          "latitude": 17.96749,
          "longitude": 83.46589
        },
        {
          "latitude": 17.96,
          "longitude": 83.45128
        },
        {
          "latitude": 17.94564,
          "longitude": 83.45057
        },
        {
          "latitude": 17.94546,
          "longitude": 83.43705
        },
        {
          "latitude": 17.92802,
          "longitude": 83.44857
        },
        {
          "latitude": 17.92545,
          "longitude": 83.44403
        },
        {
          "latitude": 17.93999,
          "longitude": 83.42396
        },
        {
          "latitude": 17.96599,
          "longitude": 83.40708
        },
        {
          "latitude": 17.9852,
          "longitude": 83.41271
        },
        {
          "latitude": 17.99839,
          "longitude": 83.42894
        },
        {
          "latitude": 18.01129,
          "longitude": 83.42796
        },
        {
          "latitude": 18.01477,
          "longitude": 83.40333
        },
        {
          "latitude": 18.04791,
          "longitude": 83.39831
        },
        {
          "latitude": 18.06573,
          "longitude": 83.35406
        },
        {
          "latitude": 18.06086,
          "longitude": 83.34254
        },
        {
          "latitude": 18.05264,
          "longitude": 83.34302
        },
        {
          "latitude": 18.02619,
          "longitude": 83.31897
        },
        {
          "latitude": 18.03127,
          "longitude": 83.30645
        },
        {
          "latitude": 18.00536,
          "longitude": 83.31323
        },
        {
          "latitude": 18.00709,
          "longitude": 83.29296
        },
        {
          "latitude": 17.99555,
          "longitude": 83.29507
        },
        {
          "latitude": 18.00573,
          "longitude": 83.27312
        },
        {
          "latitude": 17.96382,
          "longitude": 83.25411
        },
        {
          "latitude": 17.94539,
          "longitude": 83.22999
        },
        {
          "latitude": 17.92581,
          "longitude": 83.23646
        },
        {
          "latitude": 17.91688,
          "longitude": 83.26255
        },
        {
          "latitude": 17.90367,
          "longitude": 83.24372
        },
        {
          "latitude": 17.8733,
          "longitude": 83.23185
        },
        {
          "latitude": 17.87982,
          "longitude": 83.21346
        },
        {
          "latitude": 17.86276,
          "longitude": 83.2085
        },
        {
          "latitude": 17.85972,
          "longitude": 83.21355
        },
        {
          "latitude": 17.84806,
          "longitude": 83.20544
        },
        {
          "latitude": 17.84613,
          "longitude": 83.16587
        },
        {
          "latitude": 17.78081,
          "longitude": 83.16459
        },
        {
          "latitude": 17.77338,
          "longitude": 83.15803
        },
        {
          "latitude": 17.75706,
          "longitude": 83.16449
        },
        {
          "latitude": 17.73516,
          "longitude": 83.15762
        },
        {
          "latitude": 17.71791,
          "longitude": 83.15135
        },
        {
          "latitude": 17.70883,
          "longitude": 83.13565
        },
        {
          "latitude": 17.71172,
          "longitude": 83.12125
        },
        {
          "latitude": 17.69689,
          "longitude": 83.12225
        },
        {
          "latitude": 17.69302,
          "longitude": 83.1121
        }
      ]
    ]
  },
  {
    "id": "vizianagaram",
    "name": "Vizianagaram",
    "headquarters": "Vizianagaram",
    "center": {
      "latitude": 18.2785,
      "longitude": 83.4159
    },
    "region": "North Coastal",
    "polygon": [
      {
        "latitude": 17.98811,
        "longitude": 83.00754
      },
      {
        "latitude": 17.97613,
        "longitude": 83.00931
      },
      {
        "latitude": 17.96951,
        "longitude": 83.03918
      },
      {
        "latitude": 17.94442,
        "longitude": 83.07209
      },
      {
        "latitude": 17.93765,
        "longitude": 83.10995
      },
      {
        "latitude": 17.92103,
        "longitude": 83.11056
      },
      {
        "latitude": 17.90434,
        "longitude": 83.1285
      },
      {
        "latitude": 17.87219,
        "longitude": 83.13069
      },
      {
        "latitude": 17.86882,
        "longitude": 83.14752
      },
      {
        "latitude": 17.84612,
        "longitude": 83.1502
      },
      {
        "latitude": 17.83848,
        "longitude": 83.16191
      },
      {
        "latitude": 17.84786,
        "longitude": 83.16733
      },
      {
        "latitude": 17.84851,
        "longitude": 83.20617
      },
      {
        "latitude": 17.88031,
        "longitude": 83.21442
      },
      {
        "latitude": 17.8733,
        "longitude": 83.23185
      },
      {
        "latitude": 17.90367,
        "longitude": 83.24372
      },
      {
        "latitude": 17.91688,
        "longitude": 83.26255
      },
      {
        "latitude": 17.92581,
        "longitude": 83.23646
      },
      {
        "latitude": 17.94539,
        "longitude": 83.22999
      },
      {
        "latitude": 17.96382,
        "longitude": 83.25411
      },
      {
        "latitude": 18.00573,
        "longitude": 83.27312
      },
      {
        "latitude": 17.99555,
        "longitude": 83.29507
      },
      {
        "latitude": 18.00709,
        "longitude": 83.29296
      },
      {
        "latitude": 18.00536,
        "longitude": 83.31323
      },
      {
        "latitude": 18.03127,
        "longitude": 83.30645
      },
      {
        "latitude": 18.02619,
        "longitude": 83.31897
      },
      {
        "latitude": 18.06579,
        "longitude": 83.35309
      },
      {
        "latitude": 18.04791,
        "longitude": 83.39831
      },
      {
        "latitude": 18.01477,
        "longitude": 83.40333
      },
      {
        "latitude": 18.01129,
        "longitude": 83.42796
      },
      {
        "latitude": 17.99839,
        "longitude": 83.42894
      },
      {
        "latitude": 17.9852,
        "longitude": 83.41271
      },
      {
        "latitude": 17.96599,
        "longitude": 83.40708
      },
      {
        "latitude": 17.93999,
        "longitude": 83.42396
      },
      {
        "latitude": 17.92545,
        "longitude": 83.44403
      },
      {
        "latitude": 17.92802,
        "longitude": 83.44857
      },
      {
        "latitude": 17.94546,
        "longitude": 83.43705
      },
      {
        "latitude": 17.94564,
        "longitude": 83.45057
      },
      {
        "latitude": 17.96,
        "longitude": 83.45128
      },
      {
        "latitude": 17.96749,
        "longitude": 83.46589
      },
      {
        "latitude": 17.96169,
        "longitude": 83.48312
      },
      {
        "latitude": 17.94441,
        "longitude": 83.49557
      },
      {
        "latitude": 17.95104,
        "longitude": 83.5316
      },
      {
        "latitude": 17.98248,
        "longitude": 83.5583
      },
      {
        "latitude": 18.01073,
        "longitude": 83.56879
      },
      {
        "latitude": 18.07829,
        "longitude": 83.66402
      },
      {
        "latitude": 18.10424,
        "longitude": 83.64479
      },
      {
        "latitude": 18.11541,
        "longitude": 83.6202
      },
      {
        "latitude": 18.13097,
        "longitude": 83.62353
      },
      {
        "latitude": 18.1574,
        "longitude": 83.60276
      },
      {
        "latitude": 18.17822,
        "longitude": 83.61502
      },
      {
        "latitude": 18.2076,
        "longitude": 83.60251
      },
      {
        "latitude": 18.2177,
        "longitude": 83.62581
      },
      {
        "latitude": 18.21105,
        "longitude": 83.64959
      },
      {
        "latitude": 18.23143,
        "longitude": 83.66368
      },
      {
        "latitude": 18.27043,
        "longitude": 83.6644
      },
      {
        "latitude": 18.2825,
        "longitude": 83.67365
      },
      {
        "latitude": 18.29197,
        "longitude": 83.70308
      },
      {
        "latitude": 18.30591,
        "longitude": 83.69616
      },
      {
        "latitude": 18.31696,
        "longitude": 83.66849
      },
      {
        "latitude": 18.32202,
        "longitude": 83.62164
      },
      {
        "latitude": 18.33369,
        "longitude": 83.62354
      },
      {
        "latitude": 18.32901,
        "longitude": 83.60039
      },
      {
        "latitude": 18.33977,
        "longitude": 83.61014
      },
      {
        "latitude": 18.3569,
        "longitude": 83.58532
      },
      {
        "latitude": 18.36893,
        "longitude": 83.59987
      },
      {
        "latitude": 18.38306,
        "longitude": 83.60344
      },
      {
        "latitude": 18.37627,
        "longitude": 83.63326
      },
      {
        "latitude": 18.38555,
        "longitude": 83.64991
      },
      {
        "latitude": 18.38727,
        "longitude": 83.70421
      },
      {
        "latitude": 18.42929,
        "longitude": 83.69546
      },
      {
        "latitude": 18.44399,
        "longitude": 83.7078
      },
      {
        "latitude": 18.43489,
        "longitude": 83.71453
      },
      {
        "latitude": 18.43895,
        "longitude": 83.72235
      },
      {
        "latitude": 18.43059,
        "longitude": 83.72378
      },
      {
        "latitude": 18.42661,
        "longitude": 83.71503
      },
      {
        "latitude": 18.42762,
        "longitude": 83.7289
      },
      {
        "latitude": 18.37428,
        "longitude": 83.76673
      },
      {
        "latitude": 18.36845,
        "longitude": 83.79874
      },
      {
        "latitude": 18.38917,
        "longitude": 83.79742
      },
      {
        "latitude": 18.39511,
        "longitude": 83.80491
      },
      {
        "latitude": 18.38476,
        "longitude": 83.82945
      },
      {
        "latitude": 18.40309,
        "longitude": 83.82291
      },
      {
        "latitude": 18.41929,
        "longitude": 83.83318
      },
      {
        "latitude": 18.43649,
        "longitude": 83.80941
      },
      {
        "latitude": 18.47456,
        "longitude": 83.81883
      },
      {
        "latitude": 18.50654,
        "longitude": 83.78805
      },
      {
        "latitude": 18.54624,
        "longitude": 83.80184
      },
      {
        "latitude": 18.54178,
        "longitude": 83.78296
      },
      {
        "latitude": 18.56158,
        "longitude": 83.77628
      },
      {
        "latitude": 18.56925,
        "longitude": 83.75526
      },
      {
        "latitude": 18.58242,
        "longitude": 83.75319
      },
      {
        "latitude": 18.58314,
        "longitude": 83.7434
      },
      {
        "latitude": 18.55967,
        "longitude": 83.72405
      },
      {
        "latitude": 18.57088,
        "longitude": 83.72034
      },
      {
        "latitude": 18.57042,
        "longitude": 83.70079
      },
      {
        "latitude": 18.58208,
        "longitude": 83.68541
      },
      {
        "latitude": 18.5806,
        "longitude": 83.66703
      },
      {
        "latitude": 18.58966,
        "longitude": 83.6485
      },
      {
        "latitude": 18.63983,
        "longitude": 83.62059
      },
      {
        "latitude": 18.64813,
        "longitude": 83.60491
      },
      {
        "latitude": 18.65823,
        "longitude": 83.60424
      },
      {
        "latitude": 18.67329,
        "longitude": 83.57543
      },
      {
        "latitude": 18.69532,
        "longitude": 83.57188
      },
      {
        "latitude": 18.7118,
        "longitude": 83.54643
      },
      {
        "latitude": 18.71045,
        "longitude": 83.53784
      },
      {
        "latitude": 18.69113,
        "longitude": 83.54007
      },
      {
        "latitude": 18.66809,
        "longitude": 83.56107
      },
      {
        "latitude": 18.64738,
        "longitude": 83.55002
      },
      {
        "latitude": 18.63286,
        "longitude": 83.55624
      },
      {
        "latitude": 18.62634,
        "longitude": 83.54835
      },
      {
        "latitude": 18.59588,
        "longitude": 83.5503
      },
      {
        "latitude": 18.59124,
        "longitude": 83.57023
      },
      {
        "latitude": 18.57904,
        "longitude": 83.54184
      },
      {
        "latitude": 18.55178,
        "longitude": 83.52593
      },
      {
        "latitude": 18.53585,
        "longitude": 83.54784
      },
      {
        "latitude": 18.51834,
        "longitude": 83.51721
      },
      {
        "latitude": 18.53749,
        "longitude": 83.51671
      },
      {
        "latitude": 18.54382,
        "longitude": 83.49991
      },
      {
        "latitude": 18.55914,
        "longitude": 83.49714
      },
      {
        "latitude": 18.56551,
        "longitude": 83.47268
      },
      {
        "latitude": 18.5772,
        "longitude": 83.47392
      },
      {
        "latitude": 18.57309,
        "longitude": 83.48783
      },
      {
        "latitude": 18.59109,
        "longitude": 83.49492
      },
      {
        "latitude": 18.61706,
        "longitude": 83.47594
      },
      {
        "latitude": 18.62636,
        "longitude": 83.44453
      },
      {
        "latitude": 18.60441,
        "longitude": 83.42689
      },
      {
        "latitude": 18.62197,
        "longitude": 83.4142
      },
      {
        "latitude": 18.60487,
        "longitude": 83.40672
      },
      {
        "latitude": 18.61162,
        "longitude": 83.37787
      },
      {
        "latitude": 18.5989,
        "longitude": 83.36763
      },
      {
        "latitude": 18.61161,
        "longitude": 83.34512
      },
      {
        "latitude": 18.64343,
        "longitude": 83.34658
      },
      {
        "latitude": 18.65847,
        "longitude": 83.33349
      },
      {
        "latitude": 18.65766,
        "longitude": 83.32079
      },
      {
        "latitude": 18.63123,
        "longitude": 83.31017
      },
      {
        "latitude": 18.61957,
        "longitude": 83.29139
      },
      {
        "latitude": 18.62722,
        "longitude": 83.28882
      },
      {
        "latitude": 18.62588,
        "longitude": 83.27989
      },
      {
        "latitude": 18.58802,
        "longitude": 83.24689
      },
      {
        "latitude": 18.58359,
        "longitude": 83.26128
      },
      {
        "latitude": 18.55896,
        "longitude": 83.2513
      },
      {
        "latitude": 18.55034,
        "longitude": 83.27573
      },
      {
        "latitude": 18.54303,
        "longitude": 83.273
      },
      {
        "latitude": 18.53913,
        "longitude": 83.25016
      },
      {
        "latitude": 18.48688,
        "longitude": 83.21841
      },
      {
        "latitude": 18.47944,
        "longitude": 83.22226
      },
      {
        "latitude": 18.48458,
        "longitude": 83.23221
      },
      {
        "latitude": 18.46506,
        "longitude": 83.24152
      },
      {
        "latitude": 18.47897,
        "longitude": 83.25402
      },
      {
        "latitude": 18.47036,
        "longitude": 83.26377
      },
      {
        "latitude": 18.44625,
        "longitude": 83.24
      },
      {
        "latitude": 18.45091,
        "longitude": 83.23107
      },
      {
        "latitude": 18.43878,
        "longitude": 83.21895
      },
      {
        "latitude": 18.44141,
        "longitude": 83.20209
      },
      {
        "latitude": 18.40285,
        "longitude": 83.20947
      },
      {
        "latitude": 18.40414,
        "longitude": 83.22236
      },
      {
        "latitude": 18.39816,
        "longitude": 83.22471
      },
      {
        "latitude": 18.38628,
        "longitude": 83.19855
      },
      {
        "latitude": 18.37098,
        "longitude": 83.18514
      },
      {
        "latitude": 18.37173,
        "longitude": 83.17581
      },
      {
        "latitude": 18.34028,
        "longitude": 83.15482
      },
      {
        "latitude": 18.33444,
        "longitude": 83.16536
      },
      {
        "latitude": 18.30831,
        "longitude": 83.17236
      },
      {
        "latitude": 18.32299,
        "longitude": 83.1951
      },
      {
        "latitude": 18.32777,
        "longitude": 83.22679
      },
      {
        "latitude": 18.31721,
        "longitude": 83.2291
      },
      {
        "latitude": 18.29811,
        "longitude": 83.21805
      },
      {
        "latitude": 18.26966,
        "longitude": 83.26458
      },
      {
        "latitude": 18.2382,
        "longitude": 83.26034
      },
      {
        "latitude": 18.21589,
        "longitude": 83.26619
      },
      {
        "latitude": 18.23012,
        "longitude": 83.24799
      },
      {
        "latitude": 18.20281,
        "longitude": 83.24003
      },
      {
        "latitude": 18.2067,
        "longitude": 83.22633
      },
      {
        "latitude": 18.22512,
        "longitude": 83.21797
      },
      {
        "latitude": 18.21055,
        "longitude": 83.22164
      },
      {
        "latitude": 18.20164,
        "longitude": 83.21481
      },
      {
        "latitude": 18.19279,
        "longitude": 83.22383
      },
      {
        "latitude": 18.18883,
        "longitude": 83.21499
      },
      {
        "latitude": 18.19673,
        "longitude": 83.19122
      },
      {
        "latitude": 18.2249,
        "longitude": 83.17527
      },
      {
        "latitude": 18.21406,
        "longitude": 83.15757
      },
      {
        "latitude": 18.18995,
        "longitude": 83.16252
      },
      {
        "latitude": 18.18519,
        "longitude": 83.17121
      },
      {
        "latitude": 18.17512,
        "longitude": 83.15596
      },
      {
        "latitude": 18.17885,
        "longitude": 83.13958
      },
      {
        "latitude": 18.19816,
        "longitude": 83.13777
      },
      {
        "latitude": 18.20783,
        "longitude": 83.1236
      },
      {
        "latitude": 18.20307,
        "longitude": 83.10574
      },
      {
        "latitude": 18.18845,
        "longitude": 83.10399
      },
      {
        "latitude": 18.16338,
        "longitude": 83.12179
      },
      {
        "latitude": 18.16324,
        "longitude": 83.14852
      },
      {
        "latitude": 18.14392,
        "longitude": 83.16826
      },
      {
        "latitude": 18.14946,
        "longitude": 83.12891
      },
      {
        "latitude": 18.11523,
        "longitude": 83.1191
      },
      {
        "latitude": 18.11227,
        "longitude": 83.1316
      },
      {
        "latitude": 18.1048,
        "longitude": 83.13027
      },
      {
        "latitude": 18.08947,
        "longitude": 83.08423
      },
      {
        "latitude": 18.07572,
        "longitude": 83.06741
      },
      {
        "latitude": 18.08247,
        "longitude": 83.05144
      },
      {
        "latitude": 18.06536,
        "longitude": 83.0524
      },
      {
        "latitude": 18.05502,
        "longitude": 83.0175
      },
      {
        "latitude": 18.04156,
        "longitude": 83.00967
      },
      {
        "latitude": 17.9977,
        "longitude": 83.01327
      },
      {
        "latitude": 17.98811,
        "longitude": 83.00754
      }
    ],
    "polygons": [
      [
        {
          "latitude": 17.98811,
          "longitude": 83.00754
        },
        {
          "latitude": 17.97613,
          "longitude": 83.00931
        },
        {
          "latitude": 17.96951,
          "longitude": 83.03918
        },
        {
          "latitude": 17.94442,
          "longitude": 83.07209
        },
        {
          "latitude": 17.93765,
          "longitude": 83.10995
        },
        {
          "latitude": 17.92103,
          "longitude": 83.11056
        },
        {
          "latitude": 17.90434,
          "longitude": 83.1285
        },
        {
          "latitude": 17.87219,
          "longitude": 83.13069
        },
        {
          "latitude": 17.86882,
          "longitude": 83.14752
        },
        {
          "latitude": 17.84612,
          "longitude": 83.1502
        },
        {
          "latitude": 17.83848,
          "longitude": 83.16191
        },
        {
          "latitude": 17.84786,
          "longitude": 83.16733
        },
        {
          "latitude": 17.84851,
          "longitude": 83.20617
        },
        {
          "latitude": 17.88031,
          "longitude": 83.21442
        },
        {
          "latitude": 17.8733,
          "longitude": 83.23185
        },
        {
          "latitude": 17.90367,
          "longitude": 83.24372
        },
        {
          "latitude": 17.91688,
          "longitude": 83.26255
        },
        {
          "latitude": 17.92581,
          "longitude": 83.23646
        },
        {
          "latitude": 17.94539,
          "longitude": 83.22999
        },
        {
          "latitude": 17.96382,
          "longitude": 83.25411
        },
        {
          "latitude": 18.00573,
          "longitude": 83.27312
        },
        {
          "latitude": 17.99555,
          "longitude": 83.29507
        },
        {
          "latitude": 18.00709,
          "longitude": 83.29296
        },
        {
          "latitude": 18.00536,
          "longitude": 83.31323
        },
        {
          "latitude": 18.03127,
          "longitude": 83.30645
        },
        {
          "latitude": 18.02619,
          "longitude": 83.31897
        },
        {
          "latitude": 18.06579,
          "longitude": 83.35309
        },
        {
          "latitude": 18.04791,
          "longitude": 83.39831
        },
        {
          "latitude": 18.01477,
          "longitude": 83.40333
        },
        {
          "latitude": 18.01129,
          "longitude": 83.42796
        },
        {
          "latitude": 17.99839,
          "longitude": 83.42894
        },
        {
          "latitude": 17.9852,
          "longitude": 83.41271
        },
        {
          "latitude": 17.96599,
          "longitude": 83.40708
        },
        {
          "latitude": 17.93999,
          "longitude": 83.42396
        },
        {
          "latitude": 17.92545,
          "longitude": 83.44403
        },
        {
          "latitude": 17.92802,
          "longitude": 83.44857
        },
        {
          "latitude": 17.94546,
          "longitude": 83.43705
        },
        {
          "latitude": 17.94564,
          "longitude": 83.45057
        },
        {
          "latitude": 17.96,
          "longitude": 83.45128
        },
        {
          "latitude": 17.96749,
          "longitude": 83.46589
        },
        {
          "latitude": 17.96169,
          "longitude": 83.48312
        },
        {
          "latitude": 17.94441,
          "longitude": 83.49557
        },
        {
          "latitude": 17.95104,
          "longitude": 83.5316
        },
        {
          "latitude": 17.98248,
          "longitude": 83.5583
        },
        {
          "latitude": 18.01073,
          "longitude": 83.56879
        },
        {
          "latitude": 18.07829,
          "longitude": 83.66402
        },
        {
          "latitude": 18.10424,
          "longitude": 83.64479
        },
        {
          "latitude": 18.11541,
          "longitude": 83.6202
        },
        {
          "latitude": 18.13097,
          "longitude": 83.62353
        },
        {
          "latitude": 18.1574,
          "longitude": 83.60276
        },
        {
          "latitude": 18.17822,
          "longitude": 83.61502
        },
        {
          "latitude": 18.2076,
          "longitude": 83.60251
        },
        {
          "latitude": 18.2177,
          "longitude": 83.62581
        },
        {
          "latitude": 18.21105,
          "longitude": 83.64959
        },
        {
          "latitude": 18.23143,
          "longitude": 83.66368
        },
        {
          "latitude": 18.27043,
          "longitude": 83.6644
        },
        {
          "latitude": 18.2825,
          "longitude": 83.67365
        },
        {
          "latitude": 18.29197,
          "longitude": 83.70308
        },
        {
          "latitude": 18.30591,
          "longitude": 83.69616
        },
        {
          "latitude": 18.31696,
          "longitude": 83.66849
        },
        {
          "latitude": 18.32202,
          "longitude": 83.62164
        },
        {
          "latitude": 18.33369,
          "longitude": 83.62354
        },
        {
          "latitude": 18.32901,
          "longitude": 83.60039
        },
        {
          "latitude": 18.33977,
          "longitude": 83.61014
        },
        {
          "latitude": 18.3569,
          "longitude": 83.58532
        },
        {
          "latitude": 18.36893,
          "longitude": 83.59987
        },
        {
          "latitude": 18.38306,
          "longitude": 83.60344
        },
        {
          "latitude": 18.37627,
          "longitude": 83.63326
        },
        {
          "latitude": 18.38555,
          "longitude": 83.64991
        },
        {
          "latitude": 18.38727,
          "longitude": 83.70421
        },
        {
          "latitude": 18.42929,
          "longitude": 83.69546
        },
        {
          "latitude": 18.44399,
          "longitude": 83.7078
        },
        {
          "latitude": 18.43489,
          "longitude": 83.71453
        },
        {
          "latitude": 18.43895,
          "longitude": 83.72235
        },
        {
          "latitude": 18.43059,
          "longitude": 83.72378
        },
        {
          "latitude": 18.42661,
          "longitude": 83.71503
        },
        {
          "latitude": 18.42762,
          "longitude": 83.7289
        },
        {
          "latitude": 18.37428,
          "longitude": 83.76673
        },
        {
          "latitude": 18.36845,
          "longitude": 83.79874
        },
        {
          "latitude": 18.38917,
          "longitude": 83.79742
        },
        {
          "latitude": 18.39511,
          "longitude": 83.80491
        },
        {
          "latitude": 18.38476,
          "longitude": 83.82945
        },
        {
          "latitude": 18.40309,
          "longitude": 83.82291
        },
        {
          "latitude": 18.41929,
          "longitude": 83.83318
        },
        {
          "latitude": 18.43649,
          "longitude": 83.80941
        },
        {
          "latitude": 18.47456,
          "longitude": 83.81883
        },
        {
          "latitude": 18.50654,
          "longitude": 83.78805
        },
        {
          "latitude": 18.54624,
          "longitude": 83.80184
        },
        {
          "latitude": 18.54178,
          "longitude": 83.78296
        },
        {
          "latitude": 18.56158,
          "longitude": 83.77628
        },
        {
          "latitude": 18.56925,
          "longitude": 83.75526
        },
        {
          "latitude": 18.58242,
          "longitude": 83.75319
        },
        {
          "latitude": 18.58314,
          "longitude": 83.7434
        },
        {
          "latitude": 18.55967,
          "longitude": 83.72405
        },
        {
          "latitude": 18.57088,
          "longitude": 83.72034
        },
        {
          "latitude": 18.57042,
          "longitude": 83.70079
        },
        {
          "latitude": 18.58208,
          "longitude": 83.68541
        },
        {
          "latitude": 18.5806,
          "longitude": 83.66703
        },
        {
          "latitude": 18.58966,
          "longitude": 83.6485
        },
        {
          "latitude": 18.63983,
          "longitude": 83.62059
        },
        {
          "latitude": 18.64813,
          "longitude": 83.60491
        },
        {
          "latitude": 18.65823,
          "longitude": 83.60424
        },
        {
          "latitude": 18.67329,
          "longitude": 83.57543
        },
        {
          "latitude": 18.69532,
          "longitude": 83.57188
        },
        {
          "latitude": 18.7118,
          "longitude": 83.54643
        },
        {
          "latitude": 18.71045,
          "longitude": 83.53784
        },
        {
          "latitude": 18.69113,
          "longitude": 83.54007
        },
        {
          "latitude": 18.66809,
          "longitude": 83.56107
        },
        {
          "latitude": 18.64738,
          "longitude": 83.55002
        },
        {
          "latitude": 18.63286,
          "longitude": 83.55624
        },
        {
          "latitude": 18.62634,
          "longitude": 83.54835
        },
        {
          "latitude": 18.59588,
          "longitude": 83.5503
        },
        {
          "latitude": 18.59124,
          "longitude": 83.57023
        },
        {
          "latitude": 18.57904,
          "longitude": 83.54184
        },
        {
          "latitude": 18.55178,
          "longitude": 83.52593
        },
        {
          "latitude": 18.53585,
          "longitude": 83.54784
        },
        {
          "latitude": 18.51834,
          "longitude": 83.51721
        },
        {
          "latitude": 18.53749,
          "longitude": 83.51671
        },
        {
          "latitude": 18.54382,
          "longitude": 83.49991
        },
        {
          "latitude": 18.55914,
          "longitude": 83.49714
        },
        {
          "latitude": 18.56551,
          "longitude": 83.47268
        },
        {
          "latitude": 18.5772,
          "longitude": 83.47392
        },
        {
          "latitude": 18.57309,
          "longitude": 83.48783
        },
        {
          "latitude": 18.59109,
          "longitude": 83.49492
        },
        {
          "latitude": 18.61706,
          "longitude": 83.47594
        },
        {
          "latitude": 18.62636,
          "longitude": 83.44453
        },
        {
          "latitude": 18.60441,
          "longitude": 83.42689
        },
        {
          "latitude": 18.62197,
          "longitude": 83.4142
        },
        {
          "latitude": 18.60487,
          "longitude": 83.40672
        },
        {
          "latitude": 18.61162,
          "longitude": 83.37787
        },
        {
          "latitude": 18.5989,
          "longitude": 83.36763
        },
        {
          "latitude": 18.61161,
          "longitude": 83.34512
        },
        {
          "latitude": 18.64343,
          "longitude": 83.34658
        },
        {
          "latitude": 18.65847,
          "longitude": 83.33349
        },
        {
          "latitude": 18.65766,
          "longitude": 83.32079
        },
        {
          "latitude": 18.63123,
          "longitude": 83.31017
        },
        {
          "latitude": 18.61957,
          "longitude": 83.29139
        },
        {
          "latitude": 18.62722,
          "longitude": 83.28882
        },
        {
          "latitude": 18.62588,
          "longitude": 83.27989
        },
        {
          "latitude": 18.58802,
          "longitude": 83.24689
        },
        {
          "latitude": 18.58359,
          "longitude": 83.26128
        },
        {
          "latitude": 18.55896,
          "longitude": 83.2513
        },
        {
          "latitude": 18.55034,
          "longitude": 83.27573
        },
        {
          "latitude": 18.54303,
          "longitude": 83.273
        },
        {
          "latitude": 18.53913,
          "longitude": 83.25016
        },
        {
          "latitude": 18.48688,
          "longitude": 83.21841
        },
        {
          "latitude": 18.47944,
          "longitude": 83.22226
        },
        {
          "latitude": 18.48458,
          "longitude": 83.23221
        },
        {
          "latitude": 18.46506,
          "longitude": 83.24152
        },
        {
          "latitude": 18.47897,
          "longitude": 83.25402
        },
        {
          "latitude": 18.47036,
          "longitude": 83.26377
        },
        {
          "latitude": 18.44625,
          "longitude": 83.24
        },
        {
          "latitude": 18.45091,
          "longitude": 83.23107
        },
        {
          "latitude": 18.43878,
          "longitude": 83.21895
        },
        {
          "latitude": 18.44141,
          "longitude": 83.20209
        },
        {
          "latitude": 18.40285,
          "longitude": 83.20947
        },
        {
          "latitude": 18.40414,
          "longitude": 83.22236
        },
        {
          "latitude": 18.39816,
          "longitude": 83.22471
        },
        {
          "latitude": 18.38628,
          "longitude": 83.19855
        },
        {
          "latitude": 18.37098,
          "longitude": 83.18514
        },
        {
          "latitude": 18.37173,
          "longitude": 83.17581
        },
        {
          "latitude": 18.34028,
          "longitude": 83.15482
        },
        {
          "latitude": 18.33444,
          "longitude": 83.16536
        },
        {
          "latitude": 18.30831,
          "longitude": 83.17236
        },
        {
          "latitude": 18.32299,
          "longitude": 83.1951
        },
        {
          "latitude": 18.32777,
          "longitude": 83.22679
        },
        {
          "latitude": 18.31721,
          "longitude": 83.2291
        },
        {
          "latitude": 18.29811,
          "longitude": 83.21805
        },
        {
          "latitude": 18.26966,
          "longitude": 83.26458
        },
        {
          "latitude": 18.2382,
          "longitude": 83.26034
        },
        {
          "latitude": 18.21589,
          "longitude": 83.26619
        },
        {
          "latitude": 18.23012,
          "longitude": 83.24799
        },
        {
          "latitude": 18.20281,
          "longitude": 83.24003
        },
        {
          "latitude": 18.2067,
          "longitude": 83.22633
        },
        {
          "latitude": 18.22512,
          "longitude": 83.21797
        },
        {
          "latitude": 18.21055,
          "longitude": 83.22164
        },
        {
          "latitude": 18.20164,
          "longitude": 83.21481
        },
        {
          "latitude": 18.19279,
          "longitude": 83.22383
        },
        {
          "latitude": 18.18883,
          "longitude": 83.21499
        },
        {
          "latitude": 18.19673,
          "longitude": 83.19122
        },
        {
          "latitude": 18.2249,
          "longitude": 83.17527
        },
        {
          "latitude": 18.21406,
          "longitude": 83.15757
        },
        {
          "latitude": 18.18995,
          "longitude": 83.16252
        },
        {
          "latitude": 18.18519,
          "longitude": 83.17121
        },
        {
          "latitude": 18.17512,
          "longitude": 83.15596
        },
        {
          "latitude": 18.17885,
          "longitude": 83.13958
        },
        {
          "latitude": 18.19816,
          "longitude": 83.13777
        },
        {
          "latitude": 18.20783,
          "longitude": 83.1236
        },
        {
          "latitude": 18.20307,
          "longitude": 83.10574
        },
        {
          "latitude": 18.18845,
          "longitude": 83.10399
        },
        {
          "latitude": 18.16338,
          "longitude": 83.12179
        },
        {
          "latitude": 18.16324,
          "longitude": 83.14852
        },
        {
          "latitude": 18.14392,
          "longitude": 83.16826
        },
        {
          "latitude": 18.14946,
          "longitude": 83.12891
        },
        {
          "latitude": 18.11523,
          "longitude": 83.1191
        },
        {
          "latitude": 18.11227,
          "longitude": 83.1316
        },
        {
          "latitude": 18.1048,
          "longitude": 83.13027
        },
        {
          "latitude": 18.08947,
          "longitude": 83.08423
        },
        {
          "latitude": 18.07572,
          "longitude": 83.06741
        },
        {
          "latitude": 18.08247,
          "longitude": 83.05144
        },
        {
          "latitude": 18.06536,
          "longitude": 83.0524
        },
        {
          "latitude": 18.05502,
          "longitude": 83.0175
        },
        {
          "latitude": 18.04156,
          "longitude": 83.00967
        },
        {
          "latitude": 17.9977,
          "longitude": 83.01327
        },
        {
          "latitude": 17.98811,
          "longitude": 83.00754
        }
      ],
      [
        {
          "latitude": 18.54724,
          "longitude": 83.55801
        },
        {
          "latitude": 18.56141,
          "longitude": 83.56246
        },
        {
          "latitude": 18.56668,
          "longitude": 83.57316
        },
        {
          "latitude": 18.56039,
          "longitude": 83.62868
        },
        {
          "latitude": 18.54639,
          "longitude": 83.63407
        },
        {
          "latitude": 18.52547,
          "longitude": 83.63069
        },
        {
          "latitude": 18.52847,
          "longitude": 83.57223
        },
        {
          "latitude": 18.54724,
          "longitude": 83.55801
        }
      ]
    ]
  },
  {
    "id": "west_godavari",
    "name": "West Godavari",
    "headquarters": "Bhimavaram",
    "center": {
      "latitude": 16.5961,
      "longitude": 81.5923
    },
    "region": "Coastal Andhra",
    "polygon": [
      {
        "latitude": 16.62485,
        "longitude": 81.3264
      },
      {
        "latitude": 16.6066,
        "longitude": 81.34356
      },
      {
        "latitude": 16.61056,
        "longitude": 81.3546
      },
      {
        "latitude": 16.59716,
        "longitude": 81.35774
      },
      {
        "latitude": 16.59053,
        "longitude": 81.34675
      },
      {
        "latitude": 16.53034,
        "longitude": 81.34321
      },
      {
        "latitude": 16.51011,
        "longitude": 81.33207
      },
      {
        "latitude": 16.50708,
        "longitude": 81.3622
      },
      {
        "latitude": 16.49823,
        "longitude": 81.37108
      },
      {
        "latitude": 16.476,
        "longitude": 81.36837
      },
      {
        "latitude": 16.46817,
        "longitude": 81.37877
      },
      {
        "latitude": 16.45838,
        "longitude": 81.37346
      },
      {
        "latitude": 16.44271,
        "longitude": 81.38582
      },
      {
        "latitude": 16.438,
        "longitude": 81.40209
      },
      {
        "latitude": 16.42856,
        "longitude": 81.40166
      },
      {
        "latitude": 16.41889,
        "longitude": 81.41381
      },
      {
        "latitude": 16.41919,
        "longitude": 81.42459
      },
      {
        "latitude": 16.39876,
        "longitude": 81.43716
      },
      {
        "latitude": 16.4052,
        "longitude": 81.45428
      },
      {
        "latitude": 16.39771,
        "longitude": 81.47166
      },
      {
        "latitude": 16.36942,
        "longitude": 81.49468
      },
      {
        "latitude": 16.37054,
        "longitude": 81.51179
      },
      {
        "latitude": 16.38033,
        "longitude": 81.52137
      },
      {
        "latitude": 16.37791,
        "longitude": 81.54406
      },
      {
        "latitude": 16.34709,
        "longitude": 81.55878
      },
      {
        "latitude": 16.32781,
        "longitude": 81.69059
      },
      {
        "latitude": 16.31688,
        "longitude": 81.71323
      },
      {
        "latitude": 16.35611,
        "longitude": 81.7161
      },
      {
        "latitude": 16.41338,
        "longitude": 81.69652
      },
      {
        "latitude": 16.44394,
        "longitude": 81.71101
      },
      {
        "latitude": 16.44504,
        "longitude": 81.72602
      },
      {
        "latitude": 16.42289,
        "longitude": 81.7369
      },
      {
        "latitude": 16.42349,
        "longitude": 81.75584
      },
      {
        "latitude": 16.47696,
        "longitude": 81.79897
      },
      {
        "latitude": 16.50141,
        "longitude": 81.84875
      },
      {
        "latitude": 16.52922,
        "longitude": 81.84528
      },
      {
        "latitude": 16.59865,
        "longitude": 81.8588
      },
      {
        "latitude": 16.64944,
        "longitude": 81.84066
      },
      {
        "latitude": 16.69501,
        "longitude": 81.80114
      },
      {
        "latitude": 16.69502,
        "longitude": 81.78796
      },
      {
        "latitude": 16.68576,
        "longitude": 81.78853
      },
      {
        "latitude": 16.6745,
        "longitude": 81.75919
      },
      {
        "latitude": 16.69411,
        "longitude": 81.75916
      },
      {
        "latitude": 16.70519,
        "longitude": 81.74888
      },
      {
        "latitude": 16.72798,
        "longitude": 81.75252
      },
      {
        "latitude": 16.72817,
        "longitude": 81.72019
      },
      {
        "latitude": 16.77073,
        "longitude": 81.72573
      },
      {
        "latitude": 16.76406,
        "longitude": 81.72172
      },
      {
        "latitude": 16.76671,
        "longitude": 81.68998
      },
      {
        "latitude": 16.76142,
        "longitude": 81.68745
      },
      {
        "latitude": 16.76758,
        "longitude": 81.68215
      },
      {
        "latitude": 16.76132,
        "longitude": 81.68055
      },
      {
        "latitude": 16.77502,
        "longitude": 81.66853
      },
      {
        "latitude": 16.78512,
        "longitude": 81.63511
      },
      {
        "latitude": 16.79609,
        "longitude": 81.62488
      },
      {
        "latitude": 16.85152,
        "longitude": 81.65744
      },
      {
        "latitude": 16.85411,
        "longitude": 81.63699
      },
      {
        "latitude": 16.89187,
        "longitude": 81.62456
      },
      {
        "latitude": 16.90427,
        "longitude": 81.60761
      },
      {
        "latitude": 16.90194,
        "longitude": 81.57357
      },
      {
        "latitude": 16.91862,
        "longitude": 81.55334
      },
      {
        "latitude": 16.93824,
        "longitude": 81.55065
      },
      {
        "latitude": 16.95601,
        "longitude": 81.50469
      },
      {
        "latitude": 16.97189,
        "longitude": 81.49441
      },
      {
        "latitude": 16.91006,
        "longitude": 81.48655
      },
      {
        "latitude": 16.89687,
        "longitude": 81.473
      },
      {
        "latitude": 16.89811,
        "longitude": 81.46136
      },
      {
        "latitude": 16.8709,
        "longitude": 81.45787
      },
      {
        "latitude": 16.8642,
        "longitude": 81.47479
      },
      {
        "latitude": 16.81843,
        "longitude": 81.48606
      },
      {
        "latitude": 16.81365,
        "longitude": 81.49817
      },
      {
        "latitude": 16.78032,
        "longitude": 81.4724
      },
      {
        "latitude": 16.75804,
        "longitude": 81.48049
      },
      {
        "latitude": 16.75802,
        "longitude": 81.44005
      },
      {
        "latitude": 16.73515,
        "longitude": 81.44327
      },
      {
        "latitude": 16.72349,
        "longitude": 81.44934
      },
      {
        "latitude": 16.72648,
        "longitude": 81.46997
      },
      {
        "latitude": 16.73686,
        "longitude": 81.47923
      },
      {
        "latitude": 16.7263,
        "longitude": 81.50328
      },
      {
        "latitude": 16.73671,
        "longitude": 81.51615
      },
      {
        "latitude": 16.73064,
        "longitude": 81.52155
      },
      {
        "latitude": 16.73827,
        "longitude": 81.53192
      },
      {
        "latitude": 16.73427,
        "longitude": 81.54234
      },
      {
        "latitude": 16.76261,
        "longitude": 81.55315
      },
      {
        "latitude": 16.76058,
        "longitude": 81.56388
      },
      {
        "latitude": 16.7229,
        "longitude": 81.56847
      },
      {
        "latitude": 16.72068,
        "longitude": 81.59628
      },
      {
        "latitude": 16.70261,
        "longitude": 81.59806
      },
      {
        "latitude": 16.70319,
        "longitude": 81.58415
      },
      {
        "latitude": 16.69138,
        "longitude": 81.57081
      },
      {
        "latitude": 16.68176,
        "longitude": 81.57112
      },
      {
        "latitude": 16.67905,
        "longitude": 81.55603
      },
      {
        "latitude": 16.66665,
        "longitude": 81.55362
      },
      {
        "latitude": 16.65637,
        "longitude": 81.56342
      },
      {
        "latitude": 16.64269,
        "longitude": 81.55153
      },
      {
        "latitude": 16.65229,
        "longitude": 81.53901
      },
      {
        "latitude": 16.6722,
        "longitude": 81.53206
      },
      {
        "latitude": 16.66435,
        "longitude": 81.49915
      },
      {
        "latitude": 16.67363,
        "longitude": 81.49197
      },
      {
        "latitude": 16.68921,
        "longitude": 81.49589
      },
      {
        "latitude": 16.68809,
        "longitude": 81.47418
      },
      {
        "latitude": 16.67825,
        "longitude": 81.47233
      },
      {
        "latitude": 16.67594,
        "longitude": 81.45336
      },
      {
        "latitude": 16.66044,
        "longitude": 81.43215
      },
      {
        "latitude": 16.667,
        "longitude": 81.39404
      },
      {
        "latitude": 16.65715,
        "longitude": 81.34459
      },
      {
        "latitude": 16.67489,
        "longitude": 81.34297
      },
      {
        "latitude": 16.6784,
        "longitude": 81.35223
      },
      {
        "latitude": 16.69219,
        "longitude": 81.35308
      },
      {
        "latitude": 16.69051,
        "longitude": 81.33615
      },
      {
        "latitude": 16.68758,
        "longitude": 81.32936
      },
      {
        "latitude": 16.66951,
        "longitude": 81.33383
      },
      {
        "latitude": 16.62485,
        "longitude": 81.3264
      }
    ],
    "polygons": [
      [
        {
          "latitude": 16.62485,
          "longitude": 81.3264
        },
        {
          "latitude": 16.6066,
          "longitude": 81.34356
        },
        {
          "latitude": 16.61056,
          "longitude": 81.3546
        },
        {
          "latitude": 16.59716,
          "longitude": 81.35774
        },
        {
          "latitude": 16.59053,
          "longitude": 81.34675
        },
        {
          "latitude": 16.53034,
          "longitude": 81.34321
        },
        {
          "latitude": 16.51011,
          "longitude": 81.33207
        },
        {
          "latitude": 16.50708,
          "longitude": 81.3622
        },
        {
          "latitude": 16.49823,
          "longitude": 81.37108
        },
        {
          "latitude": 16.476,
          "longitude": 81.36837
        },
        {
          "latitude": 16.46817,
          "longitude": 81.37877
        },
        {
          "latitude": 16.45838,
          "longitude": 81.37346
        },
        {
          "latitude": 16.44271,
          "longitude": 81.38582
        },
        {
          "latitude": 16.438,
          "longitude": 81.40209
        },
        {
          "latitude": 16.42856,
          "longitude": 81.40166
        },
        {
          "latitude": 16.41889,
          "longitude": 81.41381
        },
        {
          "latitude": 16.41919,
          "longitude": 81.42459
        },
        {
          "latitude": 16.39876,
          "longitude": 81.43716
        },
        {
          "latitude": 16.4052,
          "longitude": 81.45428
        },
        {
          "latitude": 16.39771,
          "longitude": 81.47166
        },
        {
          "latitude": 16.36942,
          "longitude": 81.49468
        },
        {
          "latitude": 16.37054,
          "longitude": 81.51179
        },
        {
          "latitude": 16.38033,
          "longitude": 81.52137
        },
        {
          "latitude": 16.37791,
          "longitude": 81.54406
        },
        {
          "latitude": 16.34709,
          "longitude": 81.55878
        },
        {
          "latitude": 16.32781,
          "longitude": 81.69059
        },
        {
          "latitude": 16.31688,
          "longitude": 81.71323
        },
        {
          "latitude": 16.35611,
          "longitude": 81.7161
        },
        {
          "latitude": 16.41338,
          "longitude": 81.69652
        },
        {
          "latitude": 16.44394,
          "longitude": 81.71101
        },
        {
          "latitude": 16.44504,
          "longitude": 81.72602
        },
        {
          "latitude": 16.42289,
          "longitude": 81.7369
        },
        {
          "latitude": 16.42349,
          "longitude": 81.75584
        },
        {
          "latitude": 16.47696,
          "longitude": 81.79897
        },
        {
          "latitude": 16.50141,
          "longitude": 81.84875
        },
        {
          "latitude": 16.52922,
          "longitude": 81.84528
        },
        {
          "latitude": 16.59865,
          "longitude": 81.8588
        },
        {
          "latitude": 16.64944,
          "longitude": 81.84066
        },
        {
          "latitude": 16.69501,
          "longitude": 81.80114
        },
        {
          "latitude": 16.69502,
          "longitude": 81.78796
        },
        {
          "latitude": 16.68576,
          "longitude": 81.78853
        },
        {
          "latitude": 16.6745,
          "longitude": 81.75919
        },
        {
          "latitude": 16.69411,
          "longitude": 81.75916
        },
        {
          "latitude": 16.70519,
          "longitude": 81.74888
        },
        {
          "latitude": 16.72798,
          "longitude": 81.75252
        },
        {
          "latitude": 16.72817,
          "longitude": 81.72019
        },
        {
          "latitude": 16.77073,
          "longitude": 81.72573
        },
        {
          "latitude": 16.76406,
          "longitude": 81.72172
        },
        {
          "latitude": 16.76671,
          "longitude": 81.68998
        },
        {
          "latitude": 16.76142,
          "longitude": 81.68745
        },
        {
          "latitude": 16.76758,
          "longitude": 81.68215
        },
        {
          "latitude": 16.76132,
          "longitude": 81.68055
        },
        {
          "latitude": 16.77502,
          "longitude": 81.66853
        },
        {
          "latitude": 16.78512,
          "longitude": 81.63511
        },
        {
          "latitude": 16.79609,
          "longitude": 81.62488
        },
        {
          "latitude": 16.85152,
          "longitude": 81.65744
        },
        {
          "latitude": 16.85411,
          "longitude": 81.63699
        },
        {
          "latitude": 16.89187,
          "longitude": 81.62456
        },
        {
          "latitude": 16.90427,
          "longitude": 81.60761
        },
        {
          "latitude": 16.90194,
          "longitude": 81.57357
        },
        {
          "latitude": 16.91862,
          "longitude": 81.55334
        },
        {
          "latitude": 16.93824,
          "longitude": 81.55065
        },
        {
          "latitude": 16.95601,
          "longitude": 81.50469
        },
        {
          "latitude": 16.97189,
          "longitude": 81.49441
        },
        {
          "latitude": 16.91006,
          "longitude": 81.48655
        },
        {
          "latitude": 16.89687,
          "longitude": 81.473
        },
        {
          "latitude": 16.89811,
          "longitude": 81.46136
        },
        {
          "latitude": 16.8709,
          "longitude": 81.45787
        },
        {
          "latitude": 16.8642,
          "longitude": 81.47479
        },
        {
          "latitude": 16.81843,
          "longitude": 81.48606
        },
        {
          "latitude": 16.81365,
          "longitude": 81.49817
        },
        {
          "latitude": 16.78032,
          "longitude": 81.4724
        },
        {
          "latitude": 16.75804,
          "longitude": 81.48049
        },
        {
          "latitude": 16.75802,
          "longitude": 81.44005
        },
        {
          "latitude": 16.73515,
          "longitude": 81.44327
        },
        {
          "latitude": 16.72349,
          "longitude": 81.44934
        },
        {
          "latitude": 16.72648,
          "longitude": 81.46997
        },
        {
          "latitude": 16.73686,
          "longitude": 81.47923
        },
        {
          "latitude": 16.7263,
          "longitude": 81.50328
        },
        {
          "latitude": 16.73671,
          "longitude": 81.51615
        },
        {
          "latitude": 16.73064,
          "longitude": 81.52155
        },
        {
          "latitude": 16.73827,
          "longitude": 81.53192
        },
        {
          "latitude": 16.73427,
          "longitude": 81.54234
        },
        {
          "latitude": 16.76261,
          "longitude": 81.55315
        },
        {
          "latitude": 16.76058,
          "longitude": 81.56388
        },
        {
          "latitude": 16.7229,
          "longitude": 81.56847
        },
        {
          "latitude": 16.72068,
          "longitude": 81.59628
        },
        {
          "latitude": 16.70261,
          "longitude": 81.59806
        },
        {
          "latitude": 16.70319,
          "longitude": 81.58415
        },
        {
          "latitude": 16.69138,
          "longitude": 81.57081
        },
        {
          "latitude": 16.68176,
          "longitude": 81.57112
        },
        {
          "latitude": 16.67905,
          "longitude": 81.55603
        },
        {
          "latitude": 16.66665,
          "longitude": 81.55362
        },
        {
          "latitude": 16.65637,
          "longitude": 81.56342
        },
        {
          "latitude": 16.64269,
          "longitude": 81.55153
        },
        {
          "latitude": 16.65229,
          "longitude": 81.53901
        },
        {
          "latitude": 16.6722,
          "longitude": 81.53206
        },
        {
          "latitude": 16.66435,
          "longitude": 81.49915
        },
        {
          "latitude": 16.67363,
          "longitude": 81.49197
        },
        {
          "latitude": 16.68921,
          "longitude": 81.49589
        },
        {
          "latitude": 16.68809,
          "longitude": 81.47418
        },
        {
          "latitude": 16.67825,
          "longitude": 81.47233
        },
        {
          "latitude": 16.67594,
          "longitude": 81.45336
        },
        {
          "latitude": 16.66044,
          "longitude": 81.43215
        },
        {
          "latitude": 16.667,
          "longitude": 81.39404
        },
        {
          "latitude": 16.65715,
          "longitude": 81.34459
        },
        {
          "latitude": 16.67489,
          "longitude": 81.34297
        },
        {
          "latitude": 16.6784,
          "longitude": 81.35223
        },
        {
          "latitude": 16.69219,
          "longitude": 81.35308
        },
        {
          "latitude": 16.69051,
          "longitude": 81.33615
        },
        {
          "latitude": 16.68758,
          "longitude": 81.32936
        },
        {
          "latitude": 16.66951,
          "longitude": 81.33383
        },
        {
          "latitude": 16.62485,
          "longitude": 81.3264
        }
      ]
    ]
  },
  {
    "id": "ysr_kadapa",
    "name": "YSR Kadapa",
    "headquarters": "Kadapa",
    "center": {
      "latitude": 14.6579,
      "longitude": 78.6575
    },
    "region": "Rayalaseema",
    "polygon": [
      {
        "latitude": 14.57044,
        "longitude": 77.94408
      },
      {
        "latitude": 14.53782,
        "longitude": 77.97722
      },
      {
        "latitude": 14.5318,
        "longitude": 77.97289
      },
      {
        "latitude": 14.48951,
        "longitude": 78.0008
      },
      {
        "latitude": 14.42188,
        "longitude": 78.08524
      },
      {
        "latitude": 14.39411,
        "longitude": 78.10621
      },
      {
        "latitude": 14.35023,
        "longitude": 78.18876
      },
      {
        "latitude": 14.31561,
        "longitude": 78.22914
      },
      {
        "latitude": 14.30522,
        "longitude": 78.25379
      },
      {
        "latitude": 14.30541,
        "longitude": 78.27743
      },
      {
        "latitude": 14.2924,
        "longitude": 78.28535
      },
      {
        "latitude": 14.2936,
        "longitude": 78.35741
      },
      {
        "latitude": 14.27756,
        "longitude": 78.39517
      },
      {
        "latitude": 14.28388,
        "longitude": 78.42081
      },
      {
        "latitude": 14.20184,
        "longitude": 78.40596
      },
      {
        "latitude": 14.19349,
        "longitude": 78.43118
      },
      {
        "latitude": 14.16878,
        "longitude": 78.41997
      },
      {
        "latitude": 14.14138,
        "longitude": 78.4253
      },
      {
        "latitude": 14.13472,
        "longitude": 78.43914
      },
      {
        "latitude": 14.16384,
        "longitude": 78.47835
      },
      {
        "latitude": 14.16928,
        "longitude": 78.5251
      },
      {
        "latitude": 14.15327,
        "longitude": 78.52885
      },
      {
        "latitude": 14.15533,
        "longitude": 78.54822
      },
      {
        "latitude": 14.1363,
        "longitude": 78.56485
      },
      {
        "latitude": 14.12583,
        "longitude": 78.54373
      },
      {
        "latitude": 14.11502,
        "longitude": 78.5597
      },
      {
        "latitude": 14.11521,
        "longitude": 78.56808
      },
      {
        "latitude": 14.13331,
        "longitude": 78.58153
      },
      {
        "latitude": 14.14349,
        "longitude": 78.56298
      },
      {
        "latitude": 14.15984,
        "longitude": 78.57512
      },
      {
        "latitude": 14.16523,
        "longitude": 78.57151
      },
      {
        "latitude": 14.16008,
        "longitude": 78.56483
      },
      {
        "latitude": 14.17445,
        "longitude": 78.56518
      },
      {
        "latitude": 14.18291,
        "longitude": 78.5755
      },
      {
        "latitude": 14.17753,
        "longitude": 78.58763
      },
      {
        "latitude": 14.19026,
        "longitude": 78.59072
      },
      {
        "latitude": 14.21108,
        "longitude": 78.62677
      },
      {
        "latitude": 14.25005,
        "longitude": 78.59858
      },
      {
        "latitude": 14.27323,
        "longitude": 78.59336
      },
      {
        "latitude": 14.28255,
        "longitude": 78.60215
      },
      {
        "latitude": 14.27393,
        "longitude": 78.64985
      },
      {
        "latitude": 14.26548,
        "longitude": 78.65972
      },
      {
        "latitude": 14.25011,
        "longitude": 78.65204
      },
      {
        "latitude": 14.24647,
        "longitude": 78.66991
      },
      {
        "latitude": 14.26403,
        "longitude": 78.68147
      },
      {
        "latitude": 14.27835,
        "longitude": 78.66688
      },
      {
        "latitude": 14.29642,
        "longitude": 78.66589
      },
      {
        "latitude": 14.29363,
        "longitude": 78.73371
      },
      {
        "latitude": 14.29983,
        "longitude": 78.74859
      },
      {
        "latitude": 14.3097,
        "longitude": 78.7444
      },
      {
        "latitude": 14.30701,
        "longitude": 78.75516
      },
      {
        "latitude": 14.31652,
        "longitude": 78.7695
      },
      {
        "latitude": 14.29125,
        "longitude": 78.81374
      },
      {
        "latitude": 14.29201,
        "longitude": 78.82731
      },
      {
        "latitude": 14.29767,
        "longitude": 78.87157
      },
      {
        "latitude": 14.32331,
        "longitude": 78.88069
      },
      {
        "latitude": 14.32185,
        "longitude": 78.90219
      },
      {
        "latitude": 14.29673,
        "longitude": 78.91147
      },
      {
        "latitude": 14.271,
        "longitude": 78.93735
      },
      {
        "latitude": 14.28318,
        "longitude": 78.96977
      },
      {
        "latitude": 14.27039,
        "longitude": 78.99386
      },
      {
        "latitude": 14.29035,
        "longitude": 79.02606
      },
      {
        "latitude": 14.27839,
        "longitude": 79.07118
      },
      {
        "latitude": 14.29664,
        "longitude": 79.08143
      },
      {
        "latitude": 14.30651,
        "longitude": 79.09836
      },
      {
        "latitude": 14.29514,
        "longitude": 79.14641
      },
      {
        "latitude": 14.3277,
        "longitude": 79.15483
      },
      {
        "latitude": 14.33674,
        "longitude": 79.13222
      },
      {
        "latitude": 14.37058,
        "longitude": 79.12078
      },
      {
        "latitude": 14.37136,
        "longitude": 79.1409
      },
      {
        "latitude": 14.35592,
        "longitude": 79.16237
      },
      {
        "latitude": 14.37929,
        "longitude": 79.18062
      },
      {
        "latitude": 14.37263,
        "longitude": 79.19432
      },
      {
        "latitude": 14.34541,
        "longitude": 79.20719
      },
      {
        "latitude": 14.35589,
        "longitude": 79.20633
      },
      {
        "latitude": 14.35586,
        "longitude": 79.216
      },
      {
        "latitude": 14.37792,
        "longitude": 79.21182
      },
      {
        "latitude": 14.36586,
        "longitude": 79.23854
      },
      {
        "latitude": 14.39693,
        "longitude": 79.20778
      },
      {
        "latitude": 14.41416,
        "longitude": 79.23241
      },
      {
        "latitude": 14.39263,
        "longitude": 79.26444
      },
      {
        "latitude": 14.39639,
        "longitude": 79.2782
      },
      {
        "latitude": 14.36047,
        "longitude": 79.30571
      },
      {
        "latitude": 14.38137,
        "longitude": 79.31408
      },
      {
        "latitude": 14.40551,
        "longitude": 79.29985
      },
      {
        "latitude": 14.41021,
        "longitude": 79.31168
      },
      {
        "latitude": 14.44076,
        "longitude": 79.31055
      },
      {
        "latitude": 14.46161,
        "longitude": 79.29797
      },
      {
        "latitude": 14.47112,
        "longitude": 79.3
      },
      {
        "latitude": 14.47917,
        "longitude": 79.28924
      },
      {
        "latitude": 14.48487,
        "longitude": 79.30245
      },
      {
        "latitude": 14.48652,
        "longitude": 79.29312
      },
      {
        "latitude": 14.5341,
        "longitude": 79.27816
      },
      {
        "latitude": 14.60061,
        "longitude": 79.23605
      },
      {
        "latitude": 14.6041,
        "longitude": 79.22956
      },
      {
        "latitude": 14.59035,
        "longitude": 79.21991
      },
      {
        "latitude": 14.61573,
        "longitude": 79.20003
      },
      {
        "latitude": 14.61863,
        "longitude": 79.18896
      },
      {
        "latitude": 14.64599,
        "longitude": 79.18139
      },
      {
        "latitude": 14.66133,
        "longitude": 79.18662
      },
      {
        "latitude": 14.68451,
        "longitude": 79.17369
      },
      {
        "latitude": 14.6907,
        "longitude": 79.18397
      },
      {
        "latitude": 14.71328,
        "longitude": 79.18551
      },
      {
        "latitude": 14.79609,
        "longitude": 79.15016
      },
      {
        "latitude": 14.86927,
        "longitude": 79.13348
      },
      {
        "latitude": 14.8975,
        "longitude": 79.10792
      },
      {
        "latitude": 14.90117,
        "longitude": 79.1115
      },
      {
        "latitude": 14.90105,
        "longitude": 79.10372
      },
      {
        "latitude": 14.93497,
        "longitude": 79.09264
      },
      {
        "latitude": 14.98482,
        "longitude": 79.081
      },
      {
        "latitude": 15.0514,
        "longitude": 79.08953
      },
      {
        "latitude": 15.14553,
        "longitude": 79.07213
      },
      {
        "latitude": 15.16499,
        "longitude": 79.07338
      },
      {
        "latitude": 15.1736,
        "longitude": 79.08303
      },
      {
        "latitude": 15.17955,
        "longitude": 79.01709
      },
      {
        "latitude": 15.16856,
        "longitude": 79.00938
      },
      {
        "latitude": 15.16877,
        "longitude": 78.97254
      },
      {
        "latitude": 15.17639,
        "longitude": 78.95766
      },
      {
        "latitude": 15.22875,
        "longitude": 78.94786
      },
      {
        "latitude": 15.2288,
        "longitude": 78.92726
      },
      {
        "latitude": 15.18751,
        "longitude": 78.91959
      },
      {
        "latitude": 15.19816,
        "longitude": 78.8718
      },
      {
        "latitude": 15.20043,
        "longitude": 78.77776
      },
      {
        "latitude": 15.18555,
        "longitude": 78.75738
      },
      {
        "latitude": 15.13505,
        "longitude": 78.74909
      },
      {
        "latitude": 15.05429,
        "longitude": 78.76054
      },
      {
        "latitude": 15.03513,
        "longitude": 78.74797
      },
      {
        "latitude": 15.02294,
        "longitude": 78.70913
      },
      {
        "latitude": 14.97029,
        "longitude": 78.71801
      },
      {
        "latitude": 14.96941,
        "longitude": 78.69186
      },
      {
        "latitude": 14.93981,
        "longitude": 78.68472
      },
      {
        "latitude": 14.9311,
        "longitude": 78.6602
      },
      {
        "latitude": 14.92696,
        "longitude": 78.63005
      },
      {
        "latitude": 14.94831,
        "longitude": 78.62975
      },
      {
        "latitude": 14.95577,
        "longitude": 78.60149
      },
      {
        "latitude": 14.94091,
        "longitude": 78.59216
      },
      {
        "latitude": 14.94711,
        "longitude": 78.58116
      },
      {
        "latitude": 14.93187,
        "longitude": 78.55305
      },
      {
        "latitude": 14.93453,
        "longitude": 78.54676
      },
      {
        "latitude": 14.96285,
        "longitude": 78.55138
      },
      {
        "latitude": 14.96642,
        "longitude": 78.54021
      },
      {
        "latitude": 14.9553,
        "longitude": 78.51963
      },
      {
        "latitude": 14.94313,
        "longitude": 78.51849
      },
      {
        "latitude": 14.90301,
        "longitude": 78.48103
      },
      {
        "latitude": 14.92476,
        "longitude": 78.48382
      },
      {
        "latitude": 14.95704,
        "longitude": 78.49863
      },
      {
        "latitude": 14.95646,
        "longitude": 78.505
      },
      {
        "latitude": 14.99819,
        "longitude": 78.51664
      },
      {
        "latitude": 15.00484,
        "longitude": 78.50884
      },
      {
        "latitude": 15.01424,
        "longitude": 78.51553
      },
      {
        "latitude": 15.06126,
        "longitude": 78.51573
      },
      {
        "latitude": 15.06857,
        "longitude": 78.50829
      },
      {
        "latitude": 15.07208,
        "longitude": 78.48152
      },
      {
        "latitude": 15.06515,
        "longitude": 78.48163
      },
      {
        "latitude": 15.06521,
        "longitude": 78.47437
      },
      {
        "latitude": 15.05168,
        "longitude": 78.48752
      },
      {
        "latitude": 15.03814,
        "longitude": 78.48517
      },
      {
        "latitude": 15.04485,
        "longitude": 78.48122
      },
      {
        "latitude": 15.03684,
        "longitude": 78.47467
      },
      {
        "latitude": 15.04052,
        "longitude": 78.46179
      },
      {
        "latitude": 15.0321,
        "longitude": 78.45689
      },
      {
        "latitude": 15.03823,
        "longitude": 78.43755
      },
      {
        "latitude": 15.03201,
        "longitude": 78.4179
      },
      {
        "latitude": 14.97444,
        "longitude": 78.40995
      },
      {
        "latitude": 14.96961,
        "longitude": 78.39233
      },
      {
        "latitude": 15.00322,
        "longitude": 78.34275
      },
      {
        "latitude": 15.03201,
        "longitude": 78.35344
      },
      {
        "latitude": 15.02656,
        "longitude": 78.36917
      },
      {
        "latitude": 15.03978,
        "longitude": 78.37757
      },
      {
        "latitude": 15.04994,
        "longitude": 78.39956
      },
      {
        "latitude": 15.0577,
        "longitude": 78.37809
      },
      {
        "latitude": 15.06959,
        "longitude": 78.38225
      },
      {
        "latitude": 15.07287,
        "longitude": 78.3705
      },
      {
        "latitude": 15.05331,
        "longitude": 78.36419
      },
      {
        "latitude": 15.07353,
        "longitude": 78.32505
      },
      {
        "latitude": 15.07271,
        "longitude": 78.28677
      },
      {
        "latitude": 15.0558,
        "longitude": 78.27482
      },
      {
        "latitude": 15.03191,
        "longitude": 78.28414
      },
      {
        "latitude": 15.02751,
        "longitude": 78.26049
      },
      {
        "latitude": 15.00056,
        "longitude": 78.24376
      },
      {
        "latitude": 15.00499,
        "longitude": 78.23605
      },
      {
        "latitude": 14.95604,
        "longitude": 78.22052
      },
      {
        "latitude": 14.96289,
        "longitude": 78.15721
      },
      {
        "latitude": 14.9349,
        "longitude": 78.13118
      },
      {
        "latitude": 14.93237,
        "longitude": 78.11343
      },
      {
        "latitude": 14.86234,
        "longitude": 78.08967
      },
      {
        "latitude": 14.85144,
        "longitude": 78.11385
      },
      {
        "latitude": 14.81769,
        "longitude": 78.10141
      },
      {
        "latitude": 14.82788,
        "longitude": 78.07679
      },
      {
        "latitude": 14.79776,
        "longitude": 78.06584
      },
      {
        "latitude": 14.77408,
        "longitude": 78.04661
      },
      {
        "latitude": 14.75313,
        "longitude": 78.0765
      },
      {
        "latitude": 14.71619,
        "longitude": 78.06696
      },
      {
        "latitude": 14.71412,
        "longitude": 78.09435
      },
      {
        "latitude": 14.70175,
        "longitude": 78.09679
      },
      {
        "latitude": 14.70223,
        "longitude": 78.10986
      },
      {
        "latitude": 14.69311,
        "longitude": 78.10987
      },
      {
        "latitude": 14.69621,
        "longitude": 78.13503
      },
      {
        "latitude": 14.62439,
        "longitude": 78.12224
      },
      {
        "latitude": 14.63128,
        "longitude": 78.08841
      },
      {
        "latitude": 14.573,
        "longitude": 78.0648
      },
      {
        "latitude": 14.56717,
        "longitude": 78.03955
      },
      {
        "latitude": 14.54148,
        "longitude": 78.04366
      },
      {
        "latitude": 14.53105,
        "longitude": 78.03337
      },
      {
        "latitude": 14.54097,
        "longitude": 77.9868
      },
      {
        "latitude": 14.56719,
        "longitude": 77.98302
      },
      {
        "latitude": 14.57503,
        "longitude": 77.97012
      },
      {
        "latitude": 14.58868,
        "longitude": 77.96584
      },
      {
        "latitude": 14.57044,
        "longitude": 77.94408
      }
    ],
    "polygons": [
      [
        {
          "latitude": 14.57044,
          "longitude": 77.94408
        },
        {
          "latitude": 14.53782,
          "longitude": 77.97722
        },
        {
          "latitude": 14.5318,
          "longitude": 77.97289
        },
        {
          "latitude": 14.48951,
          "longitude": 78.0008
        },
        {
          "latitude": 14.42188,
          "longitude": 78.08524
        },
        {
          "latitude": 14.39411,
          "longitude": 78.10621
        },
        {
          "latitude": 14.35023,
          "longitude": 78.18876
        },
        {
          "latitude": 14.31561,
          "longitude": 78.22914
        },
        {
          "latitude": 14.30522,
          "longitude": 78.25379
        },
        {
          "latitude": 14.30541,
          "longitude": 78.27743
        },
        {
          "latitude": 14.2924,
          "longitude": 78.28535
        },
        {
          "latitude": 14.2936,
          "longitude": 78.35741
        },
        {
          "latitude": 14.27756,
          "longitude": 78.39517
        },
        {
          "latitude": 14.28388,
          "longitude": 78.42081
        },
        {
          "latitude": 14.20184,
          "longitude": 78.40596
        },
        {
          "latitude": 14.19349,
          "longitude": 78.43118
        },
        {
          "latitude": 14.16878,
          "longitude": 78.41997
        },
        {
          "latitude": 14.14138,
          "longitude": 78.4253
        },
        {
          "latitude": 14.13472,
          "longitude": 78.43914
        },
        {
          "latitude": 14.16384,
          "longitude": 78.47835
        },
        {
          "latitude": 14.16928,
          "longitude": 78.5251
        },
        {
          "latitude": 14.15327,
          "longitude": 78.52885
        },
        {
          "latitude": 14.15533,
          "longitude": 78.54822
        },
        {
          "latitude": 14.1363,
          "longitude": 78.56485
        },
        {
          "latitude": 14.12583,
          "longitude": 78.54373
        },
        {
          "latitude": 14.11502,
          "longitude": 78.5597
        },
        {
          "latitude": 14.11521,
          "longitude": 78.56808
        },
        {
          "latitude": 14.13331,
          "longitude": 78.58153
        },
        {
          "latitude": 14.14349,
          "longitude": 78.56298
        },
        {
          "latitude": 14.15984,
          "longitude": 78.57512
        },
        {
          "latitude": 14.16523,
          "longitude": 78.57151
        },
        {
          "latitude": 14.16008,
          "longitude": 78.56483
        },
        {
          "latitude": 14.17445,
          "longitude": 78.56518
        },
        {
          "latitude": 14.18291,
          "longitude": 78.5755
        },
        {
          "latitude": 14.17753,
          "longitude": 78.58763
        },
        {
          "latitude": 14.19026,
          "longitude": 78.59072
        },
        {
          "latitude": 14.21108,
          "longitude": 78.62677
        },
        {
          "latitude": 14.25005,
          "longitude": 78.59858
        },
        {
          "latitude": 14.27323,
          "longitude": 78.59336
        },
        {
          "latitude": 14.28255,
          "longitude": 78.60215
        },
        {
          "latitude": 14.27393,
          "longitude": 78.64985
        },
        {
          "latitude": 14.26548,
          "longitude": 78.65972
        },
        {
          "latitude": 14.25011,
          "longitude": 78.65204
        },
        {
          "latitude": 14.24647,
          "longitude": 78.66991
        },
        {
          "latitude": 14.26403,
          "longitude": 78.68147
        },
        {
          "latitude": 14.27835,
          "longitude": 78.66688
        },
        {
          "latitude": 14.29642,
          "longitude": 78.66589
        },
        {
          "latitude": 14.29363,
          "longitude": 78.73371
        },
        {
          "latitude": 14.29983,
          "longitude": 78.74859
        },
        {
          "latitude": 14.3097,
          "longitude": 78.7444
        },
        {
          "latitude": 14.30701,
          "longitude": 78.75516
        },
        {
          "latitude": 14.31652,
          "longitude": 78.7695
        },
        {
          "latitude": 14.29125,
          "longitude": 78.81374
        },
        {
          "latitude": 14.29201,
          "longitude": 78.82731
        },
        {
          "latitude": 14.29767,
          "longitude": 78.87157
        },
        {
          "latitude": 14.32331,
          "longitude": 78.88069
        },
        {
          "latitude": 14.32185,
          "longitude": 78.90219
        },
        {
          "latitude": 14.29673,
          "longitude": 78.91147
        },
        {
          "latitude": 14.271,
          "longitude": 78.93735
        },
        {
          "latitude": 14.28318,
          "longitude": 78.96977
        },
        {
          "latitude": 14.27039,
          "longitude": 78.99386
        },
        {
          "latitude": 14.29035,
          "longitude": 79.02606
        },
        {
          "latitude": 14.27839,
          "longitude": 79.07118
        },
        {
          "latitude": 14.29664,
          "longitude": 79.08143
        },
        {
          "latitude": 14.30651,
          "longitude": 79.09836
        },
        {
          "latitude": 14.29514,
          "longitude": 79.14641
        },
        {
          "latitude": 14.3277,
          "longitude": 79.15483
        },
        {
          "latitude": 14.33674,
          "longitude": 79.13222
        },
        {
          "latitude": 14.37058,
          "longitude": 79.12078
        },
        {
          "latitude": 14.37136,
          "longitude": 79.1409
        },
        {
          "latitude": 14.35592,
          "longitude": 79.16237
        },
        {
          "latitude": 14.37929,
          "longitude": 79.18062
        },
        {
          "latitude": 14.37263,
          "longitude": 79.19432
        },
        {
          "latitude": 14.34541,
          "longitude": 79.20719
        },
        {
          "latitude": 14.35589,
          "longitude": 79.20633
        },
        {
          "latitude": 14.35586,
          "longitude": 79.216
        },
        {
          "latitude": 14.37792,
          "longitude": 79.21182
        },
        {
          "latitude": 14.36586,
          "longitude": 79.23854
        },
        {
          "latitude": 14.39693,
          "longitude": 79.20778
        },
        {
          "latitude": 14.41416,
          "longitude": 79.23241
        },
        {
          "latitude": 14.39263,
          "longitude": 79.26444
        },
        {
          "latitude": 14.39639,
          "longitude": 79.2782
        },
        {
          "latitude": 14.36047,
          "longitude": 79.30571
        },
        {
          "latitude": 14.38137,
          "longitude": 79.31408
        },
        {
          "latitude": 14.40551,
          "longitude": 79.29985
        },
        {
          "latitude": 14.41021,
          "longitude": 79.31168
        },
        {
          "latitude": 14.44076,
          "longitude": 79.31055
        },
        {
          "latitude": 14.46161,
          "longitude": 79.29797
        },
        {
          "latitude": 14.47112,
          "longitude": 79.3
        },
        {
          "latitude": 14.47917,
          "longitude": 79.28924
        },
        {
          "latitude": 14.48487,
          "longitude": 79.30245
        },
        {
          "latitude": 14.48652,
          "longitude": 79.29312
        },
        {
          "latitude": 14.5341,
          "longitude": 79.27816
        },
        {
          "latitude": 14.60061,
          "longitude": 79.23605
        },
        {
          "latitude": 14.6041,
          "longitude": 79.22956
        },
        {
          "latitude": 14.59035,
          "longitude": 79.21991
        },
        {
          "latitude": 14.61573,
          "longitude": 79.20003
        },
        {
          "latitude": 14.61863,
          "longitude": 79.18896
        },
        {
          "latitude": 14.64599,
          "longitude": 79.18139
        },
        {
          "latitude": 14.66133,
          "longitude": 79.18662
        },
        {
          "latitude": 14.68451,
          "longitude": 79.17369
        },
        {
          "latitude": 14.6907,
          "longitude": 79.18397
        },
        {
          "latitude": 14.71328,
          "longitude": 79.18551
        },
        {
          "latitude": 14.79609,
          "longitude": 79.15016
        },
        {
          "latitude": 14.86927,
          "longitude": 79.13348
        },
        {
          "latitude": 14.8975,
          "longitude": 79.10792
        },
        {
          "latitude": 14.90117,
          "longitude": 79.1115
        },
        {
          "latitude": 14.90105,
          "longitude": 79.10372
        },
        {
          "latitude": 14.93497,
          "longitude": 79.09264
        },
        {
          "latitude": 14.98482,
          "longitude": 79.081
        },
        {
          "latitude": 15.0514,
          "longitude": 79.08953
        },
        {
          "latitude": 15.14553,
          "longitude": 79.07213
        },
        {
          "latitude": 15.16499,
          "longitude": 79.07338
        },
        {
          "latitude": 15.1736,
          "longitude": 79.08303
        },
        {
          "latitude": 15.17955,
          "longitude": 79.01709
        },
        {
          "latitude": 15.16856,
          "longitude": 79.00938
        },
        {
          "latitude": 15.16877,
          "longitude": 78.97254
        },
        {
          "latitude": 15.17639,
          "longitude": 78.95766
        },
        {
          "latitude": 15.22875,
          "longitude": 78.94786
        },
        {
          "latitude": 15.2288,
          "longitude": 78.92726
        },
        {
          "latitude": 15.18751,
          "longitude": 78.91959
        },
        {
          "latitude": 15.19816,
          "longitude": 78.8718
        },
        {
          "latitude": 15.20043,
          "longitude": 78.77776
        },
        {
          "latitude": 15.18555,
          "longitude": 78.75738
        },
        {
          "latitude": 15.13505,
          "longitude": 78.74909
        },
        {
          "latitude": 15.05429,
          "longitude": 78.76054
        },
        {
          "latitude": 15.03513,
          "longitude": 78.74797
        },
        {
          "latitude": 15.02294,
          "longitude": 78.70913
        },
        {
          "latitude": 14.97029,
          "longitude": 78.71801
        },
        {
          "latitude": 14.96941,
          "longitude": 78.69186
        },
        {
          "latitude": 14.93981,
          "longitude": 78.68472
        },
        {
          "latitude": 14.9311,
          "longitude": 78.6602
        },
        {
          "latitude": 14.92696,
          "longitude": 78.63005
        },
        {
          "latitude": 14.94831,
          "longitude": 78.62975
        },
        {
          "latitude": 14.95577,
          "longitude": 78.60149
        },
        {
          "latitude": 14.94091,
          "longitude": 78.59216
        },
        {
          "latitude": 14.94711,
          "longitude": 78.58116
        },
        {
          "latitude": 14.93187,
          "longitude": 78.55305
        },
        {
          "latitude": 14.93453,
          "longitude": 78.54676
        },
        {
          "latitude": 14.96285,
          "longitude": 78.55138
        },
        {
          "latitude": 14.96642,
          "longitude": 78.54021
        },
        {
          "latitude": 14.9553,
          "longitude": 78.51963
        },
        {
          "latitude": 14.94313,
          "longitude": 78.51849
        },
        {
          "latitude": 14.90301,
          "longitude": 78.48103
        },
        {
          "latitude": 14.92476,
          "longitude": 78.48382
        },
        {
          "latitude": 14.95704,
          "longitude": 78.49863
        },
        {
          "latitude": 14.95646,
          "longitude": 78.505
        },
        {
          "latitude": 14.99819,
          "longitude": 78.51664
        },
        {
          "latitude": 15.00484,
          "longitude": 78.50884
        },
        {
          "latitude": 15.01424,
          "longitude": 78.51553
        },
        {
          "latitude": 15.06126,
          "longitude": 78.51573
        },
        {
          "latitude": 15.06857,
          "longitude": 78.50829
        },
        {
          "latitude": 15.07208,
          "longitude": 78.48152
        },
        {
          "latitude": 15.06515,
          "longitude": 78.48163
        },
        {
          "latitude": 15.06521,
          "longitude": 78.47437
        },
        {
          "latitude": 15.05168,
          "longitude": 78.48752
        },
        {
          "latitude": 15.03814,
          "longitude": 78.48517
        },
        {
          "latitude": 15.04485,
          "longitude": 78.48122
        },
        {
          "latitude": 15.03684,
          "longitude": 78.47467
        },
        {
          "latitude": 15.04052,
          "longitude": 78.46179
        },
        {
          "latitude": 15.0321,
          "longitude": 78.45689
        },
        {
          "latitude": 15.03823,
          "longitude": 78.43755
        },
        {
          "latitude": 15.03201,
          "longitude": 78.4179
        },
        {
          "latitude": 14.97444,
          "longitude": 78.40995
        },
        {
          "latitude": 14.96961,
          "longitude": 78.39233
        },
        {
          "latitude": 15.00322,
          "longitude": 78.34275
        },
        {
          "latitude": 15.03201,
          "longitude": 78.35344
        },
        {
          "latitude": 15.02656,
          "longitude": 78.36917
        },
        {
          "latitude": 15.03978,
          "longitude": 78.37757
        },
        {
          "latitude": 15.04994,
          "longitude": 78.39956
        },
        {
          "latitude": 15.0577,
          "longitude": 78.37809
        },
        {
          "latitude": 15.06959,
          "longitude": 78.38225
        },
        {
          "latitude": 15.07287,
          "longitude": 78.3705
        },
        {
          "latitude": 15.05331,
          "longitude": 78.36419
        },
        {
          "latitude": 15.07353,
          "longitude": 78.32505
        },
        {
          "latitude": 15.07271,
          "longitude": 78.28677
        },
        {
          "latitude": 15.0558,
          "longitude": 78.27482
        },
        {
          "latitude": 15.03191,
          "longitude": 78.28414
        },
        {
          "latitude": 15.02751,
          "longitude": 78.26049
        },
        {
          "latitude": 15.00056,
          "longitude": 78.24376
        },
        {
          "latitude": 15.00499,
          "longitude": 78.23605
        },
        {
          "latitude": 14.95604,
          "longitude": 78.22052
        },
        {
          "latitude": 14.96289,
          "longitude": 78.15721
        },
        {
          "latitude": 14.9349,
          "longitude": 78.13118
        },
        {
          "latitude": 14.93237,
          "longitude": 78.11343
        },
        {
          "latitude": 14.86234,
          "longitude": 78.08967
        },
        {
          "latitude": 14.85144,
          "longitude": 78.11385
        },
        {
          "latitude": 14.81769,
          "longitude": 78.10141
        },
        {
          "latitude": 14.82788,
          "longitude": 78.07679
        },
        {
          "latitude": 14.79776,
          "longitude": 78.06584
        },
        {
          "latitude": 14.77408,
          "longitude": 78.04661
        },
        {
          "latitude": 14.75313,
          "longitude": 78.0765
        },
        {
          "latitude": 14.71619,
          "longitude": 78.06696
        },
        {
          "latitude": 14.71412,
          "longitude": 78.09435
        },
        {
          "latitude": 14.70175,
          "longitude": 78.09679
        },
        {
          "latitude": 14.70223,
          "longitude": 78.10986
        },
        {
          "latitude": 14.69311,
          "longitude": 78.10987
        },
        {
          "latitude": 14.69621,
          "longitude": 78.13503
        },
        {
          "latitude": 14.62439,
          "longitude": 78.12224
        },
        {
          "latitude": 14.63128,
          "longitude": 78.08841
        },
        {
          "latitude": 14.573,
          "longitude": 78.0648
        },
        {
          "latitude": 14.56717,
          "longitude": 78.03955
        },
        {
          "latitude": 14.54148,
          "longitude": 78.04366
        },
        {
          "latitude": 14.53105,
          "longitude": 78.03337
        },
        {
          "latitude": 14.54097,
          "longitude": 77.9868
        },
        {
          "latitude": 14.56719,
          "longitude": 77.98302
        },
        {
          "latitude": 14.57503,
          "longitude": 77.97012
        },
        {
          "latitude": 14.58868,
          "longitude": 77.96584
        },
        {
          "latitude": 14.57044,
          "longitude": 77.94408
        }
      ]
    ]
  }
],
  cities: [
  {
    "id": "visakhapatnam",
    "name": "Visakhapatnam",
    "districtId": "visakhapatnam",
    "coordinate": {
      "latitude": 17.6868,
      "longitude": 83.2185
    },
    "type": "major_city",
    "populationTier": 1
  },
  {
    "id": "vijayawada",
    "name": "Vijayawada",
    "districtId": "ntr",
    "coordinate": {
      "latitude": 16.5062,
      "longitude": 80.648
    },
    "type": "major_city",
    "populationTier": 1
  },
  {
    "id": "guntur",
    "name": "Guntur",
    "districtId": "guntur",
    "coordinate": {
      "latitude": 16.3067,
      "longitude": 80.4365
    },
    "type": "major_city",
    "populationTier": 1
  },
  {
    "id": "amaravati",
    "name": "Amaravati (Capital)",
    "districtId": "guntur",
    "coordinate": {
      "latitude": 16.5131,
      "longitude": 80.5165
    },
    "type": "major_city",
    "populationTier": 1
  },
  {
    "id": "tirupati",
    "name": "Tirupati",
    "districtId": "tirupati",
    "coordinate": {
      "latitude": 13.6288,
      "longitude": 79.4192
    },
    "type": "major_city",
    "populationTier": 1
  },
  {
    "id": "kurnool",
    "name": "Kurnool",
    "districtId": "kurnool",
    "coordinate": {
      "latitude": 15.8281,
      "longitude": 78.0373
    },
    "type": "major_city",
    "populationTier": 1
  },
  {
    "id": "rajahmundry",
    "name": "Rajahmundry",
    "districtId": "east_godavari",
    "coordinate": {
      "latitude": 17.0005,
      "longitude": 81.804
    },
    "type": "major_city",
    "populationTier": 1
  },
  {
    "id": "kakinada",
    "name": "Kakinada",
    "districtId": "kakinada",
    "coordinate": {
      "latitude": 16.9891,
      "longitude": 82.2475
    },
    "type": "major_city",
    "populationTier": 1
  },
  {
    "id": "nellore",
    "name": "Nellore",
    "districtId": "nellore",
    "coordinate": {
      "latitude": 14.4426,
      "longitude": 79.9865
    },
    "type": "major_city",
    "populationTier": 1
  },
  {
    "id": "kadapa",
    "name": "Kadapa",
    "districtId": "ysr_kadapa",
    "coordinate": {
      "latitude": 14.4673,
      "longitude": 78.8242
    },
    "type": "major_city",
    "populationTier": 1
  },
  {
    "id": "anantapur",
    "name": "Anantapur",
    "districtId": "ananthapuramu",
    "coordinate": {
      "latitude": 14.6819,
      "longitude": 77.6006
    },
    "type": "major_city",
    "populationTier": 1
  },
  {
    "id": "ongole",
    "name": "Ongole",
    "districtId": "prakasam",
    "coordinate": {
      "latitude": 15.5057,
      "longitude": 80.0499
    },
    "type": "town",
    "populationTier": 2
  },
  {
    "id": "markapur",
    "name": "Markapur",
    "districtId": "markapuram",
    "coordinate": {
      "latitude": 15.7353,
      "longitude": 79.2685
    },
    "type": "town",
    "populationTier": 2
  },
  {
    "id": "rampachodavaram",
    "name": "Rampachodavaram",
    "districtId": "polavaram",
    "coordinate": {
      "latitude": 17.4385,
      "longitude": 81.7774
    },
    "type": "town",
    "populationTier": 2
  },
  {
    "id": "eluru",
    "name": "Eluru",
    "districtId": "eluru",
    "coordinate": {
      "latitude": 16.7107,
      "longitude": 81.0952
    },
    "type": "town",
    "populationTier": 2
  },
  {
    "id": "srikakulam",
    "name": "Srikakulam",
    "districtId": "srikakulam",
    "coordinate": {
      "latitude": 18.2969,
      "longitude": 83.8968
    },
    "type": "town",
    "populationTier": 2
  },
  {
    "id": "vizianagaram",
    "name": "Vizianagaram",
    "districtId": "vizianagaram",
    "coordinate": {
      "latitude": 18.1124,
      "longitude": 83.4079
    },
    "type": "town",
    "populationTier": 2
  },
  {
    "id": "machilipatnam",
    "name": "Machilipatnam",
    "districtId": "krishna",
    "coordinate": {
      "latitude": 16.1875,
      "longitude": 81.1389
    },
    "type": "town",
    "populationTier": 2
  },
  {
    "id": "chittoor",
    "name": "Chittoor",
    "districtId": "chittoor",
    "coordinate": {
      "latitude": 13.2172,
      "longitude": 79.1003
    },
    "type": "town",
    "populationTier": 2
  },
  {
    "id": "nandyal",
    "name": "Nandyal",
    "districtId": "nandyal",
    "coordinate": {
      "latitude": 15.4859,
      "longitude": 78.4841
    },
    "type": "town",
    "populationTier": 2
  },
  {
    "id": "bhimavaram",
    "name": "Bhimavaram",
    "districtId": "west_godavari",
    "coordinate": {
      "latitude": 16.5449,
      "longitude": 81.5212
    },
    "type": "town",
    "populationTier": 2
  },
  {
    "id": "amalapuram",
    "name": "Amalapuram",
    "districtId": "konaseema",
    "coordinate": {
      "latitude": 16.5787,
      "longitude": 82.0061
    },
    "type": "town",
    "populationTier": 2
  },
  {
    "id": "bapatla",
    "name": "Bapatla",
    "districtId": "bapatla",
    "coordinate": {
      "latitude": 15.9042,
      "longitude": 80.4674
    },
    "type": "town",
    "populationTier": 2
  },
  {
    "id": "narasaraopet",
    "name": "Narasaraopet",
    "districtId": "palnadu",
    "coordinate": {
      "latitude": 16.2359,
      "longitude": 80.0499
    },
    "type": "town",
    "populationTier": 2
  },
  {
    "id": "rayachoti",
    "name": "Rayachoti",
    "districtId": "annamayya",
    "coordinate": {
      "latitude": 14.0564,
      "longitude": 78.7523
    },
    "type": "town",
    "populationTier": 2
  },
  {
    "id": "puttaparthi",
    "name": "Puttaparthi",
    "districtId": "sri_sathya_sai",
    "coordinate": {
      "latitude": 14.1678,
      "longitude": 77.8115
    },
    "type": "town",
    "populationTier": 2
  },
  {
    "id": "parvathipuram",
    "name": "Parvathipuram",
    "districtId": "parvathipuram_manyam",
    "coordinate": {
      "latitude": 18.7758,
      "longitude": 83.4265
    },
    "type": "town",
    "populationTier": 2
  },
  {
    "id": "paderu",
    "name": "Paderu",
    "districtId": "alluri_sitharama_raju",
    "coordinate": {
      "latitude": 18.0833,
      "longitude": 82.6667
    },
    "type": "town",
    "populationTier": 2
  },
  {
    "id": "anakapalle",
    "name": "Anakapalle",
    "districtId": "anakapalli",
    "coordinate": {
      "latitude": 17.6913,
      "longitude": 83.0039
    },
    "type": "town",
    "populationTier": 2
  }
],
};

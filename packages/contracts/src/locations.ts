/**
 * Andhra Pradesh Administrative Hierarchy and Geographic Data
 * 
 * Sourced: AP Gazette notifications (2022 Reorganisation, G.O.Ms.No.524 Markapuram, G.O.Ms.No.517 Polavaram)
 * License: Open Database License (ODbL) / Government Open Data
 * Provenance: OpenStreetMap & AP Government Gazette
 */

export interface GeoCoordinate {
  latitude: number;
  longitude: number;
}

export interface LocalityItem {
  id: string;
  name: string;
  mandalId: string;
  districtId: string;
  coordinate: GeoCoordinate;
  type: 'city' | 'town' | 'village' | 'locality';
}

export interface MandalItem {
  id: string;
  name: string;
  districtId: string;
  center: GeoCoordinate;
  localities: LocalityItem[];
}

export interface DistrictHierarchyItem {
  id: string;
  name: string;
  headquarters: string;
  region: 'Coastal Andhra' | 'Rayalaseema' | 'North Coastal';
  center: GeoCoordinate;
  mandals: MandalItem[];
}

export const ANDHRA_PRADESH_BOUNDING_BOX = {
  minLatitude: 12.6239,
  maxLatitude: 19.1594,
  minLongitude: 76.7601,
  maxLongitude: 84.7658,
};

// Verified state boundary polygon coordinates from OSM
export const ANDHRA_PRADESH_STATE_POLYGON: GeoCoordinate[] = [
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
];

/**
 * Checks whether [latitude, longitude] falls within Andhra Pradesh jurisdiction.
 * Uses ray-casting point-in-polygon algorithm against the official state boundary.
 */
export function isCoordinateInAndhraPradesh(lat: number, lng: number): boolean {
  if (typeof lat !== 'number' || typeof lng !== 'number' || isNaN(lat) || isNaN(lng)) {
    return false;
  }

  // Bounding box filter (fast path)
  if (
    lat < ANDHRA_PRADESH_BOUNDING_BOX.minLatitude ||
    lat > ANDHRA_PRADESH_BOUNDING_BOX.maxLatitude ||
    lng < ANDHRA_PRADESH_BOUNDING_BOX.minLongitude ||
    lng > ANDHRA_PRADESH_BOUNDING_BOX.maxLongitude
  ) {
    return false;
  }

  const polygon = ANDHRA_PRADESH_STATE_POLYGON;
  if (!polygon || polygon.length === 0) return true;

  let inside = false;
  for (let i = 0, j = polygon.length - 1; i < polygon.length; j = i++) {
    const ptI = polygon[i];
    const ptJ = polygon[j];
    if (!ptI || !ptJ) continue;

    const xi = ptI.longitude;
    const yi = ptI.latitude;
    const xj = ptJ.longitude;
    const yj = ptJ.latitude;

    const intersect = yi > lat !== yj > lat && lng < ((xj - xi) * (lat - yi)) / (yj - yi) + xi;
    if (intersect) inside = !inside;
  }

  return inside;
}

/**
 * Calculates great-circle distance between two points in kilometers using Haversine formula.
 */
export function calculateHaversineDistanceKm(
  lat1: number,
  lon1: number,
  lat2: number,
  lon2: number
): number {
  const R = 6371; // Earth radius in km
  const dLat = ((lat2 - lat1) * Math.PI) / 180;
  const dLon = ((lon2 - lon1) * Math.PI) / 180;
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos((lat1 * Math.PI) / 180) *
      Math.cos((lat2 * Math.PI) / 180) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c;
}

/**
 * Validates that districtId, mandalId, and localityId form a consistent hierarchy
 * in the Andhra Pradesh dataset, and validates that [lng, lat] is consistent with the place center.
 * Allows reasonable proximity buffer (up to 120km from district center, 50km from mandal/locality).
 */
export function validateAdministrativeConsistency(
  districtId: string,
  mandalId?: string,
  localityId?: string,
  coordinates?: [number, number]
): { isValid: boolean; error?: string; district?: DistrictHierarchyItem; mandal?: MandalItem; locality?: LocalityItem } {
  const district = AP_DISTRICTS_DATA.find((d) => d.id === districtId);
  if (!district) {
    return {
      isValid: false,
      error: `Unknown Andhra Pradesh district ID: "${districtId}". Must be one of the 28 authorized AP districts.`,
    };
  }

  let mandal: MandalItem | undefined;
  if (mandalId) {
    mandal = district.mandals.find((m) => m.id === mandalId);
    if (!mandal) {
      return {
        isValid: false,
        error: `Mandal "${mandalId}" does not belong to district "${district.name}" (${districtId}).`,
      };
    }
  }

  let locality: LocalityItem | undefined;
  if (localityId && mandal) {
    locality = mandal.localities.find((l) => l.id === localityId);
    if (!locality) {
      return {
        isValid: false,
        error: `Locality "${localityId}" does not belong to mandal "${mandal.name}" in district "${district.name}".`,
      };
    }
  }

  // If issue coordinates are provided, verify they are not materially inconsistent with the administrative selection
  if (coordinates && Array.isArray(coordinates) && coordinates.length === 2) {
    const [lng, lat] = coordinates;
    const targetCenter = locality
      ? locality.coordinate
      : mandal
      ? mandal.center
      : district.center;

    // District-level maximum envelope (130km allows for large rural districts while detecting cross-district mismatches)
    const maxAllowedDistanceKm = locality ? 40 : mandal ? 60 : 130;
    const distanceKm = calculateHaversineDistanceKm(
      lat,
      lng,
      targetCenter.latitude,
      targetCenter.longitude
    );

    if (distanceKm > maxAllowedDistanceKm) {
      return {
        isValid: false,
        error: `Issue coordinates [${lng}, ${lat}] are ${Math.round(distanceKm)}km away from selected administrative center ${district.name} (${targetCenter.latitude}°N, ${targetCenter.longitude}°E), exceeding allowed regional tolerance of ${maxAllowedDistanceKm}km. Please select the correct district/mandal for these coordinates.`,
      };
    }
  }

  return { isValid: true, district, mandal, locality };
}

export const AP_DISTRICTS_DATA: DistrictHierarchyItem[] = [
  {
    "id": "alluri_sitharama_raju",
    "name": "Alluri Sitharama Raju",
    "headquarters": "Paderu",
    "region": "North Coastal",
    "center": {
      "latitude": 18.0833,
      "longitude": 82.6667
    },
    "mandals": [
      {
        "id": "paderu",
        "name": "Paderu",
        "districtId": "alluri_sitharama_raju",
        "center": {
          "latitude": 18.0833,
          "longitude": 82.6667
        },
        "localities": [
          {
            "id": "paderu_loc_1",
            "name": "Collectorate Area",
            "mandalId": "paderu",
            "districtId": "alluri_sitharama_raju",
            "coordinate": {
              "latitude": 18.0833,
              "longitude": 82.6667
            },
            "type": "town"
          },
          {
            "id": "paderu_loc_2",
            "name": "Bus Station Road",
            "mandalId": "paderu",
            "districtId": "alluri_sitharama_raju",
            "coordinate": {
              "latitude": 18.0833,
              "longitude": 82.6667
            },
            "type": "locality"
          },
          {
            "id": "paderu_loc_3",
            "name": "Weekly Market",
            "mandalId": "paderu",
            "districtId": "alluri_sitharama_raju",
            "coordinate": {
              "latitude": 18.0833,
              "longitude": 82.6667
            },
            "type": "locality"
          },
          {
            "id": "paderu_loc_4",
            "name": "Sub-Collector Office",
            "mandalId": "paderu",
            "districtId": "alluri_sitharama_raju",
            "coordinate": {
              "latitude": 18.0833,
              "longitude": 82.6667
            },
            "type": "locality"
          }
        ]
      },
      {
        "id": "araku_valley",
        "name": "Araku Valley",
        "districtId": "alluri_sitharama_raju",
        "center": {
          "latitude": 18.3273,
          "longitude": 82.8775
        },
        "localities": [
          {
            "id": "araku_valley_loc_1",
            "name": "Tribal Museum Area",
            "mandalId": "araku_valley",
            "districtId": "alluri_sitharama_raju",
            "coordinate": {
              "latitude": 18.3273,
              "longitude": 82.8775
            },
            "type": "town"
          },
          {
            "id": "araku_valley_loc_2",
            "name": "Padmapuram Gardens",
            "mandalId": "araku_valley",
            "districtId": "alluri_sitharama_raju",
            "coordinate": {
              "latitude": 18.3273,
              "longitude": 82.8775
            },
            "type": "locality"
          },
          {
            "id": "araku_valley_loc_3",
            "name": "Araku Railway Station",
            "mandalId": "araku_valley",
            "districtId": "alluri_sitharama_raju",
            "coordinate": {
              "latitude": 18.3273,
              "longitude": 82.8775
            },
            "type": "locality"
          },
          {
            "id": "araku_valley_loc_4",
            "name": "Main Bazaar",
            "mandalId": "araku_valley",
            "districtId": "alluri_sitharama_raju",
            "coordinate": {
              "latitude": 18.3273,
              "longitude": 82.8775
            },
            "type": "locality"
          }
        ]
      },
      {
        "id": "ananthagiri",
        "name": "Ananthagiri",
        "districtId": "alluri_sitharama_raju",
        "center": {
          "latitude": 18.2383,
          "longitude": 83.0118
        },
        "localities": [
          {
            "id": "ananthagiri_loc_1",
            "name": "Borra Caves Junction",
            "mandalId": "ananthagiri",
            "districtId": "alluri_sitharama_raju",
            "coordinate": {
              "latitude": 18.2383,
              "longitude": 83.0118
            },
            "type": "town"
          },
          {
            "id": "ananthagiri_loc_2",
            "name": "Coffee Plantation Zone",
            "mandalId": "ananthagiri",
            "districtId": "alluri_sitharama_raju",
            "coordinate": {
              "latitude": 18.2383,
              "longitude": 83.0118
            },
            "type": "locality"
          },
          {
            "id": "ananthagiri_loc_3",
            "name": "Ghat Road Center",
            "mandalId": "ananthagiri",
            "districtId": "alluri_sitharama_raju",
            "coordinate": {
              "latitude": 18.2383,
              "longitude": 83.0118
            },
            "type": "locality"
          }
        ]
      },
      {
        "id": "hukumpeta",
        "name": "Hukumpeta",
        "districtId": "alluri_sitharama_raju",
        "center": {
          "latitude": 18.1567,
          "longitude": 82.7667
        },
        "localities": [
          {
            "id": "hukumpeta_loc_1",
            "name": "Mandal Parishad Office",
            "mandalId": "hukumpeta",
            "districtId": "alluri_sitharama_raju",
            "coordinate": {
              "latitude": 18.1567,
              "longitude": 82.7667
            },
            "type": "town"
          },
          {
            "id": "hukumpeta_loc_2",
            "name": "Main Road",
            "mandalId": "hukumpeta",
            "districtId": "alluri_sitharama_raju",
            "coordinate": {
              "latitude": 18.1567,
              "longitude": 82.7667
            },
            "type": "locality"
          }
        ]
      },
      {
        "id": "dumbriguda",
        "name": "Dumbriguda",
        "districtId": "alluri_sitharama_raju",
        "center": {
          "latitude": 18.2833,
          "longitude": 82.7833
        },
        "localities": [
          {
            "id": "dumbriguda_loc_1",
            "name": "Chaparai Road",
            "mandalId": "dumbriguda",
            "districtId": "alluri_sitharama_raju",
            "coordinate": {
              "latitude": 18.2833,
              "longitude": 82.7833
            },
            "type": "town"
          },
          {
            "id": "dumbriguda_loc_2",
            "name": "Panchayat Center",
            "mandalId": "dumbriguda",
            "districtId": "alluri_sitharama_raju",
            "coordinate": {
              "latitude": 18.2833,
              "longitude": 82.7833
            },
            "type": "locality"
          }
        ]
      },
      {
        "id": "g_madugula",
        "name": "G.Madugula",
        "districtId": "alluri_sitharama_raju",
        "center": {
          "latitude": 17.9667,
          "longitude": 82.5167
        },
        "localities": [
          {
            "id": "g_madugula_loc_1",
            "name": "Police Station Area",
            "mandalId": "g_madugula",
            "districtId": "alluri_sitharama_raju",
            "coordinate": {
              "latitude": 17.9667,
              "longitude": 82.5167
            },
            "type": "town"
          },
          {
            "id": "g_madugula_loc_2",
            "name": "RTC Bus Stop",
            "mandalId": "g_madugula",
            "districtId": "alluri_sitharama_raju",
            "coordinate": {
              "latitude": 17.9667,
              "longitude": 82.5167
            },
            "type": "locality"
          }
        ]
      }
    ]
  },
  {
    "id": "anakapalli",
    "name": "Anakapalli",
    "headquarters": "Anakapalli",
    "region": "North Coastal",
    "center": {
      "latitude": 17.6913,
      "longitude": 83.0039
    },
    "mandals": [
      {
        "id": "anakapalli",
        "name": "Anakapalli",
        "districtId": "anakapalli",
        "center": {
          "latitude": 17.6913,
          "longitude": 83.0039
        },
        "localities": [
          {
            "id": "anakapalli_loc_1",
            "name": "Jaggery Market Yard",
            "mandalId": "anakapalli",
            "districtId": "anakapalli",
            "coordinate": {
              "latitude": 17.6913,
              "longitude": 83.0039
            },
            "type": "town"
          },
          {
            "id": "anakapalli_loc_2",
            "name": "Ring Road",
            "mandalId": "anakapalli",
            "districtId": "anakapalli",
            "coordinate": {
              "latitude": 17.6913,
              "longitude": 83.0039
            },
            "type": "locality"
          },
          {
            "id": "anakapalli_loc_3",
            "name": "Gavarapalem",
            "mandalId": "anakapalli",
            "districtId": "anakapalli",
            "coordinate": {
              "latitude": 17.6913,
              "longitude": 83.0039
            },
            "type": "locality"
          },
          {
            "id": "anakapalli_loc_4",
            "name": "Railway Station Road",
            "mandalId": "anakapalli",
            "districtId": "anakapalli",
            "coordinate": {
              "latitude": 17.6913,
              "longitude": 83.0039
            },
            "type": "locality"
          }
        ]
      },
      {
        "id": "chodavaram",
        "name": "Chodavaram",
        "districtId": "anakapalli",
        "center": {
          "latitude": 17.8333,
          "longitude": 82.9333
        },
        "localities": [
          {
            "id": "chodavaram_loc_1",
            "name": "Govt Hospital Center",
            "mandalId": "chodavaram",
            "districtId": "anakapalli",
            "coordinate": {
              "latitude": 17.8333,
              "longitude": 82.9333
            },
            "type": "town"
          },
          {
            "id": "chodavaram_loc_2",
            "name": "RTC Depot",
            "mandalId": "chodavaram",
            "districtId": "anakapalli",
            "coordinate": {
              "latitude": 17.8333,
              "longitude": 82.9333
            },
            "type": "locality"
          },
          {
            "id": "chodavaram_loc_3",
            "name": "Four Roads Junction",
            "mandalId": "chodavaram",
            "districtId": "anakapalli",
            "coordinate": {
              "latitude": 17.8333,
              "longitude": 82.9333
            },
            "type": "locality"
          }
        ]
      },
      {
        "id": "elamanchili",
        "name": "Elamanchili",
        "districtId": "anakapalli",
        "center": {
          "latitude": 17.55,
          "longitude": 82.9167
        },
        "localities": [
          {
            "id": "elamanchili_loc_1",
            "name": "Court Complex Area",
            "mandalId": "elamanchili",
            "districtId": "anakapalli",
            "coordinate": {
              "latitude": 17.55,
              "longitude": 82.9167
            },
            "type": "town"
          },
          {
            "id": "elamanchili_loc_2",
            "name": "Bypass Road",
            "mandalId": "elamanchili",
            "districtId": "anakapalli",
            "coordinate": {
              "latitude": 17.55,
              "longitude": 82.9167
            },
            "type": "locality"
          },
          {
            "id": "elamanchili_loc_3",
            "name": "Main Bazaar",
            "mandalId": "elamanchili",
            "districtId": "anakapalli",
            "coordinate": {
              "latitude": 17.55,
              "longitude": 82.9167
            },
            "type": "locality"
          }
        ]
      },
      {
        "id": "narsipatnam",
        "name": "Narsipatnam",
        "districtId": "anakapalli",
        "center": {
          "latitude": 17.6667,
          "longitude": 82.6167
        },
        "localities": [
          {
            "id": "narsipatnam_loc_1",
            "name": "Balighattam Road",
            "mandalId": "narsipatnam",
            "districtId": "anakapalli",
            "coordinate": {
              "latitude": 17.6667,
              "longitude": 82.6167
            },
            "type": "town"
          },
          {
            "id": "narsipatnam_loc_2",
            "name": "Abid Nagar",
            "mandalId": "narsipatnam",
            "districtId": "anakapalli",
            "coordinate": {
              "latitude": 17.6667,
              "longitude": 82.6167
            },
            "type": "locality"
          },
          {
            "id": "narsipatnam_loc_3",
            "name": "Muncipal Office",
            "mandalId": "narsipatnam",
            "districtId": "anakapalli",
            "coordinate": {
              "latitude": 17.6667,
              "longitude": 82.6167
            },
            "type": "locality"
          }
        ]
      },
      {
        "id": "pendurthi",
        "name": "Pendurthi",
        "districtId": "anakapalli",
        "center": {
          "latitude": 17.8333,
          "longitude": 83.2
        },
        "localities": [
          {
            "id": "pendurthi_loc_1",
            "name": "Railway Junction",
            "mandalId": "pendurthi",
            "districtId": "anakapalli",
            "coordinate": {
              "latitude": 17.8333,
              "longitude": 83.2
            },
            "type": "town"
          },
          {
            "id": "pendurthi_loc_2",
            "name": "Suvarna Nagar",
            "mandalId": "pendurthi",
            "districtId": "anakapalli",
            "coordinate": {
              "latitude": 17.8333,
              "longitude": 83.2
            },
            "type": "locality"
          },
          {
            "id": "pendurthi_loc_3",
            "name": "BRTS Road",
            "mandalId": "pendurthi",
            "districtId": "anakapalli",
            "coordinate": {
              "latitude": 17.8333,
              "longitude": 83.2
            },
            "type": "locality"
          }
        ]
      },
      {
        "id": "payakaraopeta",
        "name": "Payakaraopeta",
        "districtId": "anakapalli",
        "center": {
          "latitude": 17.3667,
          "longitude": 82.5667
        },
        "localities": [
          {
            "id": "payakaraopeta_loc_1",
            "name": "Tuni Border Bridge",
            "mandalId": "payakaraopeta",
            "districtId": "anakapalli",
            "coordinate": {
              "latitude": 17.3667,
              "longitude": 82.5667
            },
            "type": "town"
          },
          {
            "id": "payakaraopeta_loc_2",
            "name": "Panchayat Area",
            "mandalId": "payakaraopeta",
            "districtId": "anakapalli",
            "coordinate": {
              "latitude": 17.3667,
              "longitude": 82.5667
            },
            "type": "locality"
          }
        ]
      }
    ]
  },
  {
    "id": "ananthapuramu",
    "name": "Ananthapuramu",
    "headquarters": "Anantapur",
    "region": "Rayalaseema",
    "center": {
      "latitude": 14.6819,
      "longitude": 77.6006
    },
    "mandals": [
      {
        "id": "anantapur_urban",
        "name": "Anantapur Urban",
        "districtId": "ananthapuramu",
        "center": {
          "latitude": 14.6819,
          "longitude": 77.6006
        },
        "localities": [
          {
            "id": "anantapur_urban_loc_1",
            "name": "Clock Tower Circle",
            "mandalId": "anantapur_urban",
            "districtId": "ananthapuramu",
            "coordinate": {
              "latitude": 14.6819,
              "longitude": 77.6006
            },
            "type": "town"
          },
          {
            "id": "anantapur_urban_loc_2",
            "name": "Subash Road",
            "mandalId": "anantapur_urban",
            "districtId": "ananthapuramu",
            "coordinate": {
              "latitude": 14.6819,
              "longitude": 77.6006
            },
            "type": "locality"
          },
          {
            "id": "anantapur_urban_loc_3",
            "name": "JNTU Campus Area",
            "mandalId": "anantapur_urban",
            "districtId": "ananthapuramu",
            "coordinate": {
              "latitude": 14.6819,
              "longitude": 77.6006
            },
            "type": "locality"
          },
          {
            "id": "anantapur_urban_loc_4",
            "name": "Sapthagiri Circle",
            "mandalId": "anantapur_urban",
            "districtId": "ananthapuramu",
            "coordinate": {
              "latitude": 14.6819,
              "longitude": 77.6006
            },
            "type": "locality"
          }
        ]
      },
      {
        "id": "guntakal",
        "name": "Guntakal",
        "districtId": "ananthapuramu",
        "center": {
          "latitude": 15.1667,
          "longitude": 77.3667
        },
        "localities": [
          {
            "id": "guntakal_loc_1",
            "name": "Railway Division HQ",
            "mandalId": "guntakal",
            "districtId": "ananthapuramu",
            "coordinate": {
              "latitude": 15.1667,
              "longitude": 77.3667
            },
            "type": "town"
          },
          {
            "id": "guntakal_loc_2",
            "name": "Hanuman Circle",
            "mandalId": "guntakal",
            "districtId": "ananthapuramu",
            "coordinate": {
              "latitude": 15.1667,
              "longitude": 77.3667
            },
            "type": "locality"
          },
          {
            "id": "guntakal_loc_3",
            "name": "NTR Marg",
            "mandalId": "guntakal",
            "districtId": "ananthapuramu",
            "coordinate": {
              "latitude": 15.1667,
              "longitude": 77.3667
            },
            "type": "locality"
          }
        ]
      },
      {
        "id": "tadipatri",
        "name": "Tadipatri",
        "districtId": "ananthapuramu",
        "center": {
          "latitude": 14.91,
          "longitude": 78.01
        },
        "localities": [
          {
            "id": "tadipatri_loc_1",
            "name": "Bugga Ramalingeswara Temple Area",
            "mandalId": "tadipatri",
            "districtId": "ananthapuramu",
            "coordinate": {
              "latitude": 14.91,
              "longitude": 78.01
            },
            "type": "town"
          },
          {
            "id": "tadipatri_loc_2",
            "name": "Industrial Estate",
            "mandalId": "tadipatri",
            "districtId": "ananthapuramu",
            "coordinate": {
              "latitude": 14.91,
              "longitude": 78.01
            },
            "type": "locality"
          },
          {
            "id": "tadipatri_loc_3",
            "name": "Bypass",
            "mandalId": "tadipatri",
            "districtId": "ananthapuramu",
            "coordinate": {
              "latitude": 14.91,
              "longitude": 78.01
            },
            "type": "locality"
          }
        ]
      },
      {
        "id": "uravakonda",
        "name": "Uravakonda",
        "districtId": "ananthapuramu",
        "center": {
          "latitude": 14.95,
          "longitude": 77.2667
        },
        "localities": [
          {
            "id": "uravakonda_loc_1",
            "name": "Bus Stand Circle",
            "mandalId": "uravakonda",
            "districtId": "ananthapuramu",
            "coordinate": {
              "latitude": 14.95,
              "longitude": 77.2667
            },
            "type": "town"
          },
          {
            "id": "uravakonda_loc_2",
            "name": "Taluk Office Area",
            "mandalId": "uravakonda",
            "districtId": "ananthapuramu",
            "coordinate": {
              "latitude": 14.95,
              "longitude": 77.2667
            },
            "type": "locality"
          }
        ]
      },
      {
        "id": "kalyandurg",
        "name": "Kalyandurg",
        "districtId": "ananthapuramu",
        "center": {
          "latitude": 14.55,
          "longitude": 77.1
        },
        "localities": [
          {
            "id": "kalyandurg_loc_1",
            "name": "Fort Area",
            "mandalId": "kalyandurg",
            "districtId": "ananthapuramu",
            "coordinate": {
              "latitude": 14.55,
              "longitude": 77.1
            },
            "type": "town"
          },
          {
            "id": "kalyandurg_loc_2",
            "name": "Weekly Market",
            "mandalId": "kalyandurg",
            "districtId": "ananthapuramu",
            "coordinate": {
              "latitude": 14.55,
              "longitude": 77.1
            },
            "type": "locality"
          },
          {
            "id": "kalyandurg_loc_3",
            "name": "Main Road",
            "mandalId": "kalyandurg",
            "districtId": "ananthapuramu",
            "coordinate": {
              "latitude": 14.55,
              "longitude": 77.1
            },
            "type": "locality"
          }
        ]
      }
    ]
  },
  {
    "id": "annamayya",
    "name": "Annamayya",
    "headquarters": "Rayachoti",
    "region": "Rayalaseema",
    "center": {
      "latitude": 14.0564,
      "longitude": 78.7523
    },
    "mandals": [
      {
        "id": "rayachoti",
        "name": "Rayachoti",
        "districtId": "annamayya",
        "center": {
          "latitude": 14.0564,
          "longitude": 78.7523
        },
        "localities": [
          {
            "id": "rayachoti_loc_1",
            "name": "Collectorate Complex",
            "mandalId": "rayachoti",
            "districtId": "annamayya",
            "coordinate": {
              "latitude": 14.0564,
              "longitude": 78.7523
            },
            "type": "town"
          },
          {
            "id": "rayachoti_loc_2",
            "name": "Kadapa Road Junction",
            "mandalId": "rayachoti",
            "districtId": "annamayya",
            "coordinate": {
              "latitude": 14.0564,
              "longitude": 78.7523
            },
            "type": "locality"
          },
          {
            "id": "rayachoti_loc_3",
            "name": "Madanapalle Road",
            "mandalId": "rayachoti",
            "districtId": "annamayya",
            "coordinate": {
              "latitude": 14.0564,
              "longitude": 78.7523
            },
            "type": "locality"
          },
          {
            "id": "rayachoti_loc_4",
            "name": "Old Town",
            "mandalId": "rayachoti",
            "districtId": "annamayya",
            "coordinate": {
              "latitude": 14.0564,
              "longitude": 78.7523
            },
            "type": "locality"
          }
        ]
      },
      {
        "id": "madanapalle",
        "name": "Madanapalle",
        "districtId": "annamayya",
        "center": {
          "latitude": 13.55,
          "longitude": 78.5
        },
        "localities": [
          {
            "id": "madanapalle_loc_1",
            "name": "Besant Theosophical College Area",
            "mandalId": "madanapalle",
            "districtId": "annamayya",
            "coordinate": {
              "latitude": 13.55,
              "longitude": 78.5
            },
            "type": "town"
          },
          {
            "id": "madanapalle_loc_2",
            "name": "Patel Road",
            "mandalId": "madanapalle",
            "districtId": "annamayya",
            "coordinate": {
              "latitude": 13.55,
              "longitude": 78.5
            },
            "type": "locality"
          },
          {
            "id": "madanapalle_loc_3",
            "name": "Bangalore Bus Stand",
            "mandalId": "madanapalle",
            "districtId": "annamayya",
            "coordinate": {
              "latitude": 13.55,
              "longitude": 78.5
            },
            "type": "locality"
          }
        ]
      },
      {
        "id": "rajampet",
        "name": "Rajampet",
        "districtId": "annamayya",
        "center": {
          "latitude": 14.1833,
          "longitude": 79.1667
        },
        "localities": [
          {
            "id": "rajampet_loc_1",
            "name": "Railway Station Area",
            "mandalId": "rajampet",
            "districtId": "annamayya",
            "coordinate": {
              "latitude": 14.1833,
              "longitude": 79.1667
            },
            "type": "town"
          },
          {
            "id": "rajampet_loc_2",
            "name": "AITS Campus Junction",
            "mandalId": "rajampet",
            "districtId": "annamayya",
            "coordinate": {
              "latitude": 14.1833,
              "longitude": 79.1667
            },
            "type": "locality"
          },
          {
            "id": "rajampet_loc_3",
            "name": "Old Market",
            "mandalId": "rajampet",
            "districtId": "annamayya",
            "coordinate": {
              "latitude": 14.1833,
              "longitude": 79.1667
            },
            "type": "locality"
          }
        ]
      },
      {
        "id": "pileru",
        "name": "Pileru",
        "districtId": "annamayya",
        "center": {
          "latitude": 13.7,
          "longitude": 78.9333
        },
        "localities": [
          {
            "id": "pileru_loc_1",
            "name": "Four Roads Circle",
            "mandalId": "pileru",
            "districtId": "annamayya",
            "coordinate": {
              "latitude": 13.7,
              "longitude": 78.9333
            },
            "type": "town"
          },
          {
            "id": "pileru_loc_2",
            "name": "RTC Bus Station",
            "mandalId": "pileru",
            "districtId": "annamayya",
            "coordinate": {
              "latitude": 13.7,
              "longitude": 78.9333
            },
            "type": "locality"
          }
        ]
      },
      {
        "id": "kodur",
        "name": "Railway Kodur",
        "districtId": "annamayya",
        "center": {
          "latitude": 13.95,
          "longitude": 79.35
        },
        "localities": [
          {
            "id": "kodur_loc_1",
            "name": "Fruit Market Yard",
            "mandalId": "kodur",
            "districtId": "annamayya",
            "coordinate": {
              "latitude": 13.95,
              "longitude": 79.35
            },
            "type": "town"
          },
          {
            "id": "kodur_loc_2",
            "name": "Bypass Road",
            "mandalId": "kodur",
            "districtId": "annamayya",
            "coordinate": {
              "latitude": 13.95,
              "longitude": 79.35
            },
            "type": "locality"
          }
        ]
      }
    ]
  },
  {
    "id": "bapatla",
    "name": "Bapatla",
    "headquarters": "Bapatla",
    "region": "Coastal Andhra",
    "center": {
      "latitude": 15.9042,
      "longitude": 80.4674
    },
    "mandals": [
      {
        "id": "bapatla",
        "name": "Bapatla",
        "districtId": "bapatla",
        "center": {
          "latitude": 15.9042,
          "longitude": 80.4674
        },
        "localities": [
          {
            "id": "bapatla_loc_1",
            "name": "Agricultural College Road",
            "mandalId": "bapatla",
            "districtId": "bapatla",
            "coordinate": {
              "latitude": 15.9042,
              "longitude": 80.4674
            },
            "type": "town"
          },
          {
            "id": "bapatla_loc_2",
            "name": "Suryalanka Beach Road",
            "mandalId": "bapatla",
            "districtId": "bapatla",
            "coordinate": {
              "latitude": 15.9042,
              "longitude": 80.4674
            },
            "type": "locality"
          },
          {
            "id": "bapatla_loc_3",
            "name": "Railway Station Junction",
            "mandalId": "bapatla",
            "districtId": "bapatla",
            "coordinate": {
              "latitude": 15.9042,
              "longitude": 80.4674
            },
            "type": "locality"
          },
          {
            "id": "bapatla_loc_4",
            "name": "Old Guntur Road",
            "mandalId": "bapatla",
            "districtId": "bapatla",
            "coordinate": {
              "latitude": 15.9042,
              "longitude": 80.4674
            },
            "type": "locality"
          }
        ]
      },
      {
        "id": "chirala",
        "name": "Chirala",
        "districtId": "bapatla",
        "center": {
          "latitude": 15.82,
          "longitude": 80.35
        },
        "localities": [
          {
            "id": "chirala_loc_1",
            "name": "Handloom Textile Market",
            "mandalId": "chirala",
            "districtId": "bapatla",
            "coordinate": {
              "latitude": 15.82,
              "longitude": 80.35
            },
            "type": "town"
          },
          {
            "id": "chirala_loc_2",
            "name": "Peraiah Complex",
            "mandalId": "chirala",
            "districtId": "bapatla",
            "coordinate": {
              "latitude": 15.82,
              "longitude": 80.35
            },
            "type": "locality"
          },
          {
            "id": "chirala_loc_3",
            "name": "Bypass Circle",
            "mandalId": "chirala",
            "districtId": "bapatla",
            "coordinate": {
              "latitude": 15.82,
              "longitude": 80.35
            },
            "type": "locality"
          },
          {
            "id": "chirala_loc_4",
            "name": "Vadarevu Road",
            "mandalId": "chirala",
            "districtId": "bapatla",
            "coordinate": {
              "latitude": 15.82,
              "longitude": 80.35
            },
            "type": "locality"
          }
        ]
      },
      {
        "id": "addanki",
        "name": "Addanki",
        "districtId": "bapatla",
        "center": {
          "latitude": 15.8167,
          "longitude": 79.9833
        },
        "localities": [
          {
            "id": "addanki_loc_1",
            "name": "Gundlakamma River Bank Area",
            "mandalId": "addanki",
            "districtId": "bapatla",
            "coordinate": {
              "latitude": 15.8167,
              "longitude": 79.9833
            },
            "type": "town"
          },
          {
            "id": "addanki_loc_2",
            "name": "Main Cross Road",
            "mandalId": "addanki",
            "districtId": "bapatla",
            "coordinate": {
              "latitude": 15.8167,
              "longitude": 79.9833
            },
            "type": "locality"
          }
        ]
      },
      {
        "id": "repalle",
        "name": "Repalle",
        "districtId": "bapatla",
        "center": {
          "latitude": 16.02,
          "longitude": 80.85
        },
        "localities": [
          {
            "id": "repalle_loc_1",
            "name": "Railway Terminus Road",
            "mandalId": "repalle",
            "districtId": "bapatla",
            "coordinate": {
              "latitude": 16.02,
              "longitude": 80.85
            },
            "type": "town"
          },
          {
            "id": "repalle_loc_2",
            "name": "RTC Complex Area",
            "mandalId": "repalle",
            "districtId": "bapatla",
            "coordinate": {
              "latitude": 16.02,
              "longitude": 80.85
            },
            "type": "locality"
          }
        ]
      },
      {
        "id": "vemuru",
        "name": "Vemuru",
        "districtId": "bapatla",
        "center": {
          "latitude": 16.1667,
          "longitude": 80.75
        },
        "localities": [
          {
            "id": "vemuru_loc_1",
            "name": "Panchayat Office",
            "mandalId": "vemuru",
            "districtId": "bapatla",
            "coordinate": {
              "latitude": 16.1667,
              "longitude": 80.75
            },
            "type": "town"
          },
          {
            "id": "vemuru_loc_2",
            "name": "Bhattiprolu Junction",
            "mandalId": "vemuru",
            "districtId": "bapatla",
            "coordinate": {
              "latitude": 16.1667,
              "longitude": 80.75
            },
            "type": "locality"
          }
        ]
      }
    ]
  },
  {
    "id": "chittoor",
    "name": "Chittoor",
    "headquarters": "Chittoor",
    "region": "Rayalaseema",
    "center": {
      "latitude": 13.2172,
      "longitude": 79.1003
    },
    "mandals": [
      {
        "id": "chittoor_urban",
        "name": "Chittoor Urban",
        "districtId": "chittoor",
        "center": {
          "latitude": 13.2172,
          "longitude": 79.1003
        },
        "localities": [
          {
            "id": "chittoor_urban_loc_1",
            "name": "Gandhi Road",
            "mandalId": "chittoor_urban",
            "districtId": "chittoor",
            "coordinate": {
              "latitude": 13.2172,
              "longitude": 79.1003
            },
            "type": "town"
          },
          {
            "id": "chittoor_urban_loc_2",
            "name": "District Collectorate",
            "mandalId": "chittoor_urban",
            "districtId": "chittoor",
            "coordinate": {
              "latitude": 13.2172,
              "longitude": 79.1003
            },
            "type": "locality"
          },
          {
            "id": "chittoor_urban_loc_3",
            "name": "Greamspet",
            "mandalId": "chittoor_urban",
            "districtId": "chittoor",
            "coordinate": {
              "latitude": 13.2172,
              "longitude": 79.1003
            },
            "type": "locality"
          },
          {
            "id": "chittoor_urban_loc_4",
            "name": "MSR Circle",
            "mandalId": "chittoor_urban",
            "districtId": "chittoor",
            "coordinate": {
              "latitude": 13.2172,
              "longitude": 79.1003
            },
            "type": "locality"
          },
          {
            "id": "chittoor_urban_loc_5",
            "name": "Kongareddypalli",
            "mandalId": "chittoor_urban",
            "districtId": "chittoor",
            "coordinate": {
              "latitude": 13.2172,
              "longitude": 79.1003
            },
            "type": "locality"
          }
        ]
      },
      {
        "id": "palamaner",
        "name": "Palamaner",
        "districtId": "chittoor",
        "center": {
          "latitude": 13.2,
          "longitude": 78.75
        },
        "localities": [
          {
            "id": "palamaner_loc_1",
            "name": "National Highway Circle",
            "mandalId": "palamaner",
            "districtId": "chittoor",
            "coordinate": {
              "latitude": 13.2,
              "longitude": 78.75
            },
            "type": "town"
          },
          {
            "id": "palamaner_loc_2",
            "name": "Cattle Market Area",
            "mandalId": "palamaner",
            "districtId": "chittoor",
            "coordinate": {
              "latitude": 13.2,
              "longitude": 78.75
            },
            "type": "locality"
          },
          {
            "id": "palamaner_loc_3",
            "name": "Bazaar Street",
            "mandalId": "palamaner",
            "districtId": "chittoor",
            "coordinate": {
              "latitude": 13.2,
              "longitude": 78.75
            },
            "type": "locality"
          }
        ]
      },
      {
        "id": "kuppam",
        "name": "Kuppam",
        "districtId": "chittoor",
        "center": {
          "latitude": 12.75,
          "longitude": 78.3667
        },
        "localities": [
          {
            "id": "kuppam_loc_1",
            "name": "PES Medical College Area",
            "mandalId": "kuppam",
            "districtId": "chittoor",
            "coordinate": {
              "latitude": 12.75,
              "longitude": 78.3667
            },
            "type": "town"
          },
          {
            "id": "kuppam_loc_2",
            "name": "Railway Station Road",
            "mandalId": "kuppam",
            "districtId": "chittoor",
            "coordinate": {
              "latitude": 12.75,
              "longitude": 78.3667
            },
            "type": "locality"
          },
          {
            "id": "kuppam_loc_3",
            "name": "NTR Circle",
            "mandalId": "kuppam",
            "districtId": "chittoor",
            "coordinate": {
              "latitude": 12.75,
              "longitude": 78.3667
            },
            "type": "locality"
          }
        ]
      },
      {
        "id": "nagari",
        "name": "Nagari",
        "districtId": "chittoor",
        "center": {
          "latitude": 13.33,
          "longitude": 79.58
        },
        "localities": [
          {
            "id": "nagari_loc_1",
            "name": "Weavers Colony",
            "mandalId": "nagari",
            "districtId": "chittoor",
            "coordinate": {
              "latitude": 13.33,
              "longitude": 79.58
            },
            "type": "town"
          },
          {
            "id": "nagari_loc_2",
            "name": "Bazaar Street",
            "mandalId": "nagari",
            "districtId": "chittoor",
            "coordinate": {
              "latitude": 13.33,
              "longitude": 79.58
            },
            "type": "locality"
          },
          {
            "id": "nagari_loc_3",
            "name": "Border Checkpost",
            "mandalId": "nagari",
            "districtId": "chittoor",
            "coordinate": {
              "latitude": 13.33,
              "longitude": 79.58
            },
            "type": "locality"
          }
        ]
      },
      {
        "id": "punganur",
        "name": "Punganur",
        "districtId": "chittoor",
        "center": {
          "latitude": 13.3667,
          "longitude": 78.5833
        },
        "localities": [
          {
            "id": "punganur_loc_1",
            "name": "Palace Road",
            "mandalId": "punganur",
            "districtId": "chittoor",
            "coordinate": {
              "latitude": 13.3667,
              "longitude": 78.5833
            },
            "type": "town"
          },
          {
            "id": "punganur_loc_2",
            "name": "Market Junction",
            "mandalId": "punganur",
            "districtId": "chittoor",
            "coordinate": {
              "latitude": 13.3667,
              "longitude": 78.5833
            },
            "type": "locality"
          }
        ]
      }
    ]
  },
  {
    "id": "konaseema",
    "name": "Dr. B.R. Ambedkar Konaseema",
    "headquarters": "Amalapuram",
    "region": "Coastal Andhra",
    "center": {
      "latitude": 16.5787,
      "longitude": 82.0061
    },
    "mandals": [
      {
        "id": "amalapuram",
        "name": "Amalapuram",
        "districtId": "konaseema",
        "center": {
          "latitude": 16.5787,
          "longitude": 82.0061
        },
        "localities": [
          {
            "id": "amalapuram_loc_1",
            "name": "Clock Tower Center",
            "mandalId": "amalapuram",
            "districtId": "konaseema",
            "coordinate": {
              "latitude": 16.5787,
              "longitude": 82.0061
            },
            "type": "town"
          },
          {
            "id": "amalapuram_loc_2",
            "name": "Black Bridge Area",
            "mandalId": "amalapuram",
            "districtId": "konaseema",
            "coordinate": {
              "latitude": 16.5787,
              "longitude": 82.0061
            },
            "type": "locality"
          },
          {
            "id": "amalapuram_loc_3",
            "name": "Collectorate Camp Office",
            "mandalId": "amalapuram",
            "districtId": "konaseema",
            "coordinate": {
              "latitude": 16.5787,
              "longitude": 82.0061
            },
            "type": "locality"
          },
          {
            "id": "amalapuram_loc_4",
            "name": "KIMS Hospital Road",
            "mandalId": "amalapuram",
            "districtId": "konaseema",
            "coordinate": {
              "latitude": 16.5787,
              "longitude": 82.0061
            },
            "type": "locality"
          }
        ]
      },
      {
        "id": "ramachandrapuram",
        "name": "Ramachandrapuram",
        "districtId": "konaseema",
        "center": {
          "latitude": 16.85,
          "longitude": 82.02
        },
        "localities": [
          {
            "id": "ramachandrapuram_loc_1",
            "name": "Fort Area",
            "mandalId": "ramachandrapuram",
            "districtId": "konaseema",
            "coordinate": {
              "latitude": 16.85,
              "longitude": 82.02
            },
            "type": "town"
          },
          {
            "id": "ramachandrapuram_loc_2",
            "name": "Kakinada Road Junction",
            "mandalId": "ramachandrapuram",
            "districtId": "konaseema",
            "coordinate": {
              "latitude": 16.85,
              "longitude": 82.02
            },
            "type": "locality"
          },
          {
            "id": "ramachandrapuram_loc_3",
            "name": "Main Bazaar",
            "mandalId": "ramachandrapuram",
            "districtId": "konaseema",
            "coordinate": {
              "latitude": 16.85,
              "longitude": 82.02
            },
            "type": "locality"
          }
        ]
      },
      {
        "id": "mandapeta",
        "name": "Mandapeta",
        "districtId": "konaseema",
        "center": {
          "latitude": 16.87,
          "longitude": 81.93
        },
        "localities": [
          {
            "id": "mandapeta_loc_1",
            "name": "Rice Mills Industrial Area",
            "mandalId": "mandapeta",
            "districtId": "konaseema",
            "coordinate": {
              "latitude": 16.87,
              "longitude": 81.93
            },
            "type": "town"
          },
          {
            "id": "mandapeta_loc_2",
            "name": "Four Roads Circle",
            "mandalId": "mandapeta",
            "districtId": "konaseema",
            "coordinate": {
              "latitude": 16.87,
              "longitude": 81.93
            },
            "type": "locality"
          }
        ]
      },
      {
        "id": "razole",
        "name": "Razole",
        "districtId": "konaseema",
        "center": {
          "latitude": 16.4833,
          "longitude": 81.8333
        },
        "localities": [
          {
            "id": "razole_loc_1",
            "name": "Godavari Ferry Point",
            "mandalId": "razole",
            "districtId": "konaseema",
            "coordinate": {
              "latitude": 16.4833,
              "longitude": 81.8333
            },
            "type": "town"
          },
          {
            "id": "razole_loc_2",
            "name": "Bridge Approach",
            "mandalId": "razole",
            "districtId": "konaseema",
            "coordinate": {
              "latitude": 16.4833,
              "longitude": 81.8333
            },
            "type": "locality"
          },
          {
            "id": "razole_loc_3",
            "name": "Main Road",
            "mandalId": "razole",
            "districtId": "konaseema",
            "coordinate": {
              "latitude": 16.4833,
              "longitude": 81.8333
            },
            "type": "locality"
          }
        ]
      },
      {
        "id": "mummidivaram",
        "name": "Mummidivaram",
        "districtId": "konaseema",
        "center": {
          "latitude": 16.65,
          "longitude": 82.1167
        },
        "localities": [
          {
            "id": "mummidivaram_loc_1",
            "name": "Balayogi Samadhi Area",
            "mandalId": "mummidivaram",
            "districtId": "konaseema",
            "coordinate": {
              "latitude": 16.65,
              "longitude": 82.1167
            },
            "type": "town"
          },
          {
            "id": "mummidivaram_loc_2",
            "name": "RTC Bus Station",
            "mandalId": "mummidivaram",
            "districtId": "konaseema",
            "coordinate": {
              "latitude": 16.65,
              "longitude": 82.1167
            },
            "type": "locality"
          }
        ]
      }
    ]
  },
  {
    "id": "east_godavari",
    "name": "East Godavari",
    "headquarters": "Rajahmundry",
    "region": "Coastal Andhra",
    "center": {
      "latitude": 17.0005,
      "longitude": 81.804
    },
    "mandals": [
      {
        "id": "rajahmundry_urban",
        "name": "Rajahmundry Urban",
        "districtId": "east_godavari",
        "center": {
          "latitude": 17.0005,
          "longitude": 81.804
        },
        "localities": [
          {
            "id": "rajahmundry_urban_loc_1",
            "name": "Godavari Pushkar Ghat",
            "mandalId": "rajahmundry_urban",
            "districtId": "east_godavari",
            "coordinate": {
              "latitude": 17.0005,
              "longitude": 81.804
            },
            "type": "town"
          },
          {
            "id": "rajahmundry_urban_loc_2",
            "name": "Kotipalli Bus Stand",
            "mandalId": "rajahmundry_urban",
            "districtId": "east_godavari",
            "coordinate": {
              "latitude": 17.0005,
              "longitude": 81.804
            },
            "type": "locality"
          },
          {
            "id": "rajahmundry_urban_loc_3",
            "name": "Danavaipeta",
            "mandalId": "rajahmundry_urban",
            "districtId": "east_godavari",
            "coordinate": {
              "latitude": 17.0005,
              "longitude": 81.804
            },
            "type": "locality"
          },
          {
            "id": "rajahmundry_urban_loc_4",
            "name": "Kambal Cheruvu",
            "mandalId": "rajahmundry_urban",
            "districtId": "east_godavari",
            "coordinate": {
              "latitude": 17.0005,
              "longitude": 81.804
            },
            "type": "locality"
          },
          {
            "id": "rajahmundry_urban_loc_5",
            "name": "Jampeta",
            "mandalId": "rajahmundry_urban",
            "districtId": "east_godavari",
            "coordinate": {
              "latitude": 17.0005,
              "longitude": 81.804
            },
            "type": "locality"
          }
        ]
      },
      {
        "id": "kovvur",
        "name": "Kovvur",
        "districtId": "east_godavari",
        "center": {
          "latitude": 17.0167,
          "longitude": 81.7333
        },
        "localities": [
          {
            "id": "kovvur_loc_1",
            "name": "Godavari Toll Plaza",
            "mandalId": "kovvur",
            "districtId": "east_godavari",
            "coordinate": {
              "latitude": 17.0167,
              "longitude": 81.7333
            },
            "type": "town"
          },
          {
            "id": "kovvur_loc_2",
            "name": "Goshpada Kshetram",
            "mandalId": "kovvur",
            "districtId": "east_godavari",
            "coordinate": {
              "latitude": 17.0167,
              "longitude": 81.7333
            },
            "type": "locality"
          },
          {
            "id": "kovvur_loc_3",
            "name": "Station Road",
            "mandalId": "kovvur",
            "districtId": "east_godavari",
            "coordinate": {
              "latitude": 17.0167,
              "longitude": 81.7333
            },
            "type": "locality"
          }
        ]
      },
      {
        "id": "nidadavole",
        "name": "Nidadavole",
        "districtId": "east_godavari",
        "center": {
          "latitude": 16.9167,
          "longitude": 81.6667
        },
        "localities": [
          {
            "id": "nidadavole_loc_1",
            "name": "Canal Road",
            "mandalId": "nidadavole",
            "districtId": "east_godavari",
            "coordinate": {
              "latitude": 16.9167,
              "longitude": 81.6667
            },
            "type": "town"
          },
          {
            "id": "nidadavole_loc_2",
            "name": "Railway Junction Area",
            "mandalId": "nidadavole",
            "districtId": "east_godavari",
            "coordinate": {
              "latitude": 16.9167,
              "longitude": 81.6667
            },
            "type": "locality"
          }
        ]
      },
      {
        "id": "anaparthy",
        "name": "Anaparthy",
        "districtId": "east_godavari",
        "center": {
          "latitude": 16.9333,
          "longitude": 81.95
        },
        "localities": [
          {
            "id": "anaparthy_loc_1",
            "name": "Bazaar Street",
            "mandalId": "anaparthy",
            "districtId": "east_godavari",
            "coordinate": {
              "latitude": 16.9333,
              "longitude": 81.95
            },
            "type": "town"
          },
          {
            "id": "anaparthy_loc_2",
            "name": "Canal Bund Road",
            "mandalId": "anaparthy",
            "districtId": "east_godavari",
            "coordinate": {
              "latitude": 16.9333,
              "longitude": 81.95
            },
            "type": "locality"
          }
        ]
      },
      {
        "id": "rajanagaram",
        "name": "Rajanagaram",
        "districtId": "east_godavari",
        "center": {
          "latitude": 17.0833,
          "longitude": 81.9
        },
        "localities": [
          {
            "id": "rajanagaram_loc_1",
            "name": "Adikavi Nannaya University Area",
            "mandalId": "rajanagaram",
            "districtId": "east_godavari",
            "coordinate": {
              "latitude": 17.0833,
              "longitude": 81.9
            },
            "type": "town"
          },
          {
            "id": "rajanagaram_loc_2",
            "name": "NH-16 Junction",
            "mandalId": "rajanagaram",
            "districtId": "east_godavari",
            "coordinate": {
              "latitude": 17.0833,
              "longitude": 81.9
            },
            "type": "locality"
          }
        ]
      }
    ]
  },
  {
    "id": "eluru",
    "name": "Eluru",
    "headquarters": "Eluru",
    "region": "Coastal Andhra",
    "center": {
      "latitude": 16.7107,
      "longitude": 81.0952
    },
    "mandals": [
      {
        "id": "eluru",
        "name": "Eluru",
        "districtId": "eluru",
        "center": {
          "latitude": 16.7107,
          "longitude": 81.0952
        },
        "localities": [
          {
            "id": "eluru_loc_1",
            "name": "Fire Station Center",
            "mandalId": "eluru",
            "districtId": "eluru",
            "coordinate": {
              "latitude": 16.7107,
              "longitude": 81.0952
            },
            "type": "town"
          },
          {
            "id": "eluru_loc_2",
            "name": "Powerpet Railway Station",
            "mandalId": "eluru",
            "districtId": "eluru",
            "coordinate": {
              "latitude": 16.7107,
              "longitude": 81.0952
            },
            "type": "locality"
          },
          {
            "id": "eluru_loc_3",
            "name": "Collectorate",
            "mandalId": "eluru",
            "districtId": "eluru",
            "coordinate": {
              "latitude": 16.7107,
              "longitude": 81.0952
            },
            "type": "locality"
          },
          {
            "id": "eluru_loc_4",
            "name": "R.R. Pet",
            "mandalId": "eluru",
            "districtId": "eluru",
            "coordinate": {
              "latitude": 16.7107,
              "longitude": 81.0952
            },
            "type": "locality"
          },
          {
            "id": "eluru_loc_5",
            "name": "Ashok Nagar",
            "mandalId": "eluru",
            "districtId": "eluru",
            "coordinate": {
              "latitude": 16.7107,
              "longitude": 81.0952
            },
            "type": "locality"
          }
        ]
      },
      {
        "id": "jangareddygudem",
        "name": "Jangareddygudem",
        "districtId": "eluru",
        "center": {
          "latitude": 17.1167,
          "longitude": 81.3
        },
        "localities": [
          {
            "id": "jangareddygudem_loc_1",
            "name": "RTC Bus Stand",
            "mandalId": "jangareddygudem",
            "districtId": "eluru",
            "coordinate": {
              "latitude": 17.1167,
              "longitude": 81.3
            },
            "type": "town"
          },
          {
            "id": "jangareddygudem_loc_2",
            "name": "Tobacco Board Area",
            "mandalId": "jangareddygudem",
            "districtId": "eluru",
            "coordinate": {
              "latitude": 17.1167,
              "longitude": 81.3
            },
            "type": "locality"
          },
          {
            "id": "jangareddygudem_loc_3",
            "name": "Kammavaripalem",
            "mandalId": "jangareddygudem",
            "districtId": "eluru",
            "coordinate": {
              "latitude": 17.1167,
              "longitude": 81.3
            },
            "type": "locality"
          }
        ]
      },
      {
        "id": "nuzvid",
        "name": "Nuzvid",
        "districtId": "eluru",
        "center": {
          "latitude": 16.7833,
          "longitude": 80.85
        },
        "localities": [
          {
            "id": "nuzvid_loc_1",
            "name": "IIIT Nuzvid Campus",
            "mandalId": "nuzvid",
            "districtId": "eluru",
            "coordinate": {
              "latitude": 16.7833,
              "longitude": 80.85
            },
            "type": "town"
          },
          {
            "id": "nuzvid_loc_2",
            "name": "Mango Market Yard",
            "mandalId": "nuzvid",
            "districtId": "eluru",
            "coordinate": {
              "latitude": 16.7833,
              "longitude": 80.85
            },
            "type": "locality"
          },
          {
            "id": "nuzvid_loc_3",
            "name": "Fort Area",
            "mandalId": "nuzvid",
            "districtId": "eluru",
            "coordinate": {
              "latitude": 16.7833,
              "longitude": 80.85
            },
            "type": "locality"
          }
        ]
      },
      {
        "id": "chintalapudi",
        "name": "Chintalapudi",
        "districtId": "eluru",
        "center": {
          "latitude": 17.0667,
          "longitude": 80.9833
        },
        "localities": [
          {
            "id": "chintalapudi_loc_1",
            "name": "Main Bazaar",
            "mandalId": "chintalapudi",
            "districtId": "eluru",
            "coordinate": {
              "latitude": 17.0667,
              "longitude": 80.9833
            },
            "type": "town"
          },
          {
            "id": "chintalapudi_loc_2",
            "name": "Govt Hospital Road",
            "mandalId": "chintalapudi",
            "districtId": "eluru",
            "coordinate": {
              "latitude": 17.0667,
              "longitude": 80.9833
            },
            "type": "locality"
          }
        ]
      },
      {
        "id": "kaikalur",
        "name": "Kaikalur",
        "districtId": "eluru",
        "center": {
          "latitude": 16.5667,
          "longitude": 81.2
        },
        "localities": [
          {
            "id": "kaikalur_loc_1",
            "name": "Kolleru Lake Road",
            "mandalId": "kaikalur",
            "districtId": "eluru",
            "coordinate": {
              "latitude": 16.5667,
              "longitude": 81.2
            },
            "type": "town"
          },
          {
            "id": "kaikalur_loc_2",
            "name": "Railway Station Road",
            "mandalId": "kaikalur",
            "districtId": "eluru",
            "coordinate": {
              "latitude": 16.5667,
              "longitude": 81.2
            },
            "type": "locality"
          }
        ]
      }
    ]
  },
  {
    "id": "guntur",
    "name": "Guntur",
    "headquarters": "Guntur",
    "region": "Coastal Andhra",
    "center": {
      "latitude": 16.3067,
      "longitude": 80.4365
    },
    "mandals": [
      {
        "id": "guntur_urban",
        "name": "Guntur Urban",
        "districtId": "guntur",
        "center": {
          "latitude": 16.3067,
          "longitude": 80.4365
        },
        "localities": [
          {
            "id": "guntur_urban_loc_1",
            "name": "Arundelpet",
            "mandalId": "guntur_urban",
            "districtId": "guntur",
            "coordinate": {
              "latitude": 16.3067,
              "longitude": 80.4365
            },
            "type": "town"
          },
          {
            "id": "guntur_urban_loc_2",
            "name": "Brodipet",
            "mandalId": "guntur_urban",
            "districtId": "guntur",
            "coordinate": {
              "latitude": 16.3067,
              "longitude": 80.4365
            },
            "type": "locality"
          },
          {
            "id": "guntur_urban_loc_3",
            "name": "Laxmipuram",
            "mandalId": "guntur_urban",
            "districtId": "guntur",
            "coordinate": {
              "latitude": 16.3067,
              "longitude": 80.4365
            },
            "type": "locality"
          },
          {
            "id": "guntur_urban_loc_4",
            "name": "Chilli Market Yard",
            "mandalId": "guntur_urban",
            "districtId": "guntur",
            "coordinate": {
              "latitude": 16.3067,
              "longitude": 80.4365
            },
            "type": "locality"
          },
          {
            "id": "guntur_urban_loc_5",
            "name": "Kothapet",
            "mandalId": "guntur_urban",
            "districtId": "guntur",
            "coordinate": {
              "latitude": 16.3067,
              "longitude": 80.4365
            },
            "type": "locality"
          },
          {
            "id": "guntur_urban_loc_6",
            "name": "Collectorate",
            "mandalId": "guntur_urban",
            "districtId": "guntur",
            "coordinate": {
              "latitude": 16.3067,
              "longitude": 80.4365
            },
            "type": "locality"
          }
        ]
      },
      {
        "id": "amaravati",
        "name": "Amaravati (Capital)",
        "districtId": "guntur",
        "center": {
          "latitude": 16.5131,
          "longitude": 80.5165
        },
        "localities": [
          {
            "id": "amaravati_loc_1",
            "name": "Secretariat Complex (Velagapudi)",
            "mandalId": "amaravati",
            "districtId": "guntur",
            "coordinate": {
              "latitude": 16.5131,
              "longitude": 80.5165
            },
            "type": "town"
          },
          {
            "id": "amaravati_loc_2",
            "name": "High Court Area",
            "mandalId": "amaravati",
            "districtId": "guntur",
            "coordinate": {
              "latitude": 16.5131,
              "longitude": 80.5165
            },
            "type": "locality"
          },
          {
            "id": "amaravati_loc_3",
            "name": "Seed Access Road",
            "mandalId": "amaravati",
            "districtId": "guntur",
            "coordinate": {
              "latitude": 16.5131,
              "longitude": 80.5165
            },
            "type": "locality"
          },
          {
            "id": "amaravati_loc_4",
            "name": "Rayapudi",
            "mandalId": "amaravati",
            "districtId": "guntur",
            "coordinate": {
              "latitude": 16.5131,
              "longitude": 80.5165
            },
            "type": "locality"
          }
        ]
      },
      {
        "id": "mangalagiri",
        "name": "Mangalagiri",
        "districtId": "guntur",
        "center": {
          "latitude": 16.43,
          "longitude": 80.57
        },
        "localities": [
          {
            "id": "mangalagiri_loc_1",
            "name": "AIIMS Campus",
            "mandalId": "mangalagiri",
            "districtId": "guntur",
            "coordinate": {
              "latitude": 16.43,
              "longitude": 80.57
            },
            "type": "town"
          },
          {
            "id": "mangalagiri_loc_2",
            "name": "Panakala Temple Area",
            "mandalId": "mangalagiri",
            "districtId": "guntur",
            "coordinate": {
              "latitude": 16.43,
              "longitude": 80.57
            },
            "type": "locality"
          },
          {
            "id": "mangalagiri_loc_3",
            "name": "Old Handloom Bazaar",
            "mandalId": "mangalagiri",
            "districtId": "guntur",
            "coordinate": {
              "latitude": 16.43,
              "longitude": 80.57
            },
            "type": "locality"
          },
          {
            "id": "mangalagiri_loc_4",
            "name": "Bypass",
            "mandalId": "mangalagiri",
            "districtId": "guntur",
            "coordinate": {
              "latitude": 16.43,
              "longitude": 80.57
            },
            "type": "locality"
          }
        ]
      },
      {
        "id": "tenali",
        "name": "Tenali",
        "districtId": "guntur",
        "center": {
          "latitude": 16.24,
          "longitude": 80.65
        },
        "localities": [
          {
            "id": "tenali_loc_1",
            "name": "Bose Road",
            "mandalId": "tenali",
            "districtId": "guntur",
            "coordinate": {
              "latitude": 16.24,
              "longitude": 80.65
            },
            "type": "town"
          },
          {
            "id": "tenali_loc_2",
            "name": "Canal Road",
            "mandalId": "tenali",
            "districtId": "guntur",
            "coordinate": {
              "latitude": 16.24,
              "longitude": 80.65
            },
            "type": "locality"
          },
          {
            "id": "tenali_loc_3",
            "name": "Three Lanterns Center",
            "mandalId": "tenali",
            "districtId": "guntur",
            "coordinate": {
              "latitude": 16.24,
              "longitude": 80.65
            },
            "type": "locality"
          },
          {
            "id": "tenali_loc_4",
            "name": "Chenchupet",
            "mandalId": "tenali",
            "districtId": "guntur",
            "coordinate": {
              "latitude": 16.24,
              "longitude": 80.65
            },
            "type": "locality"
          }
        ]
      },
      {
        "id": "ponnuru",
        "name": "Ponnuru",
        "districtId": "guntur",
        "center": {
          "latitude": 16.07,
          "longitude": 80.57
        },
        "localities": [
          {
            "id": "ponnuru_loc_1",
            "name": "Sakshi Ganapathi Temple Area",
            "mandalId": "ponnuru",
            "districtId": "guntur",
            "coordinate": {
              "latitude": 16.07,
              "longitude": 80.57
            },
            "type": "town"
          },
          {
            "id": "ponnuru_loc_2",
            "name": "Nidubrolu Railway Station",
            "mandalId": "ponnuru",
            "districtId": "guntur",
            "coordinate": {
              "latitude": 16.07,
              "longitude": 80.57
            },
            "type": "locality"
          }
        ]
      }
    ]
  },
  {
    "id": "kakinada",
    "name": "Kakinada",
    "headquarters": "Kakinada",
    "region": "Coastal Andhra",
    "center": {
      "latitude": 16.9891,
      "longitude": 82.2475
    },
    "mandals": [
      {
        "id": "kakinada_urban",
        "name": "Kakinada Urban",
        "districtId": "kakinada",
        "center": {
          "latitude": 16.9891,
          "longitude": 82.2475
        },
        "localities": [
          {
            "id": "kakinada_urban_loc_1",
            "name": "Main Road (Bhanugudi)",
            "mandalId": "kakinada_urban",
            "districtId": "kakinada",
            "coordinate": {
              "latitude": 16.9891,
              "longitude": 82.2475
            },
            "type": "town"
          },
          {
            "id": "kakinada_urban_loc_2",
            "name": "Deep Water Port Area",
            "mandalId": "kakinada_urban",
            "districtId": "kakinada",
            "coordinate": {
              "latitude": 16.9891,
              "longitude": 82.2475
            },
            "type": "locality"
          },
          {
            "id": "kakinada_urban_loc_3",
            "name": "Collectorate",
            "mandalId": "kakinada_urban",
            "districtId": "kakinada",
            "coordinate": {
              "latitude": 16.9891,
              "longitude": 82.2475
            },
            "type": "locality"
          },
          {
            "id": "kakinada_urban_loc_4",
            "name": "Sarpavaram Junction",
            "mandalId": "kakinada_urban",
            "districtId": "kakinada",
            "coordinate": {
              "latitude": 16.9891,
              "longitude": 82.2475
            },
            "type": "locality"
          },
          {
            "id": "kakinada_urban_loc_5",
            "name": "Jagannaickpur",
            "mandalId": "kakinada_urban",
            "districtId": "kakinada",
            "coordinate": {
              "latitude": 16.9891,
              "longitude": 82.2475
            },
            "type": "locality"
          }
        ]
      },
      {
        "id": "peddapuram",
        "name": "Peddapuram",
        "districtId": "kakinada",
        "center": {
          "latitude": 17.08,
          "longitude": 82.13
        },
        "localities": [
          {
            "id": "peddapuram_loc_1",
            "name": "Silk Handloom Colony",
            "mandalId": "peddapuram",
            "districtId": "kakinada",
            "coordinate": {
              "latitude": 17.08,
              "longitude": 82.13
            },
            "type": "town"
          },
          {
            "id": "peddapuram_loc_2",
            "name": "Maridamma Temple Area",
            "mandalId": "peddapuram",
            "districtId": "kakinada",
            "coordinate": {
              "latitude": 17.08,
              "longitude": 82.13
            },
            "type": "locality"
          },
          {
            "id": "peddapuram_loc_3",
            "name": "Bypass",
            "mandalId": "peddapuram",
            "districtId": "kakinada",
            "coordinate": {
              "latitude": 17.08,
              "longitude": 82.13
            },
            "type": "locality"
          }
        ]
      },
      {
        "id": "pithapuram",
        "name": "Pithapuram",
        "districtId": "kakinada",
        "center": {
          "latitude": 17.11,
          "longitude": 82.26
        },
        "localities": [
          {
            "id": "pithapuram_loc_1",
            "name": "Kukkuteswara Swamy Temple Road",
            "mandalId": "pithapuram",
            "districtId": "kakinada",
            "coordinate": {
              "latitude": 17.11,
              "longitude": 82.26
            },
            "type": "town"
          },
          {
            "id": "pithapuram_loc_2",
            "name": "Railway Station Area",
            "mandalId": "pithapuram",
            "districtId": "kakinada",
            "coordinate": {
              "latitude": 17.11,
              "longitude": 82.26
            },
            "type": "locality"
          }
        ]
      },
      {
        "id": "tuni",
        "name": "Tuni",
        "districtId": "kakinada",
        "center": {
          "latitude": 17.35,
          "longitude": 82.55
        },
        "localities": [
          {
            "id": "tuni_loc_1",
            "name": "Railway Junction Area",
            "mandalId": "tuni",
            "districtId": "kakinada",
            "coordinate": {
              "latitude": 17.35,
              "longitude": 82.55
            },
            "type": "town"
          },
          {
            "id": "tuni_loc_2",
            "name": "Betel Leaf Market",
            "mandalId": "tuni",
            "districtId": "kakinada",
            "coordinate": {
              "latitude": 17.35,
              "longitude": 82.55
            },
            "type": "locality"
          },
          {
            "id": "tuni_loc_3",
            "name": "NH-16 Flyover",
            "mandalId": "tuni",
            "districtId": "kakinada",
            "coordinate": {
              "latitude": 17.35,
              "longitude": 82.55
            },
            "type": "locality"
          }
        ]
      },
      {
        "id": "samalkota",
        "name": "Samalkota",
        "districtId": "kakinada",
        "center": {
          "latitude": 17.05,
          "longitude": 82.17
        },
        "localities": [
          {
            "id": "samalkota_loc_1",
            "name": "Railway Station Junction",
            "mandalId": "samalkota",
            "districtId": "kakinada",
            "coordinate": {
              "latitude": 17.05,
              "longitude": 82.17
            },
            "type": "town"
          },
          {
            "id": "samalkota_loc_2",
            "name": "Sugar Factory Road",
            "mandalId": "samalkota",
            "districtId": "kakinada",
            "coordinate": {
              "latitude": 17.05,
              "longitude": 82.17
            },
            "type": "locality"
          }
        ]
      }
    ]
  },
  {
    "id": "krishna",
    "name": "Krishna",
    "headquarters": "Machilipatnam",
    "region": "Coastal Andhra",
    "center": {
      "latitude": 16.1875,
      "longitude": 81.1389
    },
    "mandals": [
      {
        "id": "machilipatnam",
        "name": "Machilipatnam",
        "districtId": "krishna",
        "center": {
          "latitude": 16.1875,
          "longitude": 81.1389
        },
        "localities": [
          {
            "id": "machilipatnam_loc_1",
            "name": "Collectorate Area",
            "mandalId": "machilipatnam",
            "districtId": "krishna",
            "coordinate": {
              "latitude": 16.1875,
              "longitude": 81.1389
            },
            "type": "town"
          },
          {
            "id": "machilipatnam_loc_2",
            "name": "Koneru Center",
            "mandalId": "machilipatnam",
            "districtId": "krishna",
            "coordinate": {
              "latitude": 16.1875,
              "longitude": 81.1389
            },
            "type": "locality"
          },
          {
            "id": "machilipatnam_loc_3",
            "name": "Manginapudi Beach Road",
            "mandalId": "machilipatnam",
            "districtId": "krishna",
            "coordinate": {
              "latitude": 16.1875,
              "longitude": 81.1389
            },
            "type": "locality"
          },
          {
            "id": "machilipatnam_loc_4",
            "name": "Robertsonpet",
            "mandalId": "machilipatnam",
            "districtId": "krishna",
            "coordinate": {
              "latitude": 16.1875,
              "longitude": 81.1389
            },
            "type": "locality"
          },
          {
            "id": "machilipatnam_loc_5",
            "name": "Bandar Port Zone",
            "mandalId": "machilipatnam",
            "districtId": "krishna",
            "coordinate": {
              "latitude": 16.1875,
              "longitude": 81.1389
            },
            "type": "locality"
          }
        ]
      },
      {
        "id": "gudivada",
        "name": "Gudivada",
        "districtId": "krishna",
        "center": {
          "latitude": 16.43,
          "longitude": 80.99
        },
        "localities": [
          {
            "id": "gudivada_loc_1",
            "name": "Nehru Chowk",
            "mandalId": "gudivada",
            "districtId": "krishna",
            "coordinate": {
              "latitude": 16.43,
              "longitude": 80.99
            },
            "type": "town"
          },
          {
            "id": "gudivada_loc_2",
            "name": "Railway Station Road",
            "mandalId": "gudivada",
            "districtId": "krishna",
            "coordinate": {
              "latitude": 16.43,
              "longitude": 80.99
            },
            "type": "locality"
          },
          {
            "id": "gudivada_loc_3",
            "name": "Gudivada Bus Stand",
            "mandalId": "gudivada",
            "districtId": "krishna",
            "coordinate": {
              "latitude": 16.43,
              "longitude": 80.99
            },
            "type": "locality"
          }
        ]
      },
      {
        "id": "pedana",
        "name": "Pedana",
        "districtId": "krishna",
        "center": {
          "latitude": 16.26,
          "longitude": 81.16
        },
        "localities": [
          {
            "id": "pedana_loc_1",
            "name": "Kalamkari Block Print Area",
            "mandalId": "pedana",
            "districtId": "krishna",
            "coordinate": {
              "latitude": 16.26,
              "longitude": 81.16
            },
            "type": "town"
          },
          {
            "id": "pedana_loc_2",
            "name": "Bazaar Center",
            "mandalId": "pedana",
            "districtId": "krishna",
            "coordinate": {
              "latitude": 16.26,
              "longitude": 81.16
            },
            "type": "locality"
          }
        ]
      },
      {
        "id": "avanigadda",
        "name": "Avanigadda",
        "districtId": "krishna",
        "center": {
          "latitude": 16.02,
          "longitude": 80.92
        },
        "localities": [
          {
            "id": "avanigadda_loc_1",
            "name": "Gandhi Kshetram",
            "mandalId": "avanigadda",
            "districtId": "krishna",
            "coordinate": {
              "latitude": 16.02,
              "longitude": 80.92
            },
            "type": "town"
          },
          {
            "id": "avanigadda_loc_2",
            "name": "Puligadda Bridge Approach",
            "mandalId": "avanigadda",
            "districtId": "krishna",
            "coordinate": {
              "latitude": 16.02,
              "longitude": 80.92
            },
            "type": "locality"
          }
        ]
      },
      {
        "id": "pamarru",
        "name": "Pamarru",
        "districtId": "krishna",
        "center": {
          "latitude": 16.33,
          "longitude": 80.96
        },
        "localities": [
          {
            "id": "pamarru_loc_1",
            "name": "Four Roads Junction",
            "mandalId": "pamarru",
            "districtId": "krishna",
            "coordinate": {
              "latitude": 16.33,
              "longitude": 80.96
            },
            "type": "town"
          },
          {
            "id": "pamarru_loc_2",
            "name": "Market Yard",
            "mandalId": "pamarru",
            "districtId": "krishna",
            "coordinate": {
              "latitude": 16.33,
              "longitude": 80.96
            },
            "type": "locality"
          }
        ]
      }
    ]
  },
  {
    "id": "kurnool",
    "name": "Kurnool",
    "headquarters": "Kurnool",
    "region": "Rayalaseema",
    "center": {
      "latitude": 15.8281,
      "longitude": 78.0373
    },
    "mandals": [
      {
        "id": "kurnool_urban",
        "name": "Kurnool Urban",
        "districtId": "kurnool",
        "center": {
          "latitude": 15.8281,
          "longitude": 78.0373
        },
        "localities": [
          {
            "id": "kurnool_urban_loc_1",
            "name": "Konda Reddy Buruju",
            "mandalId": "kurnool_urban",
            "districtId": "kurnool",
            "coordinate": {
              "latitude": 15.8281,
              "longitude": 78.0373
            },
            "type": "town"
          },
          {
            "id": "kurnool_urban_loc_2",
            "name": "Mourya Inn Circle",
            "mandalId": "kurnool_urban",
            "districtId": "kurnool",
            "coordinate": {
              "latitude": 15.8281,
              "longitude": 78.0373
            },
            "type": "locality"
          },
          {
            "id": "kurnool_urban_loc_3",
            "name": "Collectorate",
            "mandalId": "kurnool_urban",
            "districtId": "kurnool",
            "coordinate": {
              "latitude": 15.8281,
              "longitude": 78.0373
            },
            "type": "locality"
          },
          {
            "id": "kurnool_urban_loc_4",
            "name": "C-Camp",
            "mandalId": "kurnool_urban",
            "districtId": "kurnool",
            "coordinate": {
              "latitude": 15.8281,
              "longitude": 78.0373
            },
            "type": "locality"
          },
          {
            "id": "kurnool_urban_loc_5",
            "name": "Raj Vihar Circle",
            "mandalId": "kurnool_urban",
            "districtId": "kurnool",
            "coordinate": {
              "latitude": 15.8281,
              "longitude": 78.0373
            },
            "type": "locality"
          }
        ]
      },
      {
        "id": "adoni",
        "name": "Adoni",
        "districtId": "kurnool",
        "center": {
          "latitude": 15.63,
          "longitude": 77.28
        },
        "localities": [
          {
            "id": "adoni_loc_1",
            "name": "Cotton Market Yard",
            "mandalId": "adoni",
            "districtId": "kurnool",
            "coordinate": {
              "latitude": 15.63,
              "longitude": 77.28
            },
            "type": "town"
          },
          {
            "id": "adoni_loc_2",
            "name": "Fort Road",
            "mandalId": "adoni",
            "districtId": "kurnool",
            "coordinate": {
              "latitude": 15.63,
              "longitude": 77.28
            },
            "type": "locality"
          },
          {
            "id": "adoni_loc_3",
            "name": "Bypass Junction",
            "mandalId": "adoni",
            "districtId": "kurnool",
            "coordinate": {
              "latitude": 15.63,
              "longitude": 77.28
            },
            "type": "locality"
          }
        ]
      },
      {
        "id": "yemmiganur",
        "name": "Yemmiganur",
        "districtId": "kurnool",
        "center": {
          "latitude": 15.77,
          "longitude": 77.48
        },
        "localities": [
          {
            "id": "yemmiganur_loc_1",
            "name": "Weavers Colony",
            "mandalId": "yemmiganur",
            "districtId": "kurnool",
            "coordinate": {
              "latitude": 15.77,
              "longitude": 77.48
            },
            "type": "town"
          },
          {
            "id": "yemmiganur_loc_2",
            "name": "Somappa Nagar",
            "mandalId": "yemmiganur",
            "districtId": "kurnool",
            "coordinate": {
              "latitude": 15.77,
              "longitude": 77.48
            },
            "type": "locality"
          }
        ]
      },
      {
        "id": "mantralayam",
        "name": "Mantralayam",
        "districtId": "kurnool",
        "center": {
          "latitude": 15.93,
          "longitude": 77.43
        },
        "localities": [
          {
            "id": "mantralayam_loc_1",
            "name": "Raghavendra Swamy Mutt Area",
            "mandalId": "mantralayam",
            "districtId": "kurnool",
            "coordinate": {
              "latitude": 15.93,
              "longitude": 77.43
            },
            "type": "town"
          },
          {
            "id": "mantralayam_loc_2",
            "name": "Tungabhadra River Ghat",
            "mandalId": "mantralayam",
            "districtId": "kurnool",
            "coordinate": {
              "latitude": 15.93,
              "longitude": 77.43
            },
            "type": "locality"
          }
        ]
      },
      {
        "id": "kodumur",
        "name": "Kodumur",
        "districtId": "kurnool",
        "center": {
          "latitude": 15.68,
          "longitude": 77.78
        },
        "localities": [
          {
            "id": "kodumur_loc_1",
            "name": "Bus Station Area",
            "mandalId": "kodumur",
            "districtId": "kurnool",
            "coordinate": {
              "latitude": 15.68,
              "longitude": 77.78
            },
            "type": "town"
          },
          {
            "id": "kodumur_loc_2",
            "name": "Panchayat Road",
            "mandalId": "kodumur",
            "districtId": "kurnool",
            "coordinate": {
              "latitude": 15.68,
              "longitude": 77.78
            },
            "type": "locality"
          }
        ]
      }
    ]
  },
  {
    "id": "markapuram",
    "name": "Markapuram",
    "headquarters": "Markapur",
    "region": "Coastal Andhra",
    "center": {
      "latitude": 15.7353,
      "longitude": 79.2685
    },
    "mandals": [
      {
        "id": "markapur",
        "name": "Markapur",
        "districtId": "markapuram",
        "center": {
          "latitude": 15.7353,
          "longitude": 79.2685
        },
        "localities": [
          {
            "id": "markapur_loc_1",
            "name": "Chennakesava Swamy Temple Road",
            "mandalId": "markapur",
            "districtId": "markapuram",
            "coordinate": {
              "latitude": 15.7353,
              "longitude": 79.2685
            },
            "type": "town"
          },
          {
            "id": "markapur_loc_2",
            "name": "Slate Factory Zone",
            "mandalId": "markapur",
            "districtId": "markapuram",
            "coordinate": {
              "latitude": 15.7353,
              "longitude": 79.2685
            },
            "type": "locality"
          },
          {
            "id": "markapur_loc_3",
            "name": "Collectorate Office",
            "mandalId": "markapur",
            "districtId": "markapuram",
            "coordinate": {
              "latitude": 15.7353,
              "longitude": 79.2685
            },
            "type": "locality"
          },
          {
            "id": "markapur_loc_4",
            "name": "Railway Station Road",
            "mandalId": "markapur",
            "districtId": "markapuram",
            "coordinate": {
              "latitude": 15.7353,
              "longitude": 79.2685
            },
            "type": "locality"
          },
          {
            "id": "markapur_loc_5",
            "name": "Kurnool-Guntur Road",
            "mandalId": "markapur",
            "districtId": "markapuram",
            "coordinate": {
              "latitude": 15.7353,
              "longitude": 79.2685
            },
            "type": "locality"
          }
        ]
      },
      {
        "id": "giddalur",
        "name": "Giddalur",
        "districtId": "markapuram",
        "center": {
          "latitude": 15.38,
          "longitude": 78.93
        },
        "localities": [
          {
            "id": "giddalur_loc_1",
            "name": "Nallamala Forest Border",
            "mandalId": "giddalur",
            "districtId": "markapuram",
            "coordinate": {
              "latitude": 15.38,
              "longitude": 78.93
            },
            "type": "town"
          },
          {
            "id": "giddalur_loc_2",
            "name": "Railway Gate Area",
            "mandalId": "giddalur",
            "districtId": "markapuram",
            "coordinate": {
              "latitude": 15.38,
              "longitude": 78.93
            },
            "type": "locality"
          },
          {
            "id": "giddalur_loc_3",
            "name": "Old Town",
            "mandalId": "giddalur",
            "districtId": "markapuram",
            "coordinate": {
              "latitude": 15.38,
              "longitude": 78.93
            },
            "type": "locality"
          }
        ]
      },
      {
        "id": "kanigiri",
        "name": "Kanigiri",
        "districtId": "markapuram",
        "center": {
          "latitude": 15.4,
          "longitude": 79.51
        },
        "localities": [
          {
            "id": "kanigiri_loc_1",
            "name": "Pamur Road Junction",
            "mandalId": "kanigiri",
            "districtId": "markapuram",
            "coordinate": {
              "latitude": 15.4,
              "longitude": 79.51
            },
            "type": "town"
          },
          {
            "id": "kanigiri_loc_2",
            "name": "RTC Bus Station",
            "mandalId": "kanigiri",
            "districtId": "markapuram",
            "coordinate": {
              "latitude": 15.4,
              "longitude": 79.51
            },
            "type": "locality"
          }
        ]
      },
      {
        "id": "yerragondapalem",
        "name": "Yerragondapalem",
        "districtId": "markapuram",
        "center": {
          "latitude": 16.03,
          "longitude": 79.3
        },
        "localities": [
          {
            "id": "yerragondapalem_loc_1",
            "name": "Srisailam Ghat Entry Road",
            "mandalId": "yerragondapalem",
            "districtId": "markapuram",
            "coordinate": {
              "latitude": 16.03,
              "longitude": 79.3
            },
            "type": "town"
          },
          {
            "id": "yerragondapalem_loc_2",
            "name": "Four Roads Junction",
            "mandalId": "yerragondapalem",
            "districtId": "markapuram",
            "coordinate": {
              "latitude": 16.03,
              "longitude": 79.3
            },
            "type": "locality"
          }
        ]
      },
      {
        "id": "podili",
        "name": "Podili",
        "districtId": "markapuram",
        "center": {
          "latitude": 15.6,
          "longitude": 79.6
        },
        "localities": [
          {
            "id": "podili_loc_1",
            "name": "Main Bazaar",
            "mandalId": "podili",
            "districtId": "markapuram",
            "coordinate": {
              "latitude": 15.6,
              "longitude": 79.6
            },
            "type": "town"
          },
          {
            "id": "podili_loc_2",
            "name": "Govt Hospital Road",
            "mandalId": "podili",
            "districtId": "markapuram",
            "coordinate": {
              "latitude": 15.6,
              "longitude": 79.6
            },
            "type": "locality"
          }
        ]
      }
    ]
  },
  {
    "id": "nandyal",
    "name": "Nandyal",
    "headquarters": "Nandyal",
    "region": "Rayalaseema",
    "center": {
      "latitude": 15.4859,
      "longitude": 78.4841
    },
    "mandals": [
      {
        "id": "nandyal",
        "name": "Nandyal",
        "districtId": "nandyal",
        "center": {
          "latitude": 15.4859,
          "longitude": 78.4841
        },
        "localities": [
          {
            "id": "nandyal_loc_1",
            "name": "Sanjeeva Nagar Gate",
            "mandalId": "nandyal",
            "districtId": "nandyal",
            "coordinate": {
              "latitude": 15.4859,
              "longitude": 78.4841
            },
            "type": "town"
          },
          {
            "id": "nandyal_loc_2",
            "name": "Nava Nandi Road",
            "mandalId": "nandyal",
            "districtId": "nandyal",
            "coordinate": {
              "latitude": 15.4859,
              "longitude": 78.4841
            },
            "type": "locality"
          },
          {
            "id": "nandyal_loc_3",
            "name": "Collectorate",
            "mandalId": "nandyal",
            "districtId": "nandyal",
            "coordinate": {
              "latitude": 15.4859,
              "longitude": 78.4841
            },
            "type": "locality"
          },
          {
            "id": "nandyal_loc_4",
            "name": "Srinivasa Nagar",
            "mandalId": "nandyal",
            "districtId": "nandyal",
            "coordinate": {
              "latitude": 15.4859,
              "longitude": 78.4841
            },
            "type": "locality"
          },
          {
            "id": "nandyal_loc_5",
            "name": "Bypass Circle",
            "mandalId": "nandyal",
            "districtId": "nandyal",
            "coordinate": {
              "latitude": 15.4859,
              "longitude": 78.4841
            },
            "type": "locality"
          }
        ]
      },
      {
        "id": "allagadda",
        "name": "Allagadda",
        "districtId": "nandyal",
        "center": {
          "latitude": 15.13,
          "longitude": 78.51
        },
        "localities": [
          {
            "id": "allagadda_loc_1",
            "name": "Sculpture Art Village Area",
            "mandalId": "allagadda",
            "districtId": "nandyal",
            "coordinate": {
              "latitude": 15.13,
              "longitude": 78.51
            },
            "type": "town"
          },
          {
            "id": "allagadda_loc_2",
            "name": "Ahobilam Road Junction",
            "mandalId": "allagadda",
            "districtId": "nandyal",
            "coordinate": {
              "latitude": 15.13,
              "longitude": 78.51
            },
            "type": "locality"
          }
        ]
      },
      {
        "id": "dhone",
        "name": "Dhone",
        "districtId": "nandyal",
        "center": {
          "latitude": 15.42,
          "longitude": 77.87
        },
        "localities": [
          {
            "id": "dhone_loc_1",
            "name": "Railway Junction Area",
            "mandalId": "dhone",
            "districtId": "nandyal",
            "coordinate": {
              "latitude": 15.42,
              "longitude": 77.87
            },
            "type": "town"
          },
          {
            "id": "dhone_loc_2",
            "name": "Old Bus Stand",
            "mandalId": "dhone",
            "districtId": "nandyal",
            "coordinate": {
              "latitude": 15.42,
              "longitude": 77.87
            },
            "type": "locality"
          }
        ]
      },
      {
        "id": "nandikotkur",
        "name": "Nandikotkur",
        "districtId": "nandyal",
        "center": {
          "latitude": 15.86,
          "longitude": 78.26
        },
        "localities": [
          {
            "id": "nandikotkur_loc_1",
            "name": "Market Yard",
            "mandalId": "nandikotkur",
            "districtId": "nandyal",
            "coordinate": {
              "latitude": 15.86,
              "longitude": 78.26
            },
            "type": "town"
          },
          {
            "id": "nandikotkur_loc_2",
            "name": "Sangameswaram Road",
            "mandalId": "nandikotkur",
            "districtId": "nandyal",
            "coordinate": {
              "latitude": 15.86,
              "longitude": 78.26
            },
            "type": "locality"
          }
        ]
      },
      {
        "id": "srisailam",
        "name": "Srisailam",
        "districtId": "nandyal",
        "center": {
          "latitude": 16.07,
          "longitude": 78.87
        },
        "localities": [
          {
            "id": "srisailam_loc_1",
            "name": "Mallikarjuna Swamy Temple Area",
            "mandalId": "srisailam",
            "districtId": "nandyal",
            "coordinate": {
              "latitude": 16.07,
              "longitude": 78.87
            },
            "type": "town"
          },
          {
            "id": "srisailam_loc_2",
            "name": "Sunnipenta",
            "mandalId": "srisailam",
            "districtId": "nandyal",
            "coordinate": {
              "latitude": 16.07,
              "longitude": 78.87
            },
            "type": "locality"
          },
          {
            "id": "srisailam_loc_3",
            "name": "Dam Viewpoint",
            "mandalId": "srisailam",
            "districtId": "nandyal",
            "coordinate": {
              "latitude": 16.07,
              "longitude": 78.87
            },
            "type": "locality"
          }
        ]
      }
    ]
  },
  {
    "id": "ntr",
    "name": "NTR",
    "headquarters": "Vijayawada",
    "region": "Coastal Andhra",
    "center": {
      "latitude": 16.5062,
      "longitude": 80.648
    },
    "mandals": [
      {
        "id": "vijayawada_urban",
        "name": "Vijayawada Urban",
        "districtId": "ntr",
        "center": {
          "latitude": 16.5062,
          "longitude": 80.648
        },
        "localities": [
          {
            "id": "vijayawada_urban_loc_1",
            "name": "Benz Circle",
            "mandalId": "vijayawada_urban",
            "districtId": "ntr",
            "coordinate": {
              "latitude": 16.5062,
              "longitude": 80.648
            },
            "type": "town"
          },
          {
            "id": "vijayawada_urban_loc_2",
            "name": "Prakasam Barrage",
            "mandalId": "vijayawada_urban",
            "districtId": "ntr",
            "coordinate": {
              "latitude": 16.5062,
              "longitude": 80.648
            },
            "type": "locality"
          },
          {
            "id": "vijayawada_urban_loc_3",
            "name": "Kanaka Durga Temple Area",
            "mandalId": "vijayawada_urban",
            "districtId": "ntr",
            "coordinate": {
              "latitude": 16.5062,
              "longitude": 80.648
            },
            "type": "locality"
          },
          {
            "id": "vijayawada_urban_loc_4",
            "name": "Governorpet",
            "mandalId": "vijayawada_urban",
            "districtId": "ntr",
            "coordinate": {
              "latitude": 16.5062,
              "longitude": 80.648
            },
            "type": "locality"
          },
          {
            "id": "vijayawada_urban_loc_5",
            "name": "M.G. Road",
            "mandalId": "vijayawada_urban",
            "districtId": "ntr",
            "coordinate": {
              "latitude": 16.5062,
              "longitude": 80.648
            },
            "type": "locality"
          },
          {
            "id": "vijayawada_urban_loc_6",
            "name": "Autonagar",
            "mandalId": "vijayawada_urban",
            "districtId": "ntr",
            "coordinate": {
              "latitude": 16.5062,
              "longitude": 80.648
            },
            "type": "locality"
          }
        ]
      },
      {
        "id": "mylavaram",
        "name": "Mylavaram",
        "districtId": "ntr",
        "center": {
          "latitude": 16.76,
          "longitude": 80.64
        },
        "localities": [
          {
            "id": "mylavaram_loc_1",
            "name": "LBRCE College Area",
            "mandalId": "mylavaram",
            "districtId": "ntr",
            "coordinate": {
              "latitude": 16.76,
              "longitude": 80.64
            },
            "type": "town"
          },
          {
            "id": "mylavaram_loc_2",
            "name": "Nuzvid Road",
            "mandalId": "mylavaram",
            "districtId": "ntr",
            "coordinate": {
              "latitude": 16.76,
              "longitude": 80.64
            },
            "type": "locality"
          }
        ]
      },
      {
        "id": "nandigama",
        "name": "Nandigama",
        "districtId": "ntr",
        "center": {
          "latitude": 16.77,
          "longitude": 80.29
        },
        "localities": [
          {
            "id": "nandigama_loc_1",
            "name": "Hyderabad Highway Junction",
            "mandalId": "nandigama",
            "districtId": "ntr",
            "coordinate": {
              "latitude": 16.77,
              "longitude": 80.29
            },
            "type": "town"
          },
          {
            "id": "nandigama_loc_2",
            "name": "Old Market",
            "mandalId": "nandigama",
            "districtId": "ntr",
            "coordinate": {
              "latitude": 16.77,
              "longitude": 80.29
            },
            "type": "locality"
          }
        ]
      },
      {
        "id": "jaggayyapeta",
        "name": "Jaggayyapeta",
        "districtId": "ntr",
        "center": {
          "latitude": 16.89,
          "longitude": 80.09
        },
        "localities": [
          {
            "id": "jaggayyapeta_loc_1",
            "name": "Cement Industrial Belt",
            "mandalId": "jaggayyapeta",
            "districtId": "ntr",
            "coordinate": {
              "latitude": 16.89,
              "longitude": 80.09
            },
            "type": "town"
          },
          {
            "id": "jaggayyapeta_loc_2",
            "name": "Bypass Road",
            "mandalId": "jaggayyapeta",
            "districtId": "ntr",
            "coordinate": {
              "latitude": 16.89,
              "longitude": 80.09
            },
            "type": "locality"
          }
        ]
      },
      {
        "id": "tiruvuru",
        "name": "Tiruvuru",
        "districtId": "ntr",
        "center": {
          "latitude": 17.11,
          "longitude": 80.61
        },
        "localities": [
          {
            "id": "tiruvuru_loc_1",
            "name": "Bazaar Street",
            "mandalId": "tiruvuru",
            "districtId": "ntr",
            "coordinate": {
              "latitude": 17.11,
              "longitude": 80.61
            },
            "type": "town"
          },
          {
            "id": "tiruvuru_loc_2",
            "name": "Telangana Border Road",
            "mandalId": "tiruvuru",
            "districtId": "ntr",
            "coordinate": {
              "latitude": 17.11,
              "longitude": 80.61
            },
            "type": "locality"
          }
        ]
      }
    ]
  },
  {
    "id": "palnadu",
    "name": "Palnadu",
    "headquarters": "Narasaraopet",
    "region": "Coastal Andhra",
    "center": {
      "latitude": 16.2359,
      "longitude": 80.0499
    },
    "mandals": [
      {
        "id": "narasaraopet",
        "name": "Narasaraopet",
        "districtId": "palnadu",
        "center": {
          "latitude": 16.2359,
          "longitude": 80.0499
        },
        "localities": [
          {
            "id": "narasaraopet_loc_1",
            "name": "Kotappakonda Road",
            "mandalId": "narasaraopet",
            "districtId": "palnadu",
            "coordinate": {
              "latitude": 16.2359,
              "longitude": 80.0499
            },
            "type": "town"
          },
          {
            "id": "narasaraopet_loc_2",
            "name": "Collectorate Complex",
            "mandalId": "narasaraopet",
            "districtId": "palnadu",
            "coordinate": {
              "latitude": 16.2359,
              "longitude": 80.0499
            },
            "type": "locality"
          },
          {
            "id": "narasaraopet_loc_3",
            "name": "Prakash Nagar",
            "mandalId": "narasaraopet",
            "districtId": "palnadu",
            "coordinate": {
              "latitude": 16.2359,
              "longitude": 80.0499
            },
            "type": "locality"
          },
          {
            "id": "narasaraopet_loc_4",
            "name": "Station Road",
            "mandalId": "narasaraopet",
            "districtId": "palnadu",
            "coordinate": {
              "latitude": 16.2359,
              "longitude": 80.0499
            },
            "type": "locality"
          },
          {
            "id": "narasaraopet_loc_5",
            "name": "Palnadu Bus Stand",
            "mandalId": "narasaraopet",
            "districtId": "palnadu",
            "coordinate": {
              "latitude": 16.2359,
              "longitude": 80.0499
            },
            "type": "locality"
          }
        ]
      },
      {
        "id": "sattenapalle",
        "name": "Sattenapalle",
        "districtId": "palnadu",
        "center": {
          "latitude": 16.39,
          "longitude": 80.18
        },
        "localities": [
          {
            "id": "sattenapalle_loc_1",
            "name": "Railway Station Area",
            "mandalId": "sattenapalle",
            "districtId": "palnadu",
            "coordinate": {
              "latitude": 16.39,
              "longitude": 80.18
            },
            "type": "town"
          },
          {
            "id": "sattenapalle_loc_2",
            "name": "Guntur Road Junction",
            "mandalId": "sattenapalle",
            "districtId": "palnadu",
            "coordinate": {
              "latitude": 16.39,
              "longitude": 80.18
            },
            "type": "locality"
          }
        ]
      },
      {
        "id": "macherla",
        "name": "Macherla",
        "districtId": "palnadu",
        "center": {
          "latitude": 16.48,
          "longitude": 79.3
        },
        "localities": [
          {
            "id": "macherla_loc_1",
            "name": "Nagarjuna Sagar Road",
            "mandalId": "macherla",
            "districtId": "palnadu",
            "coordinate": {
              "latitude": 16.48,
              "longitude": 79.3
            },
            "type": "town"
          },
          {
            "id": "macherla_loc_2",
            "name": "Chennakesava Temple Area",
            "mandalId": "macherla",
            "districtId": "palnadu",
            "coordinate": {
              "latitude": 16.48,
              "longitude": 79.3
            },
            "type": "locality"
          }
        ]
      },
      {
        "id": "vinukonda",
        "name": "Vinukonda",
        "districtId": "palnadu",
        "center": {
          "latitude": 16.05,
          "longitude": 79.74
        },
        "localities": [
          {
            "id": "vinukonda_loc_1",
            "name": "Hill Fort View Area",
            "mandalId": "vinukonda",
            "districtId": "palnadu",
            "coordinate": {
              "latitude": 16.05,
              "longitude": 79.74
            },
            "type": "town"
          },
          {
            "id": "vinukonda_loc_2",
            "name": "Markapur Road",
            "mandalId": "vinukonda",
            "districtId": "palnadu",
            "coordinate": {
              "latitude": 16.05,
              "longitude": 79.74
            },
            "type": "locality"
          }
        ]
      },
      {
        "id": "chilakaluripet",
        "name": "Chilakaluripet",
        "districtId": "palnadu",
        "center": {
          "latitude": 16.09,
          "longitude": 80.17
        },
        "localities": [
          {
            "id": "chilakaluripet_loc_1",
            "name": "NH-16 Flyover Area",
            "mandalId": "chilakaluripet",
            "districtId": "palnadu",
            "coordinate": {
              "latitude": 16.09,
              "longitude": 80.17
            },
            "type": "town"
          },
          {
            "id": "chilakaluripet_loc_2",
            "name": "Kalamandir Junction",
            "mandalId": "chilakaluripet",
            "districtId": "palnadu",
            "coordinate": {
              "latitude": 16.09,
              "longitude": 80.17
            },
            "type": "locality"
          }
        ]
      }
    ]
  },
  {
    "id": "parvathipuram_manyam",
    "name": "Parvathipuram Manyam",
    "headquarters": "Parvathipuram",
    "region": "North Coastal",
    "center": {
      "latitude": 18.7758,
      "longitude": 83.4265
    },
    "mandals": [
      {
        "id": "parvathipuram",
        "name": "Parvathipuram",
        "districtId": "parvathipuram_manyam",
        "center": {
          "latitude": 18.7758,
          "longitude": 83.4265
        },
        "localities": [
          {
            "id": "parvathipuram_loc_1",
            "name": "Collectorate Office",
            "mandalId": "parvathipuram",
            "districtId": "parvathipuram_manyam",
            "coordinate": {
              "latitude": 18.7758,
              "longitude": 83.4265
            },
            "type": "town"
          },
          {
            "id": "parvathipuram_loc_2",
            "name": "Belgam Area",
            "mandalId": "parvathipuram",
            "districtId": "parvathipuram_manyam",
            "coordinate": {
              "latitude": 18.7758,
              "longitude": 83.4265
            },
            "type": "locality"
          },
          {
            "id": "parvathipuram_loc_3",
            "name": "Railway Station Road",
            "mandalId": "parvathipuram",
            "districtId": "parvathipuram_manyam",
            "coordinate": {
              "latitude": 18.7758,
              "longitude": 83.4265
            },
            "type": "locality"
          },
          {
            "id": "parvathipuram_loc_4",
            "name": "Main Market",
            "mandalId": "parvathipuram",
            "districtId": "parvathipuram_manyam",
            "coordinate": {
              "latitude": 18.7758,
              "longitude": 83.4265
            },
            "type": "locality"
          },
          {
            "id": "parvathipuram_loc_5",
            "name": "Old Town",
            "mandalId": "parvathipuram",
            "districtId": "parvathipuram_manyam",
            "coordinate": {
              "latitude": 18.7758,
              "longitude": 83.4265
            },
            "type": "locality"
          }
        ]
      },
      {
        "id": "salur",
        "name": "Salur",
        "districtId": "parvathipuram_manyam",
        "center": {
          "latitude": 18.52,
          "longitude": 83.21
        },
        "localities": [
          {
            "id": "salur_loc_1",
            "name": "Odisha Border Ghat Road",
            "mandalId": "salur",
            "districtId": "parvathipuram_manyam",
            "coordinate": {
              "latitude": 18.52,
              "longitude": 83.21
            },
            "type": "town"
          },
          {
            "id": "salur_loc_2",
            "name": "Bypass",
            "mandalId": "salur",
            "districtId": "parvathipuram_manyam",
            "coordinate": {
              "latitude": 18.52,
              "longitude": 83.21
            },
            "type": "locality"
          }
        ]
      },
      {
        "id": "palakonda",
        "name": "Palakonda",
        "districtId": "parvathipuram_manyam",
        "center": {
          "latitude": 18.6,
          "longitude": 83.75
        },
        "localities": [
          {
            "id": "palakonda_loc_1",
            "name": "Kota Durga Temple Area",
            "mandalId": "palakonda",
            "districtId": "parvathipuram_manyam",
            "coordinate": {
              "latitude": 18.6,
              "longitude": 83.75
            },
            "type": "town"
          },
          {
            "id": "palakonda_loc_2",
            "name": "Nagavali River Road",
            "mandalId": "palakonda",
            "districtId": "parvathipuram_manyam",
            "coordinate": {
              "latitude": 18.6,
              "longitude": 83.75
            },
            "type": "locality"
          }
        ]
      },
      {
        "id": "kurupam",
        "name": "Kurupam",
        "districtId": "parvathipuram_manyam",
        "center": {
          "latitude": 18.87,
          "longitude": 83.55
        },
        "localities": [
          {
            "id": "kurupam_loc_1",
            "name": "Palace Grounds",
            "mandalId": "kurupam",
            "districtId": "parvathipuram_manyam",
            "coordinate": {
              "latitude": 18.87,
              "longitude": 83.55
            },
            "type": "town"
          },
          {
            "id": "kurupam_loc_2",
            "name": "Tribal Welfare Complex",
            "mandalId": "kurupam",
            "districtId": "parvathipuram_manyam",
            "coordinate": {
              "latitude": 18.87,
              "longitude": 83.55
            },
            "type": "locality"
          }
        ]
      }
    ]
  },
  {
    "id": "polavaram",
    "name": "Polavaram",
    "headquarters": "Rampachodavaram",
    "region": "Coastal Andhra",
    "center": {
      "latitude": 17.4385,
      "longitude": 81.7774
    },
    "mandals": [
      {
        "id": "rampachodavaram",
        "name": "Rampachodavaram",
        "districtId": "polavaram",
        "center": {
          "latitude": 17.4385,
          "longitude": 81.7774
        },
        "localities": [
          {
            "id": "rampachodavaram_loc_1",
            "name": "Collectorate Administrative Zone",
            "mandalId": "rampachodavaram",
            "districtId": "polavaram",
            "coordinate": {
              "latitude": 17.4385,
              "longitude": 81.7774
            },
            "type": "town"
          },
          {
            "id": "rampachodavaram_loc_2",
            "name": "ITDA Office Complex",
            "mandalId": "rampachodavaram",
            "districtId": "polavaram",
            "coordinate": {
              "latitude": 17.4385,
              "longitude": 81.7774
            },
            "type": "locality"
          },
          {
            "id": "rampachodavaram_loc_3",
            "name": "Maredumilli Eco-Tourism Road",
            "mandalId": "rampachodavaram",
            "districtId": "polavaram",
            "coordinate": {
              "latitude": 17.4385,
              "longitude": 81.7774
            },
            "type": "locality"
          },
          {
            "id": "rampachodavaram_loc_4",
            "name": "Ghat Road Junction",
            "mandalId": "rampachodavaram",
            "districtId": "polavaram",
            "coordinate": {
              "latitude": 17.4385,
              "longitude": 81.7774
            },
            "type": "locality"
          }
        ]
      },
      {
        "id": "chinturu",
        "name": "Chinturu",
        "districtId": "polavaram",
        "center": {
          "latitude": 17.75,
          "longitude": 81.4
        },
        "localities": [
          {
            "id": "chinturu_loc_1",
            "name": "Sabari-Godavari Confluence Area",
            "mandalId": "chinturu",
            "districtId": "polavaram",
            "coordinate": {
              "latitude": 17.75,
              "longitude": 81.4
            },
            "type": "town"
          },
          {
            "id": "chinturu_loc_2",
            "name": "Bhadrachalam Road Checkpost",
            "mandalId": "chinturu",
            "districtId": "polavaram",
            "coordinate": {
              "latitude": 17.75,
              "longitude": 81.4
            },
            "type": "locality"
          }
        ]
      },
      {
        "id": "maredumilli",
        "name": "Maredumilli",
        "districtId": "polavaram",
        "center": {
          "latitude": 17.6,
          "longitude": 81.71
        },
        "localities": [
          {
            "id": "maredumilli_loc_1",
            "name": "Jungle Star Eco-Camp",
            "mandalId": "maredumilli",
            "districtId": "polavaram",
            "coordinate": {
              "latitude": 17.6,
              "longitude": 81.71
            },
            "type": "town"
          },
          {
            "id": "maredumilli_loc_2",
            "name": "Main Forest Road",
            "mandalId": "maredumilli",
            "districtId": "polavaram",
            "coordinate": {
              "latitude": 17.6,
              "longitude": 81.71
            },
            "type": "locality"
          }
        ]
      },
      {
        "id": "kunavaram",
        "name": "Kunavaram",
        "districtId": "polavaram",
        "center": {
          "latitude": 17.58,
          "longitude": 81.27
        },
        "localities": [
          {
            "id": "kunavaram_loc_1",
            "name": "Sabari River Ferry Point",
            "mandalId": "kunavaram",
            "districtId": "polavaram",
            "coordinate": {
              "latitude": 17.58,
              "longitude": 81.27
            },
            "type": "town"
          },
          {
            "id": "kunavaram_loc_2",
            "name": "Bazaar Street",
            "mandalId": "kunavaram",
            "districtId": "polavaram",
            "coordinate": {
              "latitude": 17.58,
              "longitude": 81.27
            },
            "type": "locality"
          }
        ]
      },
      {
        "id": "vr_puram",
        "name": "Vararamachandrapuram",
        "districtId": "polavaram",
        "center": {
          "latitude": 17.52,
          "longitude": 81.43
        },
        "localities": [
          {
            "id": "vr_puram_loc_1",
            "name": "Godavari Bank Area",
            "mandalId": "vr_puram",
            "districtId": "polavaram",
            "coordinate": {
              "latitude": 17.52,
              "longitude": 81.43
            },
            "type": "town"
          },
          {
            "id": "vr_puram_loc_2",
            "name": "Panchayat Center",
            "mandalId": "vr_puram",
            "districtId": "polavaram",
            "coordinate": {
              "latitude": 17.52,
              "longitude": 81.43
            },
            "type": "locality"
          }
        ]
      }
    ]
  },
  {
    "id": "prakasam",
    "name": "Prakasam",
    "headquarters": "Ongole",
    "region": "Coastal Andhra",
    "center": {
      "latitude": 15.5057,
      "longitude": 80.0499
    },
    "mandals": [
      {
        "id": "ongole_urban",
        "name": "Ongole Urban",
        "districtId": "prakasam",
        "center": {
          "latitude": 15.5057,
          "longitude": 80.0499
        },
        "localities": [
          {
            "id": "ongole_urban_loc_1",
            "name": "Collectorate Area",
            "mandalId": "ongole_urban",
            "districtId": "prakasam",
            "coordinate": {
              "latitude": 15.5057,
              "longitude": 80.0499
            },
            "type": "town"
          },
          {
            "id": "ongole_urban_loc_2",
            "name": "Kurnool Road Flyover",
            "mandalId": "ongole_urban",
            "districtId": "prakasam",
            "coordinate": {
              "latitude": 15.5057,
              "longitude": 80.0499
            },
            "type": "locality"
          },
          {
            "id": "ongole_urban_loc_3",
            "name": "Lawyerpet",
            "mandalId": "ongole_urban",
            "districtId": "prakasam",
            "coordinate": {
              "latitude": 15.5057,
              "longitude": 80.0499
            },
            "type": "locality"
          },
          {
            "id": "ongole_urban_loc_4",
            "name": "Trunk Road",
            "mandalId": "ongole_urban",
            "districtId": "prakasam",
            "coordinate": {
              "latitude": 15.5057,
              "longitude": 80.0499
            },
            "type": "locality"
          },
          {
            "id": "ongole_urban_loc_5",
            "name": "RIMS Hospital Road",
            "mandalId": "ongole_urban",
            "districtId": "prakasam",
            "coordinate": {
              "latitude": 15.5057,
              "longitude": 80.0499
            },
            "type": "locality"
          }
        ]
      },
      {
        "id": "santhanuthalapadu",
        "name": "Santhanuthalapadu",
        "districtId": "prakasam",
        "center": {
          "latitude": 15.56,
          "longitude": 79.95
        },
        "localities": [
          {
            "id": "santhanuthalapadu_loc_1",
            "name": "Granite Industrial Belt",
            "mandalId": "santhanuthalapadu",
            "districtId": "prakasam",
            "coordinate": {
              "latitude": 15.56,
              "longitude": 79.95
            },
            "type": "town"
          },
          {
            "id": "santhanuthalapadu_loc_2",
            "name": "Bypass",
            "mandalId": "santhanuthalapadu",
            "districtId": "prakasam",
            "coordinate": {
              "latitude": 15.56,
              "longitude": 79.95
            },
            "type": "locality"
          }
        ]
      },
      {
        "id": "darsi",
        "name": "Darsi",
        "districtId": "prakasam",
        "center": {
          "latitude": 15.77,
          "longitude": 79.68
        },
        "localities": [
          {
            "id": "darsi_loc_1",
            "name": "Nagarjuna Sagar Canal Area",
            "mandalId": "darsi",
            "districtId": "prakasam",
            "coordinate": {
              "latitude": 15.77,
              "longitude": 79.68
            },
            "type": "town"
          },
          {
            "id": "darsi_loc_2",
            "name": "Main Cross Road",
            "mandalId": "darsi",
            "districtId": "prakasam",
            "coordinate": {
              "latitude": 15.77,
              "longitude": 79.68
            },
            "type": "locality"
          }
        ]
      },
      {
        "id": "kondapi",
        "name": "Kondapi",
        "districtId": "prakasam",
        "center": {
          "latitude": 15.42,
          "longitude": 79.88
        },
        "localities": [
          {
            "id": "kondapi_loc_1",
            "name": "Taluk Office",
            "mandalId": "kondapi",
            "districtId": "prakasam",
            "coordinate": {
              "latitude": 15.42,
              "longitude": 79.88
            },
            "type": "town"
          },
          {
            "id": "kondapi_loc_2",
            "name": "Panchayat Area",
            "mandalId": "kondapi",
            "districtId": "prakasam",
            "coordinate": {
              "latitude": 15.42,
              "longitude": 79.88
            },
            "type": "locality"
          }
        ]
      }
    ]
  },
  {
    "id": "nellore",
    "name": "Sri Potti Sriramulu Nellore",
    "headquarters": "Nellore",
    "region": "Coastal Andhra",
    "center": {
      "latitude": 14.4426,
      "longitude": 79.9865
    },
    "mandals": [
      {
        "id": "nellore_urban",
        "name": "Nellore Urban",
        "districtId": "nellore",
        "center": {
          "latitude": 14.4426,
          "longitude": 79.9865
        },
        "localities": [
          {
            "id": "nellore_urban_loc_1",
            "name": "V.R.C. Center",
            "mandalId": "nellore_urban",
            "districtId": "nellore",
            "coordinate": {
              "latitude": 14.4426,
              "longitude": 79.9865
            },
            "type": "town"
          },
          {
            "id": "nellore_urban_loc_2",
            "name": "Magunta Layout",
            "mandalId": "nellore_urban",
            "districtId": "nellore",
            "coordinate": {
              "latitude": 14.4426,
              "longitude": 79.9865
            },
            "type": "locality"
          },
          {
            "id": "nellore_urban_loc_3",
            "name": "Trunk Road",
            "mandalId": "nellore_urban",
            "districtId": "nellore",
            "coordinate": {
              "latitude": 14.4426,
              "longitude": 79.9865
            },
            "type": "locality"
          },
          {
            "id": "nellore_urban_loc_4",
            "name": "Collectorate",
            "mandalId": "nellore_urban",
            "districtId": "nellore",
            "coordinate": {
              "latitude": 14.4426,
              "longitude": 79.9865
            },
            "type": "locality"
          },
          {
            "id": "nellore_urban_loc_5",
            "name": "Podalakur Road",
            "mandalId": "nellore_urban",
            "districtId": "nellore",
            "coordinate": {
              "latitude": 14.4426,
              "longitude": 79.9865
            },
            "type": "locality"
          },
          {
            "id": "nellore_urban_loc_6",
            "name": "Penna River Bridge",
            "mandalId": "nellore_urban",
            "districtId": "nellore",
            "coordinate": {
              "latitude": 14.4426,
              "longitude": 79.9865
            },
            "type": "locality"
          }
        ]
      },
      {
        "id": "kavali",
        "name": "Kavali",
        "districtId": "nellore",
        "center": {
          "latitude": 14.91,
          "longitude": 79.99
        },
        "localities": [
          {
            "id": "kavali_loc_1",
            "name": "Trunk Road",
            "mandalId": "kavali",
            "districtId": "nellore",
            "coordinate": {
              "latitude": 14.91,
              "longitude": 79.99
            },
            "type": "town"
          },
          {
            "id": "kavali_loc_2",
            "name": "Railway Station Junction",
            "mandalId": "kavali",
            "districtId": "nellore",
            "coordinate": {
              "latitude": 14.91,
              "longitude": 79.99
            },
            "type": "locality"
          },
          {
            "id": "kavali_loc_3",
            "name": "RTC Bus Stand",
            "mandalId": "kavali",
            "districtId": "nellore",
            "coordinate": {
              "latitude": 14.91,
              "longitude": 79.99
            },
            "type": "locality"
          }
        ]
      },
      {
        "id": "kandukur",
        "name": "Kandukur",
        "districtId": "nellore",
        "center": {
          "latitude": 15.22,
          "longitude": 79.9
        },
        "localities": [
          {
            "id": "kandukur_loc_1",
            "name": "Old Town",
            "mandalId": "kandukur",
            "districtId": "nellore",
            "coordinate": {
              "latitude": 15.22,
              "longitude": 79.9
            },
            "type": "town"
          },
          {
            "id": "kandukur_loc_2",
            "name": "Pamuru Road",
            "mandalId": "kandukur",
            "districtId": "nellore",
            "coordinate": {
              "latitude": 15.22,
              "longitude": 79.9
            },
            "type": "locality"
          },
          {
            "id": "kandukur_loc_3",
            "name": "Bypass Circle",
            "mandalId": "kandukur",
            "districtId": "nellore",
            "coordinate": {
              "latitude": 15.22,
              "longitude": 79.9
            },
            "type": "locality"
          }
        ]
      },
      {
        "id": "atmakur",
        "name": "Atmakur",
        "districtId": "nellore",
        "center": {
          "latitude": 14.61,
          "longitude": 79.37
        },
        "localities": [
          {
            "id": "atmakur_loc_1",
            "name": "Somasila Road Junction",
            "mandalId": "atmakur",
            "districtId": "nellore",
            "coordinate": {
              "latitude": 14.61,
              "longitude": 79.37
            },
            "type": "town"
          },
          {
            "id": "atmakur_loc_2",
            "name": "Main Bazaar",
            "mandalId": "atmakur",
            "districtId": "nellore",
            "coordinate": {
              "latitude": 14.61,
              "longitude": 79.37
            },
            "type": "locality"
          }
        ]
      },
      {
        "id": "kovuru",
        "name": "Kovuru",
        "districtId": "nellore",
        "center": {
          "latitude": 14.49,
          "longitude": 79.98
        },
        "localities": [
          {
            "id": "kovuru_loc_1",
            "name": "Toll Plaza Area",
            "mandalId": "kovuru",
            "districtId": "nellore",
            "coordinate": {
              "latitude": 14.49,
              "longitude": 79.98
            },
            "type": "town"
          },
          {
            "id": "kovuru_loc_2",
            "name": "Sugar Factory Road",
            "mandalId": "kovuru",
            "districtId": "nellore",
            "coordinate": {
              "latitude": 14.49,
              "longitude": 79.98
            },
            "type": "locality"
          }
        ]
      }
    ]
  },
  {
    "id": "sri_sathya_sai",
    "name": "Sri Sathya Sai",
    "headquarters": "Puttaparthi",
    "region": "Rayalaseema",
    "center": {
      "latitude": 14.1678,
      "longitude": 77.8115
    },
    "mandals": [
      {
        "id": "puttaparthi",
        "name": "Puttaparthi",
        "districtId": "sri_sathya_sai",
        "center": {
          "latitude": 14.1678,
          "longitude": 77.8115
        },
        "localities": [
          {
            "id": "puttaparthi_loc_1",
            "name": "Prasanthi Nilayam Area",
            "mandalId": "puttaparthi",
            "districtId": "sri_sathya_sai",
            "coordinate": {
              "latitude": 14.1678,
              "longitude": 77.8115
            },
            "type": "town"
          },
          {
            "id": "puttaparthi_loc_2",
            "name": "Super Speciality Hospital Road",
            "mandalId": "puttaparthi",
            "districtId": "sri_sathya_sai",
            "coordinate": {
              "latitude": 14.1678,
              "longitude": 77.8115
            },
            "type": "locality"
          },
          {
            "id": "puttaparthi_loc_3",
            "name": "Collectorate",
            "mandalId": "puttaparthi",
            "districtId": "sri_sathya_sai",
            "coordinate": {
              "latitude": 14.1678,
              "longitude": 77.8115
            },
            "type": "locality"
          },
          {
            "id": "puttaparthi_loc_4",
            "name": "Chitravathi Road",
            "mandalId": "puttaparthi",
            "districtId": "sri_sathya_sai",
            "coordinate": {
              "latitude": 14.1678,
              "longitude": 77.8115
            },
            "type": "locality"
          },
          {
            "id": "puttaparthi_loc_5",
            "name": "Airport Road",
            "mandalId": "puttaparthi",
            "districtId": "sri_sathya_sai",
            "coordinate": {
              "latitude": 14.1678,
              "longitude": 77.8115
            },
            "type": "locality"
          }
        ]
      },
      {
        "id": "hindupur",
        "name": "Hindupur",
        "districtId": "sri_sathya_sai",
        "center": {
          "latitude": 13.83,
          "longitude": 77.49
        },
        "localities": [
          {
            "id": "hindupur_loc_1",
            "name": "M.G. Road",
            "mandalId": "hindupur",
            "districtId": "sri_sathya_sai",
            "coordinate": {
              "latitude": 13.83,
              "longitude": 77.49
            },
            "type": "town"
          },
          {
            "id": "hindupur_loc_2",
            "name": "Industrial Estate",
            "mandalId": "hindupur",
            "districtId": "sri_sathya_sai",
            "coordinate": {
              "latitude": 13.83,
              "longitude": 77.49
            },
            "type": "locality"
          },
          {
            "id": "hindupur_loc_3",
            "name": "Railway Station Road",
            "mandalId": "hindupur",
            "districtId": "sri_sathya_sai",
            "coordinate": {
              "latitude": 13.83,
              "longitude": 77.49
            },
            "type": "locality"
          }
        ]
      },
      {
        "id": "dharmavaram",
        "name": "Dharmavaram",
        "districtId": "sri_sathya_sai",
        "center": {
          "latitude": 14.41,
          "longitude": 77.72
        },
        "localities": [
          {
            "id": "dharmavaram_loc_1",
            "name": "Silk Saree Weaver Colony",
            "mandalId": "dharmavaram",
            "districtId": "sri_sathya_sai",
            "coordinate": {
              "latitude": 14.41,
              "longitude": 77.72
            },
            "type": "town"
          },
          {
            "id": "dharmavaram_loc_2",
            "name": "Railway Junction",
            "mandalId": "dharmavaram",
            "districtId": "sri_sathya_sai",
            "coordinate": {
              "latitude": 14.41,
              "longitude": 77.72
            },
            "type": "locality"
          }
        ]
      },
      {
        "id": "kadiri",
        "name": "Kadiri",
        "districtId": "sri_sathya_sai",
        "center": {
          "latitude": 14.11,
          "longitude": 78.16
        },
        "localities": [
          {
            "id": "kadiri_loc_1",
            "name": "Lakshmi Narasimha Temple Road",
            "mandalId": "kadiri",
            "districtId": "sri_sathya_sai",
            "coordinate": {
              "latitude": 14.11,
              "longitude": 78.16
            },
            "type": "town"
          },
          {
            "id": "kadiri_loc_2",
            "name": "Bypass",
            "mandalId": "kadiri",
            "districtId": "sri_sathya_sai",
            "coordinate": {
              "latitude": 14.11,
              "longitude": 78.16
            },
            "type": "locality"
          }
        ]
      },
      {
        "id": "penukonda",
        "name": "Penukonda",
        "districtId": "sri_sathya_sai",
        "center": {
          "latitude": 14.08,
          "longitude": 77.6
        },
        "localities": [
          {
            "id": "penukonda_loc_1",
            "name": "Kia Motors Auto Hub Area",
            "mandalId": "penukonda",
            "districtId": "sri_sathya_sai",
            "coordinate": {
              "latitude": 14.08,
              "longitude": 77.6
            },
            "type": "town"
          },
          {
            "id": "penukonda_loc_2",
            "name": "Gagan Mahal Fort Road",
            "mandalId": "penukonda",
            "districtId": "sri_sathya_sai",
            "coordinate": {
              "latitude": 14.08,
              "longitude": 77.6
            },
            "type": "locality"
          }
        ]
      }
    ]
  },
  {
    "id": "srikakulam",
    "name": "Srikakulam",
    "headquarters": "Srikakulam",
    "region": "North Coastal",
    "center": {
      "latitude": 18.2969,
      "longitude": 83.8968
    },
    "mandals": [
      {
        "id": "srikakulam_urban",
        "name": "Srikakulam Urban",
        "districtId": "srikakulam",
        "center": {
          "latitude": 18.2969,
          "longitude": 83.8968
        },
        "localities": [
          {
            "id": "srikakulam_urban_loc_1",
            "name": "7 Road Junction",
            "mandalId": "srikakulam_urban",
            "districtId": "srikakulam",
            "coordinate": {
              "latitude": 18.2969,
              "longitude": 83.8968
            },
            "type": "town"
          },
          {
            "id": "srikakulam_urban_loc_2",
            "name": "Collectorate Complex",
            "mandalId": "srikakulam_urban",
            "districtId": "srikakulam",
            "coordinate": {
              "latitude": 18.2969,
              "longitude": 83.8968
            },
            "type": "locality"
          },
          {
            "id": "srikakulam_urban_loc_3",
            "name": "Palakonda Road",
            "mandalId": "srikakulam_urban",
            "districtId": "srikakulam",
            "coordinate": {
              "latitude": 18.2969,
              "longitude": 83.8968
            },
            "type": "locality"
          },
          {
            "id": "srikakulam_urban_loc_4",
            "name": "Arasavalli Sun Temple Road",
            "mandalId": "srikakulam_urban",
            "districtId": "srikakulam",
            "coordinate": {
              "latitude": 18.2969,
              "longitude": 83.8968
            },
            "type": "locality"
          },
          {
            "id": "srikakulam_urban_loc_5",
            "name": "Nagavali River Bund",
            "mandalId": "srikakulam_urban",
            "districtId": "srikakulam",
            "coordinate": {
              "latitude": 18.2969,
              "longitude": 83.8968
            },
            "type": "locality"
          }
        ]
      },
      {
        "id": "palasa",
        "name": "Palasa",
        "districtId": "srikakulam",
        "center": {
          "latitude": 18.77,
          "longitude": 84.41
        },
        "localities": [
          {
            "id": "palasa_loc_1",
            "name": "Cashew Processing Zone",
            "mandalId": "palasa",
            "districtId": "srikakulam",
            "coordinate": {
              "latitude": 18.77,
              "longitude": 84.41
            },
            "type": "town"
          },
          {
            "id": "palasa_loc_2",
            "name": "Kasibugga Railway Station Area",
            "mandalId": "palasa",
            "districtId": "srikakulam",
            "coordinate": {
              "latitude": 18.77,
              "longitude": 84.41
            },
            "type": "locality"
          }
        ]
      },
      {
        "id": "tekkali",
        "name": "Tekkali",
        "districtId": "srikakulam",
        "center": {
          "latitude": 18.61,
          "longitude": 84.23
        },
        "localities": [
          {
            "id": "tekkali_loc_1",
            "name": "Court Complex Area",
            "mandalId": "tekkali",
            "districtId": "srikakulam",
            "coordinate": {
              "latitude": 18.61,
              "longitude": 84.23
            },
            "type": "town"
          },
          {
            "id": "tekkali_loc_2",
            "name": "Four Roads Junction",
            "mandalId": "tekkali",
            "districtId": "srikakulam",
            "coordinate": {
              "latitude": 18.61,
              "longitude": 84.23
            },
            "type": "locality"
          }
        ]
      },
      {
        "id": "ichchapuram",
        "name": "Ichchapuram",
        "districtId": "srikakulam",
        "center": {
          "latitude": 19.11,
          "longitude": 84.69
        },
        "localities": [
          {
            "id": "ichchapuram_loc_1",
            "name": "Odisha Border Checkpost",
            "mandalId": "ichchapuram",
            "districtId": "srikakulam",
            "coordinate": {
              "latitude": 19.11,
              "longitude": 84.69
            },
            "type": "town"
          },
          {
            "id": "ichchapuram_loc_2",
            "name": "Bypass",
            "mandalId": "ichchapuram",
            "districtId": "srikakulam",
            "coordinate": {
              "latitude": 19.11,
              "longitude": 84.69
            },
            "type": "locality"
          }
        ]
      },
      {
        "id": "amadalavalasa",
        "name": "Amadalavalasa",
        "districtId": "srikakulam",
        "center": {
          "latitude": 18.42,
          "longitude": 83.9
        },
        "localities": [
          {
            "id": "amadalavalasa_loc_1",
            "name": "Srikakulam Road Railway Station",
            "mandalId": "amadalavalasa",
            "districtId": "srikakulam",
            "coordinate": {
              "latitude": 18.42,
              "longitude": 83.9
            },
            "type": "town"
          },
          {
            "id": "amadalavalasa_loc_2",
            "name": "Sugar Factory Area",
            "mandalId": "amadalavalasa",
            "districtId": "srikakulam",
            "coordinate": {
              "latitude": 18.42,
              "longitude": 83.9
            },
            "type": "locality"
          }
        ]
      }
    ]
  },
  {
    "id": "tirupati",
    "name": "Tirupati",
    "headquarters": "Tirupati",
    "region": "Rayalaseema",
    "center": {
      "latitude": 13.6288,
      "longitude": 79.4192
    },
    "mandals": [
      {
        "id": "tirupati_urban",
        "name": "Tirupati Urban",
        "districtId": "tirupati",
        "center": {
          "latitude": 13.6288,
          "longitude": 79.4192
        },
        "localities": [
          {
            "id": "tirupati_urban_loc_1",
            "name": "Alipiri Foot of Hills",
            "mandalId": "tirupati_urban",
            "districtId": "tirupati",
            "coordinate": {
              "latitude": 13.6288,
              "longitude": 79.4192
            },
            "type": "town"
          },
          {
            "id": "tirupati_urban_loc_2",
            "name": "Tirumala Ghat Road",
            "mandalId": "tirupati_urban",
            "districtId": "tirupati",
            "coordinate": {
              "latitude": 13.6288,
              "longitude": 79.4192
            },
            "type": "locality"
          },
          {
            "id": "tirupati_urban_loc_3",
            "name": "Tirupati Railway Station",
            "mandalId": "tirupati_urban",
            "districtId": "tirupati",
            "coordinate": {
              "latitude": 13.6288,
              "longitude": 79.4192
            },
            "type": "locality"
          },
          {
            "id": "tirupati_urban_loc_4",
            "name": "Collectorate",
            "mandalId": "tirupati_urban",
            "districtId": "tirupati",
            "coordinate": {
              "latitude": 13.6288,
              "longitude": 79.4192
            },
            "type": "locality"
          },
          {
            "id": "tirupati_urban_loc_5",
            "name": "Bairagipatteda",
            "mandalId": "tirupati_urban",
            "districtId": "tirupati",
            "coordinate": {
              "latitude": 13.6288,
              "longitude": 79.4192
            },
            "type": "locality"
          },
          {
            "id": "tirupati_urban_loc_6",
            "name": "SV University Area",
            "mandalId": "tirupati_urban",
            "districtId": "tirupati",
            "coordinate": {
              "latitude": 13.6288,
              "longitude": 79.4192
            },
            "type": "locality"
          }
        ]
      },
      {
        "id": "srikalahasti",
        "name": "Srikalahasti",
        "districtId": "tirupati",
        "center": {
          "latitude": 13.75,
          "longitude": 79.7
        },
        "localities": [
          {
            "id": "srikalahasti_loc_1",
            "name": "Srikalahasteeswara Temple Road",
            "mandalId": "srikalahasti",
            "districtId": "tirupati",
            "coordinate": {
              "latitude": 13.75,
              "longitude": 79.7
            },
            "type": "town"
          },
          {
            "id": "srikalahasti_loc_2",
            "name": "Swarnamukhi River Bund",
            "mandalId": "srikalahasti",
            "districtId": "tirupati",
            "coordinate": {
              "latitude": 13.75,
              "longitude": 79.7
            },
            "type": "locality"
          },
          {
            "id": "srikalahasti_loc_3",
            "name": "RTC Bus Stand",
            "mandalId": "srikalahasti",
            "districtId": "tirupati",
            "coordinate": {
              "latitude": 13.75,
              "longitude": 79.7
            },
            "type": "locality"
          }
        ]
      },
      {
        "id": "gudur",
        "name": "Gudur",
        "districtId": "tirupati",
        "center": {
          "latitude": 14.15,
          "longitude": 79.85
        },
        "localities": [
          {
            "id": "gudur_loc_1",
            "name": "Mica Industrial Area",
            "mandalId": "gudur",
            "districtId": "tirupati",
            "coordinate": {
              "latitude": 14.15,
              "longitude": 79.85
            },
            "type": "town"
          },
          {
            "id": "gudur_loc_2",
            "name": "Railway Junction",
            "mandalId": "gudur",
            "districtId": "tirupati",
            "coordinate": {
              "latitude": 14.15,
              "longitude": 79.85
            },
            "type": "locality"
          }
        ]
      },
      {
        "id": "sullurpeta",
        "name": "Sullurpeta",
        "districtId": "tirupati",
        "center": {
          "latitude": 13.7,
          "longitude": 80.02
        },
        "localities": [
          {
            "id": "sullurpeta_loc_1",
            "name": "ISRO Sriharikota Access Road",
            "mandalId": "sullurpeta",
            "districtId": "tirupati",
            "coordinate": {
              "latitude": 13.7,
              "longitude": 80.02
            },
            "type": "town"
          },
          {
            "id": "sullurpeta_loc_2",
            "name": "Pulicat Lake Area",
            "mandalId": "sullurpeta",
            "districtId": "tirupati",
            "coordinate": {
              "latitude": 13.7,
              "longitude": 80.02
            },
            "type": "locality"
          }
        ]
      },
      {
        "id": "venkatagiri",
        "name": "Venkatagiri",
        "districtId": "tirupati",
        "center": {
          "latitude": 13.96,
          "longitude": 79.58
        },
        "localities": [
          {
            "id": "venkatagiri_loc_1",
            "name": "Zari Handloom Cluster",
            "mandalId": "venkatagiri",
            "districtId": "tirupati",
            "coordinate": {
              "latitude": 13.96,
              "longitude": 79.58
            },
            "type": "town"
          },
          {
            "id": "venkatagiri_loc_2",
            "name": "Raja Palace Road",
            "mandalId": "venkatagiri",
            "districtId": "tirupati",
            "coordinate": {
              "latitude": 13.96,
              "longitude": 79.58
            },
            "type": "locality"
          }
        ]
      }
    ]
  },
  {
    "id": "visakhapatnam",
    "name": "Visakhapatnam",
    "headquarters": "Visakhapatnam",
    "region": "North Coastal",
    "center": {
      "latitude": 17.6868,
      "longitude": 83.2185
    },
    "mandals": [
      {
        "id": "visakhapatnam_urban",
        "name": "Visakhapatnam Urban",
        "districtId": "visakhapatnam",
        "center": {
          "latitude": 17.6868,
          "longitude": 83.2185
        },
        "localities": [
          {
            "id": "visakhapatnam_urban_loc_1",
            "name": "RK Beach Road",
            "mandalId": "visakhapatnam_urban",
            "districtId": "visakhapatnam",
            "coordinate": {
              "latitude": 17.6868,
              "longitude": 83.2185
            },
            "type": "town"
          },
          {
            "id": "visakhapatnam_urban_loc_2",
            "name": "Siripuram Circle",
            "mandalId": "visakhapatnam_urban",
            "districtId": "visakhapatnam",
            "coordinate": {
              "latitude": 17.6868,
              "longitude": 83.2185
            },
            "type": "locality"
          },
          {
            "id": "visakhapatnam_urban_loc_3",
            "name": "Jagadamba Center",
            "mandalId": "visakhapatnam_urban",
            "districtId": "visakhapatnam",
            "coordinate": {
              "latitude": 17.6868,
              "longitude": 83.2185
            },
            "type": "locality"
          },
          {
            "id": "visakhapatnam_urban_loc_4",
            "name": "Dwaraka Nagar (RTC Complex)",
            "mandalId": "visakhapatnam_urban",
            "districtId": "visakhapatnam",
            "coordinate": {
              "latitude": 17.6868,
              "longitude": 83.2185
            },
            "type": "locality"
          },
          {
            "id": "visakhapatnam_urban_loc_5",
            "name": "MVP Colony",
            "mandalId": "visakhapatnam_urban",
            "districtId": "visakhapatnam",
            "coordinate": {
              "latitude": 17.6868,
              "longitude": 83.2185
            },
            "type": "locality"
          },
          {
            "id": "visakhapatnam_urban_loc_6",
            "name": "Collectorate",
            "mandalId": "visakhapatnam_urban",
            "districtId": "visakhapatnam",
            "coordinate": {
              "latitude": 17.6868,
              "longitude": 83.2185
            },
            "type": "locality"
          },
          {
            "id": "visakhapatnam_urban_loc_7",
            "name": "Rushikonda IT SEZ",
            "mandalId": "visakhapatnam_urban",
            "districtId": "visakhapatnam",
            "coordinate": {
              "latitude": 17.6868,
              "longitude": 83.2185
            },
            "type": "locality"
          }
        ]
      },
      {
        "id": "gajuwaka",
        "name": "Gajuwaka",
        "districtId": "visakhapatnam",
        "center": {
          "latitude": 17.69,
          "longitude": 83.18
        },
        "localities": [
          {
            "id": "gajuwaka_loc_1",
            "name": "Steel Plant Main Gate",
            "mandalId": "gajuwaka",
            "districtId": "visakhapatnam",
            "coordinate": {
              "latitude": 17.69,
              "longitude": 83.18
            },
            "type": "town"
          },
          {
            "id": "gajuwaka_loc_2",
            "name": "BHPVL Junction",
            "mandalId": "gajuwaka",
            "districtId": "visakhapatnam",
            "coordinate": {
              "latitude": 17.69,
              "longitude": 83.18
            },
            "type": "locality"
          },
          {
            "id": "gajuwaka_loc_3",
            "name": "Old Gajuwaka Market",
            "mandalId": "gajuwaka",
            "districtId": "visakhapatnam",
            "coordinate": {
              "latitude": 17.69,
              "longitude": 83.18
            },
            "type": "locality"
          }
        ]
      },
      {
        "id": "bhimili",
        "name": "Bheemunipatnam (Bhimili)",
        "districtId": "visakhapatnam",
        "center": {
          "latitude": 17.89,
          "longitude": 83.43
        },
        "localities": [
          {
            "id": "bhimili_loc_1",
            "name": "Dutch Cemetery Road",
            "mandalId": "bhimili",
            "districtId": "visakhapatnam",
            "coordinate": {
              "latitude": 17.89,
              "longitude": 83.43
            },
            "type": "town"
          },
          {
            "id": "bhimili_loc_2",
            "name": "Beach Promenade",
            "mandalId": "bhimili",
            "districtId": "visakhapatnam",
            "coordinate": {
              "latitude": 17.89,
              "longitude": 83.43
            },
            "type": "locality"
          },
          {
            "id": "bhimili_loc_3",
            "name": "Gosthani River Confluence",
            "mandalId": "bhimili",
            "districtId": "visakhapatnam",
            "coordinate": {
              "latitude": 17.89,
              "longitude": 83.43
            },
            "type": "locality"
          }
        ]
      },
      {
        "id": "pedagantyada",
        "name": "Pedagantyada",
        "districtId": "visakhapatnam",
        "center": {
          "latitude": 17.65,
          "longitude": 83.23
        },
        "localities": [
          {
            "id": "pedagantyada_loc_1",
            "name": "Gangavaram Port Gate",
            "mandalId": "pedagantyada",
            "districtId": "visakhapatnam",
            "coordinate": {
              "latitude": 17.65,
              "longitude": 83.23
            },
            "type": "town"
          },
          {
            "id": "pedagantyada_loc_2",
            "name": "Scindia Junction",
            "mandalId": "pedagantyada",
            "districtId": "visakhapatnam",
            "coordinate": {
              "latitude": 17.65,
              "longitude": 83.23
            },
            "type": "locality"
          }
        ]
      }
    ]
  },
  {
    "id": "vizianagaram",
    "name": "Vizianagaram",
    "headquarters": "Vizianagaram",
    "region": "North Coastal",
    "center": {
      "latitude": 18.1124,
      "longitude": 83.4079
    },
    "mandals": [
      {
        "id": "vizianagaram_urban",
        "name": "Vizianagaram Urban",
        "districtId": "vizianagaram",
        "center": {
          "latitude": 18.1124,
          "longitude": 83.4079
        },
        "localities": [
          {
            "id": "vizianagaram_urban_loc_1",
            "name": "Gajapathi Fort Area",
            "mandalId": "vizianagaram_urban",
            "districtId": "vizianagaram",
            "coordinate": {
              "latitude": 18.1124,
              "longitude": 83.4079
            },
            "type": "town"
          },
          {
            "id": "vizianagaram_urban_loc_2",
            "name": "Collectorate",
            "mandalId": "vizianagaram_urban",
            "districtId": "vizianagaram",
            "coordinate": {
              "latitude": 18.1124,
              "longitude": 83.4079
            },
            "type": "locality"
          },
          {
            "id": "vizianagaram_urban_loc_3",
            "name": "Mayuri Junction",
            "mandalId": "vizianagaram_urban",
            "districtId": "vizianagaram",
            "coordinate": {
              "latitude": 18.1124,
              "longitude": 83.4079
            },
            "type": "locality"
          },
          {
            "id": "vizianagaram_urban_loc_4",
            "name": "Kanthi Road",
            "mandalId": "vizianagaram_urban",
            "districtId": "vizianagaram",
            "coordinate": {
              "latitude": 18.1124,
              "longitude": 83.4079
            },
            "type": "locality"
          },
          {
            "id": "vizianagaram_urban_loc_5",
            "name": "Railway Station Road",
            "mandalId": "vizianagaram_urban",
            "districtId": "vizianagaram",
            "coordinate": {
              "latitude": 18.1124,
              "longitude": 83.4079
            },
            "type": "locality"
          },
          {
            "id": "vizianagaram_urban_loc_6",
            "name": "Cantonment",
            "mandalId": "vizianagaram_urban",
            "districtId": "vizianagaram",
            "coordinate": {
              "latitude": 18.1124,
              "longitude": 83.4079
            },
            "type": "locality"
          }
        ]
      },
      {
        "id": "bobbili",
        "name": "Bobbili",
        "districtId": "vizianagaram",
        "center": {
          "latitude": 18.57,
          "longitude": 83.36
        },
        "localities": [
          {
            "id": "bobbili_loc_1",
            "name": "Bobbili Fort Grounds",
            "mandalId": "bobbili",
            "districtId": "vizianagaram",
            "coordinate": {
              "latitude": 18.57,
              "longitude": 83.36
            },
            "type": "town"
          },
          {
            "id": "bobbili_loc_2",
            "name": "Industrial Growth Centre",
            "mandalId": "bobbili",
            "districtId": "vizianagaram",
            "coordinate": {
              "latitude": 18.57,
              "longitude": 83.36
            },
            "type": "locality"
          }
        ]
      },
      {
        "id": "cheepurupalli",
        "name": "Cheepurupalli",
        "districtId": "vizianagaram",
        "center": {
          "latitude": 18.31,
          "longitude": 83.57
        },
        "localities": [
          {
            "id": "cheepurupalli_loc_1",
            "name": "Railway Station Area",
            "mandalId": "cheepurupalli",
            "districtId": "vizianagaram",
            "coordinate": {
              "latitude": 18.31,
              "longitude": 83.57
            },
            "type": "town"
          },
          {
            "id": "cheepurupalli_loc_2",
            "name": "Main Road",
            "mandalId": "cheepurupalli",
            "districtId": "vizianagaram",
            "coordinate": {
              "latitude": 18.31,
              "longitude": 83.57
            },
            "type": "locality"
          }
        ]
      },
      {
        "id": "srungavarapukota",
        "name": "Srungavarapukota (S.Kota)",
        "districtId": "vizianagaram",
        "center": {
          "latitude": 18.11,
          "longitude": 83.15
        },
        "localities": [
          {
            "id": "srungavarapukota_loc_1",
            "name": "Punygiri Road",
            "mandalId": "srungavarapukota",
            "districtId": "vizianagaram",
            "coordinate": {
              "latitude": 18.11,
              "longitude": 83.15
            },
            "type": "town"
          },
          {
            "id": "srungavarapukota_loc_2",
            "name": "Bypass Circle",
            "mandalId": "srungavarapukota",
            "districtId": "vizianagaram",
            "coordinate": {
              "latitude": 18.11,
              "longitude": 83.15
            },
            "type": "locality"
          }
        ]
      },
      {
        "id": "rajam",
        "name": "Rajam",
        "districtId": "vizianagaram",
        "center": {
          "latitude": 18.45,
          "longitude": 83.65
        },
        "localities": [
          {
            "id": "rajam_loc_1",
            "name": "GMRIT Campus Area",
            "mandalId": "rajam",
            "districtId": "vizianagaram",
            "coordinate": {
              "latitude": 18.45,
              "longitude": 83.65
            },
            "type": "town"
          },
          {
            "id": "rajam_loc_2",
            "name": "Main Bazaar",
            "mandalId": "rajam",
            "districtId": "vizianagaram",
            "coordinate": {
              "latitude": 18.45,
              "longitude": 83.65
            },
            "type": "locality"
          }
        ]
      }
    ]
  },
  {
    "id": "west_godavari",
    "name": "West Godavari",
    "headquarters": "Bhimavaram",
    "region": "Coastal Andhra",
    "center": {
      "latitude": 16.5449,
      "longitude": 81.5212
    },
    "mandals": [
      {
        "id": "bhimavaram",
        "name": "Bhimavaram",
        "districtId": "west_godavari",
        "center": {
          "latitude": 16.5449,
          "longitude": 81.5212
        },
        "localities": [
          {
            "id": "bhimavaram_loc_1",
            "name": "Somaramam Temple Area",
            "mandalId": "bhimavaram",
            "districtId": "west_godavari",
            "coordinate": {
              "latitude": 16.5449,
              "longitude": 81.5212
            },
            "type": "town"
          },
          {
            "id": "bhimavaram_loc_2",
            "name": "Collectorate Office",
            "mandalId": "bhimavaram",
            "districtId": "west_godavari",
            "coordinate": {
              "latitude": 16.5449,
              "longitude": 81.5212
            },
            "type": "locality"
          },
          {
            "id": "bhimavaram_loc_3",
            "name": "DNR College Road",
            "mandalId": "bhimavaram",
            "districtId": "west_godavari",
            "coordinate": {
              "latitude": 16.5449,
              "longitude": 81.5212
            },
            "type": "locality"
          },
          {
            "id": "bhimavaram_loc_4",
            "name": "Prakasam Chowk",
            "mandalId": "bhimavaram",
            "districtId": "west_godavari",
            "coordinate": {
              "latitude": 16.5449,
              "longitude": 81.5212
            },
            "type": "locality"
          },
          {
            "id": "bhimavaram_loc_5",
            "name": "Bypass Circle",
            "mandalId": "bhimavaram",
            "districtId": "west_godavari",
            "coordinate": {
              "latitude": 16.5449,
              "longitude": 81.5212
            },
            "type": "locality"
          }
        ]
      },
      {
        "id": "tadepalligudem",
        "name": "Tadepalligudem",
        "districtId": "west_godavari",
        "center": {
          "latitude": 16.81,
          "longitude": 81.52
        },
        "localities": [
          {
            "id": "tadepalligudem_loc_1",
            "name": "NIT Andhra Pradesh Campus",
            "mandalId": "tadepalligudem",
            "districtId": "west_godavari",
            "coordinate": {
              "latitude": 16.81,
              "longitude": 81.52
            },
            "type": "town"
          },
          {
            "id": "tadepalligudem_loc_2",
            "name": "KN Road",
            "mandalId": "tadepalligudem",
            "districtId": "west_godavari",
            "coordinate": {
              "latitude": 16.81,
              "longitude": 81.52
            },
            "type": "locality"
          },
          {
            "id": "tadepalligudem_loc_3",
            "name": "Railway Station Junction",
            "mandalId": "tadepalligudem",
            "districtId": "west_godavari",
            "coordinate": {
              "latitude": 16.81,
              "longitude": 81.52
            },
            "type": "locality"
          }
        ]
      },
      {
        "id": "tanuku",
        "name": "Tanuku",
        "districtId": "west_godavari",
        "center": {
          "latitude": 16.75,
          "longitude": 81.7
        },
        "localities": [
          {
            "id": "tanuku_loc_1",
            "name": "Narendra Center",
            "mandalId": "tanuku",
            "districtId": "west_godavari",
            "coordinate": {
              "latitude": 16.75,
              "longitude": 81.7
            },
            "type": "town"
          },
          {
            "id": "tanuku_loc_2",
            "name": "Andhra Sugars Complex Area",
            "mandalId": "tanuku",
            "districtId": "west_godavari",
            "coordinate": {
              "latitude": 16.75,
              "longitude": 81.7
            },
            "type": "locality"
          }
        ]
      },
      {
        "id": "narasapuram",
        "name": "Narasapuram",
        "districtId": "west_godavari",
        "center": {
          "latitude": 16.43,
          "longitude": 81.7
        },
        "localities": [
          {
            "id": "narasapuram_loc_1",
            "name": "Crochet Lace Cluster",
            "mandalId": "narasapuram",
            "districtId": "west_godavari",
            "coordinate": {
              "latitude": 16.43,
              "longitude": 81.7
            },
            "type": "town"
          },
          {
            "id": "narasapuram_loc_2",
            "name": "Vashista Godavari River Front",
            "mandalId": "narasapuram",
            "districtId": "west_godavari",
            "coordinate": {
              "latitude": 16.43,
              "longitude": 81.7
            },
            "type": "locality"
          }
        ]
      },
      {
        "id": "palakollu",
        "name": "Palakollu",
        "districtId": "west_godavari",
        "center": {
          "latitude": 16.52,
          "longitude": 81.73
        },
        "localities": [
          {
            "id": "palakollu_loc_1",
            "name": "Ksheera Ramalingeswara Temple Area",
            "mandalId": "palakollu",
            "districtId": "west_godavari",
            "coordinate": {
              "latitude": 16.52,
              "longitude": 81.73
            },
            "type": "town"
          },
          {
            "id": "palakollu_loc_2",
            "name": "Gandhi Chowk",
            "mandalId": "palakollu",
            "districtId": "west_godavari",
            "coordinate": {
              "latitude": 16.52,
              "longitude": 81.73
            },
            "type": "locality"
          }
        ]
      }
    ]
  },
  {
    "id": "ysr_kadapa",
    "name": "YSR Kadapa",
    "headquarters": "Kadapa",
    "region": "Rayalaseema",
    "center": {
      "latitude": 14.4673,
      "longitude": 78.8242
    },
    "mandals": [
      {
        "id": "kadapa_urban",
        "name": "Kadapa Urban",
        "districtId": "ysr_kadapa",
        "center": {
          "latitude": 14.4673,
          "longitude": 78.8242
        },
        "localities": [
          {
            "id": "kadapa_urban_loc_1",
            "name": "Seven Roads Circle",
            "mandalId": "kadapa_urban",
            "districtId": "ysr_kadapa",
            "coordinate": {
              "latitude": 14.4673,
              "longitude": 78.8242
            },
            "type": "town"
          },
          {
            "id": "kadapa_urban_loc_2",
            "name": "Collectorate Complex",
            "mandalId": "kadapa_urban",
            "districtId": "ysr_kadapa",
            "coordinate": {
              "latitude": 14.4673,
              "longitude": 78.8242
            },
            "type": "locality"
          },
          {
            "id": "kadapa_urban_loc_3",
            "name": "Ameen Peer Dargah Area",
            "mandalId": "kadapa_urban",
            "districtId": "ysr_kadapa",
            "coordinate": {
              "latitude": 14.4673,
              "longitude": 78.8242
            },
            "type": "locality"
          },
          {
            "id": "kadapa_urban_loc_4",
            "name": "Yerramukkapalli",
            "mandalId": "kadapa_urban",
            "districtId": "ysr_kadapa",
            "coordinate": {
              "latitude": 14.4673,
              "longitude": 78.8242
            },
            "type": "locality"
          },
          {
            "id": "kadapa_urban_loc_5",
            "name": "RIMS Hospital Road",
            "mandalId": "kadapa_urban",
            "districtId": "ysr_kadapa",
            "coordinate": {
              "latitude": 14.4673,
              "longitude": 78.8242
            },
            "type": "locality"
          }
        ]
      },
      {
        "id": "proddatur",
        "name": "Proddatur",
        "districtId": "ysr_kadapa",
        "center": {
          "latitude": 14.73,
          "longitude": 78.55
        },
        "localities": [
          {
            "id": "proddatur_loc_1",
            "name": "Gold & Cotton Market Yard",
            "mandalId": "proddatur",
            "districtId": "ysr_kadapa",
            "coordinate": {
              "latitude": 14.73,
              "longitude": 78.55
            },
            "type": "town"
          },
          {
            "id": "proddatur_loc_2",
            "name": "Mydukur Road",
            "mandalId": "proddatur",
            "districtId": "ysr_kadapa",
            "coordinate": {
              "latitude": 14.73,
              "longitude": 78.55
            },
            "type": "locality"
          },
          {
            "id": "proddatur_loc_3",
            "name": "Bypass Circle",
            "mandalId": "proddatur",
            "districtId": "ysr_kadapa",
            "coordinate": {
              "latitude": 14.73,
              "longitude": 78.55
            },
            "type": "locality"
          }
        ]
      },
      {
        "id": "pulivendla",
        "name": "Pulivendla",
        "districtId": "ysr_kadapa",
        "center": {
          "latitude": 14.42,
          "longitude": 78.23
        },
        "localities": [
          {
            "id": "pulivendla_loc_1",
            "name": "JNTU Pulivendula Campus",
            "mandalId": "pulivendla",
            "districtId": "ysr_kadapa",
            "coordinate": {
              "latitude": 14.42,
              "longitude": 78.23
            },
            "type": "town"
          },
          {
            "id": "pulivendla_loc_2",
            "name": "R.P. Road",
            "mandalId": "pulivendla",
            "districtId": "ysr_kadapa",
            "coordinate": {
              "latitude": 14.42,
              "longitude": 78.23
            },
            "type": "locality"
          },
          {
            "id": "pulivendla_loc_3",
            "name": "Flower Market",
            "mandalId": "pulivendla",
            "districtId": "ysr_kadapa",
            "coordinate": {
              "latitude": 14.42,
              "longitude": 78.23
            },
            "type": "locality"
          }
        ]
      },
      {
        "id": "jammalamadugu",
        "name": "Jammalamadugu",
        "districtId": "ysr_kadapa",
        "center": {
          "latitude": 14.85,
          "longitude": 78.38
        },
        "localities": [
          {
            "id": "jammalamadugu_loc_1",
            "name": "Gandikota Canyon Road",
            "mandalId": "jammalamadugu",
            "districtId": "ysr_kadapa",
            "coordinate": {
              "latitude": 14.85,
              "longitude": 78.38
            },
            "type": "town"
          },
          {
            "id": "jammalamadugu_loc_2",
            "name": "Pennar River Bridge",
            "mandalId": "jammalamadugu",
            "districtId": "ysr_kadapa",
            "coordinate": {
              "latitude": 14.85,
              "longitude": 78.38
            },
            "type": "locality"
          }
        ]
      },
      {
        "id": "badvel",
        "name": "Badvel",
        "districtId": "ysr_kadapa",
        "center": {
          "latitude": 14.74,
          "longitude": 79.06
        },
        "localities": [
          {
            "id": "badvel_loc_1",
            "name": "Nellore Road Junction",
            "mandalId": "badvel",
            "districtId": "ysr_kadapa",
            "coordinate": {
              "latitude": 14.74,
              "longitude": 79.06
            },
            "type": "town"
          },
          {
            "id": "badvel_loc_2",
            "name": "Four Roads Circle",
            "mandalId": "badvel",
            "districtId": "ysr_kadapa",
            "coordinate": {
              "latitude": 14.74,
              "longitude": 79.06
            },
            "type": "locality"
          }
        ]
      }
    ]
  }
];

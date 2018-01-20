const wfaBoys = {
  0: { L:0.3487, M:3.3464, S:0.14602, P01:2.048, P1:2.331, P3:2.507, P5:2.604, P10:2.758, P15:2.865, P25:3.027, P50:3.346, P75:3.687, P85:3.878, P90:4.011, P95:4.215, P97:4.35, P99:4.613, P999:5.088},
  5: { L:0.2855, M:3.4223, S:0.14571, P01:2.114, P1:2.396, P3:2.573, P5:2.67, P10:2.825, P15:2.933, P25:3.098, P50:3.422, P75:3.771, P85:3.968, P90:4.105, P95:4.315, P97:4.456, P99:4.73, P999:5.227},
  10: { L:0.2681, M:3.5941, S:0.14339, P01:2.242, P1:2.534, P3:2.717, P5:2.817, P10:2.977, P15:3.088, P25:3.259, P50:3.594, P75:3.954, P85:4.158, P90:4.3, P95:4.518, P97:4.663, P99:4.947, P999:5.463},
  15: { L:0.2558, M:3.7956, S:0.14093, P01:2.392, P1:2.695, P3:2.885, P5:2.989, P10:3.155, P15:3.271, P25:3.447, P50:3.796, P75:4.169, P85:4.381, P90:4.529, P95:4.754, P97:4.905, P99:5.2, P999:5.736},
  20: { L:0.246, M:4.0158, S:0.13853, P01:2.555, P1:2.87, P3:3.068, P5:3.176, P10:3.349, P15:3.47, P25:3.654, P50:4.016, P75:4.404, P85:4.624, P90:4.778, P95:5.013, P97:5.169, P99:5.476, P999:6.033},
  25: { L:0.2376, M:4.2369, S:0.13626, P01:2.719, P1:3.047, P3:3.252, P5:3.365, P10:3.545, P15:3.67, P25:3.861, P50:4.237, P75:4.64, P85:4.868, P90:5.028, P95:5.271, P97:5.434, P99:5.751, P999:6.329},
  30: { L:0.2303, M:4.4525, S:0.13413, P01:2.88, P1:3.221, P3:3.433, P5:3.55, P10:3.736, P15:3.866, P25:4.063, P50:4.453, P75:4.87, P85:5.105, P90:5.27, P95:5.522, P97:5.69, P99:6.018, P999:6.615},
  35: { L:0.2237, M:4.659, S:0.13215, P01:3.036, P1:3.388, P3:3.608, P5:3.728, P10:3.92, P15:4.054, P25:4.258, P50:4.659, P75:5.089, P85:5.332, P90:5.502, P95:5.761, P97:5.934, P99:6.272, P999:6.887},
  40: { L:0.2178, M:4.8549, S:0.1303, P01:3.185, P1:3.548, P3:3.774, P5:3.898, P10:4.096, P15:4.233, P25:4.443, P50:4.855, P75:5.296, P85:5.546, P90:5.72, P95:5.986, P97:6.164, P99:6.511, P999:7.142},
  45: { L:0.2122, M:5.0404, S:0.12858, P01:3.328, P1:3.7, P3:3.932, P5:4.06, P10:4.262, P15:4.403, P25:4.618, P50:5.04, P75:5.493, P85:5.748, P90:5.927, P95:6.199, P97:6.381, P99:6.736, P999:7.381},
  50: { L:0.2071, M:5.2161, S:0.12698, P01:3.464, P1:3.846, P3:4.083, P5:4.213, P10:4.42, P15:4.565, P25:4.784, P50:5.216, P75:5.678, P85:5.939, P90:6.121, P95:6.4, P97:6.585, P99:6.948, P999:7.607},
  55: { L:0.2023, M:5.3826, S:0.12548, P01:3.594, P1:3.984, P3:4.226, P5:4.359, P10:4.571, P15:4.718, P25:4.942, P50:5.383, P75:5.854, P85:6.12, P90:6.305, P95:6.589, P97:6.778, P99:7.148, P999:7.818},
  60: { L:0.1978, M:5.5407, S:0.12409, P01:3.719, P1:4.116, P3:4.363, P5:4.499, P10:4.714, P15:4.864, P25:5.092, P50:5.541, P75:6.02, P85:6.291, P90:6.48, P95:6.768, P97:6.961, P99:7.336, P999:8.018},
  65: { L:0.1935, M:5.6912, S:0.12279, P01:3.837, P1:4.242, P3:4.494, P5:4.632, P10:4.851, P15:5.003, P25:5.235, P50:5.691, P75:6.179, P85:6.454, P90:6.645, P95:6.938, P97:7.134, P99:7.515, P999:8.208},
  70: { L:0.1894, M:5.8346, S:0.12157, P01:3.951, P1:4.363, P3:4.618, P5:4.759, P10:4.981, P15:5.136, P25:5.372, P50:5.835, P75:6.329, P85:6.608, P90:6.803, P95:7.1, P97:7.298, P99:7.685, P999:8.387},
  75: { L:0.1855, M:5.9713, S:0.12044, P01:4.06, P1:4.478, P3:4.738, P5:4.88, P10:5.106, P15:5.263, P25:5.502, P50:5.971, P75:6.473, P85:6.756, P90:6.953, P95:7.254, P97:7.455, P99:7.847, P999:8.558},
  80: { L:0.1818, M:6.1018, S:0.11939, P01:4.165, P1:4.589, P3:4.852, P5:4.996, P10:5.225, P15:5.384, P25:5.626, P50:6.102, P75:6.61, P85:6.896, P90:7.096, P95:7.4, P97:7.604, P99:8.001, P999:8.721},
  85: { L:0.1782, M:6.2264, S:0.11841, P01:4.265, P1:4.694, P3:4.961, P5:5.107, P10:5.339, P15:5.5, P25:5.745, P50:6.226, P75:6.74, P85:7.03, P90:7.232, P95:7.54, P97:7.746, P99:8.148, P999:8.875},
  90: { L:0.1747, M:6.3457, S:0.1175, P01:4.361, P1:4.796, P3:5.065, P5:5.213, P10:5.448, P15:5.611, P25:5.859, P50:6.346, P75:6.865, P85:7.158, P90:7.363, P95:7.674, P97:7.882, P99:8.288, P999:9.023},
  95: { L:0.1714, M:6.4601, S:0.11666, P01:4.453, P1:4.893, P3:5.165, P5:5.315, P10:5.552, P15:5.717, P25:5.968, P50:6.46, P75:6.985, P85:7.281, P90:7.488, P95:7.803, P97:8.013, P99:8.423, P999:9.166},
  100: { L:0.1682, M:6.5699, S:0.11588, P01:4.541, P1:4.986, P3:5.262, P5:5.413, P10:5.653, P15:5.819, P25:6.073, P50:6.57, P75:7.1, P85:7.399, P90:7.608, P95:7.926, P97:8.138, P99:8.552, P999:9.302},
  105: { L:0.1651, M:6.6755, S:0.11516, P01:4.626, P1:5.076, P3:5.354, P5:5.507, P10:5.749, P15:5.917, P25:6.174, P50:6.676, P75:7.211, P85:7.513, P90:7.723, P95:8.044, P97:8.259, P99:8.676, P999:9.433},
  110: { L:0.162, M:6.7772, S:0.1145, P01:4.708, P1:5.162, P3:5.443, P5:5.597, P10:5.842, P15:6.012, P25:6.27, P50:6.777, P75:7.318, P85:7.623, P90:7.835, P95:8.159, P97:8.375, P99:8.796, P999:9.56},
  115: { L:0.1591, M:6.8753, S:0.1139, P01:4.786, P1:5.245, P3:5.529, P5:5.684, P10:5.931, P15:6.103, P25:6.364, P50:6.875, P75:7.421, P85:7.728, P90:7.943, P95:8.269, P97:8.487, P99:8.913, P999:9.683},
  120: { L:0.1563, M:6.9699, S:0.11334, P01:4.862, P1:5.325, P3:5.611, P5:5.768, P10:6.018, P15:6.191, P25:6.454, P50:6.97, P75:7.52, P85:7.83, P90:8.046, P95:8.376, P97:8.596, P99:9.025, P999:9.802},
  125: { L:0.1535, M:7.0615, S:0.11283, P01:4.935, P1:5.402, P3:5.691, P5:5.85, P10:6.101, P15:6.276, P25:6.541, P50:7.062, P75:7.617, P85:7.929, P90:8.147, P95:8.48, P97:8.701, P99:9.134, P999:9.918},
  130: { L:0.1508, M:7.15, S:0.11237, P01:5.005, P1:5.476, P3:5.768, P5:5.928, P10:6.181, P15:6.357, P25:6.625, P50:7.15, P75:7.71, P85:8.025, P90:8.245, P95:8.58, P97:8.804, P99:9.24, P999:10.03},
  135: { L:0.1481, M:7.2357, S:0.11196, P01:5.073, P1:5.548, P3:5.842, P5:6.003, P10:6.259, P15:6.436, P25:6.707, P50:7.236, P75:7.8, P85:8.118, P90:8.34, P95:8.677, P97:8.903, P99:9.343, P999:10.139},
  140: { L:0.1456, M:7.3187, S:0.11158, P01:5.138, P1:5.617, P3:5.914, P5:6.076, P10:6.334, P15:6.513, P25:6.785, P50:7.319, P75:7.888, P85:8.208, P90:8.431, P95:8.772, P97:8.999, P99:9.443, P999:10.246},
  145: { L:0.1431, M:7.3992, S:0.11123, P01:5.201, P1:5.684, P3:5.983, P5:6.147, P10:6.407, P15:6.587, P25:6.862, P50:7.399, P75:7.972, P85:8.296, P90:8.521, P95:8.864, P97:9.093, P99:9.54, P999:10.349},
  150: { L:0.1406, M:7.4772, S:0.11092, P01:5.262, P1:5.749, P3:6.05, P5:6.215, P10:6.477, P15:6.659, P25:6.935, P50:7.477, P75:8.055, P85:8.38, P90:8.607, P95:8.953, P97:9.184, P99:9.634, P999:10.45},
  155: { L:0.1382, M:7.5528, S:0.11065, P01:5.321, P1:5.811, P3:6.115, P5:6.281, P10:6.545, P15:6.728, P25:7.007, P50:7.553, P75:8.135, P85:8.463, P90:8.692, P95:9.04, P97:9.273, P99:9.727, P999:10.549},
  160: { L:0.1358, M:7.6262, S:0.1104, P01:5.378, P1:5.872, P3:6.178, P5:6.345, P10:6.611, P15:6.796, P25:7.076, P50:7.626, P75:8.213, P85:8.543, P90:8.773, P95:9.125, P97:9.359, P99:9.816, P999:10.645},
  165: { L:0.1335, M:7.6975, S:0.11018, P01:5.433, P1:5.93, P3:6.239, P5:6.407, P10:6.675, P15:6.861, P25:7.144, P50:7.698, P75:8.288, P85:8.621, P90:8.853, P95:9.207, P97:9.443, P99:9.904, P999:10.739},
  170: { L:0.1313, M:7.7669, S:0.10998, P01:5.486, P1:5.987, P3:6.298, P5:6.467, P10:6.737, P15:6.924, P25:7.209, P50:7.767, P75:8.362, P85:8.697, P90:8.931, P95:9.287, P97:9.525, P99:9.989, P999:10.831},
  175: { L:0.129, M:7.8344, S:0.1098, P01:5.538, P1:6.042, P3:6.355, P5:6.526, P10:6.797, P15:6.986, P25:7.273, P50:7.834, P75:8.434, P85:8.771, P90:9.007, P95:9.366, P97:9.605, P99:10.073, P999:10.92},
  180: { L:0.1269, M:7.9002, S:0.10965, P01:5.588, P1:6.096, P3:6.41, P5:6.583, P10:6.856, P15:7.046, P25:7.334, P50:7.9, P75:8.504, P85:8.844, P90:9.081, P95:9.442, P97:9.684, P99:10.155, P999:11.008},
  185: { L:0.1247, M:7.9643, S:0.10951, P01:5.636, P1:6.148, P3:6.464, P5:6.638, P10:6.913, P15:7.104, P25:7.395, P50:7.964, P75:8.572, P85:8.914, P90:9.153, P95:9.517, P97:9.76, P99:10.235, P999:11.094},
  190: { L:0.1226, M:8.0269, S:0.1094, P01:5.683, P1:6.198, P3:6.517, P5:6.691, P10:6.968, P15:7.161, P25:7.453, P50:8.027, P75:8.639, P85:8.984, P90:9.224, P95:9.591, P97:9.836, P99:10.313, P999:11.179},
  195: { L:0.1206, M:8.0879, S:0.10929, P01:5.729, P1:6.247, P3:6.568, P5:6.744, P10:7.022, P15:7.216, P25:7.511, P50:8.088, P75:8.704, P85:9.051, P90:9.293, P95:9.662, P97:9.909, P99:10.39, P999:11.262},
  200: { L:0.1185, M:8.1475, S:0.1092, P01:5.774, P1:6.295, P3:6.618, P5:6.795, P10:7.075, P15:7.27, P25:7.567, P50:8.148, P75:8.767, P85:9.117, P90:9.361, P95:9.732, P97:9.981, P99:10.465, P999:11.343},
  205: { L:0.1165, M:8.2058, S:0.10913, P01:5.817, P1:6.342, P3:6.667, P5:6.844, P10:7.127, P15:7.323, P25:7.621, P50:8.206, P75:8.83, P85:9.182, P90:9.427, P95:9.801, P97:10.051, P99:10.538, P999:11.423},
  210: { L:0.1145, M:8.2627, S:0.10906, P01:5.859, P1:6.387, P3:6.714, P5:6.893, P10:7.177, P15:7.374, P25:7.674, P50:8.263, P75:8.891, P85:9.245, P90:9.492, P95:9.868, P97:10.12, P99:10.611, P999:11.501},
  215: { L:0.1126, M:8.3184, S:0.109, P01:5.901, P1:6.431, P3:6.76, P5:6.94, P10:7.226, P15:7.424, P25:7.726, P50:8.318, P75:8.95, P85:9.307, P90:9.555, P95:9.934, P97:10.187, P99:10.681, P999:11.578},
  220: { L:0.1107, M:8.3729, S:0.10895, P01:5.941, P1:6.475, P3:6.805, P5:6.987, P10:7.274, P15:7.474, P25:7.777, P50:8.373, P75:9.009, P85:9.367, P90:9.617, P95:9.999, P97:10.254, P99:10.751, P999:11.653},
  225: { L:0.1088, M:8.4263, S:0.10891, P01:5.98, P1:6.517, P3:6.85, P5:7.032, P10:7.321, P15:7.522, P25:7.827, P50:8.426, P75:9.066, P85:9.427, P90:9.678, P95:10.062, P97:10.319, P99:10.819, P999:11.727},
  230: { L:0.107, M:8.4787, S:0.10888, P01:6.019, P1:6.559, P3:6.893, P5:7.076, P10:7.367, P15:7.569, P25:7.876, P50:8.479, P75:9.122, P85:9.485, P90:9.738, P95:10.124, P97:10.383, P99:10.886, P999:11.8},
  235: { L:0.1051, M:8.53, S:0.10885, P01:6.056, P1:6.599, P3:6.935, P5:7.12, P10:7.412, P15:7.615, P25:7.924, P50:8.53, P75:9.177, P85:9.542, P90:9.797, P95:10.186, P97:10.445, P99:10.952, P999:11.872},
  240: { L:0.1033, M:8.5804, S:0.10883, P01:6.093, P1:6.639, P3:6.977, P5:7.162, P10:7.456, P15:7.66, P25:7.971, P50:8.58, P75:9.231, P85:9.599, P90:9.855, P95:10.246, P97:10.507, P99:11.017, P999:11.942},
  245: { L:0.1015, M:8.6299, S:0.10882, P01:6.129, P1:6.678, P3:7.018, P5:7.204, P10:7.499, P15:7.704, P25:8.017, P50:8.63, P75:9.285, P85:9.654, P90:9.912, P95:10.305, P97:10.568, P99:11.081, P999:12.012},
  250: { L:0.0998, M:8.6785, S:0.10881, P01:6.165, P1:6.716, P3:7.057, P5:7.245, P10:7.542, P15:7.748, P25:8.062, P50:8.679, P75:9.337, P85:9.708, P90:9.968, P95:10.363, P97:10.627, P99:11.143, P999:12.08},
  255: { L:0.0981, M:8.7264, S:0.1088, P01:6.199, P1:6.753, P3:7.097, P5:7.285, P10:7.583, P15:7.791, P25:8.107, P50:8.726, P75:9.388, P85:9.762, P90:10.023, P95:10.42, P97:10.686, P99:11.205, P999:12.148},
  260: { L:0.0963, M:8.7735, S:0.1088, P01:6.234, P1:6.79, P3:7.135, P5:7.324, P10:7.624, P15:7.833, P25:8.151, P50:8.774, P75:9.439, P85:9.815, P90:10.077, P95:10.477, P97:10.744, P99:11.266, P999:12.215},
  265: { L:0.0947, M:8.82, S:0.1088, P01:6.267, P1:6.827, P3:7.173, P5:7.363, P10:7.665, P15:7.875, P25:8.194, P50:8.82, P75:9.489, P85:9.867, P90:10.13, P95:10.533, P97:10.802, P99:11.326, P999:12.28},
  270: { L:0.093, M:8.8658, S:0.1088, P01:6.3, P1:6.862, P3:7.211, P5:7.402, P10:7.705, P15:7.916, P25:8.236, P50:8.866, P75:9.539, P85:9.918, P90:10.183, P95:10.588, P97:10.858, P99:11.386, P999:12.345},
  275: { L:0.0913, M:8.9109, S:0.10881, P01:6.333, P1:6.898, P3:7.248, P5:7.44, P10:7.744, P15:7.956, P25:8.278, P50:8.911, P75:9.587, P85:9.969, P90:10.235, P95:10.642, P97:10.914, P99:11.445, P999:12.41},
  280: { L:0.0897, M:8.9555, S:0.10882, P01:6.365, P1:6.932, P3:7.284, P5:7.477, P10:7.783, P15:7.996, P25:8.32, P50:8.956, P75:9.635, P85:10.019, P90:10.287, P95:10.696, P97:10.969, P99:11.503, P999:12.473},
  285: { L:0.0881, M:8.9995, S:0.10884, P01:6.396, P1:6.966, P3:7.32, P5:7.514, P10:7.821, P15:8.035, P25:8.361, P50:9, P75:9.683, P85:10.069, P90:10.338, P95:10.749, P97:11.024, P99:11.56, P999:12.536},
  290: { L:0.0865, M:9.0429, S:0.10885, P01:6.428, P1:7, P3:7.355, P5:7.55, P10:7.859, P15:8.074, P25:8.401, P50:9.043, P75:9.73, P85:10.117, P90:10.388, P95:10.801, P97:11.077, P99:11.617, P999:12.598},
  295: { L:0.0849, M:9.0858, S:0.10887, P01:6.458, P1:7.033, P3:7.39, P5:7.586, P10:7.896, P15:8.112, P25:8.441, P50:9.086, P75:9.776, P85:10.166, P90:10.438, P95:10.853, P97:11.131, P99:11.673, P999:12.66},
  300: { L:0.0834, M:9.1282, S:0.10889, P01:6.489, P1:7.066, P3:7.425, P5:7.621, P10:7.933, P15:8.15, P25:8.48, P50:9.128, P75:9.822, P85:10.213, P90:10.487, P95:10.904, P97:11.183, P99:11.729, P999:12.721},
  305: { L:0.0818, M:9.1701, S:0.10891, P01:6.519, P1:7.099, P3:7.459, P5:7.656, P10:7.969, P15:8.187, P25:8.519, P50:9.17, P75:9.867, P85:10.261, P90:10.535, P95:10.955, P97:11.236, P99:11.784, P999:12.781},
  310: { L:0.0803, M:9.2117, S:0.10893, P01:6.548, P1:7.131, P3:7.492, P5:7.691, P10:8.005, P15:8.224, P25:8.557, P50:9.212, P75:9.912, P85:10.307, P90:10.584, P95:11.005, P97:11.287, P99:11.838, P999:12.841},
  315: { L:0.0788, M:9.2528, S:0.10895, P01:6.578, P1:7.163, P3:7.526, P5:7.725, P10:8.041, P15:8.261, P25:8.595, P50:9.253, P75:9.956, P85:10.354, P90:10.631, P95:11.055, P97:11.338, P99:11.892, P999:12.9},
  320: { L:0.0773, M:9.2935, S:0.10898, P01:6.607, P1:7.194, P3:7.559, P5:7.759, P10:8.076, P15:8.297, P25:8.633, P50:9.294, P75:10, P85:10.4, P90:10.678, P95:11.104, P97:11.389, P99:11.946, P999:12.959},
  325: { L:0.0758, M:9.3339, S:0.10901, P01:6.635, P1:7.225, P3:7.591, P5:7.792, P10:8.111, P15:8.333, P25:8.67, P50:9.334, P75:10.044, P85:10.445, P90:10.725, P95:11.153, P97:11.44, P99:11.999, P999:13.017},
  330: { L:0.0744, M:9.3739, S:0.10903, P01:6.664, P1:7.256, P3:7.624, P5:7.825, P10:8.146, P15:8.368, P25:8.708, P50:9.374, P75:10.087, P85:10.49, P90:10.772, P95:11.202, P97:11.49, P99:12.052, P999:13.075},
  335: { L:0.0729, M:9.4136, S:0.10906, P01:6.692, P1:7.287, P3:7.656, P5:7.858, P10:8.18, P15:8.404, P25:8.744, P50:9.414, P75:10.13, P85:10.535, P90:10.818, P95:11.25, P97:11.539, P99:12.104, P999:13.133},
  340: { L:0.0715, M:9.453, S:0.10909, P01:6.72, P1:7.317, P3:7.688, P5:7.891, P10:8.214, P15:8.439, P25:8.781, P50:9.453, P75:10.173, P85:10.58, P90:10.864, P95:11.298, P97:11.589, P99:12.156, P999:13.19},
  345: { L:0.0701, M:9.4922, S:0.10912, P01:6.748, P1:7.347, P3:7.719, P5:7.924, P10:8.248, P15:8.473, P25:8.817, P50:9.492, P75:10.215, P85:10.624, P90:10.909, P95:11.346, P97:11.638, P99:12.208, P999:13.247},
  350: { L:0.0686, M:9.531, S:0.10915, P01:6.775, P1:7.377, P3:7.751, P5:7.956, P10:8.281, P15:8.508, P25:8.853, P50:9.531, P75:10.257, P85:10.668, P90:10.955, P95:11.393, P97:11.686, P99:12.259, P999:13.303},
  355: { L:0.0672, M:9.5696, S:0.10918, P01:6.803, P1:7.407, P3:7.782, P5:7.988, P10:8.315, P15:8.542, P25:8.889, P50:9.57, P75:10.299, P85:10.712, P90:11, P95:11.44, P97:11.734, P99:12.31, P999:13.359},
  360: { L:0.0659, M:9.6079, S:0.10922, P01:6.83, P1:7.436, P3:7.813, P5:8.019, P10:8.348, P15:8.576, P25:8.924, P50:9.608, P75:10.341, P85:10.755, P90:11.044, P95:11.487, P97:11.783, P99:12.361, P999:13.415},
  365: { L:0.0645, M:9.646, S:0.10925, P01:6.857, P1:7.465, P3:7.844, P5:8.051, P10:8.38, P15:8.61, P25:8.959, P50:9.646, P75:10.382, P85:10.798, P90:11.089, P95:11.533, P97:11.83, P99:12.412, P999:13.471},
  370: { L:0.0631, M:9.6838, S:0.10929, P01:6.883, P1:7.494, P3:7.874, P5:8.082, P10:8.413, P15:8.643, P25:8.994, P50:9.684, P75:10.423, P85:10.841, P90:11.133, P95:11.579, P97:11.878, P99:12.462, P999:13.526},
  375: { L:0.0618, M:9.7214, S:0.10933, P01:6.91, P1:7.523, P3:7.904, P5:8.113, P10:8.445, P15:8.676, P25:9.029, P50:9.721, P75:10.464, P85:10.884, P90:11.177, P95:11.625, P97:11.925, P99:12.512, P999:13.581},
  380: { L:0.0605, M:9.7588, S:0.10936, P01:6.936, P1:7.552, P3:7.934, P5:8.144, P10:8.478, P15:8.71, P25:9.063, P50:9.759, P75:10.504, P85:10.926, P90:11.22, P95:11.671, P97:11.972, P99:12.562, P999:13.636},
  385: { L:0.0591, M:9.796, S:0.1094, P01:6.962, P1:7.58, P3:7.964, P5:8.175, P10:8.51, P15:8.743, P25:9.098, P50:9.796, P75:10.544, P85:10.968, P90:11.264, P95:11.716, P97:12.019, P99:12.611, P999:13.691},
  390: { L:0.0578, M:9.833, S:0.10944, P01:6.988, P1:7.608, P3:7.994, P5:8.205, P10:8.541, P15:8.775, P25:9.132, P50:9.833, P75:10.585, P85:11.01, P90:11.307, P95:11.761, P97:12.066, P99:12.66, P999:13.745},
  395: { L:0.0565, M:9.8699, S:0.10948, P01:7.014, P1:7.637, P3:8.023, P5:8.236, P10:8.573, P15:8.808, P25:9.166, P50:9.87, P75:10.625, P85:11.052, P90:11.35, P95:11.807, P97:12.112, P99:12.71, P999:13.799},
  400: { L:0.0552, M:9.9065, S:0.10953, P01:7.039, P1:7.664, P3:8.053, P5:8.266, P10:8.604, P15:8.84, P25:9.2, P50:9.907, P75:10.664, P85:11.093, P90:11.393, P95:11.852, P97:12.159, P99:12.759, P999:13.854},
  405: { L:0.054, M:9.9429, S:0.10957, P01:7.065, P1:7.692, P3:8.082, P5:8.296, P10:8.636, P15:8.872, P25:9.233, P50:9.943, P75:10.704, P85:11.135, P90:11.436, P95:11.896, P97:12.204, P99:12.807, P999:13.907},
  410: { L:0.0527, M:9.9792, S:0.10961, P01:7.09, P1:7.72, P3:8.111, P5:8.326, P10:8.667, P15:8.905, P25:9.267, P50:9.979, P75:10.743, P85:11.176, P90:11.478, P95:11.941, P97:12.25, P99:12.856, P999:13.961},
  415: { L:0.0514, M:10.0154, S:0.10966, P01:7.115, P1:7.747, P3:8.14, P5:8.355, P10:8.698, P15:8.936, P25:9.3, P50:10.015, P75:10.783, P85:11.217, P90:11.521, P95:11.985, P97:12.296, P99:12.904, P999:14.014},
  420: { L:0.0502, M:10.0514, S:0.10971, P01:7.14, P1:7.774, P3:8.169, P5:8.385, P10:8.729, P15:8.968, P25:9.333, P50:10.051, P75:10.822, P85:11.258, P90:11.563, P95:12.029, P97:12.342, P99:12.953, P999:14.068},
  425: { L:0.0489, M:10.0872, S:0.10975, P01:7.165, P1:7.802, P3:8.197, P5:8.414, P10:8.759, P15:9, P25:9.366, P50:10.087, P75:10.861, P85:11.299, P90:11.605, P95:12.073, P97:12.387, P99:13.001, P999:14.121},
  430: { L:0.0477, M:10.123, S:0.1098, P01:7.19, P1:7.829, P3:8.226, P5:8.444, P10:8.79, P15:9.031, P25:9.399, P50:10.123, P75:10.9, P85:11.34, P90:11.647, P95:12.117, P97:12.432, P99:13.049, P999:14.174},
  435: { L:0.0465, M:10.1586, S:0.10985, P01:7.215, P1:7.856, P3:8.254, P5:8.473, P10:8.821, P15:9.063, P25:9.432, P50:10.159, P75:10.938, P85:11.38, P90:11.689, P95:12.161, P97:12.478, P99:13.097, P999:14.227},
  440: { L:0.0453, M:10.1941, S:0.1099, P01:7.24, P1:7.883, P3:8.282, P5:8.502, P10:8.851, P15:9.094, P25:9.465, P50:10.194, P75:10.977, P85:11.421, P90:11.731, P95:12.205, P97:12.523, P99:13.145, P999:14.28},
  445: { L:0.0441, M:10.2294, S:0.10995, P01:7.264, P1:7.909, P3:8.311, P5:8.531, P10:8.881, P15:9.125, P25:9.497, P50:10.229, P75:11.016, P85:11.461, P90:11.772, P95:12.248, P97:12.568, P99:13.192, P999:14.332},
  450: { L:0.0429, M:10.2647, S:0.11, P01:7.288, P1:7.936, P3:8.339, P5:8.56, P10:8.911, P15:9.156, P25:9.53, P50:10.265, P75:11.054, P85:11.501, P90:11.814, P95:12.292, P97:12.612, P99:13.24, P999:14.385},
  455: { L:0.0417, M:10.2998, S:0.11006, P01:7.312, P1:7.962, P3:8.366, P5:8.588, P10:8.941, P15:9.187, P25:9.562, P50:10.3, P75:11.092, P85:11.541, P90:11.855, P95:12.335, P97:12.657, P99:13.287, P999:14.438},
  460: { L:0.0405, M:10.3349, S:0.11011, P01:7.337, P1:7.989, P3:8.394, P5:8.617, P10:8.971, P15:9.218, P25:9.594, P50:10.335, P75:11.13, P85:11.581, P90:11.896, P95:12.379, P97:12.702, P99:13.335, P999:14.49},
  465: { L:0.0393, M:10.3699, S:0.11016, P01:7.361, P1:8.015, P3:8.422, P5:8.646, P10:9.001, P15:9.249, P25:9.626, P50:10.37, P75:11.169, P85:11.621, P90:11.938, P95:12.422, P97:12.746, P99:13.382, P999:14.542},
  470: { L:0.0382, M:10.4048, S:0.11022, P01:7.385, P1:8.041, P3:8.45, P5:8.674, P10:9.031, P15:9.279, P25:9.658, P50:10.405, P75:11.207, P85:11.661, P90:11.979, P95:12.465, P97:12.791, P99:13.429, P999:14.595},
  475: { L:0.037, M:10.4396, S:0.11027, P01:7.409, P1:8.068, P3:8.477, P5:8.703, P10:9.06, P15:9.31, P25:9.69, P50:10.44, P75:11.245, P85:11.701, P90:12.02, P95:12.508, P97:12.835, P99:13.476, P999:14.647},
  480: { L:0.0359, M:10.4743, S:0.11033, P01:7.433, P1:8.094, P3:8.505, P5:8.731, P10:9.09, P15:9.34, P25:9.722, P50:10.474, P75:11.282, P85:11.74, P90:12.061, P95:12.551, P97:12.88, P99:13.523, P999:14.699},
  485: { L:0.0347, M:10.509, S:0.11039, P01:7.456, P1:8.12, P3:8.532, P5:8.759, P10:9.119, P15:9.371, P25:9.754, P50:10.509, P75:11.32, P85:11.78, P90:12.102, P95:12.594, P97:12.924, P99:13.571, P999:14.752},
  490: { L:0.0336, M:10.5435, S:0.11045, P01:7.48, P1:8.145, P3:8.56, P5:8.787, P10:9.149, P15:9.401, P25:9.786, P50:10.544, P75:11.358, P85:11.82, P90:12.143, P95:12.637, P97:12.968, P99:13.617, P999:14.804},
  495: { L:0.0325, M:10.578, S:0.11051, P01:7.503, P1:8.171, P3:8.587, P5:8.815, P10:9.178, P15:9.431, P25:9.817, P50:10.578, P75:11.396, P85:11.859, P90:12.183, P95:12.68, P97:13.013, P99:13.664, P999:14.856},
  500: { L:0.0314, M:10.6125, S:0.11057, P01:7.527, P1:8.197, P3:8.614, P5:8.843, P10:9.207, P15:9.461, P25:9.849, P50:10.613, P75:11.433, P85:11.899, P90:12.224, P95:12.723, P97:13.057, P99:13.711, P999:14.908},
  505: { L:0.0303, M:10.6468, S:0.11063, P01:7.55, P1:8.223, P3:8.641, P5:8.871, P10:9.237, P15:9.492, P25:9.88, P50:10.647, P75:11.471, P85:11.938, P90:12.265, P95:12.765, P97:13.101, P99:13.758, P999:14.96},
  510: { L:0.0292, M:10.6811, S:0.11069, P01:7.574, P1:8.248, P3:8.668, P5:8.899, P10:9.266, P15:9.522, P25:9.912, P50:10.681, P75:11.508, P85:11.977, P90:12.305, P95:12.808, P97:13.145, P99:13.805, P999:15.012},
  515: { L:0.0281, M:10.7153, S:0.11075, P01:7.597, P1:8.274, P3:8.695, P5:8.927, P10:9.295, P15:9.552, P25:9.943, P50:10.715, P75:11.545, P85:12.016, P90:12.346, P95:12.85, P97:13.189, P99:13.851, P999:15.064},
  520: { L:0.027, M:10.7494, S:0.11082, P01:7.62, P1:8.299, P3:8.722, P5:8.954, P10:9.324, P15:9.581, P25:9.974, P50:10.749, P75:11.583, P85:12.056, P90:12.386, P95:12.893, P97:13.233, P99:13.898, P999:15.116},
  525: { L:0.0259, M:10.7835, S:0.11088, P01:7.643, P1:8.325, P3:8.749, P5:8.982, P10:9.353, P15:9.611, P25:10.006, P50:10.784, P75:11.62, P85:12.095, P90:12.427, P95:12.935, P97:13.277, P99:13.945, P999:15.167},
  530: { L:0.0248, M:10.8174, S:0.11095, P01:7.666, P1:8.35, P3:8.775, P5:9.009, P10:9.381, P15:9.641, P25:10.037, P50:10.817, P75:11.657, P85:12.134, P90:12.467, P95:12.978, P97:13.32, P99:13.991, P999:15.219},
  535: { L:0.0238, M:10.8514, S:0.11102, P01:7.689, P1:8.375, P3:8.802, P5:9.037, P10:9.41, P15:9.67, P25:10.068, P50:10.851, P75:11.694, P85:12.173, P90:12.508, P95:13.02, P97:13.364, P99:14.038, P999:15.271},
  540: { L:0.0227, M:10.8852, S:0.11108, P01:7.712, P1:8.4, P3:8.829, P5:9.064, P10:9.439, P15:9.7, P25:10.099, P50:10.885, P75:11.731, P85:12.212, P90:12.548, P95:13.062, P97:13.408, P99:14.084, P999:15.323},
  545: { L:0.0217, M:10.9191, S:0.11115, P01:7.735, P1:8.425, P3:8.855, P5:9.091, P10:9.467, P15:9.73, P25:10.13, P50:10.919, P75:11.768, P85:12.251, P90:12.588, P95:13.105, P97:13.452, P99:14.131, P999:15.375},
  550: { L:0.0206, M:10.9528, S:0.11122, P01:7.758, P1:8.45, P3:8.881, P5:9.119, P10:9.496, P15:9.759, P25:10.161, P50:10.953, P75:11.805, P85:12.289, P90:12.628, P95:13.147, P97:13.495, P99:14.177, P999:15.426},
  555: { L:0.0196, M:10.9865, S:0.11129, P01:7.78, P1:8.475, P3:8.908, P5:9.146, P10:9.524, P15:9.788, P25:10.191, P50:10.987, P75:11.842, P85:12.328, P90:12.668, P95:13.189, P97:13.539, P99:14.224, P999:15.478},
  560: { L:0.0185, M:11.0202, S:0.11137, P01:7.803, P1:8.5, P3:8.934, P5:9.173, P10:9.553, P15:9.818, P25:10.222, P50:11.02, P75:11.879, P85:12.367, P90:12.708, P95:13.232, P97:13.583, P99:14.271, P999:15.53},
  565: { L:0.0175, M:11.0537, S:0.11144, P01:7.825, P1:8.524, P3:8.96, P5:9.2, P10:9.581, P15:9.847, P25:10.253, P50:11.054, P75:11.916, P85:12.406, P90:12.748, P95:13.274, P97:13.626, P99:14.317, P999:15.582},
  570: { L:0.0165, M:11.0873, S:0.11151, P01:7.848, P1:8.549, P3:8.986, P5:9.227, P10:9.609, P15:9.876, P25:10.284, P50:11.087, P75:11.953, P85:12.444, P90:12.788, P95:13.316, P97:13.669, P99:14.363, P999:15.634},
  575: { L:0.0155, M:11.1208, S:0.11159, P01:7.87, P1:8.574, P3:9.012, P5:9.254, P10:9.637, P15:9.905, P25:10.314, P50:11.121, P75:11.99, P85:12.483, P90:12.828, P95:13.358, P97:13.713, P99:14.41, P999:15.686},
  580: { L:0.0144, M:11.1543, S:0.11166, P01:7.892, P1:8.598, P3:9.039, P5:9.281, P10:9.666, P15:9.934, P25:10.345, P50:11.154, P75:12.026, P85:12.522, P90:12.868, P95:13.4, P97:13.757, P99:14.456, P999:15.737},
  585: { L:0.0134, M:11.1877, S:0.11174, P01:7.915, P1:8.623, P3:9.064, P5:9.307, P10:9.694, P15:9.963, P25:10.375, P50:11.188, P75:12.063, P85:12.56, P90:12.908, P95:13.442, P97:13.8, P99:14.502, P999:15.789},
  590: { L:0.0124, M:11.2211, S:0.11182, P01:7.937, P1:8.647, P3:9.09, P5:9.334, P10:9.722, P15:9.992, P25:10.406, P50:11.221, P75:12.1, P85:12.599, P90:12.948, P95:13.484, P97:13.844, P99:14.549, P999:15.841},
  595: { L:0.0114, M:11.2545, S:0.11189, P01:7.959, P1:8.672, P3:9.116, P5:9.361, P10:9.75, P15:10.021, P25:10.436, P50:11.255, P75:12.136, P85:12.637, P90:12.988, P95:13.526, P97:13.887, P99:14.595, P999:15.893},
  600: { L:0.0105, M:11.2878, S:0.11197, P01:7.981, P1:8.696, P3:9.142, P5:9.387, P10:9.778, P15:10.05, P25:10.466, P50:11.288, P75:12.173, P85:12.676, P90:13.028, P95:13.568, P97:13.931, P99:14.641, P999:15.944},
  605: { L:0.0095, M:11.3212, S:0.11205, P01:8.003, P1:8.721, P3:9.168, P5:9.414, P10:9.806, P15:10.079, P25:10.497, P50:11.321, P75:12.21, P85:12.715, P90:13.068, P95:13.61, P97:13.974, P99:14.688, P999:15.996},
  610: { L:0.0085, M:11.3545, S:0.11213, P01:8.025, P1:8.745, P3:9.194, P5:9.441, P10:9.834, P15:10.108, P25:10.527, P50:11.355, P75:12.246, P85:12.753, P90:13.108, P95:13.652, P97:14.018, P99:14.734, P999:16.048},
  615: { L:0.0075, M:11.3878, S:0.11221, P01:8.047, P1:8.769, P3:9.22, P5:9.467, P10:9.862, P15:10.137, P25:10.558, P50:11.388, P75:12.283, P85:12.792, P90:13.148, P95:13.694, P97:14.061, P99:14.781, P999:16.1},
  620: { L:0.0066, M:11.4211, S:0.11229, P01:8.069, P1:8.793, P3:9.245, P5:9.494, P10:9.89, P15:10.166, P25:10.588, P50:11.421, P75:12.319, P85:12.83, P90:13.188, P95:13.736, P97:14.105, P99:14.827, P999:16.152},
  625: { L:0.0056, M:11.4543, S:0.11238, P01:8.091, P1:8.818, P3:9.271, P5:9.52, P10:9.917, P15:10.195, P25:10.618, P50:11.454, P75:12.356, P85:12.869, P90:13.228, P95:13.779, P97:14.148, P99:14.874, P999:16.205},
  630: { L:0.0046, M:11.4876, S:0.11246, P01:8.113, P1:8.842, P3:9.297, P5:9.547, P10:9.945, P15:10.223, P25:10.648, P50:11.488, P75:12.393, P85:12.907, P90:13.268, P95:13.821, P97:14.192, P99:14.92, P999:16.257},
  635: { L:0.0037, M:11.5208, S:0.11254, P01:8.135, P1:8.866, P3:9.322, P5:9.573, P10:9.973, P15:10.252, P25:10.679, P50:11.521, P75:12.429, P85:12.946, P90:13.308, P95:13.863, P97:14.235, P99:14.967, P999:16.309},
  640: { L:0.0027, M:11.554, S:0.11263, P01:8.157, P1:8.89, P3:9.348, P5:9.6, P10:10.001, P15:10.281, P25:10.709, P50:11.554, P75:12.466, P85:12.984, P90:13.348, P95:13.905, P97:14.279, P99:15.014, P999:16.361},
  645: { L:0.0018, M:11.5872, S:0.11271, P01:8.178, P1:8.914, P3:9.373, P5:9.626, P10:10.029, P15:10.31, P25:10.739, P50:11.587, P75:12.502, P85:13.023, P90:13.388, P95:13.947, P97:14.323, P99:15.06, P999:16.413},
  650: { L:0.0008, M:11.6204, S:0.1128, P01:8.2, P1:8.938, P3:9.399, P5:9.652, P10:10.056, P15:10.338, P25:10.769, P50:11.62, P75:12.539, P85:13.061, P90:13.428, P95:13.989, P97:14.366, P99:15.107, P999:16.466},
  655: { L:-0.0001, M:11.6535, S:0.11289, P01:8.222, P1:8.962, P3:9.424, P5:9.679, P10:10.084, P15:10.367, P25:10.799, P50:11.654, P75:12.575, P85:13.1, P90:13.468, P95:14.031, P97:14.41, P99:15.153, P999:16.518},
  660: { L:-0.001, M:11.6866, S:0.11297, P01:8.243, P1:8.986, P3:9.45, P5:9.705, P10:10.112, P15:10.395, P25:10.829, P50:11.687, P75:12.612, P85:13.138, P90:13.507, P95:14.073, P97:14.454, P99:15.2, P999:16.57},
  665: { L:-0.0019, M:11.7198, S:0.11306, P01:8.265, P1:9.01, P3:9.475, P5:9.731, P10:10.139, P15:10.424, P25:10.859, P50:11.72, P75:12.649, P85:13.177, P90:13.547, P95:14.116, P97:14.497, P99:15.247, P999:16.623},
  670: { L:-0.0029, M:11.7528, S:0.11315, P01:8.286, P1:9.034, P3:9.501, P5:9.757, P10:10.167, P15:10.452, P25:10.889, P50:11.753, P75:12.685, P85:13.215, P90:13.587, P95:14.158, P97:14.541, P99:15.293, P999:16.675},
  675: { L:-0.0038, M:11.7859, S:0.11324, P01:8.308, P1:9.058, P3:9.526, P5:9.784, P10:10.194, P15:10.481, P25:10.919, P50:11.786, P75:12.722, P85:13.254, P90:13.627, P95:14.2, P97:14.585, P99:15.34, P999:16.728},
  680: { L:-0.0047, M:11.819, S:0.11333, P01:8.329, P1:9.081, P3:9.551, P5:9.81, P10:10.222, P15:10.51, P25:10.949, P50:11.819, P75:12.758, P85:13.292, P90:13.667, P95:14.242, P97:14.628, P99:15.387, P999:16.78},
  685: { L:-0.0056, M:11.852, S:0.11342, P01:8.351, P1:9.105, P3:9.576, P5:9.836, P10:10.249, P15:10.538, P25:10.979, P50:11.852, P75:12.794, P85:13.331, P90:13.707, P95:14.284, P97:14.672, P99:15.434, P999:16.833},
  690: { L:-0.0065, M:11.885, S:0.11351, P01:8.372, P1:9.129, P3:9.602, P5:9.862, P10:10.277, P15:10.566, P25:11.009, P50:11.885, P75:12.831, P85:13.369, P90:13.747, P95:14.326, P97:14.716, P99:15.48, P999:16.885},
  695: { L:-0.0074, M:11.918, S:0.1136, P01:8.393, P1:9.153, P3:9.627, P5:9.888, P10:10.304, P15:10.595, P25:11.039, P50:11.918, P75:12.867, P85:13.408, P90:13.787, P95:14.368, P97:14.759, P99:15.527, P999:16.938},
  700: { L:-0.0083, M:11.951, S:0.11369, P01:8.415, P1:9.176, P3:9.652, P5:9.914, P10:10.332, P15:10.623, P25:11.069, P50:11.951, P75:12.904, P85:13.446, P90:13.827, P95:14.411, P97:14.803, P99:15.574, P999:16.991},
  705: { L:-0.0092, M:11.9839, S:0.11378, P01:8.436, P1:9.2, P3:9.677, P5:9.94, P10:10.359, P15:10.652, P25:11.099, P50:11.984, P75:12.94, P85:13.485, P90:13.867, P95:14.453, P97:14.847, P99:15.62, P999:17.043},
  710: { L:-0.0101, M:12.0168, S:0.11388, P01:8.457, P1:9.223, P3:9.702, P5:9.966, P10:10.386, P15:10.68, P25:11.129, P50:12.017, P75:12.977, P85:13.523, P90:13.907, P95:14.495, P97:14.89, P99:15.667, P999:17.096},
  715: { L:-0.011, M:12.0497, S:0.11397, P01:8.478, P1:9.247, P3:9.727, P5:9.992, P10:10.413, P15:10.708, P25:11.158, P50:12.05, P75:13.013, P85:13.562, P90:13.946, P95:14.537, P97:14.934, P99:15.714, P999:17.149},
  720: { L:-0.0118, M:12.0826, S:0.11406, P01:8.5, P1:9.271, P3:9.752, P5:10.018, P10:10.441, P15:10.736, P25:11.188, P50:12.083, P75:13.049, P85:13.6, P90:13.986, P95:14.579, P97:14.978, P99:15.761, P999:17.201},
  725: { L:-0.0127, M:12.1154, S:0.11416, P01:8.521, P1:9.294, P3:9.777, P5:10.043, P10:10.468, P15:10.764, P25:11.218, P50:12.115, P75:13.086, P85:13.638, P90:14.026, P95:14.621, P97:15.021, P99:15.808, P999:17.254},
  726: { L:-0.0129, M:12.122, S:0.11418, P01:8.525, P1:9.299, P3:9.782, P5:10.049, P10:10.473, P15:10.77, P25:11.224, P50:12.122, P75:13.093, P85:13.646, P90:14.034, P95:14.63, P97:15.03, P99:15.817, P999:17.265},
};

export default wfaBoys;
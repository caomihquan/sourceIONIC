/**
 * SapIcon icon set component.
 * Usage: <SapIcon name="icon-name" size={20} color="#4F8EF7" />
 */

import { createIconSet } from '@expo/vector-icons';
const glyphMap = {
  "sap-accidental-leave": 57344,
  "sap-account": 57345,
  "sap-wrench": 57346,
  "sap-windows-doors": 57347,
  "sap-washing-machine": 57348,
  "sap-visits": 57349,
  "sap-video": 57350,
  "sap-travel-expense": 57351,
  "sap-temperature": 57352,
  "sap-task": 57383,
  "sap-synchronize": 57354,
  "sap-survey": 57355,
  "sap-settings": 57356,
  "sap-search": 57357,
  "sap-sales-document": 57358,
  "sap-retail-store": 57359,
  "sap-refresh": 57360,
  "sap-product": 57361,
  "sap-present": 57362,
  "sap-ppt-attachment": 57363,
  "sap-pool": 57387,
  "sap-pie-chart": 57365,
  "sap-picture": 57366,
  "sap-photo-voltaic": 57367,
  "sap-phone": 57368,
  "sap-pending": 57369,
  "sap-pdf-attachment": 57370,
  "sap-past": 57371,
  "sap-outgoing-call": 57372,
  "sap-opportunity": 57373,
  "sap-opportunities": 57374,
  "sap-notes": 57375,
  "sap-money-bills": 57376,
  "sap-map": 57377,
  "sap-log": 57378,
  "sap-line-charts": 57379,
  "sap-lightbulb": 57380,
  "sap-leads": 57381,
  "sap-lead": 57382,
  "sap-laptop": 57383,
  "sap-kpi-managing-my-area": 57384,
  "sap-kpi-corporate-performance": 57385,
  "sap-incoming-call": 57386,
  "sap-inbox": 57387,
  "sap-horizontal-bar-chart": 57388,
  "sap-history": 57389,
  "sap-heating-cooling": 57390,
  "sap-gantt-bars": 57391,
  "sap-future": 57392,
  "sap-fridge": 57393,
  "sap-fallback": 57394,
  "sap-expense-report": 57395,
  "sap-excel-attachment": 57396,
  "sap-energy-saving-lightbulb": 57397,
  "sap-employee": 57398,
  "sap-email": 57399,
  "sap-edit": 57400,
  "sap-duplicate": 57401,
  "sap-download": 57402,
  "sap-doc-attachment": 57403,
  "sap-dishwasher": 57404,
  "sap-delete": 57405,
  "sap-decline": 57406,
  "sap-complete": 57407,
  "sap-competitor": 57408,
  "sap-collections-management": 57409,
  "sap-chalkboard": 57410,
  "sap-cart": 57411,
  "sap-card": 57412,
  "sap-camera": 57413,
  "sap-calendar": 57414,
  "sap-begin": 57415,
  "sap-basket": 57416,
  "sap-bar-chart": 57417,
  "sap-attachment": 57418,
  "sap-arrow-top": 57419,
  "sap-arrow-right": 57420,
  "sap-arrow-left": 57421,
  "sap-arrow-bottom": 57422,
  "sap-approvals": 57423,
  "sap-appointment": 57424,
  "sap-alphabetical-order": 57425,
  "sap-along-stacked-chart": 57426,
  "sap-alert": 57427,
  "sap-addresses": 57428,
  "sap-address-book": 57429,
  "sap-add-filter": 57430,
  "sap-add-favorite": 57431,
  "sap-add": 57432,
  "sap-activities": 57433,
  "sap-action": 57434,
  "sap-accept": 57435,
  "sap-hint": 57436,
  "sap-group": 57437,
  "sap-check-availability": 57438,
  "sap-weather-proofing": 57439,
  "sap-payment-approval": 57440,
  "sap-batch-payments": 57441,
  "sap-bed": 57442,
  "sap-arobase": 57443,
  "sap-family-care": 57444,
  "sap-favorite": 57445,
  "sap-navigation-right-arrow": 57446,
  "sap-navigation-left-arrow": 57447,
  "sap-e-care": 57448,
  "sap-less": 57449,
  "sap-lateness": 57450,
  "sap-lab": 57451,
  "sap-internet-browser": 57452,
  "sap-instance": 57453,
  "sap-inspection": 57454,
  "sap-image-viewer": 57455,
  "sap-home": 57456,
  "sap-grid": 57457,
  "sap-goalseek": 57458,
  "sap-general-leave-request": 57459,
  "sap-create-leave-request": 57460,
  "sap-flight": 57461,
  "sap-filter": 57462,
  "sap-favorite-list": 57463,
  "sap-factory": 57464,
  "sap-endoscopy": 57465,
  "sap-employee-pane": 57466,
  "sap-employee-approvals": 57467,
  "sap-email-read": 57468,
  "sap-electrocardiogram": 57469,
  "sap-documents": 57470,
  "sap-decision": 57471,
  "sap-database": 57472,
  "sap-customer-history": 57473,
  "sap-customer": 57474,
  "sap-credit-card": 57475,
  "sap-create-entry-time": 57476,
  "sap-contacts": 57477,
  "sap-compare": 57478,
  "sap-clinical-order": 57479,
  "sap-chain-link": 57480,
  "sap-pull-down": 57481,
  "sap-cargo-train": 57482,
  "sap-car-rental": 57483,
  "sap-business-card": 57484,
  "sap-bar-code": 57485,
  "sap-folder-blank": 57486,
  "sap-passenger-train": 57487,
  "sap-question-mark": 57488,
  "sap-world": 57489,
  "sap-iphone": 57490,
  "sap-ipad": 57491,
  "sap-warning": 57492,
  "sap-sort": 57493,
  "sap-course-book": 57494,
  "sap-course-program": 57495,
  "sap-add-coursebook": 57496,
  "sap-print": 57497,
  "sap-save": 57498,
  "sap-play": 57499,
  "sap-pause": 57500,
  "sap-record": 57501,
  "sap-response": 57502,
  "sap-pushpin-on": 57503,
  "sap-pushpin-off": 57504,
  "sap-unfavorite": 57505,
  "sap-learning-assistant": 57506,
  "sap-timesheet": 57507,
  "sap-time-entry-request": 57508,
  "sap-list": 57509,
  "sap-action-settings": 57510,
  "sap-share": 57511,
  "sap-feed": 57512,
  "sap-role": 57513,
  "sap-flag": 57514,
  "sap-post": 57515,
  "sap-inspect": 57516,
  "sap-inspect-down": 57517,
  "sap-appointment-2": 57518,
  "sap-target-group": 57519,
  "sap-marketing-campaign": 57520,
  "sap-notification": 57521,
  "sap-message-error": 57521,
  "sap-comment": 57522,
  "sap-shipping-status": 57523,
  "sap-collaborate": 57524,
  "sap-shortcut": 57525,
  "sap-lead-outdated": 57526,
  "sap-tools-opportunity": 57527,
  "sap-permission": 57528,
  "sap-supplier": 57529,
  "sap-table-view": 57530,
  "sap-table-chart": 57531,
  "sap-switch-views": 57532,
  "sap-e-learning": 57533,
  "sap-manager": 57534,
  "sap-switch-classes": 57535,
  "sap-simple-payment": 57536,
  "sap-signature": 57537,
  "sap-sales-order-item": 57538,
  "sap-sales-order": 57539,
  "sap-request": 57540,
  "sap-receipt": 57541,
  "sap-puzzle": 57542,
  "sap-process": 57543,
  "sap-private": 57544,
  "sap-popup-window": 57545,
  "sap-person-placeholder": 57546,
  "sap-per-diem": 57547,
  "sap-paper-plane": 57548,
  "sap-paid-leave": 57549,
  "sap-pdf-reader": 57550,
  "sap-overview-chart": 57551,
  "sap-overlay": 57552,
  "sap-org-chart": 57553,
  "sap-number-sign": 57554,
  "sap-notification-2": 57555,
  "sap-my-sales-order": 57556,
  "sap-meal": 57557,
  "sap-loan": 57558,
  "sap-order-status": 57559,
  "sap-customer-order-entry": 57560,
  "sap-performance": 57561,
  "sap-menu": 57562,
  "sap-employee-lookup": 57563,
  "sap-education": 57564,
  "sap-customer-briefing": 57565,
  "sap-customer-and-contacts": 57566,
  "sap-my-view": 57567,
  "sap-accelerated": 57568,
  "sap-to-be-reviewed": 57569,
  "sap-warning2": 57570,
  "sap-feeder-arrow": 57571,
  "sap-quality-issue": 57572,
  "sap-workflow-tasks": 57573,
  "sap-create": 57574,
  "sap-home-share": 57575,
  "sap-globe": 57576,
  "sap-tags": 57577,
  "sap-work-history": 57578,
  "sap-x-ray": 57579,
  "sap-wounds-doc": 57580,
  "sap-web-cam": 57581,
  "sap-waiver": 57582,
  "sap-vertical-bar-chart": 57583,
  "sap-upstacked-chart": 57584,
  "sap-trip-report": 57585,
  "sap-microphone": 57586,
  "sap-unpaid-leave": 57587,
  "sap-tree": 57588,
  "sap-toaster-up": 57589,
  "sap-toaster-top": 57590,
  "sap-toaster-down": 57591,
  "sap-time-account": 57592,
  "sap-theater": 57593,
  "sap-taxi": 57594,
  "sap-subway-train": 57595,
  "sap-study-leave": 57596,
  "sap-stethoscope": 57597,
  "sap-step": 57598,
  "sap-sonography": 57599,
  "sap-soccor": 57600,
  "sap-physical-activity": 57601,
  "sap-pharmacy": 57602,
  "sap-official-service": 57603,
  "sap-offsite-work": 57604,
  "sap-nutrition-activity": 57605,
  "sap-newspaper": 57606,
  "sap-monitor-payments": 57607,
  "sap-map-2": 57608,
  "sap-machine": 57609,
  "sap-mri-scan": 57610,
  "sap-end-user-experience-monitoring": 57611,
  "sap-unwired": 57612,
  "sap-customer-financial-fact-sheet": 57613,
  "sap-retail-store-manager": 57614,
  "sap-Netweaver-business-client": 57615,
  "sap-electronic-medical-record": 57616,
  "sap-eam-work-order": 57617,
  "sap-customer-view": 57618,
  "sap-crm-service-manager": 57619,
  "sap-crm-sales": 57620,
  "sap-widgets": 57621,
  "sap-commission-check": 57622,
  "sap-collections-insight": 57623,
  "sap-clinical-tast-tracker": 57624,
  "sap-citizen-connect": 57625,
  "sap-cart-approval": 57626,
  "sap-capital-projects": 57627,
  "sap-bo-strategy-management": 57628,
  "sap-business-objects-mobile": 57629,
  "sap-business-objects-explorer": 57630,
  "sap-business-objects-experience": 57631,
  "sap-bbyd-dashboard": 57632,
  "sap-bbyd-active-sales": 57633,
  "sap-business-by-design": 57634,
  "sap-business-one": 57635,
  "sap-sap-box": 57636,
  "sap-manager-insight": 57637,
  "sap-accounting-document-verification": 57638,
  "sap-hr-approval": 57639,
  "sap-idea-wall": 57640,
  "sap-Chart-Tree-Map": 57641,
  "sap-cart-5": 57642,
  "sap-cart-4": 57643,
  "sap-wallet": 57644,
  "sap-vehicle-repair": 57645,
  "sap-upload": 57646,
  "sap-unlocked": 57647,
  "sap-umbrella": 57648,
  "sap-travel-request": 57649,
  "sap-travel-expense-report": 57650,
  "sap-travel-itinerary": 57651,
  "sap-time-overtime": 57652,
  "sap-thing-type": 57653,
  "sap-technical-object": 57654,
  "sap-tag": 57655,
  "sap-syringe": 57656,
  "sap-syntax": 57657,
  "sap-suitcase": 57658,
  "sap-simulate": 57659,
  "sap-shield": 57660,
  "sap-share-2": 57661,
  "sap-sales-quote": 57662,
  "sap-repost": 57663,
  "sap-provision": 57664,
  "sap-projector": 57665,
  "sap-add-product": 57666,
  "sap-pipeline-analysis": 57667,
  "sap-add-photo": 57668,
  "sap-palette": 57669,
  "sap-nurse": 57670,
  "sap-sales-notification": 57671,
  "sap-mileage": 57672,
  "sap-meeting-room": 57673,
  "sap-media-forward": 57674,
  "sap-media-play": 57675,
  "sap-media-pause": 57676,
  "sap-media-reverse": 57677,
  "sap-media-rewind": 57678,
  "sap-measurement-document": 57679,
  "sap-measuring-point": 57680,
  "sap-measure": 57681,
  "sap-map-3": 57682,
  "sap-locked": 57683,
  "sap-letter": 57684,
  "sap-journey-arrive": 57685,
  "sap-journey-change": 57686,
  "sap-journey-depart": 57687,
  "sap-it-system": 57688,
  "sap-it-instance": 57689,
  "sap-it-host": 57690,
  "sap-iphone-2": 57691,
  "sap-ipad-2": 57692,
  "sap-inventory": 57693,
  "sap-insurance-house": 57694,
  "sap-insurance-life": 57695,
  "sap-insurance-car": 57696,
  "sap-initiative": 57697,
  "sap-incident": 57698,
  "sap-group-2": 57699,
  "sap-goal": 57700,
  "sap-functional-location": 57701,
  "sap-full-screen": 57702,
  "sap-form": 57703,
  "sap-fob-watch": 57704,
  "sap-blank-tag": 57705,
  "sap-family-protection": 57706,
  "sap-folder": 57707,
  "sap-fax-machine": 57708,
  "sap-example": 57709,
  "sap-eraser": 57710,
  "sap-employee-rejections": 57711,
  "sap-drop-down-list": 57712,
  "sap-draw-rectangle": 57713,
  "sap-document": 57714,
  "sap-doctor": 57715,
  "sap-discussion-2": 57716,
  "sap-discussion": 57717,
  "sap-dimension": 57718,
  "sap-customer-and-supplier": 57719,
  "sap-crop": 57720,
  "sap-add-contact": 57721,
  "sap-compare-2": 57722,
  "sap-color-fill": 57723,
  "sap-collision": 57724,
  "sap-curriculum": 57725,
  "sap-chart-axis": 57726,
  "sap-full-stacked-chart": 57727,
  "sap-full-stacked-column-chart": 57728,
  "sap-vertical-bar-chart-2": 57729,
  "sap-horizontal-bar-chart-2": 57730,
  "sap-horizontal-stacked-chart": 57731,
  "sap-vertical-stacked-chart": 57732,
  "sap-choropleth-chart": 57733,
  "sap-geographic-bubble-chart": 57734,
  "sap-multiple-radar-chart": 57735,
  "sap-radar-chart": 57736,
  "sap-crossed-line-chart": 57737,
  "sap-multiple-line-chart": 57738,
  "sap-multiple-bar-chart": 57739,
  "sap-line-chart": 57740,
  "sap-line-chart-dual-axis": 57741,
  "sap-bubble-chart": 57742,
  "sap-scatter-chart": 57743,
  "sap-multiple-pie-chart": 57744,
  "sap-column-chart-dual-axis": 57745,
  "sap-tag-cloud-chart": 57746,
  "sap-area-chart": 57747,
  "sap-cause": 57748,
  "sap-cart-3": 57749,
  "sap-cart-2": 57750,
  "sap-bus-public-transport": 57751,
  "sap-burglary": 57752,
  "sap-building": 57753,
  "sap-border": 57754,
  "sap-bookmark": 57755,
  "sap-badge": 57756,
  "sap-attachment-audio": 57757,
  "sap-attachment-video": 57758,
  "sap-attachment-html": 57759,
  "sap-attachment-photo": 57760,
  "sap-attachment-e-pub": 57761,
  "sap-attachment-zip-file": 57762,
  "sap-attachment-text-file": 57763,
  "sap-add-equipment": 57764,
  "sap-add-activity": 57765,
  "sap-activity-individual": 57766,
  "sap-activity-2": 57767,
  "sap-add-activity-2": 57768,
  "sap-activity-items": 57769,
  "sap-activity-assigned-to-goal": 57770,
  "sap-status-completed": 57771,
  "sap-status-positive": 57771,
  "sap-status-error": 57772,
  "sap-status-negative": 57772,
  "sap-status-inactive": 57773,
  "sap-status-in-process": 57774,
  "sap-status-critical": 57774,
  "sap-blank-tag-2": 57775,
  "sap-cart-full": 57776,
  "sap-locate-me": 57777,
  "sap-paging": 57778,
  "sap-company-view": 57779,
  "sap-document-text": 57780,
  "sap-explorer": 57781,
  "sap-personnel-view": 57782,
  "sap-sorting-ranking": 57783,
  "sap-drill-down": 57784,
  "sap-drill-up": 57785,
  "sap-vds-file": 57786,
  "sap-sap-logo-shape": 57787,
  "sap-folder-full": 57788,
  "sap-system-exit": 57789,
  "sap-system-exit-2": 57790,
  "sap-close-command-field": 57791,
  "sap-open-command-field": 57792,
  "sap-sys-enter-2": 57793,
  "sap-sys-enter": 57794,
  "sap-sys-help-2": 57795,
  "sap-sys-help": 57796,
  "sap-sys-back": 57797,
  "sap-sys-back-2": 57798,
  "sap-sys-cancel": 57799,
  "sap-sys-cancel-2": 57800,
  "sap-open-folder": 57801,
  "sap-sys-find-next": 57802,
  "sap-sys-find": 57803,
  "sap-sys-monitor": 57804,
  "sap-sys-prev-page": 57805,
  "sap-sys-first-page": 57806,
  "sap-sys-next-page": 57807,
  "sap-sys-last-page": 57808,
  "sap-generate-shortcut": 57809,
  "sap-create-session": 57810,
  "sap-display-more": 57811,
  "sap-enter-more": 57812,
  "sap-zoom-in": 57813,
  "sap-zoom-out": 57814,
  "sap-header": 57815,
  "sap-detail-view": 57816,
  "sap-show-edit": 57816,
  "sap-collapse": 57817,
  "sap-expand": 57818,
  "sap-positive": 57819,
  "sap-negative": 57820,
  "sap-display": 57821,
  "sap-menu2": 57822,
  "sap-redo": 57823,
  "sap-undo": 57824,
  "sap-navigation-up-arrow": 57825,
  "sap-navigation-down-arrow": 57826,
  "sap-down": 57827,
  "sap-up": 57828,
  "sap-shelf": 57829,
  "sap-background": 57830,
  "sap-resize": 57831,
  "sap-move": 57832,
  "sap-show": 57833,
  "sap-hide": 57834,
  "sap-nav-back": 57835,
  "sap-error": 57836,
  "sap-slim-arrow-right": 57837,
  "sap-slim-arrow-left": 57838,
  "sap-slim-arrow-down": 57839,
  "sap-slim-arrow-up": 57840,
  "sap-forward": 57841,
  "sap-overflow": 57842,
  "sap-value-help": 57843,
  "sap-multi-select": 57844,
  "sap-exit-full-screen": 57845,
  "sap-sys-add": 57846,
  "sap-sys-minus": 57847,
  "sap-dropdown": 57848,
  "sap-expand-group": 57849,
  "sap-collapse-group": 57856,
  "sap-vertical-grip": 57850,
  "sap-horizontal-grip": 57851,
  "sap-sort-descending": 57852,
  "sap-sort-ascending": 57853,
  "sap-arrow-down": 57854,
  "sap-legend": 57855,
  "sap-message-warning": 57857,
  "sap-message-information": 57858,
  "sap-message-success": 57859,
  "sap-restart": 57860,
  "sap-stop": 57861,
  "sap-add-process": 57862,
  "sap-cancel-maintenance": 57863,
  "sap-activate": 57864,
  "sap-resize-horizontal": 57865,
  "sap-resize-vertical": 57866,
  "sap-connected": 57867,
  "sap-disconnected": 57868,
  "sap-edit-outside": 57869,
  "sap-key": 57870,
  "sap-minimize": 57871,
  "sap-back-to-top": 57872,
  "sap-hello-world": 57873,
  "sap-outbox": 57874,
  "sap-donut-chart": 57875,
  "sap-heatmap-chart": 57876,
  "sap-horizontal-bullet-chart": 57877,
  "sap-vertical-bullet-chart": 57878,
  "sap-call": 57879,
  "sap-download-from-cloud": 57880,
  "sap-upload-to-cloud": 57881,
  "sap-jam": 57882,
  "sap-sap-ui5": 57883,
  "sap-message-popup": 57884,
  "sap-cloud": 57885,
  "sap-horizontal-waterfall-chart": 57886,
  "sap-vertical-waterfall-chart": 57887,
  "sap-broken-link": 57888,
  "sap-headset": 57889,
  "sap-thumb-up": 57890,
  "sap-thumb-down": 57891,
  "sap-multiselect-all": 57892,
  "sap-multiselect-none": 57893,
  "sap-scissors": 57894,
  "sap-sound": 57895,
  "sap-sound-loud": 57896,
  "sap-sound-off": 57897,
  "sap-date-time": 57898,
  "sap-user-settings": 57899,
  "sap-key-user-settings": 57900,
  "sap-developer-settings": 57901,
  "sap-text-formatting": 57902,
  "sap-bold-text": 57903,
  "sap-italic-text": 57904,
  "sap-underline-text": 57905,
  "sap-text-align-justified": 57906,
  "sap-text-align-left": 57907,
  "sap-text-align-center": 57908,
  "sap-text-align-right": 57909,
  "sap-bullet-text": 57910,
  "sap-numbered-text": 57911,
  "sap-co": 57912,
  "sap-ui-notifications": 57913,
  "sap-bell": 57914,
  "sap-cancel-share": 57915,
  "sap-write-new-document": 57916,
  "sap-write-new": 57917,
  "sap-cancel": 57918,
  "sap-screen-split-one": 57919,
  "sap-screen-split-two": 57920,
  "sap-screen-split-three": 57921,
  "sap-customize": 57922,
  "sap-user-edit": 57923,
  "sap-source-code": 57924,
  "sap-copy": 57925,
  "sap-paste": 57926,
  "sap-line-chart-time-axis": 57927,
  "sap-clear-filter": 57928,
  "sap-reset": 57929,
  "sap-trend-up": 57930,
  "sap-trend-down": 57931,
  "sap-cursor-arrow": 57932,
  "sap-add-document": 57933,
  "sap-create-form": 57934,
  "sap-resize-corner": 57935,
  "sap-chevron-phase": 57936,
  "sap-chevron-phase-2": 57937,
  "sap-rhombus-milestone": 57938,
  "sap-rhombus-milestone-2": 57939,
  "sap-circle-task": 57940,
  "sap-circle-task-2": 57941,
  "sap-project-definition-triangle": 57942,
  "sap-project-definition-triangle-2": 57943,
  "sap-master-task-triangle": 57944,
  "sap-master-task-triangle-2": 57945,
  "sap-program-triangles": 57946,
  "sap-program-triangles-2": 57947,
  "sap-mirrored-task-circle": 57948,
  "sap-mirrored-task-circle-2": 57949,
  "sap-checklist-item": 57950,
  "sap-checklist-item-2": 57951,
  "sap-checklist": 57952,
  "sap-checklist-2": 57953,
  "sap-chart-table-view": 57954,
  "sap-filter-analytics": 57955,
  "sap-filter-facets": 57956,
  "sap-filter-fields": 57957,
  "sap-indent": 57958,
  "sap-outdent": 57959,
  "sap-heading1": 57960,
  "sap-heading2": 57961,
  "sap-heading3": 57962,
  "sap-decrease-line-height": 57963,
  "sap-increase-line-height": 57964,
  "sap-fx": 57965,
  "sap-add-folder": 57966,
  "sap-away": 57967,
  "sap-busy": 57968,
  "sap-appear-offline": 57969,
  "sap-blur": 57970,
  "sap-pixelate": 57971,
  "sap-horizontal-combination-chart": 57972,
  "sap-add-employee": 57973,
  "sap-text-color": 57974,
  "sap-browse-folder": 57975,
  "sap-primary-key": 57976,
  "sap-two-keys": 57977,
  "sap-strikethrough": 57978,
  "sap-text": 57979,
  "sap-responsive": 57980,
  "sap-desktop-mobile": 57981,
  "sap-table-row": 57982,
  "sap-table-column": 57983,
  "sap-validate": 57984,
  "sap-keyboard-and-mouse": 57985,
  "sap-touch": 57986,
  "sap-expand-all": 57987,
  "sap-collapse-all": 57988,
  "sap-icon-heart": 57344,
  "sap-icon-quarter": 57345,
  "sap-icon-year": 57346,
  "sap-icon-equalizer": 57347,
  "sap-icon-component": 57348,
  "sap-icon-component-private": 57349,
  "sap-icon-raw-material": 57350,
  "sap-icon-sms": 57351,
  "sap-icon-add-note": 57352,
  "sap-icon-change-time-horizon": 57353,
  "sap-icon-table-chart-customization": 57354,
  "sap-icon-delegated-important-task": 57355,
  "sap-icon-forklift": 57356,
  "sap-icon-coins": 57357,
  "sap-icon-filter-menu": 57358,
  "sap-icon-target-to-date": 57359,
  "sap-icon-program": 57360,
  "sap-icon-phase": 57361,
  "sap-icon-checklist": 57362,
  "sap-icon-mirrored-task": 57363,
  "sap-icon-sub-project": 57364,
  "sap-icon-checklist-item": 57365,
  "sap-icon-adhoc-analysis": 57366,
  "sap-icon-change-analysis": 57367,
  "sap-icon-review-demands": 57368,
  "sap-icon-project-definition": 57369,
  "sap-icon-data-access": 57370,
  "sap-icon-define-shortage": 57371,
  "sap-icon-review-supplies": 57372,
  "sap-icon-change-log": 57373,
  "sap-icon-priority-1": 57374,
  "sap-icon-priority-2": 57375,
  "sap-icon-jam": 57376,
  "sap-icon-milestone": 57377,
  "sap-icon-bulleting-with-numbers": 57378,
  "sap-icon-decrease-indent": 57379,
  "sap-icon-increase-indent": 57380,
  "sap-icon-bold": 57381,
  "sap-icon-italic": 57382,
  "sap-icon-strike-through": 57383,
  "sap-icon-underline": 57384,
  "sap-icon-save-as": 57385,
  "sap-icon-segmentation": 57386,
  "sap-icon-context-menu": 57387,
  "sap-icon-snapshot": 57388,
  "sap-icon-substraction-b-a": 57389,
  "sap-icon-substraction-a-b": 57390,
  "sap-icon-intersection": 57391,
  "sap-icon-union": 57392,
  "sap-icon-top": 57393,
  "sap-icon-bottom": 57394,
  "sap-icon-page-up": 57395,
  "sap-icon-page-down": 57396,
  "sap-icon-create-dashboard": 57397,
  "sap-icon-excelsius-file": 57398,
  "sap-icon-open-folder": 57399,
  "sap-icon-neutral": 57400,
  "sap-icon-split-segmentation": 57401,
  "sap-icon-manage-budget": 57402,
  "sap-icon-blocked": 57403,
  "sap-icon-pipette": 57404,
  "sap-icon-top-recipe": 57405,
  "sap-icon-recipe": 57406,
  "sap-icon-ingredients": 57407,
  "sap-icon-multiple-charts": 57408,
  "sap-icon-descending-bars": 57409,
  "sap-icon-descending-stacked-bars": 57410,
  "sap-icon-scatter-plot": 57411,
  "sap-icon-spill": 57412,
  "sap-icon-fire": 57413,
  "sap-icon-stratification": 57414,
  "sap-icon-relationship": 57415,
  "sap-icon-margin-decomposition": 57416,
  "sap-icon-control-group": 57417,
  "sap-icon-bullet-chart": 57441,
  "sap-icon-responsible-area": 57419,
  "sap-icon-increase": 57420,
  "sap-icon-decrease": 57421,
  "sap-icon-current-stock": 57422,
  "sap-icon-expedite": 57423,
  "sap-icon-postpone": 57424,
  "sap-icon-approved": 57425,
  "sap-icon-partially-delivered": 57426,
  "sap-icon-line-bar-chart": 57427,
  "sap-icon-expand-all": 57428,
  "sap-icon-submission": 57429,
  "sap-icon-change-request": 57430,
  "sap-icon-column-unselected": 57431,
  "sap-icon-column-selected": 57432,
  "sap-icon-row-unselected": 57433,
  "sap-icon-row-selected": 57434,
  "sap-icon-stock-requirements": 57435,
  "sap-icon-gender-male-and-female": 57436,
  "sap-icon-icon-marital-status": 57437,
  "sap-icon-birthday": 57438,
  "sap-icon-classification": 57439,
  "sap-icon-marked-for-deletion": 57440,
  "sap-icon-remove-filter": 57442,
  "sap-icon-bank-account": 57443,
  "sap-icon-savings-account": 57444,
  "sap-icon-debit-card": 57445,
  "sap-icon-vip-customer": 57446,
  "sap-icon-undesirable-customer": 57447,
  "sap-icon-answered-change-request": 57448,
  "sap-icon-collected-change-request": 57449,
  "sap-icon-draw-freehand": 57450,
  "sap-icon-draw-circle": 57451,
  "sap-icon-completed": 57452,
  "sap-icon-answered": 57453,
  "sap-icon-traffic-cone": 57454,
  "sap-icon-traffic-lights": 57455,
  "sap-icon-container": 57456,
  "sap-icon-container-loading": 57457,
  "sap-icon-traffic-jam": 57458,
  "sap-icon-products": 57459,
  "sap-icon-sidepanel": 57460,
  "sap-icon-split-screen": 57461,
  "sap-icon-truck-driver": 57567,
  "sap-icon-keep-segment": 57463,
  "sap-icon-exclude-segment": 57464,
  "sap-icon-separate-segments": 57465,
  "sap-icon-distribute-segments": 57466,
  "sap-icon-next-open-item": 57467,
  "sap-icon-where-used": 57468,
  "sap-icon-outbound-delivery": 57469,
  "sap-icon-outbound-delivery-inactive": 57470,
  "sap-icon-outbound-delivery-active": 57471,
  "sap-icon-target": 57472,
  "sap-icon-source": 57473,
  "sap-icon-material": 57474,
  "sap-icon-due-date": 57475,
  "sap-icon-overdue": 57476,
  "sap-icon-set-as-default": 57477,
  "sap-icon-face-very-bad": 57478,
  "sap-icon-face-bad": 57479,
  "sap-icon-face-skeptical": 57480,
  "sap-icon-face-neutral": 57481,
  "sap-icon-face-astonished": 57482,
  "sap-icon-face-happy": 57483,
  "sap-icon-face-very-happy": 57484,
  "sap-icon-face-awful": 57485,
  "sap-icon-face-devastated": 57486,
  "sap-icon-face-okey-dokey": 57487,
  "sap-icon-alarm": 57488,
  "sap-icon-activate": 57489,
  "sap-icon-segment-preview-reference-objects": 57490,
  "sap-icon-radius": 57491,
  "sap-icon-polygon-black": 57492,
  "sap-icon-polygon-white": 57493,
  "sap-icon-polygon": 57494,
  "sap-icon-no-filter": 57495,
  "sap-icon-grip": 57496,
  "sap-icon-water": 57498,
  "sap-icon-liquid": 57500,
  "sap-icon-gas": 57499,
  "sap-icon-gas-2": 57501,
  "sap-icon-water-2": 57502,
  "sap-icon-operator": 57503,
  "sap-icon-target-filter": 57504,
  "sap-icon-equipment": 57505,
  "sap-icon-gis-layer": 57506,
  "sap-icon-section": 57507,
  "sap-icon-kohorte": 57508,
  "sap-icon-female": 57509,
  "sap-icon-male": 57510,
  "sap-icon-model": 57511,
  "sap-icon-hourglass": 57512,
  "sap-icon-plain-grid-layout": 57513,
  "sap-icon-top-panel-layout": 57514,
  "sap-icon-2x1-grid-layout": 57515,
  "sap-icon-1x2-grid-layout": 57516,
  "sap-icon-side-panel-left-layout": 57517,
  "sap-icon-2x2-grid-layout": 57518,
  "sap-icon-inverse-t-layout": 57519,
  "sap-icon-t-layout": 57520,
  "sap-icon-top-side-panel-layout": 57521,
  "sap-icon-side-top-panel-layout": 57522,
  "sap-icon-4x4-grid-layout": 57523,
  "sap-icon-add-point": 57524,
  "sap-icon-add-polyline": 57525,
  "sap-icon-add-polygone": 57526,
  "sap-icon-email-send-delayed": 57527,
  "sap-icon-email-not-opened": 57528,
  "sap-icon-link-not-clicked": 57529,
  "sap-icon-sms-send-delayed": 57530,
  "sap-icon-ab-testing": 57531,
  "sap-icon-tv": 57532,
  "sap-icon-radio": 57533,
  "sap-icon-outdoor": 57534,
  "sap-icon-event": 57535,
  "sap-icon-paid-search": 57536,
  "sap-icon-display-ads": 57537,
  "sap-icon-call-center": 57538,
  "sap-icon-social": 57539,
  "sap-icon-event2": 57540,
  "sap-icon-official-service-group": 57541,
  "sap-icon-time-deposit": 57542,
  "sap-icon-early-widthdrawal-for-time-deposits": 57543,
  "sap-icon-aggregated-view": 57544,
  "sap-icon-detailed-view": 57545,
  "sap-icon-rescheduling": 57546,
  "sap-icon-resequencing": 57547,
  "sap-icon-movement-warning": 57548,
  "sap-icon-multiple-warnings": 57549,
  "sap-icon-box-truck": 57550,
  "sap-icon-box-truck-empty": 57551,
  "sap-icon-tractor": 57536,
  "sap-icon-driver": 57553,
  "sap-icon-driver-warning": 57554,
  "sap-icon-overlap": 57555,
  "sap-icon-expand-overlap": 57556,
  "sap-icon-collapse-overlap": 57557,
  "sap-icon-utilization": 57558,
  "sap-icon-expand-utilization": 57559,
  "sap-icon-collapse-utilization": 57560,
  "sap-icon-trailer": 57559,
  "sap-icon-container-closed": 57562,
  "sap-icon-railcar": 57563,
  "sap-icon-warehouse": 57564,
  "sap-icon-goods": 57565,
  "sap-icon-ship": 57566,
  "sap-icon-return-delivery": 57568,
  "sap-icon-return-order": 57569,
  "sap-icon-contract": 57570,
  "sap-icon-business-partner": 57571,
  "sap-icon-business-partner-verified": 57572,
  "sap-icon-business-partner-anonymous": 57573,
  "sap-icon-business-partner-self-identified": 57574,
  "sap-icon-money-withdrawal": 57575,
  "sap-icon-truck-load": 57576,
  "sap-icon-truck-load-unload": 57578,
  "sap-icon-truck-unload": 57577,
  "sap-icon-pharmacy": 57579,
  "sap-icon-medicine-syrup": 57580,
  "sap-icon-reminder": 57581,
  "sap-icon-medicine-pill": 57582,
  "sap-icon-medicine-ointment": 57583,
  "sap-icon-medicine-drops": 57584,
  "sap-icon-blood-test": 57585,
  "sap-icon-temperature": 57586,
  "sap-icon-allergies": 57593,
  "sap-icon-immunization": 57592,
  "sap-icon-blood-pressure": 57591,
  "sap-icon-health-tracking": 57590,
  "sap-icon-weight": 57589,
  "sap-icon-foot-steps": 57588,
  "sap-icon-medicine-inhaler": 57587,
  "sap-icon-rescheduling2": 57594,
  "sap-icon-resequencing2": 57595,
  "sap-icon-no-time-change": 57596,
  "sap-icon-time-change": 57597,
  "sap-icon-smart-matcher": 57598,
  "sap-icon-3d": 57599,
  "sap-icon-parallel-sequence": 57600,
  "sap-icon-alternative-sequence": 57601,
  "sap-icon-main-sequence": 57602,
  "sap-icon-refinery": 57603,
  "sap-icon-terminal": 57604,
  "sap-icon-vessel": 57605,
  "sap-icon-barge": 57606,
  "sap-icon-road": 57607,
  "sap-icon-pipeline": 57608,
  "sap-icon-delay": 57609,
  "sap-icon-legal-section": 57610,
  "sap-icon-causes": 57611,
  "sap-icon-effects": 57612,
  "sap-icon-shared-by-me": 57613,
  "sap-icon-shared-with-me": 57614,
  "sap-icon-main-milestone": 57615,
  "sap-icon-indicator-groups": 57616,
  "sap-icon-alert-groups": 57617,
  "sap-technicalsystem": 57344,
  "sap-systemjava": 57345,
  "sap-systemabap": 57346,
  "sap-systemrecommendations": 57347,
  "sap-system": 57348,
  "sap-systemtrex": 57349,
  "sap-systemtracks": 57350,
  "sap-technicalscenario": 57351,
  "sap-technicalinstance": 57352,
  "sap-throughput-backlog": 57353,
  "sap-batch-processing": 57354,
  "sap-database-consistency": 57355,
  "sap-intermediate-message": 57356,
  "sap-exceptions": 57357,
  "sap-system-hana": 57358,
  "sap-python": 57359,
  "sap-raise-fault": 57360,
  "sap-code1": 57361,
  "sap-code2": 57362,
  "sap-spike-arrest": 57363,
  "sap-verify-api": 57364,
  "sap-user": 57365,
  "sap-note": 57366,
  "sap-throwing-message": 57367,
  "sap-catching-message": 57368,
  "sap-start-event": 57369,
  "sap-end-event": 57370,
  "sap-gateway": 57371,
  "sap-sub-process-marker": 57372,
  "sap-ad-hoc-marker": 57373,
  "sap-manual-task": 57374,
  "sap-send-task": 57375,
  "sap-receive-task": 57376,
  "sap-script-task": 57377,
  "sap-marquee": 57378,
  "sap-data-input-arrow": 57379,
  "sap-data-output-arrow": 57380,
  "sap-more": 57381,
  "sap-pattern": 57382,
  "sap-arrow": 57384,
  "sap-data": 57385,
  "sap-data-store": 57386,
  "sap-swimlane": 57388,
  "sap-select": 57389,
  "sap-cursor": 57390,
  "sap-api": 57391,
  "sap-o-data": 57392,
  "sap-java": 57393,
  "sap-value-mapping": 57394,
  "sap-terminate-end-event": 57395,
  "sap-parallel-gateway": 57396,
  "sap-exclusive-gateway": 57397,
  "sap-service-task": 57398,
  "sap-workflow-editor": 57399,
  "sap-boundary-interrupting": 57400,
  "sap-boundary-non-interrupting": 57401,
  "md-checkbox-outline": 57390
};

const iconSet = createIconSet(glyphMap, 'SAP-icons');

export default iconSet;
export const {
  Button,
  TabBarItem,
  TabBarItemIOS,
  getImageSource,
  getImageSourceSync,
} = iconSet;


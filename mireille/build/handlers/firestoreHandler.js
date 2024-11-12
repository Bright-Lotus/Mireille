export var converter = function () { return ({
    toFirestore: function (data) { return data !== null && data !== void 0 ? data : {}; },
    fromFirestore: function (snap) { return snap.data(); },
}); };

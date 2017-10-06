function runCustom() {
    'use strict';

    if (window.$ === undefined ||
        window.someOtherDependency === undefined
    ) {
        setTimeout(function() {
            runCustom();
        }, 10);
        return;
    }

    //…do stuff
}
runCustom();

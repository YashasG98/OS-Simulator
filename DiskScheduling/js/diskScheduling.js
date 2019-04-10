function FCFSDisk() {
    arr = []
    arr = [37, 200, 40, 250, 100, 2, 45, 64] //for testing
    seekTime = 0
    hpos = 0;
    hpos = 50 //for testing
    var i;
    for (i = 0; i < arr.length; i++) {
        seekTime += Math.abs(hpos - arr[i]);
        hpos = arr[i];
    }
    console.log("Final seek time : ", seekTime)
    console.log("Track Sequence : ", arr)
}

function SSTFDisk() {
    var arr = []
    arr = [37, 200, 40, 250, 100, 2, 45, 64] //for testing
    var seekTime = 0
    hpos = 0
    hpos = 50
    var i;
    var resultSeq = []
    arr = arr.sort(function (a, b) { return a - b })
    var done = 0;
    while (done == 0) {
        if (hpos <= arr[0]) {
            for (i = 0; i < arr.length; i++) {
                seekTime += Math.abs(hpos - arr[i]);
                hpos = arr[i];
                resultSeq.push(arr[i])
            }
            done = 1;
        }
        else if (hpos >= arr[arr.length - 1]) {
            for (i = arr.length - 1; i >= 0; i--) {
                seekTime += Math.abs(hpos - arr[i]);
                hpos = arr[i];
                resultSeq.push(arr[i])
            }
            done = 1;
        }
        else {
            for (i = 0; i < arr.length; i++) {
                if (arr[i] > hpos) {
                    d1 = Math.abs(hpos - arr[i]);
                    d2 = Math.abs(hpos - arr[i - 1]);
                    if (d1 < d2) {
                        resultSeq.push(arr[i])
                        hpos = arr[i];
                        seekTime += d1;
                        arr.splice(i, 1)
                        break;
                    }
                    else {
                        resultSeq.push(arr[i - 1])
                        hpos = arr[i - 1];
                        seekTime += d2;
                        arr.splice(i - 1, 1)
                        break;
                    }
                }
            }
        }
    }
    console.log("Final seek time : ", seekTime);
    console.log("Final track sequence : ", resultSeq);
}

function SCANDisk() {
    var arr = []
    arr = [37, 200, 40, 250, 100, 2, 45, 64] //for testing
    var seekTime = 0
    hpos = 0;
    hpos = 260 //for testing
    var firstTrack = 0        //testing
    var lastTrack = 300       //testing
    var i;
    var resultSeq = []
    arr = arr.sort(function (a, b) { return a - b })
    var direction = 1 //0 for left and 1 for right
    if (direction == 0) {
        if (hpos < arr[0]) {
            seekTime += hpos - firstTrack
            hpos = firstTrack
            for (i = 0; i < arr.length; i++) {
                seekTime += arr[i] - hpos;
                resultSeq.push(arr[i])
                hpos = arr[i]
            }
        }
        else if (hpos > arr[arr.length - 1]) {
            for (i = arr.length - 1; i >= 0; i--) {
                seekTime += hpos - arr[i]
                resultSeq.push(arr[i])
                hpos = arr[i]
            }
        }
        else {
            for (i = arr.length - 1; i >= 0; i--) {
                if (arr[i] <= hpos)
                    break;
            }
            //console.log(i,arr[i])
            for (var j = i; j >= 0; j--) {
                seekTime += hpos - arr[j]
                resultSeq.push(arr[j])
                hpos = arr[j]
            }

            if (i != arr.length-1) {
                seekTime += hpos -firstTrack
                hpos = firstTrack
                for (j = i + 1; j < arr.length; j++) {
                    seekTime += arr[j] - hpos
                    hpos = arr[j]
                    resultSeq.push(arr[j])
                }
            }
        }
    }
    else {
        if (hpos < arr[0]) {
            for (i = 0; i < arr.length; i++) {
                seekTime += arr[i] - hpos;
                resultSeq.push(arr[i])
                hpos = arr[i]
            }
        }
        else if (hpos > arr[arr.length - 1]) {
            seekTime += lastTrack - hpos
            hpos = lastTrack
            for (i = arr.length - 1; i >= 0; i--) {
                seekTime += hpos - arr[i]
                resultSeq.push(arr[i])
                hpos = arr[i]
            }
        }
        else {
            for (i = 0; i < arr.length; i++) {
                if (arr[i] >= hpos)
                    break;
            }
            for (var j = i; j < arr.length; j++) {
                seekTime += arr[j] - hpos
                resultSeq.push(arr[j])
                hpos = arr[j]
            }

            if (i != 0) {
                seekTime += lastTrack - hpos
                hpos = lastTrack
                for (j = i - 1; j >= 0; j--) {
                    seekTime += hpos - arr[j]
                    hpos = arr[j]
                    resultSeq.push(arr[j])
                }
            }
        }
    }
    console.log("Final seek time : ", seekTime);
    console.log("Final track sequence : ", resultSeq);
}

function CSANDisk(){

}

function LOOKDisk(){
    var arr = []
    arr = [37, 200, 40, 250, 100, 2, 45, 64] //for testing
    var seekTime = 0
    hpos = 0;
    hpos = 251 //for testing
    var i;
    var resultSeq = []
    arr = arr.sort(function (a, b) { return a - b })
    var direction = 0 //0 for left and 1 for right
    if (direction == 0) {
        if (hpos < arr[0]) {
            for (i = 0; i < arr.length; i++) {
                seekTime += arr[i] - hpos;
                resultSeq.push(arr[i])
                hpos = arr[i]
            }
        }
        else if (hpos > arr[arr.length - 1]) {
            for (i = arr.length - 1; i >= 0; i--) {
                seekTime += hpos - arr[i]
                resultSeq.push(arr[i])
                hpos = arr[i]
            }
        }
        else {
            for (i = arr.length - 1; i >= 0; i--) {
                if (arr[i] <= hpos)
                    break;
            }
            //console.log(i,arr[i])
            for (var j = i; j >= 0; j--) {
                seekTime += hpos - arr[j]
                resultSeq.push(arr[j])
                hpos = arr[j]
            }

            if (i != arr.length-1) {
                for (j = i + 1; j < arr.length; j++) {
                    seekTime += arr[j] - hpos
                    hpos = arr[j]
                    resultSeq.push(arr[j])
                }
            }
        }
    }
    else {
        if (hpos < arr[0]) {
            for (i = 0; i < arr.length; i++) {
                seekTime += arr[i] - hpos;
                resultSeq.push(arr[i])
                hpos = arr[i]
            }
        }
        else if (hpos > arr[arr.length - 1]) {
            for (i = arr.length - 1; i >= 0; i--) {
                seekTime += hpos - arr[i]
                resultSeq.push(arr[i])
                hpos = arr[i]
            }
        }
        else {
            for (i = 0; i < arr.length; i++) {
                if (arr[i] >= hpos)
                    break;
            }
            for (var j = i; j < arr.length; j++) {
                seekTime += arr[j] - hpos
                resultSeq.push(arr[j])
                hpos = arr[j]
            }

            if (i != 0) {
                for (j = i - 1; j >= 0; j--) {
                    seekTime += hpos - arr[j]
                    hpos = arr[j]
                    resultSeq.push(arr[j])
                }
            }
        }
    }
    console.log("Final seek time : ", seekTime);
    console.log("Final track sequence : ", resultSeq);
}

function CLOOKDisk(){

}
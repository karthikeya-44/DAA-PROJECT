/* =========================================
   SORTING ALGORITHM VISUALIZER
   Full Interactive Version
========================================= */


/* ---------- GLOBAL VARIABLES ---------- */

let array = [];

let originalArray = [];

let operations = [];

let currentOperation = 0;

let comparisons = 0;

let swaps = 0;

let sorting = false;

let paused = false;

let startTime = 0;

let elapsedTime = 0;

let timerInterval = null;

let selectedAlgorithm = "bubble";

let sortDirection = "asc";


/* ---------- DOM ELEMENTS ---------- */

const bars =
    document.getElementById("bars");

const algorithmButtons =
    document.querySelectorAll(".algorithm");

const algorithmTitle =
    document.getElementById("algorithmTitle");

const algorithmDescription =
    document.getElementById(
        "algorithmDescription"
    );

const longDescription =
    document.getElementById(
        "longDescription"
    );

const timeComplexity =
    document.getElementById(
        "timeComplexity"
    );

const spaceComplexity =
    document.getElementById(
        "spaceComplexity"
    );

const pseudoCode =
    document.getElementById(
        "pseudoCode"
    );

const implementationCode =
    document.getElementById(
        "implementationCode"
    );

const comparisonsDisplay =
    document.getElementById(
        "comparisons"
    );

const swapsDisplay =
    document.getElementById(
        "swaps"
    );

const timeDisplay =
    document.getElementById(
        "time"
    );

const progressDisplay =
    document.getElementById(
        "progress"
    );

const elementCount =
    document.getElementById(
        "elementCount"
    );

const operationText =
    document.getElementById(
        "operationText"
    );

const statusText =
    document.getElementById(
        "statusText"
    );

const statusDot =
    document.getElementById(
        "statusDot"
    );

const arraySize =
    document.getElementById(
        "arraySize"
    );

const sizeValue =
    document.getElementById(
        "sizeValue"
    );

const speed =
    document.getElementById(
        "speed"
    );

const speedValue =
    document.getElementById(
        "speedValue"
    );

const direction =
    document.getElementById(
        "direction"
    );


/* ---------- ALGORITHM INFORMATION ---------- */

const algorithmInfo = {

    bubble: {

        title: "Bubble Sort",

        description:
            "Bubble Sort repeatedly compares adjacent elements and swaps them when they are in the wrong order.",

        longDescription:
            "Bubble Sort is one of the simplest sorting algorithms. It repeatedly compares neighboring elements. If they are in the wrong order, they are swapped. After every pass, an element reaches its correct position.",

        time: "O(n²)",

        space: "O(1)",
implementation:
`def bubble_sort(arr):

    for i in range(len(arr)):

        for j in range(0, len(arr) - i - 1):

            if arr[j] > arr[j + 1]:

                arr[j], arr[j + 1] = \
                arr[j + 1], arr[j]

    return arr`,
pseudo:
`for i = 0 to n-1
    for j = 0 to n-i-1
        compare array[j] and array[j+1]
        if elements are in wrong order
            swap elements`

    },


   selection: {

    title: "Selection Sort",

    description:
        "Selection Sort finds the minimum or maximum element and places it into its correct position.",

    longDescription:
        "Selection Sort divides the array into sorted and unsorted portions. It repeatedly searches the unsorted portion for the correct element and swaps it into position.",

    time: "O(n²)",

    space: "O(1)",

   implementation:
`def selection_sort(arr):

    for i in range(len(arr) - 1):

        min_index = i

        for j in range(i + 1, len(arr)):

            if arr[j] < arr[min_index]:
                min_index = j

        if min_index != i:

            arr[i], arr[min_index] = \
            arr[min_index], arr[i]

    return arr`,

    pseudo:
`for i = 0 to n-1
    find minimum element
    compare remaining elements
    swap minimum with array[i]`

},


    insertion: {

    title: "Insertion Sort",

    description:
        "Insertion Sort builds the sorted array one element at a time by inserting each element into its correct position.",

    longDescription:
        "Insertion Sort divides the array into sorted and unsorted portions. It takes one element from the unsorted portion and inserts it into the correct position in the sorted portion.",

    time: "O(n²)",

    space: "O(1)",

    implementation:
`def insertion_sort(arr):

    for i in range(1, len(arr)):

        key = arr[i]

        j = i - 1

        while j >= 0 and arr[j] > key:

            arr[j + 1] = arr[j]

            j -= 1

        arr[j + 1] = key

    return arr`,

    pseudo:
`for i = 1 to n-1
    key = array[i]
    compare key with previous elements
    move larger elements one position right
    insert key into correct position`

},


    merge: {

    title: "Merge Sort",

    description:
        "Merge Sort divides the array into smaller parts, sorts them, and then merges the sorted parts.",

    longDescription:
        "Merge Sort uses a divide-and-conquer approach. It repeatedly divides the array into two halves until single elements remain, then merges the smaller sorted arrays to produce the final sorted array.",

    time: "O(n log n)",

    space: "O(n)",

implementation:
`def merge_sort(arr):

    if len(arr) <= 1:
        return arr

    mid = len(arr) // 2

    left = merge_sort(arr[:mid])

    right = merge_sort(arr[mid:])

    return merge(left, right)


def merge(left, right):

    result = []

    i = 0
    j = 0

    while i < len(left) and j < len(right):

        if left[i] <= right[j]:

            result.append(left[i])
            i += 1

        else:

            result.append(right[j])
            j += 1

    result.extend(left[i:])
    result.extend(right[j:])

    return result`,

    pseudo:
`if array has one element
    return array

divide array into two halves
sort left half
sort right half
merge the two sorted halves`

},


    quick: {

    title: "Quick Sort",

    description:
        "Quick Sort selects a pivot element and partitions the array around the pivot.",

    longDescription:
        "Quick Sort uses a divide-and-conquer approach. It selects a pivot element and rearranges the array so that smaller elements are placed before the pivot and larger elements are placed after it. The process is then repeated recursively.",

    time: "O(n log n)",

    space: "O(log n)",

   implementation:
`def quick_sort(arr):

    if len(arr) <= 1:
        return arr

    pivot = arr[-1]

    left = []
    right = []

    for i in range(len(arr) - 1):

        if arr[i] < pivot:
            left.append(arr[i])

        else:
            right.append(arr[i])

    return (
        quick_sort(left)
        + [pivot]
        + quick_sort(right)
    )`,

    pseudo:
`choose a pivot element
partition array around pivot
place smaller elements on left
place larger elements on right
recursively sort left and right parts`

},


    heap: {

    title: "Heap Sort",

    description:
        "Heap Sort builds a heap structure and repeatedly removes the largest element to sort the array.",

    longDescription:
        "Heap Sort first builds a max heap from the array. It then repeatedly moves the largest element to the end of the array and restores the heap property until all elements are sorted.",

    time: "O(n log n)",

    space: "O(1)",

   implementation:
`def heap_sort(arr):

    n = len(arr)


    def heapify(n, i):

        largest = i

        left = 2 * i + 1
        right = 2 * i + 2


        if left < n and arr[left] > arr[largest]:
            largest = left


        if right < n and arr[right] > arr[largest]:
            largest = right


        if largest != i:

            arr[i], arr[largest] = \
            arr[largest], arr[i]

            heapify(n, largest)


    for i in range(n // 2 - 1, -1, -1):

        heapify(n, i)


    for i in range(n - 1, 0, -1):

        arr[0], arr[i] = \
        arr[i], arr[0]

        heapify(i, 0)


    return arr`,

    pseudo:
`build a max heap
for each element from end to beginning
    swap root with last element
    reduce heap size
    restore heap property`

},

};


/* ---------- ORDER CHECK ---------- */

function isWrongOrder(a, b) {

    if (sortDirection === "asc") {

        return a > b;

    }

    return a < b;
}


/* ---------- CREATE OPERATION ---------- */

function addOperation(
    type,
    data = {}
) {

    operations.push({
        type,
        ...data
    });
}


/* =========================================
   BUBBLE SORT
========================================= */

function createBubbleOperations() {

    const arr = [...array];

    const n = arr.length;

    for (let i = 0; i < n - 1; i++) {

        let changed = false;

        for (
            let j = 0;
            j < n - i - 1;
            j++
        ) {

            addOperation(
                "compare",
                {
                    indices: [j, j + 1]
                }
            );

            if (
                isWrongOrder(
                    arr[j],
                    arr[j + 1]
                )
            ) {

                [
                    arr[j],
                    arr[j + 1]
                ] = [
                    arr[j + 1],
                    arr[j]
                ];

                addOperation(
                    "swap",
                    {
                        indices: [j, j + 1]
                    }
                );

                changed = true;
            }
        }

        if (!changed) {
            break;
        }
    }

    addOperation("complete");
}


/* =========================================
   SELECTION SORT
========================================= */

function createSelectionOperations() {

    const arr = [...array];

    const n = arr.length;

    for (let i = 0; i < n - 1; i++) {

        let selected = i;

        for (
            let j = i + 1;
            j < n;
            j++
        ) {

            addOperation(
                "compare",
                {
                    indices: [
                        selected,
                        j
                    ]
                }
            );

            if (
                isWrongOrder(
                    arr[selected],
                    arr[j]
                )
            ) {

                selected = j;
            }
        }

        if (selected !== i) {

            [
                arr[i],
                arr[selected]
            ] = [
                arr[selected],
                arr[i]
            ];

            addOperation(
                "swap",
                {
                    indices: [
                        i,
                        selected
                    ]
                }
            );
        }
    }

    addOperation("complete");
}


/* =========================================
   INSERTION SORT
========================================= */

function createInsertionOperations() {

    const arr = [...array];

    for (
        let i = 1;
        i < arr.length;
        i++
    ) {

        let j = i;

        while (j > 0) {

            addOperation(
                "compare",
                {
                    indices: [
                        j - 1,
                        j
                    ]
                }
            );

            if (
                isWrongOrder(
                    arr[j - 1],
                    arr[j]
                )
            ) {

                [
                    arr[j - 1],
                    arr[j]
                ] = [
                    arr[j],
                    arr[j - 1]
                ];

                addOperation(
                    "swap",
                    {
                        indices: [
                            j - 1,
                            j
                        ]
                    }
                );

                j--;

            } else {

                break;
            }
        }
    }

    addOperation("complete");
}


/* =========================================
   MERGE SORT
========================================= */

function createMergeOperations() {

    const arr = [...array];

    function mergeSort(
        left,
        right
    ) {

        if (left >= right) {
            return;
        }

        const mid =
            Math.floor(
                (left + right) / 2
            );

        mergeSort(
            left,
            mid
        );

        mergeSort(
            mid + 1,
            right
        );

        const leftPart =
            arr.slice(
                left,
                mid + 1
            );

        const rightPart =
            arr.slice(
                mid + 1,
                right + 1
            );

        let i = 0;

        let j = 0;

        let k = left;

        while (
            i < leftPart.length &&
            j < rightPart.length
        ) {

            addOperation(
                "compare",
                {
                    indices: [k]
                }
            );

            let value;

            if (
                !isWrongOrder(
                    leftPart[i],
                    rightPart[j]
                )
            ) {

                value =
                    leftPart[i];

                i++;

            } else {

                value =
                    rightPart[j];

                j++;
            }

            arr[k] = value;

            addOperation(
                "overwrite",
                {
                    index: k,
                    value: value
                }
            );

            k++;
        }


        while (
            i < leftPart.length
        ) {

            arr[k] =
                leftPart[i];

            addOperation(
                "overwrite",
                {
                    index: k,
                    value:
                        leftPart[i]
                }
            );

            i++;

            k++;
        }


        while (
            j < rightPart.length
        ) {

            arr[k] =
                rightPart[j];

            addOperation(
                "overwrite",
                {
                    index: k,
                    value:
                        rightPart[j]
                }
            );

            j++;

            k++;
        }
    }


    mergeSort(
        0,
        arr.length - 1
    );

    addOperation("complete");
}


/* =========================================
   QUICK SORT
========================================= */

function createQuickOperations() {

    const arr = [...array];


    function quickSort(
        low,
        high
    ) {

        if (low >= high) {
            return;
        }

        const pivot =
            arr[high];

        let i = low;


        for (
            let j = low;
            j < high;
            j++
        ) {

            addOperation(
                "compare",
                {
                    indices: [
                        j,
                        high
                    ]
                }
            );

            let shouldMove;

            if (
                sortDirection === "asc"
            ) {

                shouldMove =
                    arr[j] < pivot;

            } else {

                shouldMove =
                    arr[j] > pivot;
            }


            if (shouldMove) {

                [
                    arr[i],
                    arr[j]
                ] = [
                    arr[j],
                    arr[i]
                ];

                addOperation(
                    "swap",
                    {
                        indices: [
                            i,
                            j
                        ]
                    }
                );

                i++;
            }
        }


        [
            arr[i],
            arr[high]
        ] = [
            arr[high],
            arr[i]
        ];

        addOperation(
            "swap",
            {
                indices: [
                    i,
                    high
                ]
            }
        );


        quickSort(
            low,
            i - 1
        );

        quickSort(
            i + 1,
            high
        );
    }


    quickSort(
        0,
        arr.length - 1
    );

    addOperation("complete");
}


/* =========================================
   HEAP SORT
========================================= */

function createHeapOperations() {

    const arr = [...array];

    const n = arr.length;


    function shouldComeBefore(
        a,
        b
    ) {

        if (
            sortDirection === "asc"
        ) {

            return a > b;

        }

        return a < b;
    }


    function heapify(
        size,
        root
    ) {

        let selected = root;

        const left =
            2 * root + 1;

        const right =
            2 * root + 2;


        if (
            left < size
        ) {

            addOperation(
                "compare",
                {
                    indices: [
                        selected,
                        left
                    ]
                }
            );

            if (
                shouldComeBefore(
                    arr[left],
                    arr[selected]
                )
            ) {

                selected = left;
            }
        }


        if (
            right < size
        ) {

            addOperation(
                "compare",
                {
                    indices: [
                        selected,
                        right
                    ]
                }
            );

            if (
                shouldComeBefore(
                    arr[right],
                    arr[selected]
                )
            ) {

                selected = right;
            }
        }


        if (
            selected !== root
        ) {

            [
                arr[root],
                arr[selected]
            ] = [
                arr[selected],
                arr[root]
            ];

            addOperation(
                "swap",
                {
                    indices: [
                        root,
                        selected
                    ]
                }
            );


            heapify(
                size,
                selected
            );
        }
    }


    for (
        let i =
            Math.floor(n / 2) - 1;
        i >= 0;
        i--
    ) {

        heapify(
            n,
            i
        );
    }


    for (
        let end = n - 1;
        end > 0;
        end--
    ) {

        [
            arr[0],
            arr[end]
        ] = [
            arr[end],
            arr[0]
        ];

        addOperation(
            "swap",
            {
                indices: [
                    0,
                    end
                ]
            }
        );


        heapify(
            end,
            0
        );
    }


    addOperation("complete");
}


/* =========================================
   CREATE OPERATIONS
========================================= */

function createOperations() {

    operations = [];

    currentOperation = 0;

    if (
        selectedAlgorithm === "bubble"
    ) {

        createBubbleOperations();

    } else if (
        selectedAlgorithm === "selection"
    ) {

        createSelectionOperations();

    } else if (
        selectedAlgorithm === "insertion"
    ) {

        createInsertionOperations();

    } else if (
        selectedAlgorithm === "merge"
    ) {

        createMergeOperations();

    } else if (
        selectedAlgorithm === "quick"
    ) {

        createQuickOperations();

    } else if (
        selectedAlgorithm === "heap"
    ) {

        createHeapOperations();
    }
}


/* =========================================
   DRAW ARRAY
========================================= */

function drawBars(
    highlight = [],
    mode = ""
) {

    bars.innerHTML = "";

    if (
        array.length === 0
    ) {
        return;
    }


    const maxValue =
        Math.max(
            ...array.map(
                value => Math.abs(value)
            )
        ) || 1;


    array.forEach(
        (value, index) => {

            const bar =
                document.createElement(
                    "div"
                );

            bar.className = "bar";

            const height =
                Math.max(
                    5,
                    (
                        Math.abs(value) /
                        maxValue
                    ) * 90
                );


            bar.style.height =
                height + "%";


            bar.dataset.value =
                value;


            if (
                highlight.includes(
                    index
                )
            ) {

                if (
                    mode === "compare"
                ) {

                    bar.classList.add(
                        "comparing"
                    );

                } else if (
                    mode === "swap"
                ) {

                    bar.classList.add(
                        "swapping"
                    );
                }
            }


            bars.appendChild(bar);
        }
    );
}


/* =========================================
   EXECUTE OPERATION
========================================= */

function executeOperation() {

    if (
        currentOperation >=
        operations.length
    ) {

        finishSorting();

        return true;
    }


    const operation =
        operations[
            currentOperation
        ];


    if (
        operation.type === "compare"
    ) {

        comparisons++;

        drawBars(
            operation.indices,
            "compare"
        );

        operationText.textContent =
            "Comparing elements";

    }


    else if (
        operation.type === "swap"
    ) {

        const [
            first,
            second
        ] = operation.indices;


        [
            array[first],
            array[second]
        ] = [
            array[second],
            array[first]
        ];


        swaps++;


        drawBars(
            operation.indices,
            "swap"
        );


        operationText.textContent =
            "Swapping elements";
    }


    else if (
        operation.type === "overwrite"
    ) {

        array[
            operation.index
        ] = operation.value;


        drawBars(
            [operation.index],
            "swap"
        );


        operationText.textContent =
            "Merging elements";
    }


    else if (
        operation.type === "complete"
    ) {

        finishSorting();

        return true;
    }


    currentOperation++;

    updateStatistics();

    return false;
}


/* =========================================
   START SORTING
========================================= */

async function startSorting() {

    if (
        sorting &&
        !paused
    ) {
        return;
    }


    if (
        operations.length === 0 ||
        currentOperation >=
        operations.length
    ) {

        comparisons = 0;

        swaps = 0;

        currentOperation = 0;

        array = [
            ...originalArray
        ];

        createOperations();
    }


    if (!sorting) {

        startTime =
            performance.now() -
            elapsedTime;

        startTimer();
    }


    sorting = true;

    paused = false;

    setStatus(
        "Sorting",
        "#f59e0b"
    );


    while (
        sorting &&
        !paused
    ) {

        const finished =
            executeOperation();


        if (finished) {
            break;
        }


        await delay(
            Number(
                speed.value
            )
        );
    }
}


/* =========================================
   STEP
========================================= */

function stepSorting() {

    if (sorting) {
        return;
    }


    if (
        operations.length === 0 ||
        currentOperation >=
        operations.length
    ) {

        comparisons = 0;

        swaps = 0;

        elapsedTime = 0;

        currentOperation = 0;

        array = [
            ...originalArray
        ];

        createOperations();
    }


    setStatus(
        "Step Mode",
        "#7c3aed"
    );


    executeOperation();

    updateStatistics();
}


/* =========================================
   PAUSE
========================================= */

function pauseSorting() {

    if (!sorting) {
        return;
    }


    paused = true;

    sorting = false;

    elapsedTime =
        performance.now() -
        startTime;


    stopTimer();


    setStatus(
        "Paused",
        "#f59e0b"
    );

    operationText.textContent =
        "Animation paused";
}


/* =========================================
   FINISH
========================================= */

function finishSorting() {

    sorting = false;

    paused = false;

    currentOperation =
        operations.length;


    drawBars();

    markAllSorted();


    elapsedTime =
        performance.now() -
        startTime;


    stopTimer();

    updateStatistics();


    setStatus(
        "Completed",
        "#22c55e"
    );


    operationText.textContent =
        "Sorting completed successfully";
}


/* =========================================
   MARK SORTED
========================================= */

function markAllSorted() {

    const allBars =
        document.querySelectorAll(
            ".bar"
        );


    allBars.forEach(
        bar => {

            bar.classList.remove(
                "comparing"
            );

            bar.classList.remove(
                "swapping"
            );

            bar.classList.add(
                "sorted"
            );
        }
    );
}


/* =========================================
   RESET
========================================= */

function resetArray() {

    sorting = false;

    paused = false;

    stopTimer();


    array = [
        ...originalArray
    ];


    operations = [];

    currentOperation = 0;

    comparisons = 0;

    swaps = 0;

    elapsedTime = 0;


    updateStatistics();

    drawBars();


    setStatus(
        "Ready",
        "#22c55e"
    );


    operationText.textContent =
        "Ready to sort";
}


/* =========================================
   GENERATE ARRAY
========================================= */

function generateArray() {

    sorting = false;

    paused = false;

    stopTimer();


    const size =
        Number(
            arraySize.value
        );


    array = [];


    for (
        let i = 0;
        i < size;
        i++
    ) {

        array.push(
            Math.floor(
                Math.random() * 90
            ) + 10
        );
    }


    originalArray =
        [...array];


    operations = [];

    currentOperation = 0;

    comparisons = 0;

    swaps = 0;

    elapsedTime = 0;


    updateStatistics();

    drawBars();


    setStatus(
        "Ready",
        "#22c55e"
    );


    operationText.textContent =
        "New random array generated";
}


/* =========================================
   CUSTOM ARRAY
========================================= */

function applyCustomArray() {

    const input =
        document.getElementById(
            "customInput"
        ).value;


    const values =
        input
            .split(",")
            .map(
                value =>
                    Number(
                        value.trim()
                    )
            )
            .filter(
                value =>
                    Number.isFinite(
                        value
                    )
            );


    if (
        values.length < 2
    ) {

        alert(
            "Please enter at least two valid numbers."
        );

        return;
    }


    if (
        values.length > 60
    ) {

        alert(
            "Please enter a maximum of 60 numbers."
        );

        return;
    }


    sorting = false;

    paused = false;

    stopTimer();


    array =
        [...values];


    originalArray =
        [...values];


    arraySize.value =
        values.length;


    sizeValue.textContent =
        values.length;


    operations = [];

    currentOperation = 0;

    comparisons = 0;

    swaps = 0;

    elapsedTime = 0;


    updateStatistics();

    drawBars();


    setStatus(
        "Ready",
        "#22c55e"
    );


    operationText.textContent =
        "Custom array loaded";
}


/* =========================================
   UPDATE STATISTICS
========================================= */

function updateStatistics() {

    comparisonsDisplay.textContent =
        comparisons;


    swapsDisplay.textContent =
        swaps;


    elementCount.textContent =
        array.length;


    let percentage = 0;


    if (
        operations.length > 0
    ) {

        percentage =
            Math.min(
                100,
                Math.round(
                    (
                        currentOperation /
                        operations.length
                    ) * 100
                )
            );
    }


    progressDisplay.textContent =
        percentage + "%";


    updateTime();
}


/* =========================================
   TIMER
========================================= */

function startTimer() {

    stopTimer();


    timerInterval =
        setInterval(
            () => {

                elapsedTime =
                    performance.now() -
                    startTime;


                updateTime();

            },
            50
        );
}


function stopTimer() {

    if (
        timerInterval
    ) {

        clearInterval(
            timerInterval
        );

        timerInterval = null;
    }
}


function updateTime() {

    timeDisplay.textContent =
        Math.round(
            elapsedTime
        ) + " ms";
}


/* =========================================
   DELAY
========================================= */

function delay(ms) {

    return new Promise(
        resolve =>
            setTimeout(
                resolve,
                ms
            )
    );
}


/* =========================================
   STATUS
========================================= */

function setStatus(
    text,
    color
) {

    statusText.textContent =
        text;

    statusDot.style.background =
        color;
}


/* =========================================
   UPDATE ALGORITHM INFO
========================================= */

function updateAlgorithmInfo() {

    const info =
        algorithmInfo[
            selectedAlgorithm
        ];

    algorithmTitle.textContent =
        info.title;

    algorithmDescription.textContent =
        info.description;

    longDescription.textContent =
        info.longDescription;

    timeComplexity.textContent =
        info.time;

    spaceComplexity.textContent =
        info.space;

    implementationCode.textContent =
        info.implementation;

    pseudoCode.textContent =
        info.pseudo;
}

/* =========================================
   ALGORITHM BUTTONS
========================================= */

algorithmButtons.forEach(
    button => {

        button.addEventListener(
            "click",
            () => {

                if (sorting) {

                    pauseSorting();
                }


                algorithmButtons
                    .forEach(
                        item =>
                            item.classList
                                .remove(
                                    "active"
                                )
                    );


                button.classList.add(
                    "active"
                );


                selectedAlgorithm =
                    button.dataset.algorithm;


                updateAlgorithmInfo();


                resetArray();

            }
        );

    }
);


/* =========================================
   BUTTON EVENTS
========================================= */

document
    .getElementById(
        "generateBtn"
    )
    .addEventListener(
        "click",
        generateArray
    );


document
    .getElementById(
        "startBtn"
    )
    .addEventListener(
        "click",
        startSorting
    );


document
    .getElementById(
        "pauseBtn"
    )
    .addEventListener(
        "click",
        pauseSorting
    );


document
    .getElementById(
        "stepBtn"
    )
    .addEventListener(
        "click",
        stepSorting
    );


document
    .getElementById(
        "resetBtn"
    )
    .addEventListener(
        "click",
        resetArray
    );


document
    .getElementById(
        "applyBtn"
    )
    .addEventListener(
        "click",
        applyCustomArray
    );


/* =========================================
   ARRAY SIZE
========================================= */

arraySize.addEventListener(
    "input",
    () => {

        sizeValue.textContent =
            arraySize.value;

        generateArray();
    }
);


/* =========================================
   SPEED
========================================= */

speed.addEventListener(
    "input",
    () => {

        speedValue.textContent =
            speed.value + " ms";
    }
);


/* =========================================
   DIRECTION
========================================= */

direction.addEventListener(
    "change",
    () => {

        sortDirection =
            direction.value;

        resetArray();

        operationText.textContent =
            sortDirection === "asc"
                ? "Ascending order selected"
                : "Descending order selected";
    }
);


/* =========================================
   DARK MODE
========================================= */

document
    .getElementById(
        "themeBtn"
    )
    .addEventListener(
        "click",
        () => {

            document.body.classList.toggle(
                "dark"
            );


            const dark =
                document.body.classList.contains(
                    "dark"
                );


            document.getElementById(
                "themeBtn"
            ).textContent =
                dark
                    ? "☀️"
                    : "🌙";
        }
    );


/* =========================================
   KEYBOARD SHORTCUTS
========================================= */

document.addEventListener(
    "keydown",
    event => {

        if (
            event.code === "Space"
        ) {

            event.preventDefault();

            if (sorting) {

                pauseSorting();

            } else {

                startSorting();
            }
        }


        if (
            event.key.toLowerCase()
            === "s"
        ) {

            stepSorting();
        }


        if (
            event.key.toLowerCase()
            === "r"
        ) {

            resetArray();
        }
    }
);


/* =========================================
   INITIALIZE
========================================= */

generateArray();

updateAlgorithmInfo();

updateStatistics();
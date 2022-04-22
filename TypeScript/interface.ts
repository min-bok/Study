// function printLabel(labeledObj: { label: string }) {
//     console.log(labeledObj.label);
// }

// let myObj = {size: 10, label: "Size 10 Object"};
// printLabel(myObj);

interface LabeledValue {
    label: string;
}

function printLabel(labeledObj: LabeledValue) {
    console.log(labeledObj.label);
}

let myObj = {
    size: 10, 
    label: "its a label"
};

printLabel(myObj);
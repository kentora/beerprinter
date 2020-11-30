function prepareImage(){
    var files = document.getElementById("theFile").files;

    if(files.length != 1){
        console.error("Please provide 1 and only 1 file.");
        return;
    }

    var file = files[0];

    if(file.type != "image/png"){
        console.error("Please provide an png image...");
        return;
    }

    var reader = new FileReader();
    reader.onload = function(){
        openAndPrint(reader.result);
    }

    reader.readAsDataURL(file);
}

function openAndPrint(b64){
    var frame = document.createElement("iframe");
    frame.style.display = "none";
    frame.src = "print.html";
    frame.addEventListener("load", function(){
        var elem;
        for(var i = 0; i < 8; i++){
            elem = frame.contentDocument.createElement("img");
            elem.src = b64;
            elem.id = "label" + i;
            elem.classList.add("beerlabel");
            elem.classList.add(i % 2 == 0 ? "even" : "odd");
            frame.contentDocument.body.appendChild(elem);
        }
        frame.contentWindow.focus();
        frame.contentWindow.print();
    });
    document.body.appendChild(frame);
}
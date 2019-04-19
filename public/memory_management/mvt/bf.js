var part_size = [];
var total_mem_size = 0;
var num_parts = 0;
var myCanvas_width = 150;
var myCanvas_height = 500;
var myCanvas_x_start = 10;
var myCanvas_y_start = 10;
var part_myCanvas_start = [];
var part_myCanvas_end = [];
var part_start = [];
var part_end = [];
var part_pro_id = [];
cur_pro_id = 0;
var part_occupied = [];
var input_q_pro_id = [];
var input_q_pro_size = [];
var input_q_size = 0;

$(document).ready(function() {


    // to load the time
    setInterval(function() {
        let time = new Date();
        let hours = time.getHours();
        let minutes = time.getMinutes();

        var dd = String(time.getDate()).padStart(2, '0');
        let mm = String(time.getMonth() + 1).padStart(2, '0'); //January is 0!
        let yyyy = time.getFullYear();

        today = dd + '-' + mm + '-' + yyyy;

        if(minutes<10)
        {
            minutes = "0" + minutes;
        }

        if(hours>=12)
        {
            hours = hours-12;
            $('.start-bottom .date-time .am-pm').text('PM');
        }

        else
        {
            $('.start-bottom .date-time .am-pm').text('AM');
        }

        $('.start-bottom .date-time .time').text(hours + ':' + minutes);
        $('.start-bottom .date-time .date').text(today);
        console.log(hours + ' : ' + minutes);
        console.log('Date : ' + today);

    },1000);

    $("#mem-size-btn").click(function(){
        total_mem_size = Number($("#mem-size").val());
        startColumn2();
    });
});

function startColumn2() {
    var htmlText =
        `
    <button type="submit" class="btn btn-primary" id="add-pro-btn">Add process</button>
    <button type="submit" class="btn btn-primary" id="rem-pro-btn">Remove process</button>
    `;
    $("#add-rem-pro-btns").html(htmlText);
    var htmlText =
        `
    <canvas id="myCanvas" width="170" height="520" style="border:1px solid #d3d3d3;">
                Your browser does not support the HTML5 canvas tag.</canvas>
    `;
    $("#canvas").html(htmlText);
    drawMemory();
    $(document).ready(function() {
        $("#add-pro-btn").click(function(){
            addProcessSize();
        });
        $("#rem-pro-btn").click(function(){
            remProcessId();
        });
    });

}

function addProcessSize() {
    var htmlText =
        `
    <div class="form-group">
        <label>Size of process to be added: </label>
        <input type="text" class="form-control" id="add-pro-size" placeholder="Enter size of process to be added">
    </div>
    <button type="submit" class="btn btn-primary" id="add-btn">Add</button>
    `;
    $("#add-rem-pro").html(htmlText);
    $(document).ready(function() {
        $("#add-btn").click(function(){
            var pro_size = Number($("#add-pro-size").val());
            cur_pro_id += 1;
            addProcess(pro_size, cur_pro_id, 0);
        });
    });
}

function addProcess(pro_size, pro_id, fromQ) {
    var i;
    var found = 0;
    var best_ind = -1;
    var best_size = total_mem_size;
    if(num_parts == 0 && total_mem_size>=pro_size) {
        best_ind = 0;
        best_size = total_mem_size;
        addPart(0, pro_size, pro_id);
        found = 1;

    }
    else {
        for(i = 0; i < num_parts; i++) {

            if(i == 0) {
                if(part_start[0] >= pro_size) {
                    best_ind = 0;
                    best_size = part_start[0];
                    found = 1;
                }
            }
            else {
                if((part_start[i] - part_end[i-1]) >= pro_size) {
                    if((part_start[i] - part_end[i-1]) < best_size) {
                        best_ind = i;
                        best_size = part_start[i] - part_end[i-1];
                        found = 1;
                    }
                }
            }
        }
        if((total_mem_size - part_end[num_parts-1]) >= pro_size) {
            console.log(best_size);
            if((total_mem_size - part_end[num_parts-1]) < best_size) {
                best_ind = num_parts;
                best_size = total_mem_size - part_end[num_parts-1];
                found = 1;
            }
        }
        if(found == 1) {
            addPart(best_ind, pro_size, pro_id);
        }
    }

    if(found == 0 && fromQ == 0) {
        alert('New process could not be added. Process added to Input Queue');
        calcExtFrag(pro_size);
        addToQ(pro_size, pro_id);
    }
    if(found == 1 && fromQ == 1) {
        removeFromQ(pro_id);
        alert('Process ' + pro_id + ' of size ' + pro_size + ' added to memory.');
    }
    drawInputQTable();
}

function addPart(index, pro_size, pro_id) {
    part_pro_id[num_parts] = pro_id;
    part_size[num_parts] = pro_size;
    if(index == 0) {
        part_start[num_parts] = 0;
        part_end[num_parts] = pro_size;
    }
    else if(index < num_parts) {
        part_start[num_parts] = part_end[index-1];
        part_end[num_parts] = part_start[num_parts] + pro_size;
    }
    else {
        part_start[num_parts] = part_end[num_parts-1];
        part_end[num_parts] = part_start[num_parts] + pro_size;
    }
    num_parts += 1;
    sortPart();
    drawPart();
}

function sortPart() {
    var i;
    var j;
    for(i = 0; i < num_parts; i++) {
        for(j = 0; j < (num_parts - i -1); j++) {
            if(part_start[j] > part_start[j+1]) {
                var temp = part_start[j];
                part_start[j] = part_start[j+1];
                part_start[j+1] = temp;

                temp = part_end[j];
                part_end[j] = part_end[j+1];
                part_end[j+1] = temp;

                temp = part_size[j];
                part_size[j] = part_size[j+1];
                part_size[j+1] = temp;

                temp = part_pro_id[j];
                part_pro_id[j] = part_pro_id[j+1];
                part_pro_id[j+1] = temp;
            }
        }
    }
}

function drawPart() {
    var ctx=document.getElementById("myCanvas").getContext("2d");
    ctx.beginPath();
    ctx.rect(myCanvas_x_start, myCanvas_y_start, myCanvas_width, myCanvas_height);
    ctx.fillStyle = "white";
    ctx.fill();
    var i;
    for(i = 0; i < num_parts; i++) {
        ctx.beginPath();
        ctx.rect(myCanvas_x_start, myCanvas_y_start + part_start[i]*(500/total_mem_size), myCanvas_width, part_size[i]*(500/total_mem_size));
        ctx.fillStyle = "green";
        ctx.fill();

        ctx.font = "14px Arial bold";
        ctx.fillStyle = "black";
        ctx.fillText("P-"+ String(part_pro_id[i]) + ", size: " + String(part_size[i]), 50, myCanvas_y_start + part_start[i]*(500/total_mem_size) + part_size[i]*(500/total_mem_size)/2);
    }
}

function remProcessId() {
    var htmlText =
        `
    <div class="form-group">
        <label>Id of process to be removed: </label>
        <input type="text" class="form-control" id="rem-pro-id" placeholder="Enter id of process to be removed">
    </div>
    <button type="submit" class="btn btn-primary" id="rem-btn">Remove</button>
    `;
    $("#add-rem-pro").html(htmlText);
    $(document).ready(function() {
        $("#rem-btn").click(function(){
            var id_pro = Number($("#rem-pro-id").val());
            remProcess(id_pro);
        });
    });
}

function remProcess(id_pro) {
    var i;
    var found = 0;
    for(i = 0; i < num_parts; i++) {
        if(part_pro_id[i] == id_pro && found == 0) {

            var j;
            for(j = i+1; j < num_parts; j++) {
                part_pro_id[j-1] = part_pro_id[j];
                part_start[j-1] = part_start[j];
                part_end[j-1] = part_end[j];
                part_size[j-1] = part_size[j];
            }
            found = 1;
            num_parts -= 1;
            break;
        }
    }
    for(i=0;i<input_q_size;i++){ if(input_q_pro_id[i] == id_pro && found == 0) { var j; for(j=i+1;j<input_q_size;j++){ input_q_pro_id[j-1]=input_q_pro_id[j]; input_q_pro_size[j-1]=input_q_pro_size[j]; } found=1; input_q_size-=1; break; } }
    if(found == 1) {
        drawPart();
        var i;
        for(i = 0; i < input_q_size; i++) {
            addProcess(input_q_pro_size[i], input_q_pro_id[i], 1);
        }
    }
    else {
        alert("Process-" + String(id_pro) + " not found in memory");
    }
    drawInputQTable();
}

function drawMemory() {
    var c=document.getElementById("myCanvas");
    var ctx=c.getContext("2d");
    ctx.rect(myCanvas_x_start,myCanvas_y_start,myCanvas_width,myCanvas_height);
    ctx.stroke();
}

function addToQ(pro_size, pro_id) {
    input_q_size += 1;
    input_q_pro_id[input_q_size - 1] = pro_id;
    input_q_pro_size[input_q_size - 1] = pro_size;
}

function removeFromQ(pro_id) {
    var i;
    for(i = 0; i < input_q_size; i++) {
        if(input_q_pro_id[i] == pro_id) {
            for(j = i+1; j < input_q_size; j++) {
                input_q_pro_id[j-1] = input_q_pro_id[j];
                input_q_pro_size[j-1] = input_q_pro_size[j];
            }
        }
    }
    input_q_size -= 1;
}

function drawInputQTable() {
    var htmlText =
        `
    <button type="submit" class="btn btn-primary md-3" id="compact-btn">Compact</button>
    <table>
    <tr>
        <th colspan="0">Input Queue</th>
    </tr>
    <tr>
        <th>Process Id</th>
    `;
    for(var i = 0; i < input_q_size; i++)
    {
        htmlText +=
            `
        <td>` + input_q_pro_id[i] + `</td>
        `;
    }

    htmlText +=
        `
    <tr>
        <th>Process Size</th>
    `;
    for(var i = 0; i < input_q_size; i++)
    {
        htmlText +=
            `
        <td>` + input_q_pro_size[i] + `</td>
        `;
    }

    htmlText +=
        `
    </tr>
    </table>
    `;
    $("#input-q-table").html(htmlText);
    $(document).ready(function() {
        $("#compact-btn").click(function(){
            Compact();
        });
    });
}

function Compact() {
    var i;
    for(i = 0; i < num_parts; i++) {
        if(i == 0) {
            part_start[i] = 0;
            part_end[i] = part_start[i] + part_size[i];
        }
        else {
            part_start[i] = part_end[i-1];
            part_end[i] = part_start[i] + part_size[i];
        }
    }
    drawPart();
    for(i = 0; i < input_q_size; i++) {
        addProcess(input_q_pro_size[i], input_q_pro_id[i], 1);
    }
}

function calcExtFrag(pro_size) {
    var tot_hole_size = 0;
    var i;
    for(i = 0; i < num_parts; i++) {
        if(i ==0)
        {
            tot_hole_size += part_start[i];
        }
        else
        {
            tot_hole_size += part_start[i] - part_end[i-1];
        }
    }
    tot_hole_size += total_mem_size - part_end[num_parts-1];
    if(tot_hole_size >= pro_size) {
        alert("External Fragmentation is " + tot_hole_size);
        alert("you can compact and add this process");
    }
}



// set initially the start button onClick as hidden
$("#start_menu").hide();

//toggle start Menu
function startmenu() {
    $('#start_menu').toggle(100);
}
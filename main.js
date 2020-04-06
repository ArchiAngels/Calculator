
window.addEventListener('load',function(){

    const inpute = document.querySelector('.inp_calc');
    const btns = document.querySelector('.down_part_calc');
    const way_history = document.querySelector('.way_of_history');

    let key_spec_num = false;
    let first_write_num = false; // IF false we can't write spec num + * / -

    let arr_with_spec_symbl = ['+','=','-','*','/','AC','&lt;--','.','^'];
    let arr_keyboard_nums = ['1','2','3','4','5','6','7','8','9','0'];

    let Very_High_prority = ['^'];
    let High_priority = ['*','/'];
    let low_priority = ['+','-'];

    let arr_with_all_ariphmetic = [];
    let acces_cjhanger = false; // Change VALUES way history WITH inpute inner html

    Sliyanie_arrov(arr_with_all_ariphmetic,arr_with_spec_symbl,arr_keyboard_nums);
    // console.log(arr_with_all_ariphmetic);

    let arr_num = [];
    let arr_symb = [];

    let mini_l = inpute.innerHTML;
    let first_enter = true; // For clear inpute.innerHTML

window.addEventListener('keydown',function(event){
    // console.log(inpute.innerHTML,event.key,event);
        // console.log(event.key)
        switch(event.key){
            case 'Delete':{
                inpute.innerHTML = 'Write Something';
                first_enter = true; // DEL placeholder
                first_write_num = false; // Need write first time number
                break;
            }
            case 'Enter':{
                inpute.innerHTML += '= ';
                specific_symbol('=');
                break;
            }
            case 'Backspace':{
                specific_symbol('&lt;--');
                break;
            }
            default:{
                if( checking_num(event.key,arr_with_all_ariphmetic)){
                    if(checking_num(event.key,arr_with_spec_symbl)){
                        if(key_spec_num && first_write_num){
                            console.log('IF');
                            inpute.innerHTML += `${event.key} `;
                            key_spec_num = false; // if false we can't write + - / * ...
                        }
                        if(!key_spec_num && first_write_num){
                            console.log("ELSE");
                            inpute.innerHTML = `${inpute.innerHTML.slice(0,inpute.innerHTML.length - 2)}${event.key} `;
                        }
                    }
                    else{
                        if(first_enter) inpute.innerHTML = '';
                            first_enter = false;
                        first_write_num = true;
                        key_spec_num = true; // if true we can write * / + - ....
                        inpute.innerHTML += `${event.key} `;
                    }
                }
            }
        }
})
way_history.addEventListener('click',function(){
        if(acces_cjhanger == true){ // if true Return value FROM history way TO inpute inner html
            if(way_history != '' && key_spec_num == false){
                way_history.innerHTML = way_history.innerHTML.slice(0,way_history.innerHTML.length - 2);
                inpute.innerHTML = way_history.innerHTML.slice(0,way_history.innerHTML.length-1);
                key_spec_num = true;
                first_enter = false; // don't clear inpute.innerHTML
            }
        }
    })
btns.addEventListener('click',function(event){
        acces_cjhanger = false;
        if(event.target.className == 'btn'){
            console.log('Spec num');
            if(checking_num(event.target.innerHTML,arr_with_spec_symbl) == false){
                if(first_enter) inpute.innerHTML = '';
                first_enter = false;
                first_write_num = true;
                inpute.innerHTML += ` ${event.target.innerHTML}`;
                history = mini_l;
                key_spec_num = true;
            }
            else{
                start_bb(event);
            }
        }
        
    })
function start_bb(e){
            if(key_spec_num == false && inpute.innerHTML != '' && first_write_num){
                console.log('TOPSSS');
                let templet = inpute.innerHTML.slice(0,inpute.innerHTML.length - e.target.innerHTML.length - 1);
                    if(e.target.innerHTML != '&lt;--'){
                        inpute.innerHTML = `${templet}${e.target.innerHTML == 'AC' ? inpute.innerHTML = '' :e.target.innerHTML} `;
                    }
                specific_symbol(e.target.innerHTML);
            }
            if(key_spec_num && first_write_num){ // if true we can write spec symbl + * / - ....
                console.log('GO BACK TRUE');
                    if(e.target.innerHTML != '&lt;--'){
                        inpute.innerHTML += ` ${e.target.innerHTML} `;
                    }
                
                key_spec_num = false; // if false we can't write spec symbl + * / - ....
                specific_symbol(e.target.innerHTML);
            }
            if(inpute.innerHTML == ''){
                inpute.innerHTML = 'Write Something';
            }
}
function checking_num(n,b){
        for(let i = 0; i < b.length; i++){
            if(n == b[i]) return true;

            if(i == b.length - 1 && n != b[i]) return false;
        }
}
function specific_symbol(n){
    switch(n){
        case '=':{
            console.log("=");
            key_spec_num = false;
            acces_cjhanger = true;
            // console.log(inpute.innerHTML);
            toNumber(inpute.innerHTML);
            IsFinished = true;
            num_of_operation = 0;
            break;
        }
        case 'AC':{
            console.log("AC");
            first_enter = true; // DELETE Placeholder
            inpute.innerHTML = '';
            key_spec_num = false;
            acces_cjhanger = true;
            first_write_num = false;
            break;
        }
        case '&lt;--':{
            console.log("<--");
            inpute.innerHTML = inpute.innerHTML.slice(0,inpute.innerHTML.length - 1);
            key_spec_num = false;
            acces_cjhanger = true;
            break;
        }
        // default:{
            
        // }
    }
}
function go_to_result(n,b){
        way_history.innerHTML = n;
        inpute.innerHTML = b;
    }
function toNumber(inpBefore){
    console.log(inpBefore);
        let temp_let = '';
        let inpAfter = '';
        for(let i = 0; i < inpBefore.length;i++){
                if(inpBefore[i] != ' ' || inpBefore[i] == '.' || inpBefore[i] == '='){
                    temp_let += inpBefore[i];
                }
                else{
                    inpAfter += temp_let;
                    console.log(inpAfter,temp_let);
                    temp_let ='';
                }
        }
        console.log(inpAfter);
        toNumber_2(inpAfter);
    }
function toNumber_2(n){
    console.log(n);
        arr_num = [];
        arr_symb = [];
        let numbers_tmp = 0;
        let all_propertys_of_priorytet = {
            Very_high:false,
            hight:false
        }
        n = n.slice(0,n.length-1);
        for(let j = 0; j < n.length;j++){
            // console.log('1:',all_propertys_of_priorytet,n[j]);
            if(checking_num(n[j],Very_High_prority) == true){
                all_propertys_of_priorytet.Very_high = true;
                
            }
            // console.log('1:',all_propertys_of_priorytet,n[j]);
            if(j == n.length - 1){
                for(let jj = 0; jj<n.length;jj++){
                    // console.log('2:',all_propertys_of_priorytet,n[jj]);
                    if(checking_num(n[jj],High_priority) == true){
                        all_propertys_of_priorytet.hight = true;
                        
                    }
                    // console.log('2:',all_propertys_of_priorytet,n[jj]);
                }
            }
            
        }
        for( let i = 0; i < n.length; i++){
            console.log(n[i],checking_num(n[i],arr_with_spec_symbl));
                if(checking_num(n[i],arr_with_spec_symbl) == false || n[i] == '.'){
                    numbers_tmp += n[i];
                }
                if(checking_num(n[i],arr_with_spec_symbl) == true && n[i] != '.'){  
                    console.log(n[i]);
                    if( numbers_tmp != 0){
                        arr_num.push(Number(numbers_tmp));
                    }
        
                    if(checking_num(n[i],Very_High_prority) == true){
                        console.log('Very HIGH:__',n[i]);
                        arr_symb.push(n[i]);
                        
                    }
                    else{
                        if(checking_num(n[i],High_priority) == true){
                            if(all_propertys_of_priorytet.Very_high == true){
                                console.log('HIGH with VERY HIGH:',n[i]);
                                arr_symb.push('_'+n[i]);
                            }
                            else{
                                console.log('HIGH with HIGH:',n[i]);
                                arr_symb.push(n[i]);
                            }
                        }
                        else{
                            
                            if(all_propertys_of_priorytet.Very_high == true && all_propertys_of_priorytet.hight == true){
                                console.log('NORMAL with 2 HIGHTs:',n[i]);
                                // if(i == 0){
                                //     console.error(' FIRST',arr_num,arr_symb);
                                // }
                                // else{
                                //     console.error('Not FIRST');
                                    arr_symb.push('__'+n[i]);
                                // }
                            }
                            if((all_propertys_of_priorytet.Very_high == false && all_propertys_of_priorytet.hight == true)
                                ||(all_propertys_of_priorytet.Very_high == true && all_propertys_of_priorytet.hight == false)){
                                console.log('NORMAL with Very || just High:',n[i]);
                                // if(i == 0){console.error(' FIRST',arr_num,arr_symb);}
                                // else{
                                //     console.error('Not FIRST');
                                    arr_symb.push('_'+n[i]);
                                // }
                            }
                            if(all_propertys_of_priorytet.Very_high == false && all_propertys_of_priorytet.hight == false){
                                console.log('NORMAL:',n[i]);
                                // if(i == 0){console.error(' FIRST',arr_num,arr_symb);}
                                // else{
                                //     console.error('Not FIRST');
                                    arr_symb.push(n[i]);
                                // }
                            }

                            
                        }
                    }
                    numbers_tmp = 0;
                }
                if(i == n.length - 1){
                    arr_num.push(Number(numbers_tmp));
                }
        }
        console.log(arr_num,arr_symb);
        // console.log(arr_num,arr_symb,all_propertys_of_priorytet,all_propertys_of_priorytet.Very_high,all_propertys_of_priorytet.Very_high == true);
        toNumber_3(arr_num,arr_symb);
    }
let new_arr_numbers = [];
let IsFinished = true;
function toNumber_3(n,b){
    console.log('PRINYAL:',n,b);
    let debt_symbls = [];
        
                    for(let s = 0; s<b.length; s++){
                        // console.log(b[s]);
                        if(b[s].length > 1 ){
                            // console.log('_1',b[s]);
                            debt_symbls.push(b[s].slice(1,b[s].length));
                            continue;
                            // console.log('_2',b[s]);
                        }
                        else{
                            // console.log('norm',b[s]);
                            // helper_to_num3(s,n[s],new_arr_numbers,b[s]);
                            
                            if(IsFinished == true){
                                console.log('OTADL 1:',s,n,new_arr_numbers,b[s]);
                                helper_to_num3(s,n,new_arr_numbers,b[s],b);
                                break;
                            }
                            
                        }
                        
                    }
                    
                        for(let i = 0; i < debt_symbls.length;i++){
                            // console.log('Debt_symbl: ',i,debt_symbls[i]);
                            
                            if(IsFinished == true){
                                console.log('OTDAL 2:',i,n,new_arr_numbers,debt_symbls[i]);
                                helper_to_num3(i,n,new_arr_numbers,debt_symbls[i],debt_symbls);
                                break;
                            }
                            
                        }
                    
                    
            // console.log(b)
            // console.log('KoNIEC:',n,b);
            
    }
function transalte_znak(znak_str,x1,x2){
    console.log('Current Operation:     ',znak_str,x1,x2);
        switch(znak_str){
            case '+':{
                return x1+x2;
            }
            case '-':{return x1-x2;}
            case '*':{return x1*x2;}
            case '/':{return x1/x2;}
            case '^':{return Math.pow(x1,x2)}

        }
    }
function helper_to_num3(i,arr_nums,arr_num_new,znak,arr_symbl_new){
    if(znak[0] == '_'){
        console.log('REPEAT:',znak);
        toNumber_3(arr_nums,arr_symbl_new);
    }
    else{
        arr_nums = delete_from_array_by_name(arr_nums,'Useless');
            let first_time = true;
            console.log('BEFORE:',i,arr_nums,arr_num_new,arr_symbl_new,znak,arr_nums[i],arr_nums[i+1] || arr_nums[i-1]);
            add_global_history(arr_nums[i],znak,arr_nums[i+1],'=',transalte_znak(znak,arr_nums[i],arr_nums[i+1]));

            arr_nums[i] = transalte_znak(znak,arr_nums[i],arr_nums[i+1]);
            arr_nums[i+1] = 'Useless';

        arr_num_new.push(arr_nums[i]);
        for(let k = 0; k < arr_symbl_new.length;k++){
            if(arr_symbl_new[k] == znak && first_time == true){
                console.log(arr_symbl_new,znak);
                arr_symbl_new = delete_from_array_by_name(arr_symbl_new,znak,true);
                console.log(arr_symbl_new,znak);
                first_time = false;
            }
            else{}
        }
        
        arr_nums = delete_from_array_by_name(arr_nums,'Useless');
        
    console.log('AFTER:',i,arr_nums,arr_num_new,arr_symbl_new,znak);
        if(arr_symbl_new.length > 0){
        console.log('GO',);
        toNumber_3(arr_nums,arr_symbl_new);
        }
        else{
            console.log('FINISH');
            go_to_result(inpute.innerHTML,`${(arr_nums[arr_nums.length - 1]).toFixed(2)}   `);
            IsFinished = false;
            new_arr_numbers = [];
        }
        }
        
    }
function delete_from_array_by_name(arr,index_for_delete,first_elem_delete_of_arr = false){
        let tmp1 = [];
        let count_0f_deleted_index = 0;
            for(let i = 0; i < arr.length;i++){
                if(first_elem_delete_of_arr == false){
                    if(arr[i] == index_for_delete){
                        // count_0f_deleted_index++;
                    }

                    else{
                        tmp1.push(arr[i]);
                    }
                
                }
                if(first_elem_delete_of_arr == true){
                    if(count_0f_deleted_index > 0 && arr[i] == index_for_delete){
                        tmp1.push(arr[i]);
                    }
                    else{
                        if(arr[i] == index_for_delete){
                            count_0f_deleted_index++;
                        }
                        else{
                            tmp1.push(arr[i]);
                        }
                    }
                }
                // if(arr[i] != index_for_delete ){
                //     tmp1.push(arr[i]);
                // }
                
            }
            return tmp1;
    }
const table_history = document.querySelector('.table_history_wrap');
let num_of_operation = 0;
function add_global_history(x1,znak,x2,equal,solution){
    let new_elem_div = document.createElement('DIV');
    new_elem_div.innerHTML = `${num_of_operation} : ${x1} ${znak} ${x2} ${equal} ${(solution)}`;
    new_elem_div.classList.add('test_item');
    if(num_of_operation > 0){
        new_elem_div.style.paddingLeft += `${2 + num_of_operation}vw`;
    }
    table_history.appendChild(new_elem_div);
    num_of_operation++;
}
function Sliyanie_arrov(in_arr,arr1,arr2){
    for(let b = 0; b< arr1.length;b++){
        in_arr.push(arr1[b]);
    }
    for(let h = 0; h< arr2.length;h++){
        in_arr.push(arr2[h]);
    }
}
})
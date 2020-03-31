
window.addEventListener('load',function(){

    const inpute = document.querySelector('.inp_calc');
    const btns = document.querySelector('.down_part_calc');
    const way_history = document.querySelector('.way_of_history');

    let key_spec_num = false;

    let arr_with_spec_symbl = ['+','=','-','*','/','AC','&lt;--','.'];
    // let arr_with_num_spec_symbl = ['107','109','106','111','110'];
    let High_priority = ['*','/'];
    let low_priority = ['+','-'];
    let acces_cjhanger = false;

    let arr_num = [];
    let arr_symb = [];

    let mini_l = inpute.innerHTML;
    let first_enter = false; // For clear inpute.innerHTML

way_history.addEventListener('click',function(){
        if(acces_cjhanger == true){
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
            if(checking_num(event.target.innerHTML,arr_with_spec_symbl) == false){
                if(first_enter) inpute.innerHTML = '';
                first_enter = false;
                inpute.innerHTML += `${event.target.innerHTML}`;
                history = mini_l;
                key_spec_num = true;
            }
            else{
                start_bb(event);
            }
        }
        
    })
function start_bb(e){
            if(key_spec_num == false && inpute.innerHTML != ''){
                console.log('TOPSSS');
                let templet = inpute.innerHTML.slice(0,inpute.innerHTML.length - e.target.innerHTML.length - 1);
                    if(e.target.innerHTML != '&lt;--'){
                        inpute.innerHTML = `${templet}${e.target.innerHTML == 'AC' ? inpute.innerHTML = '' :e.target.innerHTML} `;
                    }
                specific_symbol(e.target.innerHTML);
            }
            if(key_spec_num == true){
                console.log('GO BACK TRUE');
                    if(e.target.innerHTML != '&lt;--'){
                        inpute.innerHTML += ` ${e.target.innerHTML} `;
                    }
                
                key_spec_num = false;
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
            break;
        }
        case 'AC':{
            console.log("AC");
            first_enter = true; // DELETE Placeholder
            inpute.innerHTML = '';
            key_spec_num = false;
            acces_cjhanger = true;
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
        let counterSpec_symb = 1;
        let numbers_tmp = 0;
        n = n.slice(0,n.length-1);
        for( let i = 0; i < n.length; i++){
            // console.log(n[i],checking_num(n[i],arr_with_spec_symbl));
                if(checking_num(n[i],arr_with_spec_symbl) == false || n[i] == '.'){
                    numbers_tmp += n[i];
                }
                if(checking_num(n[i],arr_with_spec_symbl) == true && n[i] != '.'){
                        counterSpec_symb++;    
                        arr_num.push(Number(numbers_tmp));
                    if(checking_num(n[i],High_priority) == true){
                        // console.log('NENADO',n[i]);
                        arr_symb.push(n[i]);
                    }
                    else{
                        // console.log('NADO',n[i]);
                        arr_symb.push('_'+n[i]);
                    }
                    numbers_tmp = 0;
                }
                if(i == n.length - 1){
                    arr_num.push(Number(numbers_tmp));
                }
        }
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

        }
    }
function helper_to_num3(i,arr_nums,arr_num_new,znak,arr_symbl_new){
    // let tmp2 = 0;
    // for(let j = 0; j<arr_nums.length;j++){
    //     if('Useless' == arr_nums[j]){
    //         arr_nums = delete_from_array_by_name(arr_nums,'Useless');
    //     }
    //     else{
    //     }
    // }
    let first_time = true;
    console.log('BEFORE:',i,arr_nums,arr_num_new,arr_symbl_new,znak);
    
    arr_nums[i] = transalte_znak(znak,arr_nums[i],arr_nums[i+1]);
        arr_num_new.push(arr_nums[i]);
        arr_nums[i+1] = 'Useless';
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
            go_to_result(inpute.innerHTML,`${(arr_nums[arr_nums.length - 1]).toFixed(5)}...  `);
            IsFinished = false;
        }
    }
// let jopa = [1,2,2,1,2,5,1,5,7,5,6,8,1,2,1,2,1];
// console.log('BEFORE:',jopa,jopa.lenght);
// jopa = delete_from_array_by_name(jopa,1,true);
// console.log('AFTER',jopa,jopa.length);
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
            // console.log(tmp1);
    }
})

// console.log('9+4',Number('+'),parseFloat('+'));

// let jopin_arr = [0,'loh',4,2,5,6,8,7,'loh',3,5,'loh',7,8,'loh',6,8,9,1,5];
// console.log(jopin_arr,'BEFORE');


// jopin_arr = delete_from_array_by_name(jopin_arr,'loh');
// console.log(jopin_arr,'AFTER');
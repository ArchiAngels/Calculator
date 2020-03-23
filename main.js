
window.addEventListener('load',function(){
    const inpute = document.querySelector('.inp_calc');
    const btns = document.querySelector('.down_part_calc');
    const way_history = document.querySelector('.way_of_history');
    let key_spec_num = false;
    let arr_with_spec_symbl = ['+','=','-','*','/','AC','&lt;--'];
    let arr_with_num_spec_symbl = ['107','109','106','111','110'];
    let acces_cjhanger = false;
    let arr_num = [];
    let arr_symb = [];
    let jebRot = false;
    window.addEventListener('click',function(){
        console.log(inpute.value,'CLICK');
        // console.log(NaN == NaN,(inpute.value)/1,'Test',inpute.value,inpute.value/1,(inpute.value.slice(inpute.length - 1,inpute.length)));
        // console.log( -Infinity < NaN < Infinity);
        // inpute.value = '';
        // console.log(inpute.value,inpute.value/1,inpute.value/1 > 0, inpute.value/1 < 0);
    })
    window.addEventListener('keydown',function(){
        console.log('DOWNED');
        inpute.value += '';
    })
    window.addEventListener('keyup',function(event){
        console.log('UPED')
        // key_spec_num = true;
        // SUkaProver(0);
        console.log(SUkaProver(0));
        // ebannyirot = inpute.value;
        // console.log(inpute.value,'KEYDOWN',SUkaProver(2));
        // console.log(event.keyCode,checking_num(event.keyCode,arr_with_num_spec_symbl));
        if(inpute.value != ''){
            if(event.keyCode == 13 && inpute.value != ''){
                inpute.value +=' = ';
                toNumber(inpute.value);
            }
            if(event.keyCode != 8){
                // key_spec_num;
                
                if( ((inpute.value.slice(inpute.value.length -1, inpute.value.length))/1 >= 0 || (inpute.value.slice(inpute.value.length -1, inpute.value.length))/1 <= 0 )){
                    // console.log(inpute.value,'IF',ebannyirot,SUkaProver(2));
                    if(checking_num(event.keyCode,arr_with_num_spec_symbl) == true && checking_num((inpute.value.slice(inpute.value.length -2, inpute.value.length - 1)),arr_with_spec_symbl) == false ){
                        console.log('Notok ------> OK');
                    }
                    // console.log('OK');  
                    
                }
                else{
                    inpute.value = inpute.value.slice(0,inpute.value.length -1);
                    console.log('JOPA');
                }
                                // console.log("SOSITER JOPA",inpute.value,SUkaProver(2));
                                // debugger
                                // else{
                                //     console.log("JOPA@@@@");
                                //     inpute.value = inpute.value.slice(0,inpute.value.length - 2) + inpute.value.slice(inpute.value.length - 1,inpute.value.length);
                                // }
                // debugger
                // console.log(inpute.value/1 > 0 || (inpute.value)/1 < 0 || checking_num(event.keyCode,arr_with_num_spec_symbl));

                // if( (inpute.value.slice(inpute.value.length -1, inpute.value.length))/1 > 0 || (inpute.value.slice(inpute.value.length -1, inpute.value.length))/1 < 0 ){
                //     console.log('ok');
                //     if( checking_num((inpute.value.slice(inpute.value.length -1, inpute.value.length)),arr_with_spec_symbl) == true && checking_num(event.keyCode,arr_with_num_spec_symbl) == true){
                //         console.log('ZAMENA');
                //         inpute.value = inpute.value.slice(0,inpute.value.length - 1);
                //     }
                //     else{
                //         console.log('Ebashim dalshe')
                //     }
                //     // console.log('Ok',inpute.value,inpute.value/1,(inpute.value.slice(inpute.length - 1,inpute.length))/1);
                // }
                // else{
                //     console.log('Notok');
                //     if(checking_num(event.keyCode,arr_with_num_spec_symbl) == true){
                //         console.log('Notok ------> OK');
                //     }
                //     else{
                //         console.log('Notok ------> NOTNOTNOToK');
                //         inpute.value = inpute.value.slice(0,inpute.value.length - 1);
                //     }
                    
                    // console.log('NotOk',inpute.value,inpute.value/1);
                   
                }
        }
        // console.log((inpute.value)/1 != NaN,event.keyCode,checking_num(event.keyCode,arr_with_num_spec_symbl));
        // if(key_spec_num == true && inpute.value != ''){}
        // console.log(inpute.value,'3',SUkaProver(2));
    })
    way_history.addEventListener('click',function(){
        if(acces_cjhanger == true){
            if(way_history != '' && key_spec_num == false){
                way_history.innerHTML = way_history.innerHTML.slice(0,way_history.innerHTML.length - 2);
                inpute.value = way_history.innerHTML.slice(0,way_history.innerHTML.length-1);
                key_spec_num = true;
            }
        }
    })
    btns.addEventListener('click',function(event){
        acces_cjhanger = false;
        if(event.target.className == 'btn'){
            if(checking_num(event.target.innerHTML,arr_with_spec_symbl) == false){
                inpute.value += `${event.target.innerHTML}`;
                history = inpute.value;
                key_spec_num = true;
            }
            else{
                start_bb(event);
            }
        }
        
    })
function SUkaProver(n){
    // console.log('IDITE NAHUI',inpute.value);
    if(n > 0){
        return SUkaProver(n-1);
    }
    else{
        return inpute.value;
    }
}
function start_bb(e){
            if(key_spec_num == false && inpute.value != ''){
                console.log('TOPSSS');
                let templet = inpute.value.slice(0,inpute.value.length - e.target.innerHTML.length - 1);
                    if(e.target.innerHTML != '&lt;--'){
                        inpute.value = `${templet}${e.target.innerHTML == 'AC' ? inpute.value = '' :e.target.innerHTML} `;
                    }
                specific_symbol(e.target.innerHTML);
            }
            if(key_spec_num == true){
                console.log('GO BACK TRUE');
                    if(e.target.innerHTML != '&lt;--'){
                        inpute.value += ` ${e.target.innerHTML} `;
                    }
                
                key_spec_num = false;
                specific_symbol(e.target.innerHTML);
            }
            if(inpute.value == ''){
                inpute.placeholder = 'Write something';
            }
}
function checking_num(n,b){
        for(let i = 0; i < b.length; i++){
            if(n == b[i]){
                return true;
            }
            if(i == b.length - 1 && n != b[i]){
                return false;
            }
            
        }

}
function specific_symbol(n){
    switch(n){
        case '=':{
            console.log("=");
            key_spec_num = false;
            acces_cjhanger = true;
            toNumber(inpute.value);
            break;
        }
        case 'AC':{
            console.log("AC");
            inpute.placeholder = 'Write something';
            inpute.value = '';
            key_spec_num = false;
            acces_cjhanger = true;
            break;
        }
        case '&lt;--':{
            console.log("<--");
            inpute.value = inpute.value.slice(0,inpute.value.length - 1);
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
        inpute.value = b;
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
        toNumber_2(inpAfter);
    }
function toNumber_2(n){
        arr_num = [];
        arr_symb = [];
        let counterSpec_symb = 1;
        let numbers_tmp = 0;
        n = n.slice(0,n.length-1);
        for( let i = 0; i < n.length; i++){

            console.log(n[i],checking_num(n[i],arr_with_spec_symbl));
            if(checking_num(n[i],arr_with_spec_symbl) == false){
                numbers_tmp += n[i];
            }
            if(checking_num(n[i],arr_with_spec_symbl) == true ){
                counterSpec_symb++;    
                arr_symb.push(n[i]);
                arr_num.push(Number(numbers_tmp));
                numbers_tmp = 0;
            }
            if(i == n.length - 1){
                arr_num.push(Number(numbers_tmp));
            }
        }
        toNumber_3(arr_num,arr_symb);
    }
function toNumber_3(n,b){
        let new_arr_numbers = [];
            for(let j = 0; j<b.length;j++){
                if(b[j] == '*' || b[j] == '/'){
                    helper_to_num3(j,n,new_arr_numbers,b[j]);
                }
                else{
                    helper_to_num3(j,n,new_arr_numbers,b[j]);
                }
            }
        go_to_result(inpute.value,`${(n[n.length-1]).toFixed(2)}   `);
    }
function transalte_znak(znak_str,x1,x2){
        switch(znak_str){
            case '+':{
                return x1+x2;
            }
            case '-':{return x1-x2;}
            case '*':{return x1*x2;}
            case '/':{return x1/x2;}

        }
    }
function helper_to_num3(i,x,arr,znak){
        console.log(i,x,arr,znak);
        x[i+1] = transalte_znak(znak,x[i],x[i+1]);
        arr.push(x[i]);
        console.log(i,x,arr,znak);
    }
})
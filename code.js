let charticon=document.querySelector(".icon-cart ");
let charticonspan=document.querySelector(".icon-cart span");
let Close=document.querySelector(".btn .close");
let body=document.querySelector("body");
let list_product=document.querySelector(".list-product");
let listcart=document.querySelector(".listcart");

charticon.addEventListener('click',()=>{
   body.classList.toggle("showchart");
});
Close.addEventListener('click',()=>{
   body.classList.toggle("showchart");
});

let array_product=[];
let carts=[];




const showele=()=>{
  list_product.innerHTML='';
  if(array_product.length>0)
  {
    array_product.forEach(el=>{
        let item=document.createElement("div");
        // item.className='item';
        item.classList.add('item');
        item.dataset.id=el.id;
        item.innerHTML=`<img src="${el.image}" alt="">
                    <h2>${el.name}</h2>
                    <div class="price">$${el.price}</div>
                    <button class="addcart">
                        Add to cart
                    </button>`
        list_product.appendChild(item);
    })
    
  }
}


list_product.addEventListener('click',(el)=>{
  if(el.target.classList.contains('addcart'))
  {
      let product_Id=el.target.parentElement.dataset.id;
      addpro(product_Id);
      console.log(product_Id);
  }
})

const addpro=(id)=>
{
  //(value)=> is filter function return with ele which achieve condition the findindex return with its index in array it it is not found will return with -1
  let elisnotfound=carts.findIndex((value)=>value.product_id==id);
  if(carts.length<=0)
  {
    carts=[{
        product_id:id,
        quantity:1
    }];
  }
  else if(elisnotfound<0)
  {
     carts.push({
      product_id:id,
        quantity:1
     })
  }
  else
  {
    carts[elisnotfound].quantity=carts[elisnotfound].quantity+1;
  }
  add_to_cart();
  local();
  // console.log(carts);
}
//localstoratge
function  local (){
  localStorage.setItem("cart",JSON.stringify(carts))
}

 

const add_to_cart=()=>{
  let totalnum=0;
  listcart.innerHTML='';
 carts.forEach((el,Index)=>{
  totalnum=totalnum+el.quantity;
  let index=array_product.findIndex((value)=>value.id==el.product_id);
  let info=array_product[index];
  let Item=document.createElement("div");
  Item.classList.add("item");
  Item.dataset.id=Index;
  Item.innerHTML=`<div class="imge">
                <img src="${info.image}" alt="">
            </div>
            <div class="name">${info.name}</div>
                <div class="totalprice">$${info.price * el.quantity}</div>
                <div class="quantity">
                    <span class="min"><</span>
                    <span>${el.quantity}</span>
                    <span class="plus">></span>
                </div>
           </div>`
  listcart.appendChild(Item);   
 })
 charticonspan.innerText=totalnum;
}

const Start = ()=>{
  fetch('./file.json')
  .then(response => response.json())
  .then(data=>{
    array_product=data;
    // console.log(array_product);
    showele();
    if(localStorage.getItem('cart'))
      {
        carts=JSON.parse(localStorage.getItem('cart'))
      }
      add_to_cart();
     
  })
}
Start();

listcart.addEventListener("click",(el)=>{
  if(el.target.classList=='min')
  {
    let element=el.target.parentElement.parentElement.dataset.id;
    carts[element].quantity=carts[element].quantity+1
    local();
    add_to_cart();
  }
 else if(el.target.classList=='plus')
  {
    let element=el.target.parentElement.parentElement.dataset.id;
    carts[element].quantity=carts[element].quantity-1;
    if((carts[element].quantity-1)==-1)
    {     
      carts.splice(element,1);
    }
      local();
      add_to_cart();
  }
})
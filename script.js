$(document).ready(function(){
   // alert(1);
    axios.get("microToc.json").then(response => {

        console.log("data", response.data)
        creatMenuTree($('#menuList'), response.data.childlinks, 'tv-ul')      
    })

    function creatMenuTree(parent, data, ulClassName){
        var parentUl = document.createElement('ul');
        parentUl.className = ulClassName;
        $.each(data, function(){
            var liElement = document.createElement('li');
            liElement.setAttribute('data-level', this.level);
            liElement.setAttribute('data-nodelink', this.nodelink);
            liElement.setAttribute('data-toc', this.toc);
            liElement.setAttribute('data-click-state', 1)

            if (this.toc) {
                var spanElement = document.createElement('span');
                spanElement.innerHTML = this.title;
                spanElement.className = 'tv-caret';
                liElement.append(spanElement);
                creatMenuTree(liElement, this.childlinks,'tv-nested')
                } else {
                liElement.innerHTML = this.title;
              }
              parentUl.append(liElement);

        })
        return parent.append(parentUl);
    }
    $(document).on('click','.tv-caret', function (event) {
        var $this = $(this)
        var getNodeLink = $this.parent('li').attr("data-nodelink")  
        var childUiBind = $this.next('.tv-nested')    
        axios.get("microToc1.json").then(response => {
           if ($this) {      
             for(i in response.data.childlinks){
                if(response.data.childlinks[i].nodelink == getNodeLink){    
                    const childlinks = response.data.childlinks[i].childlinks;                    
                             
                    creatMenuTree($this.parent('li'), childlinks, 'tv-nested')                       
                    if(childUiBind.text() == ''){
                        childUiBind.remove();
                    } 
                       // $this.parent('li').find('.tv-nested:first').toggleClass("active")  
                      
                    }
                    
                }
               // childUiBind.remove();
                $this.next('.tv-nested').toggleClass("active");
                 $this.toggleClass("tv-caret-down");
                 
                 
                 
            }else{
                console.log("hide div")
                childUiBind.remove();
            }
         })
       
       
       
        
    })
  
 
 
})


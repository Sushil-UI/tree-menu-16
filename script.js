$(document).ready(function(){
   // alert(1);
   
// on load, loading data
    axios.get("General_principles.fetchtoc.json").then(response => {
        console.log("load data", response.data)
        creatMenuTree($('#menuList'), response.data.childlinks, 'tv-ul')      
        getActiveLink(); 
    })
// creating dom for tree menu
    function creatMenuTree(parent, data, ulClassName){
        //console.log(parent)
        var parentUl = document.createElement('ul');
        parentUl.className = ulClassName;
        $.each(data, function(){
            var liElement = document.createElement('li');
            var  anchorTag = document.createElement('a');   
            liElement.setAttribute('data-level', this.level);
            liElement.setAttribute('data-nodelink', this.nodelink);
            liElement.setAttribute('data-toc', this.toc);
            liElement.setAttribute('data-title', this.title);
            liElement.setAttribute('data-click-state', 1)
           liElement.setAttribute('data-opentoc', 0); 
           console.log("childlinks", this.childlinks)
         
            if (typeof this.childlinks !=='undefined') {
                var spanElement = document.createElement('span');                
                anchorTag.href= '#'+this.title
                anchorTag.innerHTML = this.title;
                spanElement.append(anchorTag)
                spanElement.className = 'tv-caret';
                liElement.append(spanElement);
                creatMenuTree(liElement, this.childlinks,'tv-nested')
                parentUl.append(liElement);
                } else {
                    console.log("else", this.title)
                    anchorTag.href= '#'+this.title
                    anchorTag.innerHTML = this.title;
                    liElement.append(anchorTag)
                    parentUl.append(liElement);
              }
             

        })
        return parent.append(parentUl);
    }
 
    $(document).on('click','.tv-caret', function (event) {
        var $this = $(this)
        var tree;
      
        var opentoc =$this.parent('li').attr('data-opentoc');
        var getNodeLink = $this.parent('li').attr("data-nodelink")  
        var childUiBind = $this.next('.tv-nested') 
      
            if($this.parents('li').attr("data-level")==1 && opentoc ==0){ 
            opentoc =$this.parent('li').attr('data-opentoc',1);
                    if(childUiBind.text() == ''){
                        childUiBind.remove();
                    }
                    axios.get("115496.fetchtoc.json").then(response => {
                       
                            console.log("on click get data ====>", response.data)
                             for(i in response.data.childlinks){
                                if(response.data.childlinks[i].nodelink == getNodeLink){   
                                   
                                     tree = response.data.childlinks[i].childlinks; 
                                     console.log("tree data ", tree)
                                     // recursively tree-menu function calling               
                                        creatMenuTree($this.parent('li'), tree, 'tv-nested')                       
                                                                        
                                      
                                    }
                                    
                                }
                            
                                $this.next('.tv-nested').toggleClass("active");
                                $this.toggleClass("tv-caret-down");
                             
 
                         })
                       
            }else{
                $this.next('.tv-nested').toggleClass("active");
                $this.toggleClass("tv-caret-down");
            }
                
    })

    // on load highlighted tree menu 
    function getActiveLink(){
        var path = window.location.hash;
        path = path.replace(/\/$/, "");
        path = decodeURIComponent(path).replace("#","");
        
      console.log("current path",path)

      target = $('.tv-ul li').find('[href="#' + path + '"]');
      console.log("target", target)
      if (target.length > 0) {
            target.each(function(index, t) {
            if(path)
            $(t).addClass('active');
            $(t).parents('.tv-caret').addClass('tv-caret-down')
            $(t).parents('.tv-nested').addClass('active')
            $(t).parents().siblings('.tv-caret').addClass('tv-caret-down')
            $(t).parents('.tv-caret').siblings('.tv-nested').addClass('active')         
        });
    }
    }
  
 
 
})
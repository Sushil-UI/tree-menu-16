$(document).ready(function(){
   // alert(1);
   
// on load, loading data
    axios.get("General_principles.fetchtoc.json").then(response => {
        console.log("load data", response.data)
        creatMenuTree($('.toc-container'), response.data.childlinks)      
        getActiveLink(); 
    })
// creating dom for tree menu
    function creatMenuTree(parent, data){
        //console.log(parent)
        // var parentUl = document.createElement('ul');
        // parentUl.className = ulClassName;
        $.each(data, function(){
            var divElement = document.createElement('div');
            var  anchorTag = document.createElement('a');   
            divElement.className = 'toc-item';
            anchorTag.setAttribute('data-level', this.level);
            anchorTag.setAttribute('data-nodelink', this.nodelink);
            anchorTag.setAttribute('data-toc', this.toc);
            anchorTag.setAttribute('data-title', this.title);
            anchorTag.setAttribute('data-click-state', 1)
            anchorTag.setAttribute('data-opentoc', 0); 
            //console.log("childlinks", this.childlinks)
         
            if (this.toc) {
                var buttonElement = document.createElement('button');                
                anchorTag.href= '#'+this.title
                anchorTag.innerHTML = this.title;
                divElement.append(buttonElement)
                divElement.append(anchorTag)
               
                creatMenuTree(divElement, this.childlinks)
               // parentUl.append(divElement);
               
                } else {
                   // console.log("else", this.title)
                    anchorTag.href= '#'+this.title
                    anchorTag.innerHTML = this.title;
                    liElement.append(anchorTag)
                   // parentUl.append(liElement);
                   
              }
             
              return parent.append(divElement);
        })
         
    }
 
    // $(document).on('click','.tv-caret', function (event) {
    //     var $this = $(this)
    //     var tree;
      
    //     var opentoc =$this.parent('li').attr('data-opentoc');
    //     var getNodeLink = $this.parent('li').attr("data-nodelink")  
    //     var childUiBind = $this.next('.tv-nested') 
      
    //         if($this.parents('li').attr("data-level")==1 && opentoc ==0){ 
    //         opentoc =$this.parent('li').attr('data-opentoc',1);
    //                 if(childUiBind.text() == ''){
    //                     childUiBind.remove();
    //                 }
    //                 axios.get("115496.fetchtoc.json").then(response => {
                       
    //                         console.log("on click get data ====>", response.data)
    //                          for(i in response.data.childlinks){
    //                             if(response.data.childlinks[i].nodelink == getNodeLink){   
                                   
    //                                  tree = response.data.childlinks[i].childlinks; 
    //                                  console.log("tree data ", tree)
    //                                  // recursively tree-menu function calling               
    //                                     creatMenuTree($this.parent('li'), tree, 'tv-nested')                       
                                                                        
                                      
    //                                 }
                                    
    //                             }
                            
    //                             $this.next('.tv-nested').toggleClass("active");
    //                             $this.toggleClass("tv-caret-down");
                             
 
    //                      })
                       
    //         }else{
    //             $this.next('.tv-nested').toggleClass("active");
    //             $this.toggleClass("tv-caret-down");
    //         }
                
    // })
    $('.toc-content .toc-item > button').on('click', function() {
        isOpen = $(this).children('img').attr("src") === 'https://madison-qa.pwc.com/etc.clientlibs/pwc-madison/clientlibs/clientlib-site-vp/resources/images/expand.svg' ? true : false;
        panel = $(this).siblings("div.toc-item");

        if (isOpen === false) {
            $(this)
                .children('img')
                .attr("src", "https://madison-qa.pwc.com/etc.clientlibs/pwc-madison/clientlibs/clientlib-site-vp/resources/images/expand.svg");
        } else {
            $(this)
                .children('img')
                .attr("src", "https://madison-qa.pwc.com/etc.clientlibs/pwc-madison/clientlibs/clientlib-site-vp/resources/images/collapse.svg");
        }

        panel.slideToggle("fast");
        panel.css("display", "flex");
    });
  
    // on load highlighted tree menu 
    function getActiveLink(){
        var path = window.location.hash;
        path = path.replace(/\/$/, "");
        path = decodeURIComponent(path).replace("#","");        
        console.log("current path",path)
        target = $('.toc-content').find('[href="#' + path + '"]');
 

        if (target.length > 0) {
            target.each(function(index, t) {
                $(t).addClass('active');
                firstParent = $(t).parent(".toc-item").parent('.toc-item');

                $(firstParent).addClass('toc-scrollto');

                $(t).parents("div.toc-item").each(function() {
                    image = $(this).siblings("button");
                    sibs = $(image).siblings("div.toc-item");

                    $(image)
                        .children('img')
                        .attr("src", "/etc.clientlibs/pwc-madison/clientlibs/clientlib-site-vp/resources/images/collapse.svg");
                    sibs.css("display", "flex");
                });
            });
        }
    }
  
 
 
})
/**
 * LiveTabs version 0.1
 * @author : Hossein Khalili
 * @email: my21century2002@gmail.com
 * @creation date: 12 May 2021
 * copyright 2021
 * @repo : http://github.com/my21century2002/LiveTabs
 * @description: LiveTabs is intented to create tabs dynamicly, giving you 
 *  the ability to load the contents on the fly and remove them if need. it is 
 *  replicating what browsers do but in the HTML.
 * @requirement: 
 *             1- custom-made CSS for styling the Tabs
 *             2- LiveTabs library
 *             3- HTML codes
 * @examples : examples/index.html
 */
/**
 * createTab (url , title , link_id)
 * switchTab (url , title , link_id)
 */

class LiveTabs{

    constructor(config ,objname){
        this.objname = objname;
        this.config = config;
        this.tabNum = 0;
        this.div = config.tabContainer;
        this.maxTabNumber = 6;
        this.opened;
        this.Tabs = [];
        
    }

    //get the ElementById
    $(o){
        return document.getElementById(o);
    }

    /**
     * 
     * @param {integer} i id of the requested tab
     *
     *
     */

    switchTab( reqId ){

      
      //check if this.opened is valid in Tabs
      if( this.opened == reqId){
        return;
      }

      if(this.Tabs.length > 0 && this.opened != undefined){
        
         if(this.Tabs.indexOf(reqId) == -1){
             
              return false;
         }
           
      }

        try{
          //set the requested tab to active 
          this.$(this.div+"a"+reqId).classList.add("active");
          this.$(this.config.tabContentContainer+reqId).classList.remove("d-none");
          this.$(this.config.tabContentContainer+reqId).classList.add("d-block");
          this.$(this.config.tabContentContainer+reqId).classList.add("flex-grow-1");
        }catch(e){}
       
       
       if(this.opened!= reqId){  
         try{
              //disable the current opened tab
              this.$(this.config.tabContentContainer+this.opened).classList.remove("d-block");
              this.$(this.config.tabContentContainer+this.opened).classList.remove("flex-grow-1");
              this.$(this.config.tabContentContainer+this.opened).classList.add("d-none");
              this.$(this.div+"a"+this.opened).classList.remove('active');
       
              
          }catch(e){}
       }
       
       //manager.set_viewport();
        this.opened = reqId;
      //  this.opened_a = aid;    

    }


    //close the selected tab
    /**
     * 
     * @param {integer} id id of the tab/link
     */
    closeTab(id){
          //remove the id from Tabs and Tabs_ID array
          
 
        for(var j=0; j < this.Tabs.length; j++ ){
              //if( Tabs_ID[j]== id ){
                if( this.Tabs[j]== id ){
                var del_tab_index = j;
                break;
              }
   
        }
 
        this.Tabs.splice(del_tab_index,1);
        //remove the li from DOM
        
        this.$(this.div+id).remove();

       //remove the tab container too
        this.$(this.config.tabContentContainer+id).remove();
       
        this.tabNum -= 1;
        //manager.set_tab_size();
        if( this.opened == id ){
          var index = Math.floor(Math.random() * this.Tabs.length);

          index =  Number(this.Tabs[index]);
          
             if (index) {
                  
                   this.switchTab(index);
                   
                   
             }
       }
       

    }

    //create new tab
    /**
     * 
     * @param {fallback function} fallback is a function to get input for containers
     * @param {string} TabTitle title of the tab
     * @param {string id} tab_id unique id for each link/tab
     * @returns mixed
     */
    createTab( TabTitle , tab_id , fallback = ''){
    
        //first check if the tabs is already opend,is so activate it
        //else do the rest of it
        var tab_match = 0;
        var tabs_len = this.Tabs.length;
        

        for(var c = 0; c < tabs_len; c++ ){
            if(this.Tabs[c] == tab_id){
                //found the match
                  var tab_index = c;
                  var tab_match = 1;
            }
        }
        
        if(tab_match){
            //now change view to the found view tab id
            this.switchTab( this.Tabs[tab_index] );
            return false;
        }
          if(this.tabNum >= this.maxTabNumber){
              //error of max number of tabs
              alert(er.TabTotalErr);
              return false;
          }
         
       //increment tabnum beacause now we have a new tab   
       this.tabNum ++;
       var id = tab_id;
       //the tab header HTML code
       this.$(this.config.tabContainer).innerHTML+="<li id=\""+this.div+""+id+"\" class=\"d-inlineblock nav-item\" ><a href=\"#\" id=\""+this.div+"a"+id+"\" onclick=\""+this.objname+".switchTab("+id+");return false\" title=\""+TabTitle+"\" class=\"nav-link\">"+TabTitle+"<button type=\"button\" class=\"btn-close ms-3 liveTab-closebtn\" aria-label=\"Close\" onclick=\""+this.objname+".closeTab("+id+")\"></button></a></li>\n";

       /**
        * addeventlistenter
        *
        this.$(this.config.tabContainer).innerHTML+="<li id=\""+this.div+""+id+"\" class=\"d-inlineblock nav-item\" ><a href=\"#\" id=\""+this.div+"a"+id+"\" title=\""+TabTitle+"\" class=\"nav-link\">"+TabTitle+"<button type=\"button\" class=\"btn-close ms-3 liveTab-closebtn\" id=\""+this.div+"c"+id+"\" aria-label=\"Close\" ></button></a></li>\n";
        var closeBtn = this.$(this.div+"c"+id);
            closeBtn.addEventListener('click',function(){this.objname.closeTab(id);return false;});
        var switchBtn = this.$(this.div+"a"+id);
            switchBtn.addEventListener('click',function(){this.objname.switchTab(id);return false;});    
        */
       
       //the container HTML code
       this.$(this.config.tabContentContainer).innerHTML+="<div id=\""+this.config.tabContentContainer+id+"\" ></div>";
       
       //set the height of the container
       //must be dynamic
       //this.$("tab"+id+"div").style.height = manager.viewport
       
       //now add the created items to the Tabs and Tabs_ID array
        this.Tabs.push(tab_id);
     
         //id = tabnum ; this id will be requested to get focus

         this.switchTab( id );


         //set the size of tabs
       //  this.set_tab_size();
       if(fallback) {
         fallback();
        //console.log(this.$(this.config.tabContentContainer).innerHTML);
       }

          

    }


}

//export {LiveTabs}
/**
 * 
 * try making new tabs 
 * 
 * 1) implement the following HTML code
 * 2) get instance of the LiveTabs
 * 3) enjoy working with them
 */

/**
 * make an <a href="#" onclick = LiveTabs.createTab()
 */


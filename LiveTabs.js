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
 (function () {


     //define our constructor
     this.LiveTabs = function ( config , objname ){
       this.objname = objname;
        this.config = config;
        this.tabNum = 0;
        this.div = config.tabContainer;
        this.maxTabNumber = 6;
        this.opened;
        this.Tabs = [];

        // var config = {
        //     offlineTab : config.offlineTab ,
        //     selectedTab : config.selectedTab,
        //     visibleContainer : config.visibleContainer,
        //     hiddenContainer : config.hiddenContainer
        // }


         
     }

     //public Methods
     //create new tab
    /**
     * 
     * @param {web url} url url is used for XHR requests
     * @param {string} TabTitle title of the tab
     * @param {string id} tab_id unique id for each link/tab
     * @returns mixed
     */
    LiveTabs.prototype.createTab = function ( TabTitle , tab_id ,  fallback = '' ){
        
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

       //var createdTabId= this.tabNum;
       
       
       

       //the tab header HTML code
      // console.log($.call(this));
      //$.call(this);
      // console.log(document.getElementById('LiveTabsContainer').innerHTML);

       //return false;

       $(config.tabContainer).innerHTML+="<li id=\""+this.div+""+id+"\" class=\"d-inlineblock nav-item\" ><a href=\"javascript:void(0);return false;\" id=\""+this.div+"a"+id+"\" onclick=\""+this.objname+".switchTab("+id+");return false\" title=\""+TabTitle+"\" class=\"nav-link\"><span>"+TabTitle+"</span><button type=\"button\" class=\"btn-close ms-3 liveTab-closebtn\" aria-label=\"Close\" onclick=\""+this.objname+".closeTab("+id+")\"></button></a></li>\n";
       
       //the container HTML code
       //$(this.config.tabContentContainer).innerHTML+="<div id=\"tab"+id+"div\" ></div>";
       $(this.config.tabContentContainer).innerHTML+="<div id=\""+this.config.tabContentContainer+id+"\" ></div>";
       
       //set the height of the container
       //must be dynamic
       //this.$("tab"+id+"div").style.height = manager.viewport;
       
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


   //get the ElementById
     function $(o){
        // console.log(config.tabContainer)
        // console.log(window.document.getElementById(config.tabContainer))
        //return false;
        return document.getElementById(o);
    }

    /**
     * 
     * @param {integer} i id of the requested tab
     *
     *
     */

    LiveTabs.prototype.switchTab = function( reqId ){
     
      
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
          $(this.div+"a"+reqId).classList.add("active");
          $(this.config.tabContentContainer+reqId).classList.remove("d-none");
          $(this.config.tabContentContainer+reqId).classList.add("d-block");
          $(this.config.tabContainer+reqId).classList.add("active");

          if(this.config.animate){
            $(this.config.tabContainer+treqId).classList.add("livetabs-animate");

          }



          if(this.config.largeTabs){
             $(this.config.tabContainer+reqId).classList.add("livetabs-grow");
          }
          
        }catch(e){}
       
       
       if(this.opened!= reqId){  
         try{
              //disable the current opened tab
              $(this.config.tabContentContainer+this.opened).classList.remove("d-block");
              
              $(this.config.tabContentContainer+this.opened).classList.add("d-none");
              $(this.div+"a"+this.opened).classList.remove('active');

              $(this.config.tabContainer+this.opened).classList.remove("active");

              if(this.config.animate){
                $(this.config.tabContainer+this.opened).classList.remove("livetabs-animate");
            
              }

              if(this.config.largeTabs){
                $(this.config.tabContainer+this.opened).classList.remove("livetabs-grow");
              }
              
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
    LiveTabs.prototype.closeTab = function ( id ){
         
        for(var j=0; j < this.Tabs.length; j++ ){
              //if( Tabs_ID[j]== id ){
                if( this.Tabs[j]== id ){
                var del_tab_index = j;
                break;
              }
   
        }
 
        this.Tabs.splice(del_tab_index,1);
        //remove the li from DOM
        
        $(this.div+id).remove();

       //remove the tab container too
        $(this.config.tabContentContainer+id).remove();
       
        this.tabNum -= 1;
        //switch to previous tab if the opened tab is closed
        
        if( this.opened == id ){
           var index = Math.floor(Math.random() * this.Tabs.length);

           index =  Number(this.Tabs[index]);
           
              if (index) {
                    //this.opened = index;
                    this.switchTab(index);
                    
                    
              }
        }
        
    }

     
 }());
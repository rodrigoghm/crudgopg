$(document).ready(function() {
    
    // Test for placeholder support
    $.support.placeholder = (function(){
        var i = document.createElement('input');
        return 'placeholder' in i;
    })();

    // Hide labels by default if placeholders are supported
    if($.support.placeholder) {
        $('.form-label').each(function(){
            $(this).addClass('js-hide-label');
        });  

        // Code for adding/removing classes here
        $('.form-group').find('input, textarea').on('keyup blur focus', function(e){
            
            // Cache our selectors
            var $this = $(this),
            $label = $this.parent().find("label");
            console.log(e.type)
            switch(e.type) {
                
                case 'keyup': {
                        $label.toggleClass('js-hide-label', $this.val() == '');
                } break;
                case 'blur': {
                    if( $this.val() == '' ) {
                        $label.addClass('js-hide-label');
                    } else {
                        $label.removeClass('js-hide-label').addClass('js-unhighlight-label');
                    }
                } break;
                case 'focus': {
                    if( $this.val() !== '' ) {
                        $label.removeClass('js-unhighlight-label');
                        }
                } 
                    break;
                    default: break;
            }
        });

        $('.form-group').find('select').on('change focus blur click', function(e){
            
            // Cache our selectors
            var $this = $(this),
            $label = $this.parent().find("label");
            console.log(e.type)
            console.log("val --> " + $this.val())
            switch(e.type) {
                case 'change': {
                    if( $this.val() == '' ) {
                        $label.addClass('js-hide-label');
                    } else {
                        $label.removeClass('js-hide-label');
                    }
                }break;
                case 'focus': {
                    if( $this.val() == '' ) {
                        $label.addClass('js-hide-label');
                    } else {
                        $label.removeClass('js-hide-label');
                    }
                } break;
                case 'blur': {
                    if( $this.val() == '' ) {
                        $label.addClass('js-hide-label');
                    } else {
                        $label.removeClass('js-hide-label').addClass('js-unhighlight-label');
                    }
                } break;
                case 'click': {
                    $label.removeClass('js-hide-label');
                    
                } 
                break;
                default: break;
            }
        });
    } 
});
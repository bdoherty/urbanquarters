jQuery('input[type=checkbox]').click(function() { 
      enableButton(this.checked);
})

function enableButton(enable) {
	jQuery('input.button.submit').attr('disabled', !enable)
	jQuery('input.button.submit').css('background-color', enable ? '' : '#999');
}
enableButton(jQuery('input[type=checkbox]').attr('checked'));
$(document).ready(function(){
	equalHeight('.item-group');
})

function equalHeight(group){
	var maxHeight = 0;
	setTimeout(function(){
		$(group).each(function(){
			maxHeight = maxHeight < $(this).height() ? $(this).height() : maxHeight;
		});
		$(group).height(maxHeight);
	},300);
}

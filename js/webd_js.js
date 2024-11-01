(function( $ ) {

	
	$('.webd_woocommerce_bulk_edit .nav-tab-wrapper a').click(function(e){
		e.preventDefault();

		if($(this).hasClass("premium") ){
			$(".webd_woocommerce_bulk_edit .premium_msg").slideDown('slow');
		}else if($(this).hasClass("gopro")){
			$(".webd_woocommerce_bulk_edit .the_Content").hide();
			$(".webd_woocommerce_bulk_edit .premium_msg").hide();
			$("#webd_woocommerce_bulk_editinstructionsVideo").hide();
			$(".webd_woocommerce_bulk_edit .right_wrap").fadeIn();			
		}else if($(this).hasClass("bulk_wrap_free_instructionsVideo")) {
			$(".webd_woocommerce_bulk_edit .the_Content").hide();
			$(".webd_woocommerce_bulk_edit .premium_msg").hide();
			$(".webd_woocommerce_bulk_edit .right_wrap").hide();
			$("#webd_woocommerce_bulk_editinstructionsVideo").slideDown();			
		}else if($(this).hasClass("contant")) {
			$(".webd_woocommerce_bulk_edit .the_Content").show();
			$(".webd_woocommerce_bulk_edit .premium_msg").hide();
			$("#webd_woocommerce_bulk_editinstructionsVideo").hide();
			$(".webd_woocommerce_bulk_edit .right_wrap").hide();			
		}		
		
	});	
	

	$(".webd_woocommerce_bulk_edit .proOnly").on('click',function(){
		$(".webd_woocommerce_bulk_edit .premium_msg").slideDown('slow').delay(3000).fadeOut('slow');	
	});
	

	//COUNT NUMBER OF ROWS IN TABLE
			function checkTableResults(){
				 if($('table tr').length > 1 ){
					 $('table').show();
				 }else{
					 $('table').hide();
					 $('input[type=submit]').hide();
					 $(".msg").addClass('success').slideDown().html("<p>Nothing to show here. </p>")
				 }
			}

	  
	$(".webd_woocommerce_bulk_edit #selectTaxonomy").on("submit", function (e) {		
		e.preventDefault();
		localStorage.setItem('taxonomy',$("#selectTaxonomy #vocabularySelect ").val() );
		data = $(this).serialize();
			$.ajax({
				url: $(this).attr('action'),
				data:  data,
				type: 'POST',
				beforeSend: function() {								
					$('.webd_woocommerce_bulk_edit').addClass('loading');
				},						
				success: function(response){
					$(".vocabularySelect").slideDown().html($(response).find(".vocabularySelect").html());
					$('.webd_woocommerce_bulk_edit').removeClass('loading');
					$("#selectTaxonomy #vocabularySelect ").val(localStorage.getItem('taxonomy'));
				}
			});				
	});
	
	$(".webd_woocommerce_bulk_edit #vocabularySelect").on("change", function (e) {
		console.log('changed');
		$('.webd_woocommerce_bulk_edit #selectTaxonomy').submit();	
	});
	
	
	
		
	$(".webd_woocommerce_bulk_edit #editProductDisplay").on("submit", function (e) {
		e.preventDefault();
		data = $(this).serialize();
		//if checkbox is checked
		$(".fieldsToShow").each(function(){
			if($(this).is(':checked')) {
			}else localStorage.setItem($(this).attr('name') ,$(this).attr('name') );
		});		
		localStorage.setItem('taxTerm',$("#editProductDisplay #taxTerm").val() );
		localStorage.setItem('keyword',$("#editProductDisplay #keyword").val() );
		localStorage.setItem('sku',$("#editProductDisplay #sku").val() );
		localStorage.setItem('regular_price',$("#editProductDisplay #regular_price").val() );
		localStorage.setItem('price_selector',$("#editProductDisplay #price_selector").val() );
		localStorage.setItem('sale_price_selector',$("#editProductDisplay #sale_price_selector").val() );
		localStorage.setItem('sale_price',$("#editProductDisplay #sale_price ").val() );
		var url = $(this).attr('action');
						$.ajax({
							url: $(this).attr('action'),
							data:  data,
							type: 'POST',
							beforeSend: function() {								
								//$("html, body").animate({ scrollTop: 0 }, "slow");
								$('.webd_woocommerce_bulk_edit').addClass('loading');
							},						
							success: function(response){
								//$(".result").slideDown().html($(response).find(".result").html());
								$('.webd_woocommerce_bulk_edit').removeClass('loading');
								$('body').html(response);
								$(".webd_woocommerce_bulk_edit .togglerMassive").show();								
								$("#editProductDisplay #taxTerm").val(localStorage.getItem('taxTerm'));
								$("#editProductDisplay #keyword").val(localStorage.getItem('keyword'));
								$("#editProductDisplay #sku").val(localStorage.getItem('sku'));
								$("#editProductDisplay #regular_price").val(localStorage.getItem('regular_price'));
								$("#editProductDisplay #sale_price").val(localStorage.getItem('sale_price'));
								$("#editProductDisplay #price_selector").val(localStorage.getItem('price_selector'));
								$("#editProductDisplay #sale_price_selector").val(localStorage.getItem('sale_price_selector'));	
								//if checkbox is checked
								$(".fieldsToShow").each(function(){									
									if (localStorage.getItem($(this).attr('name')) ) {
										$(this).attr('checked', false);
										//console.log($(this).attr('name') +" is not checked");
									}//else $(this).attr('checked', false);
									
									localStorage.removeItem($(this).attr('name'));	
								});								
								//hide seach forms for better display
								$(".webd_woocommerce_bulk_edit #editProductDisplay").slideUp();
								$(".webd_woocommerce_bulk_edit #selectTaxonomy").slideUp();
								$(".webd_woocommerce_bulk_edit .toggler").show(); //show filter toggle though
								$(".webd_woocommerce_bulk_edit .togglerMassive").show();
								toRunAfterAjax();
								
								$(".webd_woocommerce_bulk_edit #massiveId").val('');
							}							
						});				
	});
	
	
	


		//TOGGLERS
		$(".webd_woocommerce_bulk_edit .toggler").click(function(){
				$(".webd_woocommerce_bulk_edit #editProductDisplay").slideToggle();
				$(".webd_woocommerce_bulk_edit #selectTaxonomy").slideToggle();
				$(".webd_woocommerce_bulk_edit #updateMassive").slideUp();
		});
		$(".webd_woocommerce_bulk_edit .togglerMassive").click(function(){
				$(".webd_woocommerce_bulk_edit #updateMassive").slideToggle();
					$(".webd_woocommerce_bulk_edit #editProductDisplay").slideUp();
					$(".webd_woocommerce_bulk_edit #selectTaxonomy").slideUp();		
		});

		
	
	
	

		//BULK UPDATE FEATURES
		
		$(".webd_woocommerce_bulk_edit #updateMassive").on("submit", function (e) {
			e.preventDefault();
			var massiveId = $(".webd_woocommerce_bulk_edit #massiveId").val();
			if(massiveId.length >0){
						data = $(this).serialize();
							$.ajax({
								url: $(this).attr('action'),
								data:  data,
								type: 'POST',
								beforeSend: function() {								
									//$("html, body").animate({ scrollTop: 0 }, "slow");
									$('.webd_woocommerce_bulk_edit').addClass('loading');
								},						
								success: function(response){
									$('.webd_woocommerce_bulk_edit #editProductDisplay').submit();
									$(".msg").addClass('success').slideDown().html("<p>Updated</p>").delay(3000).fadeOut('slow');
									
								}
							});				
			}else alert('Please select products from the list below.');
				
		});	
	
	
		// on click of ALL selector select all parent checkboxes and grab the value to be updated
		var ids=[];
		$(".webd_woocommerce_bulk_edit .selectAll").on('click',function(){
			check = $(this).is(":checked");
			if( check ){	
				$(".webd_woocommerce_bulk_edit .selectThis").attr("checked", "checked");
				
				$(".webd_woocommerce_bulk_edit .selectThis").each(function(){
					ids.push($(this).val() );
					$(".webd_woocommerce_bulk_edit #massiveId").val(ids.join(","));
					$(".webd_woocommerce_bulk_edit #massiveId").val() ==ids.join(",");
				});
			}else{
				$(".webd_woocommerce_bulk_edit .selectThis").removeAttr("checked", "checked");	
				ids=[];
				$(".webd_woocommerce_bulk_edit #massiveId").val(ids);
				$(".webd_woocommerce_bulk_edit #massiveId").val() ==ids;
			}
		});

		
		$(".webd_woocommerce_bulk_edit .selectThis").on('click',function(){
			check = $(this).is(":checked");
			if( check ){	
				console.log($(this).val());
				console.log($(this).next().val());
				id = $(this).next().val();
				
				if(jQuery.inArray($(this).val(), ids) !== -1){
				}else ids.push($(this).val() );

					ids.push(id);		

			}else{
				if(jQuery.inArray($(this).val(), ids) !== -1){
					//console.log('in array unchecked');				
					ids.splice( $.inArray($(this).val(), ids), 1 );
				}
					ids.splice( $.inArray(id, ids), 1 );
					
			}
			$(".webd_woocommerce_bulk_edit #massiveId").val(ids.join(","));
			//console.log(ids);
		});		
		
	function toRunAfterAjax(){
		
		
		// UPDATE INLINE
		$(".webd_woocommerce_bulk_edit .single_edit_list").on("submit", function (e) {
			e.preventDefault();
			data = $(this).serialize();
							$.ajax({
								url: $(this).attr('action'),
								data:  data,
								type: 'POST',
								beforeSend: function() {								
									//$("html, body").animate({ scrollTop: 0 }, "slow");
									$('.webd_woocommerce_bulk_edit').addClass('loading');
									$(".webd_woocommerce_bulk_edit .single_edit_list .button-primary").attr('disabled',false);
								},						
								success: function(response){
									$('.webd_woocommerce_bulk_edit').removeClass('loading');							
									$(".msg").addClass('success').slideDown().html("<p>Updated</p>").delay(3000).fadeOut('slow');
								}
							});				
		});	


		//WHEN EDITING INLINE DISABLE THE REST UPDATE FORMS
		$(".webd_woocommerce_bulk_edit  .single_edit_list ").click(function() {
			$(".webd_woocommerce_bulk_edit .single_edit_list .button-primary").attr('disabled',true);
			$(".webd_woocommerce_bulk_edit .single_edit_list input").attr('readonly',true);		
			$(".webd_woocommerce_bulk_edit .single_edit_list textarea").attr('readonly',true);
			$(this).closest(".webd_woocommerce_bulk_edit  .single_edit_list").find(".button-primary").attr('disabled',false);
			$(this).closest(".webd_woocommerce_bulk_edit  .single_edit_list").find("input").attr('readonly',false);
			$(this).closest(".webd_woocommerce_bulk_edit  .single_edit_list").find("textarea").attr('readonly',false);
		});
		

		// on click of ALL selector select all parent checkboxes and grab the value to be updated
		var ids=[];
		$(".webd_woocommerce_bulk_edit .selectAll").on('click',function(){
			check = $(this).is(":checked");
			if( check ){	
				$(".webd_woocommerce_bulk_edit .selectThis").attr("checked", "checked");
				
				$(".webd_woocommerce_bulk_edit .selectThis").each(function(){
					ids.push($(this).val() );
					$(".webd_woocommerce_bulk_edit #massiveId").val(ids.join(","));
					$(".webd_woocommerce_bulk_edit #massiveId").val() ==ids.join(",");
				});
			}else{
				$(".webd_woocommerce_bulk_edit .selectThis").removeAttr("checked", "checked");	
				ids=[];
				$(".webd_woocommerce_bulk_edit #massiveId").val(ids);
				$(".webd_woocommerce_bulk_edit #massiveId").val() ==ids;
			}
		});

		
		$(".webd_woocommerce_bulk_edit .selectThis").on('click',function(){
			check = $(this).is(":checked");
			if( check ){	
				console.log($(this).val());
				console.log($(this).next().val());
				id = $(this).next().val();
				
				if(jQuery.inArray($(this).val(), ids) !== -1){
				}else ids.push($(this).val() );

					ids.push(id);		

			}else{
				if(jQuery.inArray($(this).val(), ids) !== -1){
					//console.log('in array unchecked');				
					ids.splice( $.inArray($(this).val(), ids), 1 );
				}
					ids.splice( $.inArray(id, ids), 1 );
					
			}
			$(".webd_woocommerce_bulk_edit #massiveId").val(ids.join(","));
			//console.log(ids);
		});

	}
	

	
	//ENABLE OPERATOR WHEN PRICE SELECTED
	
	$(".webd_woocommerce_bulk_edit #bulk_regular_price").keyup(function(){
		$(".webd_woocommerce_bulk_edit #regular_operator").removeAttr('disabled');
	});
	$(".webd_woocommerce_bulk_edit #regular_price").keyup(function(){
		$(".webd_woocommerce_bulk_edit #operator").removeAttr('disabled');
	});

	//DISALLOW NEGATIVE VALUES
		
	$('body').on('input', 'input[name=_regular_price]', function() {
	  $(this).val($(this).val().replace('/',''));
	});	
	$('body').on('input', 'input[name=regular_price]', function() {
	  $(this).val($(this).val().replace('/',''));
	});	
	$('body').on('input', 'input[name=bulk_regular_price]', function() {
	  $(this).val($(this).val().replace('/',''));
	});	
	$(".webd_woocommerce_bulk_edit #bulk_sale_price").keyup(function(){
		$(".webd_woocommerce_bulk_edit #sale_operator").removeAttr('disabled');
	});
	$('body').on('input', 'input[name=_sale_price]', function() {
	  $(this).val($(this).val().replace('/',''));
	});	
	$('body').on('input', 'input[name=sale_price]', function() {
	  $(this).val($(this).val().replace('/',''));
	});	
	$('body').on('input', 'input[name=bulk_sale_price]', function() {
	  $(this).val($(this).val().replace('/',''));
	});	

		
	
})( jQuery )
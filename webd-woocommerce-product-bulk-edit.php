<?php
/*
 * Plugin Name: WebD Woocommerce Product Bulk Edit
 * Plugin URI: https://extend-wp.com/product-bulk-editing-plugin-for-woocommerce/
 * Description: Bulk Edit Woocommerce Simple products & Inline Editor.
 * Version: 1.3
 * Author: extendwp
 * Author URI: https://extend-wp.com
 *
 * WC requires at least: 2.2
 * WC tested up to: 8.4
 *  
 * License: GPL2
 * Created On: 07-11-2017
 * Updated On: 24-12-2023
 */
if ( ! defined( 'ABSPATH' ) ) exit; // Exit if accessed directly

include( plugin_dir_path(__FILE__) .'/webd_wbe_products.php');

function load_webdwoocommercebulk_edit_js(){
        wp_enqueue_script('jquery');
        wp_enqueue_script('jquery-ui-core');
		wp_enqueue_script('jquery-ui-accordion');
		wp_enqueue_script('jquery-ui-tabs');
		wp_enqueue_script('jquery-ui-draggable');
		wp_enqueue_script('jquery-ui-droppable');
		
		if( ! wp_script_is( "webd_woocommerce_bulk_edit_fa", 'enqueued' ) ) {
		wp_enqueue_style( 'webd_woocommerce_bulk_edit_fa', plugins_url( '/css/font-awesome.min.css', __FILE__ ));
		} 
		
		//ENQUEUED CSS FILE INSTEAD OF INLINE CSS
		wp_enqueue_style( 'webd_woocommerce_bulk_edit_css', plugins_url( "/css/webd_style.css", __FILE__ ) );	
		wp_enqueue_style( 'webd_woocommerce_bulk_edit_css');		
			
		wp_enqueue_script( 'webd_woocommerce_bulk_edit_js', plugins_url( '/js/webd_js.js', __FILE__ ), array('jquery','jquery-ui-core','jquery-ui-tabs','jquery-ui-draggable','jquery-ui-droppable') , null, true);		
		wp_enqueue_script( 'webd_woocommerce_bulk_edit_js');
		$wwbe = array( 
			'plugin_url' => plugins_url( '', __FILE__ ),
			'siteUrl'	=>	site_url(),
			'nonce' => wp_create_nonce( 'wp_rest' )		
		);
		
		wp_localize_script( 'webd_woocommerce_bulk_edit_js', 'wwbe_js', $wwbe );

}
add_action('admin_enqueue_scripts', 'load_webdwoocommercebulk_edit_js');



add_action('admin_menu', 'webd_woocommerce_bulk_edit_menu');

function webd_woocommerce_bulk_edit_menu() {
	add_submenu_page( 'edit.php?post_type=product', 'WebD Wocommerce Bulk Edit Settings', 'Bulk Edit', 'manage_options', 'webd-woocommerce-bulk-edit', 'webd_woocommerce_bulk_edit_init' );		
	add_submenu_page('woocommerce','WebD Wocommerce Bulk Edit Settings', ' Bulk Edit', 'administrator', 'webd-woocommerce-bulk-edit', 'webd_woocommerce_bulk_edit_init', 'dashicons-edit','50');	
	add_menu_page('WebD Wocommerce Bulk Edit Settings', 'Products Bulk Edit', 'administrator', 'webd-woocommerce-bulk-edit', 'webd_woocommerce_bulk_edit_init', 'dashicons-edit','50');
}


add_filter( 'plugin_action_links_' . plugin_basename(__FILE__), 'add_webd_woocommerce_bulk_edit_links' );

function add_webd_woocommerce_bulk_edit_links ( $links ) {
 $links[] =  '<a href="' . admin_url( 'admin.php?page=webd-woocommerce-bulk-edit' ) . '">Settings</a>';
 $links[] = '<a href="https://extend-wp.com" target="_blank">More plugins by webdeveloping.gr</a>';
   return $links;
}



function webd_woocommerce_bulk_edit_init() {
	
	webd_woocommerce_bulk_edit_form_header();
	
	$products = new WebdWoocommerceBulkEditProducts;
	?>

	<div class="webd_woocommerce_bulk_edit" >



	<div class='left_wrap' >
			

			<h2 class="nav-tab-wrapper">
				<a class='nav-tab nav-tab-active contant' href='?page=webd-woocommerce-bulk-edit'>Search / Edit Products</a>
				<a class='nav-tab premium' href='#'>Delete Products</a>
				<a class='nav-tab premium' href='#'>Import Categories</a>
				<a class='nav-tab premium' href='#'>Delete Categories</a>
				<a class='nav-tab  bulk_wrap_free_instructionsVideo' href='#webd_woocommerce_bulk_editinstructionsVideo'>Instructions</a>
				<a class='nav-tab  gopro' href='#'>GO PRO</a>
			</h2>			
				<div class='msg'></div>	
				<div class='premium_msg'>
					<p>
						<strong>
						Only available on Premium Version <a class='premium_button' target='_blank'  href='https://webdeveloping.gr/product/woocommerce-product-bulk-edit-pro/'>Get it Here</a>
						</strong>
					</p>
				</div>		
			<div class='the_Content'><?php $products->editProductsDisplay(); ?></div>		
		</div>
		<div class='right_wrap rightToLeft'>
			<h2  class='center'>NEED MORE FEATURES? </h2>

			<ul class='webd_plugins'>
				<li>			
					<p>
						<a target='_blank'  href='https://webdeveloping.gr/product/woocommerce-product-bulk-edit-pro/'>
							<img class='premium_img' src='<?php echo plugins_url( 'images/webd_woocommerce_bulk_edit_pro_square.png', __FILE__ ); ?>' alt='Woocommerce Product Bulk Editing Pro' title='Woocommerce Product Bulk Editing Pro' />
						</a>
					</p>
					<a class='premium_button' target='_blank'  href='https://webdeveloping.gr/product/woocommerce-product-bulk-edit-pro/'>
						<?php _e("Get it here","webd_woocommerce_bulk_edit");?>	
					</a>
					<div>
						<p>Bulk Edit Variable Products</p>
						<p>Support for Product Taxonomies, Custom Taxonomies</p>
						<p>Advanced Search  - By any Taxonomy</p>
						<p>Delete Products from UI</p>
						<p>Import Multiple Child-Parent Category Terms from UI</p>
						<p>Delete Category Terms from UI</p>	
						<p>Import / Edit Products With Excel</p>	
					</div>					
				</li>
				
				<li>
					<p>
						<a target='_blank'  href='http://webdeveloping.gr/product/woocommerce-product-excel-importer-bulk-editing-pro'>
							<img class='premium_img' src='<?php echo plugins_url( 'images/webd_woocommerce_product_excel_importer_bulk_edit_pro_square.png', __FILE__ ); ?>' alt='Woocommerce Excel Importer & Product Bulk Editing Pro' title='Woocommerce Excel Importer & Product Bulk Editing Pro' />
						</a>
					</p>
					<a class='premium_button' target='_blank'  href='http://webdeveloping.gr/product/woocommerce-product-excel-importer-bulk-editing-pro'>
						<?php _e("Get it here","webd_woocommerce_bulk_edit");?>	
					</a>
					<div>
						<p>Bulk Edit PRO Features  PLUS.....</p>
						<p>Import Simple and Variable Products with Excel</p>
						<p>Edit Simple and Variable Products with Excel</p>
						<p>Delete Simple and Variable Products with Excel</p>
						<p>Import Product Category Terms with Excel</p>
						<p>Delete Category Terms with Excel</p>	
						<p>Export Products to Excel</p>
					</div>						
				</li>
			</ul>

		</div>		
	</div>
	<?php
	webd_woocommerce_bulk_edit_form_footer();
}

function webd_woocommerce_bulk_edit_form_header() {
?>
	<h2><img src='<?php echo plugins_url( 'images/webd_woocommerce_bulk_edit.png', __FILE__ ); ?>' style='width:100%' />
<?php
}

function webd_woocommerce_bulk_edit_form_footer() {
?>
	<hr>
	<?php webd_woocommerce_bulk_edit_Rating(); ?>
	
	<div id='webd_woocommerce_bulk_editinstructionsVideo'>
		<iframe width="90%" height="500" src="https://www.youtube.com/embed/76-csucP1VY?rel=0" frameborder="0" allowfullscreen></iframe></iframe>
	</div>
			
<?php
}

function webd_woocommerce_bulk_edit_Rating(){
	?>
	<div>
		<p>
			<strong><?php esc_html_e( "You like this plugin? ", 'weiep' ); ?></strong><i class='fa fa-2x fa-smile-o' ></i><br/> <?php esc_html_e( "Then please give us ", 'weiep' ); ?> 
			<a target='_blank' href='https://wordpress.org/support/plugin/webd-woocommerce-product-bulk-edit/reviews/#new-post'>
					<span class="dashicons dashicons-star-filled"></span><span class="dashicons dashicons-star-filled"></span><span class="dashicons dashicons-star-filled"></span><span class="dashicons dashicons-star-filled"></span><span class="dashicons dashicons-star-filled"></span>
			</a>
		</p>
	</div> 	
	<?php	
}

// HPOS compatibility declaration

add_action( 'before_woocommerce_init', function() {
	if ( class_exists( \Automattic\WooCommerce\Utilities\FeaturesUtil::class ) ) {
		\Automattic\WooCommerce\Utilities\FeaturesUtil::declare_compatibility( 'custom_order_tables', __FILE__, true );
	}
} );

?>
<?php

define('EMAIL_FOR_REPORTS', '');
define('RECAPTCHA_PRIVATE_KEY', '@privatekey@');
define('FINISH_URI', 'http://');
define('FINISH_ACTION', 'message');
define('FINISH_MESSAGE', 'Thanks for filling out my form!');
define('UPLOAD_ALLOWED_FILE_TYPES', 'doc, docx, xls, csv, txt, rtf, html, zip, jpg, jpeg, png, gif');

define('_DIR_', str_replace('\\', '/', dirname(__FILE__)) . '/');
require_once _DIR_ . '/handler.php';

?>

<?php if (frmd_message()): ?>
<link rel="stylesheet" href="<?php echo dirname($form_path); ?>/formoid-solid-blue.css" type="text/css" />
<span class="alert alert-success"><?php echo FINISH_MESSAGE; ?></span>
<?php else: ?>
<!-- Start Formoid form-->
<link rel="stylesheet" href="<?php echo dirname($form_path); ?>/formoid-solid-blue.css" type="text/css" />
<script type="text/javascript" src="<?php echo dirname($form_path); ?>/jquery.min.js"></script>
<form class="formoid-solid-blue" style="background-color:#FFFFFF;font-size:14px;font-family:'Roboto',Arial,Helvetica,sans-serif;color:#34495E;max-width:480px;min-width:150px" method="post"><div class="title"><h2>Hiking Destination - Air Travel</h2></div>
	<div class="element-input<?php frmd_add_class("input3"); ?>" title="Enter Origin Airport Code"><label class="title"><span class="required">*</span></label><div class="item-cont"><input class="large" type="text" name="input3" required="required" placeholder="Origin"/><span class="icon-place"></span></div></div>
	<div class="element-input<?php frmd_add_class("input"); ?>" title="Enter Destination Airport Code"><label class="title"><span class="required">*</span></label><div class="item-cont"><input class="large" type="text" name="input" required="required" placeholder="Destination"/><span class="icon-place"></span></div></div>
	<div class="element-date<?php frmd_add_class("date"); ?>"><label class="title"><span class="required">*</span></label><div class="item-cont"><input class="large" data-format="yyyy-mm-dd" type="date" name="date" required="required" placeholder="Departure Date"/><span class="icon-place"></span></div></div>
	<div class="element-date<?php frmd_add_class("date1"); ?>" title="Enter Date"><label class="title"><span class="required">*</span></label><div class="item-cont"><input class="large" data-format="yyyy-mm-dd" type="date" name="date1" required="required" placeholder="Return Date"/><span class="icon-place"></span></div></div>
	<div class="element-number<?php frmd_add_class("number"); ?>" title="Enter Max result #"><label class="title"></label><div class="item-cont"><input class="large" type="text" min="1" max="10" name="number" placeholder="Number of results" value=""/><span class="icon-place"></span></div></div>
<div class="submit"><input type="submit" value="Submit"/></div></form><script type="text/javascript" src="<?php echo dirname($form_path); ?>/formoid-solid-blue.js"></script>

<!-- Stop Formoid form-->
<?php endif; ?>

<?php frmd_end_form(); ?>
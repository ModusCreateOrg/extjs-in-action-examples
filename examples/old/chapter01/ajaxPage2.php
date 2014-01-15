<? sleep(1); ?>
<div>This is an test <b>HTML</b> fragment with javascript.</div>

<script type="text/javascript">
Ext.getBody().highlight(null, {
	duration : 1
});

Ext.getCmp('myTabPanel').add({
	title    : 'Peek-a-boo!',
	closable : true,
	html     : 'Ext is awesome!'
});
</script>

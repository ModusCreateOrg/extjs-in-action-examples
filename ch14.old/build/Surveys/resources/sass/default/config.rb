# Get the directory that this configuration file exists in
dir = File.dirname(__FILE__)
$ext_path = File.join(dir, '..', '..', '..', 'ext')

# Load the extjs framework automatically.
load File.join($ext_path, 'resources', 'themes')

# Compass configurations
sass_path = dir
css_path = File.join(dir, "..", "css")

# Require any additional compass plugins here.
images_dir = File.join(dir, "..", "images")
output_style = :compressed
environment = :production

<?php
// This file is generated. Do not modify it manually.
return array(
	'EDDCardGrid' => array(
		'$schema' => 'https://schemas.wp.org/trunk/block.json',
		'title' => 'EDD Plugins Grid',
		'apiVersion' => 2,
		'name' => 'wp-plugin-info-card/edd-plugins-grid',
		'category' => 'wp-plugin-info-card',
		'icon' => '<svg height=\'24\' viewBox=\'0 0 512 512\' width=\'24\' xmlns=\'http://www.w3.org/2000/svg\'><path id=\'background\' d=\'m256 31a225.07 225.07 0 0 1 87.57 432.33 225.07 225.07 0 0 1 -175.14-414.66 223.45 223.45 0 0 1 87.57-17.67m0-31c-141.38 0-256 114.62-256 256s114.62 256 256 256 256-114.62 256-256-114.62-256-256-256z\'/><path d=\'m255.71 396q-34.11 0-68.21 0c-31.18 0-53.68-22.42-53.84-53.59q-.09-16.32 0-32.65c.06-11.22 6.86-18.44 17.26-18.46s17.29 7.15 17.36 18.36 0 22.16 0 33.24c.08 11.62 6.91 18.39 18.57 18.4q69.09 0 138.17 0c11.67 0 18.51-6.78 18.6-18.39.08-11.08 0-22.16 0-33.24s6.91-18.39 17.35-18.37 17.34 7.24 17.25 18.45c-.11 14.17.68 28.49-1.1 42.47-3.26 25.58-25.07 43.64-50.95 43.76-23.43.07-46.95.02-70.46.02z\'/><path d=\'m273.35 248.88c2.64-2.46 4.19-3.81 5.63-5.26 11.08-11.19 22.1-22.45 33.23-33.6 7.9-7.91 18.91-8.5 26.05-1.56s6.86 18.29-.91 26.11q-33.93 34.14-68.08 68.07c-8 7.95-18.46 8-26.46 0q-34.38-34.1-68.48-68.49c-7.48-7.55-7.52-18.9-.57-25.68s18-6.48 25.63 1.1c11.3 11.24 22.43 22.67 33.65 34 1.44 1.46 3 2.82 5.31 5 .15-3.14.33-5.17.33-7.2 0-35.79-.06-71.57 0-107.36 0-13.43 11.82-21.42 24.1-16.63 6.81 2.64 10.49 8.54 10.5 17.18q.06 53.1 0 106.19z\'/></svg>',
		'description' => 'Display all EDD plugins as cards.',
		'keywords' => array(
			'wp plugin',
			'edd',
			'grid',
			'plugin',
			'card',
			'active',
			'download'
		),
		'version' => '1.0.0',
		'textdomain' => 'wp-plugin-info-card',
		'attributes' => array(
			'assetData' => array(
				'type' => 'array',
				'default' => array(
					
				)
			),
			'uniqueId' => array(
				'type' => 'string',
				'default' => ''
			),
			'align' => array(
				'type' => 'string',
				'default' => 'center'
			),
			'loading' => array(
				'type' => 'boolean',
				'default' => true
			),
			'scheme' => array(
				'type' => 'string',
				'default' => 'default'
			),
			'layout' => array(
				'type' => 'string',
				'default' => 'card'
			),
			'preview' => array(
				'type' => 'boolean',
				'default' => false
			),
			'defaultsApplied' => array(
				'type' => 'boolean',
				'default' => false
			),
			'sortby' => array(
				'type' => 'string',
				'default' => 'none'
			),
			'sort' => array(
				'type' => 'string',
				'default' => 'ASC'
			),
			'cols' => array(
				'type' => 'number',
				'default' => 2
			),
			'colGap' => array(
				'type' => 'number',
				'default' => 20
			),
			'rowGap' => array(
				'type' => 'number',
				'default' => 20
			),
			'excludedSlugs' => array(
				'type' => 'array',
				'default' => array(
					
				)
			)
		),
		'example' => array(
			'attributes' => array(
				'preview' => true
			)
		),
		'supports' => array(
			'anchor' => true,
			'align' => false,
			'className' => true
		),
		'editorScript' => 'wp-plugin-info-card-block-js',
		'editorStyle' => array(
			'wp-plugin-info-card-block-editor-css',
			'wp-plugin-info-card-block-styles-css'
		)
	),
	'GitHubInfoCard' => array(
		'$schema' => 'https://schemas.wp.org/trunk/block.json',
		'title' => 'GitHub Info Card Item',
		'apiVersion' => 3,
		'name' => 'wp-plugin-info-card/github-info-card',
		'parent' => 'wp-plugin-info-card/github-info-card-grid',
		'category' => 'wp-plugin-info-card',
		'icon' => '<svg version=\'1.1\' id=\'Calque_1\' xmlns=\'http://www.w3.org/2000/svg\' x=\'0px\' y=\'0px\' width=\'24\' height=\'24\' viewBox=\'0 0 850.39 850.39\' enable-background=\'new 0 0 850.39 850.39\'><path fill=\'#333\' d=\'M425.195,2C190.366,2,0,191.918,0,426.195C0,660.472,190.366,850.39,425.195,850.39 c234.828,0,425.195-189.918,425.195-424.195C850.39,191.918,660.023,2,425.195,2z M662.409,476.302l-2.624,4.533L559.296,654.451 l78.654,45.525l-228.108,105.9L388.046,555.33l78.653,45.523l69.391-119.887l-239.354-0.303l-94.925-0.337l-28.75-0.032l-0.041-0.07 h0l-24.361-42.303l28.111-48.563l109.635-189.419l-78.653-45.524L435.859,48.514l21.797,250.546l-78.654-45.525l-69.391,119.887 l239.353,0.303l123.676,0.37l16.571,28.772l7.831,13.596L662.409,476.302z\'></path></svg>',
		'description' => 'Add a beautiful GitHub repo info card to your site.',
		'keywords' => array(
			'github',
			'repo',
			'card',
			'theme'
		),
		'version' => '1.0.0',
		'textdomain' => 'wp-plugin-info-card',
		'attributes' => array(
			'assetData' => array(
				'type' => 'object',
				'default' => array(
					
				)
			),
			'loading' => array(
				'type' => 'boolean',
				'default' => true
			),
			'username' => array(
				'type' => 'string',
				'default' => ''
			),
			'repo' => array(
				'type' => 'string',
				'default' => ''
			),
			'align' => array(
				'type' => 'string',
				'default' => 'center'
			),
			'uniqueId' => array(
				'type' => 'string',
				'default' => ''
			),
			'preview' => array(
				'type' => 'boolean',
				'default' => false
			),
			'nameOverride' => array(
				'type' => 'string',
				'default' => ''
			),
			'loginOverride' => array(
				'type' => 'string',
				'default' => ''
			),
			'sponsorsUrlOverride' => array(
				'type' => 'string',
				'default' => ''
			),
			'organizationUrlOverride' => array(
				'type' => 'string',
				'default' => ''
			),
			'overrideButton' => array(
				'type' => 'boolean',
				'default' => false
			),
			'overrideButtonText' => array(
				'type' => 'string',
				'default' => 'View on GitHub'
			),
			'buttonType' => array(
				'type' => 'string',
				'default' => 'github'
			),
			'avatarImageId' => array(
				'type' => 'number',
				'default' => 0
			),
			'avatarImageUrl' => array(
				'type' => 'string',
				'default' => ''
			)
		),
		'usesContext' => array(
			'wppic/github-grid-className',
			'wppic/github-grid-layout',
			'wppic/github-grid-uniqueId',
			'wppic/github-grid-showAuthorBar',
			'wppic/github-grid-showStatsBar',
			'wppic/github-grid-showLastUpdated',
			'wppic/github-grid-buttonType'
		),
		'example' => array(
			'attributes' => array(
				'preview' => true
			)
		),
		'supports' => array(
			'anchor' => true,
			'align' => false,
			'className' => true
		),
		'editorScript' => 'wp-plugin-info-card-block-js',
		'editorStyle' => array(
			'wp-plugin-info-card-block-editor-css',
			'wp-plugin-info-card-block-styles-css'
		),
		'style' => 'wppic-github-info-card'
	),
	'GitHubInfoCardGrid' => array(
		'$schema' => 'https://schemas.wp.org/trunk/block.json',
		'title' => 'GitHub Info Card',
		'apiVersion' => 3,
		'name' => 'wp-plugin-info-card/github-info-card-grid',
		'category' => 'wp-plugin-info-card',
		'children' => array(
			'wp-plugin-info-card/github-info-card'
		),
		'icon' => '<svg xmlns=\'http://www.w3.org/2000/svg\' viewBox=\'0 0 640 640\' width=\'24\' height=\'24\'><path fill=\'currentColor\' d=\'M237.9 461.4C237.9 463.4 235.6 465 232.7 465C229.4 465.3 227.1 463.7 227.1 461.4C227.1 459.4 229.4 457.8 232.3 457.8C235.3 457.5 237.9 459.1 237.9 461.4zM206.8 456.9C206.1 458.9 208.1 461.2 211.1 461.8C213.7 462.8 216.7 461.8 217.3 459.8C217.9 457.8 216 455.5 213 454.6C210.4 453.9 207.5 454.9 206.8 456.9zM251 455.2C248.1 455.9 246.1 457.8 246.4 460.1C246.7 462.1 249.3 463.4 252.3 462.7C255.2 462 257.2 460.1 256.9 458.1C256.6 456.2 253.9 454.9 251 455.2zM316.8 72C178.1 72 72 177.3 72 316C72 426.9 141.8 521.8 241.5 555.2C254.3 557.5 258.8 549.6 258.8 543.1C258.8 536.9 258.5 502.7 258.5 481.7C258.5 481.7 188.5 496.7 173.8 451.9C173.8 451.9 162.4 422.8 146 415.3C146 415.3 123.1 399.6 147.6 399.9C147.6 399.9 172.5 401.9 186.2 425.7C208.1 464.3 244.8 453.2 259.1 446.6C261.4 430.6 267.9 419.5 275.1 412.9C219.2 406.7 162.8 398.6 162.8 302.4C162.8 274.9 170.4 261.1 186.4 243.5C183.8 237 175.3 210.2 189 175.6C209.9 169.1 258 202.6 258 202.6C278 197 299.5 194.1 320.8 194.1C342.1 194.1 363.6 197 383.6 202.6C383.6 202.6 431.7 169 452.6 175.6C466.3 210.3 457.8 237 455.2 243.5C471.2 261.2 481 275 481 302.4C481 398.9 422.1 406.6 366.2 412.9C375.4 420.8 383.2 435.8 383.2 459.3C383.2 493 382.9 534.7 382.9 542.9C382.9 549.4 387.5 557.3 400.2 555C500.2 521.8 568 426.9 568 316C568 177.3 455.5 72 316.8 72zM169.2 416.9C167.9 417.9 168.2 420.2 169.9 422.1C171.5 423.7 173.8 424.4 175.1 423.1C176.4 422.1 176.1 419.8 174.4 417.9C172.8 416.3 170.5 415.6 169.2 416.9zM158.4 408.8C157.7 410.1 158.7 411.7 160.7 412.7C162.3 413.7 164.3 413.4 165 412C165.7 410.7 164.7 409.1 162.7 408.1C160.7 407.5 159.1 407.8 158.4 408.8zM190.8 444.4C189.2 445.7 189.8 448.7 192.1 450.6C194.4 452.9 197.3 453.2 198.6 451.6C199.9 450.3 199.3 447.3 197.3 445.4C195.1 443.1 192.1 442.8 190.8 444.4zM179.4 429.7C177.8 430.7 177.8 433.3 179.4 435.6C181 437.9 183.7 438.9 185 437.9C186.6 436.6 186.6 434 185 431.7C183.6 429.4 181 428.4 179.4 429.7z\'/></svg>',
		'description' => 'Add a beautiful GitHub repo info card grid to your site.',
		'keywords' => array(
			'github',
			'repo',
			'card',
			'theme'
		),
		'version' => '1.0.0',
		'textdomain' => 'wp-plugin-info-card',
		'attributes' => array(
			'uniqueId' => array(
				'type' => 'string',
				'default' => ''
			),
			'numChildren' => array(
				'type' => 'number',
				'default' => 0
			),
			'preview' => array(
				'type' => 'boolean',
				'default' => false
			),
			'layout' => array(
				'type' => 'string',
				'default' => 'large'
			),
			'showTopBar' => array(
				'type' => 'boolean',
				'default' => true
			),
			'showAuthorBar' => array(
				'type' => 'boolean',
				'default' => true
			),
			'showStatsBar' => array(
				'type' => 'boolean',
				'default' => true
			),
			'showLastUpdated' => array(
				'type' => 'boolean',
				'default' => true
			),
			'buttonType' => array(
				'type' => 'string',
				'default' => 'github'
			),
			'cols' => array(
				'type' => 'number',
				'default' => 2
			),
			'colGap' => array(
				'type' => 'number',
				'default' => 20
			),
			'rowGap' => array(
				'type' => 'number',
				'default' => 20
			)
		),
		'providesContext' => array(
			'wppic/github-grid-uniqueId' => 'uniqueId',
			'wppic/github-grid-className' => 'className',
			'wppic/github-grid-layout' => 'layout',
			'wppic/github-grid-showTopBar' => 'showTopBar',
			'wppic/github-grid-showAuthorBar' => 'showAuthorBar',
			'wppic/github-grid-showStatsBar' => 'showStatsBar',
			'wppic/github-grid-showLastUpdated' => 'showLastUpdated',
			'wppic/github-grid-buttonType' => 'buttonType'
		),
		'example' => array(
			'attributes' => array(
				'preview' => true
			)
		),
		'supports' => array(
			'anchor' => true,
			'align' => array(
				'center',
				'wide',
				'full'
			),
			'className' => true
		),
		'styles' => array(
			array(
				'name' => 'wppic-github-light',
				'label' => 'GitHub Light',
				'isDefault' => true
			),
			array(
				'name' => 'wppic-github-dark',
				'label' => 'GitHub Dark',
				'isDefault' => false
			),
			array(
				'name' => 'wppic-github-colorful',
				'label' => 'Colorful',
				'isDefault' => false
			),
			array(
				'name' => 'wppic-github-bw',
				'label' => 'Black & White',
				'isDefault' => false
			),
			array(
				'name' => 'wppic-github-purple',
				'label' => 'Purple',
				'isDefault' => false
			),
			array(
				'name' => 'wppic-github-custom',
				'label' => 'Custom',
				'isDefault' => false
			)
		),
		'editorScript' => 'wp-plugin-info-card-block-js',
		'editorStyle' => array(
			'wp-plugin-info-card-block-editor-css',
			'wp-plugin-info-card-block-styles-css'
		),
		'style' => 'wppic-github-info-card'
	),
	'PluginInfoCard' => array(
		'$schema' => 'https://schemas.wp.org/trunk/block.json',
		'title' => 'WP Plugin Info Card',
		'apiVersion' => 3,
		'name' => 'wp-plugin-info-card/wp-plugin-info-card',
		'category' => 'wp-plugin-info-card',
		'icon' => '<svg version=\'1.1\' id=\'Calque_1\' xmlns=\'http://www.w3.org/2000/svg\' x=\'0px\' y=\'0px\' width=\'24\' height=\'24\' viewBox=\'0 0 850.39 850.39\' enable-background=\'new 0 0 850.39 850.39\'><path fill=\'#333\' d=\'M425.195,2C190.366,2,0,191.918,0,426.195C0,660.472,190.366,850.39,425.195,850.39 c234.828,0,425.195-189.918,425.195-424.195C850.39,191.918,660.023,2,425.195,2z M662.409,476.302l-2.624,4.533L559.296,654.451 l78.654,45.525l-228.108,105.9L388.046,555.33l78.653,45.523l69.391-119.887l-239.354-0.303l-94.925-0.337l-28.75-0.032l-0.041-0.07 h0l-24.361-42.303l28.111-48.563l109.635-189.419l-78.653-45.524L435.859,48.514l21.797,250.546l-78.654-45.525l-69.391,119.887 l239.353,0.303l123.676,0.37l16.571,28.772l7.831,13.596L662.409,476.302z\'></path></svg>',
		'description' => 'Add a beautiful plugin or theme info card to your site.',
		'keywords' => array(
			'wp plugin',
			'plugin',
			'card',
			'theme'
		),
		'version' => '1.0.0',
		'textdomain' => 'wp-plugin-info-card',
		'attributes' => array(
			'assetData' => array(
				'type' => 'array',
				'default' => array(
					
				)
			),
			'type' => array(
				'type' => 'string',
				'default' => 'plugin'
			),
			'slug' => array(
				'type' => 'string',
				'default' => 'wp-plugin-info-card'
			),
			'loading' => array(
				'type' => 'boolean',
				'default' => true
			),
			'html' => array(
				'type' => 'string',
				'default' => ''
			),
			'align' => array(
				'type' => 'string',
				'default' => 'full'
			),
			'image' => array(
				'type' => 'string',
				'default' => ''
			),
			'containerid' => array(
				'type' => 'string',
				'default' => ''
			),
			'margin' => array(
				'type' => 'string',
				'default' => ''
			),
			'marginSpacing' => array(
				'type' => 'string',
				'default' => 'none'
			),
			'marginSpacingTarget' => array(
				'type' => 'string',
				'default' => 'both'
			),
			'clear' => array(
				'type' => 'string',
				'default' => 'none'
			),
			'expiration' => array(
				'type' => 'number',
				'default' => 0
			),
			'ajax' => array(
				'type' => 'string',
				'default' => 'false'
			),
			'scheme' => array(
				'type' => 'string',
				'default' => 'default'
			),
			'layout' => array(
				'type' => 'string',
				'default' => 'card'
			),
			'custom' => array(
				'type' => 'string',
				'default' => ''
			),
			'width' => array(
				'type' => 'string',
				'default' => ''
			),
			'preview' => array(
				'type' => 'boolean',
				'default' => false
			),
			'multi' => array(
				'type' => 'boolean',
				'default' => false
			),
			'defaultsApplied' => array(
				'type' => 'boolean',
				'default' => false
			),
			'cols' => array(
				'type' => 'number',
				'default' => 2
			),
			'colGap' => array(
				'type' => 'number',
				'default' => 20
			),
			'rowGap' => array(
				'type' => 'number',
				'default' => 20
			),
			'uniqueId' => array(
				'type' => 'string',
				'default' => ''
			),
			'itemSlugs' => array(
				'type' => 'object',
				'default' => array(
					
				)
			)
		),
		'example' => array(
			'attributes' => array(
				'preview' => true
			)
		),
		'supports' => array(
			'anchor' => true,
			'align' => array(
				'left',
				'center',
				'right',
				'full'
			),
			'className' => true
		),
		'editorScript' => 'wp-plugin-info-card-block-js',
		'editorStyle' => array(
			'wp-plugin-info-card-block-editor-css',
			'wp-plugin-info-card-block-styles-css'
		)
	),
	'PluginInfoCardQuery' => array(
		'$schema' => 'https://schemas.wp.org/trunk/block.json',
		'title' => 'WP Plugin Info Card Query',
		'apiVersion' => 3,
		'name' => 'wp-plugin-info-card/wp-plugin-info-card-query',
		'category' => 'wp-plugin-info-card',
		'icon' => '<svg height=\'24\' width=\'24\' xmlns=\'http://www.w3.org/2000/svg\' viewBox=\'0 0 512 512\'><path fill=\'#333\' d=\'M256 140c-63.962 0-116 52.038-116 116s52.038 116 116 116 116-52.038 116-116-52.038-116-116-116zm-60.25 59.875h86.635l-4.578-5.045c-5.566-6.135-5.106-15.622 1.029-21.188 6.136-5.567 15.621-5.106 21.188 1.029l27.333 30.125c5.188 5.718 5.188 14.441 0 20.159l-27.333 30.125a14.958 14.958 0 0 1-11.113 4.92 14.945 14.945 0 0 1-10.075-3.891c-6.135-5.567-6.596-15.053-1.029-21.188l4.578-5.045H195.75c-8.284 0-15-6.716-15-15s6.716-15.001 15-15.001zm120.5 112.25h-86.635l4.578 5.045c5.566 6.135 5.106 15.622-1.029 21.188a14.948 14.948 0 0 1-10.075 3.891 14.964 14.964 0 0 1-11.113-4.92l-27.333-30.125c-5.188-5.718-5.188-14.441 0-20.159l27.333-30.125c5.567-6.135 15.054-6.596 21.188-1.029 6.135 5.567 6.596 15.053 1.029 21.188l-4.578 5.045h86.635c8.284 0 15 6.716 15 15s-6.716 15.001-15 15.001z\'></path><path fill=\'#333\' d=\'M497 199.92h-33.479a212.647 212.647 0 0 0-21.142-50.991l23.688-23.688c5.858-5.858 5.858-15.355 0-21.213l-58.095-58.095c-5.857-5.858-15.355-5.858-21.213 0L363.07 69.621a212.647 212.647 0 0 0-50.991-21.142V15c0-8.284-6.716-15-15-15H214.92c-8.284 0-15 6.716-15 15v33.479a212.664 212.664 0 0 0-50.991 21.142l-23.688-23.688c-5.857-5.858-15.355-5.858-21.213 0l-58.095 58.095c-5.858 5.858-5.858 15.355 0 21.213l23.688 23.688a212.647 212.647 0 0 0-21.142 50.991H15c-8.284 0-15 6.716-15 15v82.159c0 8.284 6.716 15 15 15h33.479a212.664 212.664 0 0 0 21.142 50.991l-23.688 23.688c-5.858 5.858-5.858 15.355 0 21.213l58.095 58.095c5.857 5.858 15.355 5.858 21.213 0l23.688-23.688a212.633 212.633 0 0 0 50.991 21.143V497c0 8.284 6.716 15 15 15h82.159c8.284 0 15-6.716 15-15v-33.479a212.568 212.568 0 0 0 50.991-21.143l23.688 23.688c5.857 5.858 15.355 5.858 21.213 0l58.095-58.095c5.858-5.858 5.858-15.355 0-21.213l-23.688-23.688a212.647 212.647 0 0 0 21.142-50.991H497c8.284 0 15-6.716 15-15V214.92c0-8.284-6.716-15-15-15zM256 402c-80.505 0-146-65.495-146-146s65.495-146 146-146 146 65.495 146 146-65.495 146-146 146z\'></path></svg>',
		'description' => 'Query and display a list of plugins or themes in a beautiful card format.',
		'keywords' => array(
			'wp plugin',
			'plugin',
			'card',
			'theme',
			'query'
		),
		'version' => '1.0.0',
		'textdomain' => 'wp-plugin-info-card',
		'attributes' => array(
			'assetData' => array(
				'type' => 'array',
				'default' => array(
					
				)
			),
			'uniqueId' => array(
				'type' => 'string',
				'default' => ''
			),
			'search' => array(
				'type' => 'string',
				'default' => ''
			),
			'tag' => array(
				'type' => 'string',
				'default' => ''
			),
			'author' => array(
				'type' => 'string',
				'default' => ''
			),
			'user' => array(
				'type' => 'string',
				'default' => ''
			),
			'browse' => array(
				'type' => 'string',
				'default' => ''
			),
			'per_page' => array(
				'type' => 'string',
				'default' => '8'
			),
			'cols' => array(
				'type' => 'string',
				'default' => 2
			),
			'colGap' => array(
				'type' => 'number',
				'default' => 20
			),
			'rowGap' => array(
				'type' => 'number',
				'default' => 20
			),
			'type' => array(
				'type' => 'string',
				'default' => 'plugin'
			),
			'slug' => array(
				'type' => 'string',
				'default' => ''
			),
			'loading' => array(
				'type' => 'boolean',
				'default' => false
			),
			'html' => array(
				'type' => 'string',
				'default' => ''
			),
			'align' => array(
				'type' => 'string',
				'default' => 'full'
			),
			'image' => array(
				'type' => 'string',
				'default' => ''
			),
			'containerid' => array(
				'type' => 'string',
				'default' => ''
			),
			'margin' => array(
				'type' => 'string',
				'default' => ''
			),
			'clear' => array(
				'type' => 'string',
				'default' => 'none'
			),
			'expiration' => array(
				'type' => 'number',
				'default' => 0
			),
			'ajax' => array(
				'type' => 'string',
				'default' => 'false'
			),
			'scheme' => array(
				'type' => 'string',
				'default' => 'default'
			),
			'layout' => array(
				'type' => 'string',
				'default' => 'card'
			),
			'custom' => array(
				'type' => 'string',
				'default' => ''
			),
			'width' => array(
				'type' => 'string',
				'default' => ''
			),
			'preview' => array(
				'type' => 'boolean',
				'default' => false
			),
			'defaultsApplied' => array(
				'type' => 'boolean',
				'default' => false
			),
			'sortby' => array(
				'type' => 'string',
				'default' => 'none'
			),
			'sort' => array(
				'type' => 'string',
				'default' => 'ASC'
			),
			'itemSlugs' => array(
				'type' => 'object',
				'default' => array(
					
				)
			)
		),
		'example' => array(
			'attributes' => array(
				'preview' => true
			)
		),
		'supports' => array(
			'anchor' => true,
			'align' => false,
			'className' => true
		),
		'editorScript' => 'wp-plugin-info-card-block-js',
		'editorStyle' => array(
			'wp-plugin-info-card-block-editor-css',
			'wp-plugin-info-card-block-styles-css'
		)
	),
	'PluginScreenshotsInfoCard' => array(
		'$schema' => 'https://schemas.wp.org/trunk/block.json',
		'title' => 'Plugin Screenshots Info Card',
		'apiVersion' => 3,
		'name' => 'wp-plugin-info-card/plugin-screenshots-info-card',
		'category' => 'wp-plugin-info-card',
		'icon' => '<svg viewBox=\'0 0 48 48\' width=\'24\' height=\'24\'><path d=\'M3.11 33.305v9.504a2.501 2.501 0 0 0 2.5 2.502h9.506a1 1 0 0 0 0-2.001H5.61a.504.504 0 0 1-.354-.147.504.504 0 0 1-.146-.354v-9.504a1 1 0 0 0-2.001 0zM33.125 45.31h9.504a2.501 2.501 0 0 0 2.502-2.502v-9.504a1 1 0 0 0-2.001 0v9.504a.504.504 0 0 1-.5.5h-9.505a1 1 0 0 0 0 2.002zM45.13 15.296V5.79a2.501 2.501 0 0 0-2.502-2.501h-9.504a1 1 0 0 0 0 2h9.504a.504.504 0 0 1 .5.5v9.506a1 1 0 0 0 2.002 0zM15.116 3.29H5.61a2.501 2.501 0 0 0-2.501 2.5v9.506a1 1 0 0 0 2 0V5.79a.504.504 0 0 1 .5-.5h9.506a1 1 0 0 0 0-2.001zM34.661 18.297H31.63a.501.501 0 0 1-.416-.223l-1.777-2.665a2.501 2.501 0 0 0-2.081-1.114h-6.398c-.836 0-1.617.418-2.08 1.114l-1.778 2.665a.501.501 0 0 1-.416.223h-3.032a2.501 2.501 0 0 0-2.501 2.501v11.006a2.5 2.5 0 0 0 2.5 2.501h21.011a2.5 2.5 0 0 0 2.502-2.501V20.798a2.501 2.501 0 0 0-2.502-2.501zm-10.505 2.001a5.004 5.004 0 0 0 0 10.005c2.761 0 5.003-2.241 5.003-5.002s-2.242-5.003-5.003-5.003zm0 2.001a3.003 3.003 0 0 1 0 6.003 3.003 3.003 0 0 1 0-6.003z\' fill=\'currentColor\' /></svg>',
		'description' => 'Add a beautiful plugin card with screenshots.',
		'keywords' => array(
			'wp plugin',
			'plugin',
			'card',
			'theme',
			'screenshot'
		),
		'version' => '1.0.0',
		'textdomain' => 'wp-plugin-info-card',
		'attributes' => array(
			'uniqueId' => array(
				'type' => 'string',
				'default' => ''
			),
			'preview' => array(
				'type' => 'boolean',
				'default' => false
			),
			'screen' => array(
				'type' => 'string',
				'default' => 'slug-entry'
			),
			'assetData' => array(
				'type' => 'object',
				'default' => array(
					
				)
			),
			'type' => array(
				'type' => 'string',
				'default' => 'plugin'
			),
			'slug' => array(
				'type' => 'string',
				'default' => 'highlight-and-share'
			),
			'loading' => array(
				'type' => 'boolean',
				'default' => true
			),
			'iconStyle' => array(
				'type' => 'string',
				'default' => 'none'
			),
			'enableRoundedIcon' => array(
				'type' => 'boolean',
				'default' => true
			),
			'colorTheme' => array(
				'type' => 'string',
				'default' => 'default'
			),
			'customColors' => array(
				'type' => 'boolean',
				'default' => false
			),
			'pluginTitle' => array(
				'type' => 'string',
				'default' => ''
			),
			'enableContextMenu' => array(
				'type' => 'boolean',
				'default' => true
			),
			'enableScreenshots' => array(
				'type' => 'boolean',
				'default' => true
			),
			'imageSource' => array(
				'type' => 'string',
				'default' => 'local'
			),
			'images' => array(
				'type' => 'array',
				'default' => array(
					
				)
			),
			'align' => array(
				'type' => 'string',
				'default' => 'center'
			),
			'colorBackground' => array(
				'type' => 'string',
				'default' => '#FFFFFF'
			),
			'colorText' => array(
				'type' => 'string',
				'default' => '#000000'
			),
			'colorBorder' => array(
				'type' => 'string',
				'default' => '#000000'
			),
			'colorMenuBorder' => array(
				'type' => 'string',
				'default' => '#000000'
			),
			'colorMenu' => array(
				'type' => 'string',
				'default' => '#000000'
			),
			'colorMenuHover' => array(
				'type' => 'string',
				'default' => '#DDDDDD'
			),
			'colorMenuText' => array(
				'type' => 'string',
				'default' => '#FFFFFF'
			),
			'colorMenuTextHover' => array(
				'type' => 'string',
				'default' => '#000000'
			),
			'colorScreenshotsBackground' => array(
				'type' => 'string',
				'default' => '#DDDDDD'
			),
			'colorScreenshotsBorder' => array(
				'type' => 'string',
				'default' => '#000000'
			),
			'colorScreenshotsArrowBackground' => array(
				'type' => 'string',
				'default' => '#333333'
			),
			'colorScreenshotsArrowBackgroundHover' => array(
				'type' => 'string',
				'default' => '#000000'
			),
			'colorScreenshotsArrow' => array(
				'type' => 'string',
				'default' => '#EEEEEE'
			),
			'colorScreenshotsArrowHover' => array(
				'type' => 'string',
				'default' => '#FFFFFF'
			),
			'colorStar' => array(
				'type' => 'string',
				'default' => '#FF9529'
			),
			'colorMetaBackground' => array(
				'type' => 'string',
				'default' => '#000000'
			),
			'colorMetaText' => array(
				'type' => 'string',
				'default' => '#FFFFFF'
			),
			'skipAnimatedGifs' => array(
				'type' => 'boolean',
				'default' => false
			)
		),
		'example' => array(
			'attributes' => array(
				'preview' => true
			)
		),
		'supports' => array(
			'anchor' => true,
			'align' => array(
				'wide',
				'center',
				'full'
			),
			'className' => true
		),
		'editorScript' => 'wp_plugin_info_card-cgb-block-js',
		'editorStyle' => array(
			'wp_plugin_info_card-cgb-block-editor-css',
			'wp_plugin_info_card-cgb-style-css',
			'wp-plugin-info-card-block-editor-css-inline'
		),
		'style' => 'has-style-frontend-css'
	),
	'SitePluginsCardGrid' => array(
		'$schema' => 'https://schemas.wp.org/trunk/block.json',
		'title' => 'Site Plugins Card Grid',
		'apiVersion' => 3,
		'name' => 'wp-plugin-info-card/site-plugins-card-grid',
		'category' => 'wp-plugin-info-card',
		'icon' => '<svg height=\'24\' viewBox=\'0 0 64 64\' width=\'24\' xmlns=\'http://www.w3.org/2000/svg\'><path d=M32 49.11a17.93 17.93 0 0 1-2.005-.12V60h4.014V48.99c-.66.074-1.329.12-2.009.12zM49.019 19.03a2.325 2.325 0 0 0 2.215-2.317 2.33 2.33 0 0 0-2.328-2.328H15.094a2.33 2.33 0 0 0-2.328 2.328c0 1.245.984 2.257 2.215 2.317.045-.006.085-.027.132-.027h33.773c.047 0 .087.02.132.027zM47.887 21.041H16.114v10.182c0 8.761 7.127 15.888 15.887 15.888s15.887-7.127 15.887-15.888V21.041zM35.859 33.463l-5.71 9.193a1 1 0 0 1-1.699-1.054l4.762-7.666h-5.944a1.002 1.002 0 0 1-.762-1.648l7.742-9.097a1.001 1.001 0 0 1 1.523 1.296l-6.34 7.449h5.578a1.001 1.001 0 0 1 .85 1.527zM20.818 4c-.948 0-1.72.771-1.72 1.719v6.666h3.438V5.719A1.72 1.72 0 0 0 20.817 4zM43.182 4c-.947 0-1.719.771-1.719 1.719v6.666h3.438V5.719c0-.948-.771-1.719-1.72-1.719z\' fill=\'currentColor\' /></svg>',
		'description' => 'Display all your active plugins in a grid layout.',
		'keywords' => array(
			'wp plugin',
			'site',
			'grid',
			'plugin',
			'card',
			'active'
		),
		'version' => '1.0.0',
		'textdomain' => 'wp-plugin-info-card',
		'attributes' => array(
			'assetData' => array(
				'type' => 'array',
				'default' => array(
					
				)
			),
			'uniqueId' => array(
				'type' => 'string',
				'default' => ''
			),
			'align' => array(
				'type' => 'string',
				'default' => 'center'
			),
			'loading' => array(
				'type' => 'boolean',
				'default' => true
			),
			'scheme' => array(
				'type' => 'string',
				'default' => 'default'
			),
			'layout' => array(
				'type' => 'string',
				'default' => 'card'
			),
			'preview' => array(
				'type' => 'boolean',
				'default' => false
			),
			'defaultsApplied' => array(
				'type' => 'boolean',
				'default' => false
			),
			'sortby' => array(
				'type' => 'string',
				'default' => 'none'
			),
			'sort' => array(
				'type' => 'string',
				'default' => 'ASC'
			),
			'cols' => array(
				'type' => 'number',
				'default' => 2
			),
			'colGap' => array(
				'type' => 'number',
				'default' => 20
			),
			'rowGap' => array(
				'type' => 'number',
				'default' => 20
			),
			'itemSlugs' => array(
				'type' => 'object',
				'default' => array(
					
				)
			)
		),
		'example' => array(
			'attributes' => array(
				'preview' => true
			)
		),
		'supports' => array(
			'anchor' => true,
			'align' => false,
			'className' => true
		),
		'editorScript' => 'wp-plugin-info-card-block-js',
		'editorStyle' => array(
			'wp-plugin-info-card-block-editor-css',
			'wp-plugin-info-card-block-styles-css'
		)
	)
);

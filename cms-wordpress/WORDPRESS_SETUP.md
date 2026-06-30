# WordPress Headless CMS Setup

## Required Plugins (install from WP Dashboard > Plugins > Add New)

1. **Advanced Custom Fields (ACF)** - Free version  
   - Used for `icon`, `price`, `features` fields on Services  
   - Used for `city`, `region`, `phone` fields on Locations

2. **Yoast SEO** - Recommended  
   - Provides SEO meta data via REST API (`yoast_head_json`)  
   - Auto-generates title, description, og-image per post

3. **ACF to REST API** - Required if using ACF fields  
   - Exposes ACF fields in the WP REST API response

## Register Custom Post Types

Add this to your theme's `functions.php` or create a plugin:

```php
<?php
// Register Services CPT
function register_services_cpt() {
    register_post_type('services', [
        'labels' => [
            'name' => 'Services',
            'singular_name' => 'Service',
        ],
        'public'       => true,
        'show_in_rest' => true,   // CRITICAL: enables REST API
        'rest_base'    => 'services',
        'supports'     => ['title', 'editor', 'excerpt', 'thumbnail', 'custom-fields'],
        'has_archive'  => true,
        'rewrite'      => ['slug' => 'services'],
    ]);
}
add_action('init', 'register_services_cpt');

// Register Locations CPT
function register_locations_cpt() {
    register_post_type('locations', [
        'labels' => [
            'name' => 'Locations',
            'singular_name' => 'Location',
        ],
        'public'       => true,
        'show_in_rest' => true,   // CRITICAL: enables REST API
        'rest_base'    => 'locations',
        'supports'     => ['title', 'editor', 'excerpt', 'thumbnail', 'custom-fields'],
        'has_archive'  => true,
        'rewrite'      => ['slug' => 'locations'],
    ]);
}
add_action('init', 'register_locations_cpt');
```

## ACF Field Groups

### Services Group (attach to post type: services)
| Field Name | Field Key  | Type   |
|------------|-----------|--------|
| icon       | field_icon | Text   |
| price      | field_price| Text   |
| features   | field_features | Repeater > Text |

### Locations Group (attach to post type: locations)
| Field Name | Field Key   | Type  |
|------------|------------|-------|
| city       | field_city  | Text  |
| region     | field_region| Text  |
| phone      | field_phone | Text  |

## Enable Application Passwords

1. WordPress Dashboard > Users > Your Profile
2. Scroll to "Application Passwords"
3. Enter name: `nestjs-api`
4. Click "Add New Application Password"
5. Copy the generated password → use in `.env` as `WP_APP_PASSWORD`

## Test REST API

Visit these URLs in browser to confirm API is working:

- `http://localhost:81/cms/wp-json/wp/v2/posts`
- `http://localhost:81/cms/wp-json/wp/v2/services`
- `http://localhost:81/cms/wp-json/wp/v2/locations`

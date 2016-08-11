<?php
/**
 * The base configuration for WordPress
 *
 * The wp-config.php creation script uses this file during the
 * installation. You don't have to use the web site, you can
 * copy this file to "wp-config.php" and fill in the values.
 *
 * This file contains the following configurations:
 *
 * * MySQL settings
 * * Secret keys
 * * Database table prefix
 * * ABSPATH
 *
 * @link https://codex.wordpress.org/Editing_wp-config.php
 *
 * @package WordPress
 */

// ** MySQL settings - You can get this info from your web host ** //
/** The name of the database for WordPress */
define('DB_NAME', 'customizer_wp');

/** MySQL database username */
define('DB_USER', 'root');

/** MySQL database password */
define('DB_PASSWORD', 'root');

/** MySQL hostname */
define('DB_HOST', 'localhost');

/** Database Charset to use in creating database tables. */
define('DB_CHARSET', 'utf8mb4');

/** The Database Collate type. Don't change this if in doubt. */
define('DB_COLLATE', '');

/**#@+
 * Authentication Unique Keys and Salts.
 *
 * Change these to different unique phrases!
 * You can generate these using the {@link https://api.wordpress.org/secret-key/1.1/salt/ WordPress.org secret-key service}
 * You can change these at any point in time to invalidate all existing cookies. This will force all users to have to log in again.
 *
 * @since 2.6.0
 */
define('AUTH_KEY',         'RM1vCg,,8)eTaF_O5}9P/kg.!KIDMObHomp}2r`CsZ>VSUY#L}Z`C6~fy?f>i))A');
define('SECURE_AUTH_KEY',  'FjF]wn,|f&Om{KWSQD::Se^F@tPkE3[7z|I0ZtSl;F[#W0>cTt=egWZU`4Xxe?Wj');
define('LOGGED_IN_KEY',    '|P:5T-1iGlLPM3,YDEFmu(hV:?mx@`[lWrhz8-)ZAevQ/x;D#Su IO<Qd.r:L8!$');
define('NONCE_KEY',        'xdtG;8t$-p?%Be1$R(T EA46S$F19iav]N8sAyk9`*wGHjJDwN{h$>_k^5v<;T;u');
define('AUTH_SALT',        '*9Wn*uSd7X2,;A=ztI;^vz1gwhxj^[q@a0FygdexiC~qBaL- <Jj(=&L,zn0S40f');
define('SECURE_AUTH_SALT', 'TK7PznAA5uK2p-q6d/6?oB7dV%#V^#~e=GMnRR9uP!aM~BH7:PWP<DdHVi|FmK(F');
define('LOGGED_IN_SALT',   'HV_=kXYfj;/X=HK=Q2CmT<Fhny4Q|`8_=$5}o1BZ~`cVl~~}>sgdC/#xcpd<WG!Q');
define('NONCE_SALT',       '&s;M5%}J.~$Kwl1`FI6?*4AM3oBA4|dGO@I8^&{8MgbCgFXP7l$es&{e6)E%qybA');

/**#@-*/

/**
 * WordPress Database Table prefix.
 *
 * You can have multiple installations in one database if you give each
 * a unique prefix. Only numbers, letters, and underscores please!
 */
$table_prefix  = 'wp_';

/**
 * For developers: WordPress debugging mode.
 *
 * Change this to true to enable the display of notices during development.
 * It is strongly recommended that plugin and theme developers use WP_DEBUG
 * in their development environments.
 *
 * For information on other constants that can be used for debugging,
 * visit the Codex.
 *
 * @link https://codex.wordpress.org/Debugging_in_WordPress
 */
define('WP_DEBUG', false);

/* That's all, stop editing! Happy blogging. */

/** Absolute path to the WordPress directory. */
if ( !defined('ABSPATH') )
	define('ABSPATH', dirname(__FILE__) . '/');

/** Sets up WordPress vars and included files. */
require_once(ABSPATH . 'wp-settings.php');

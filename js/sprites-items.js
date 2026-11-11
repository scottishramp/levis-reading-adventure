/**
 * Levi's Reading Adventure - Item Sprites Library (`window.LeviItemSprites`)
 *
 * Provides storybook sticker-style SVG illustrations (viewBox="0 0 100 100")
 * for all draggable and interactive items in the game.
 *
 * Designed with:
 * - Thick friendly outlines (`stroke="#2d231e"`, `stroke-width="3.5"`)
 * - Vibrant, cheerful storybook fills
 * - Glossy highlights and rounded cartoon proportions
 * - Subtle sticker-style white outer glow / border and soft drop shadow
 */
(function(global) {
    'use strict';

    const STROKE_COLOR = '#2d231e';
    const STROKE_WIDTH = '3.5';

    /**
     * SVG Inner markup registry for all 53 items.
     * Each entry is a collection of SVG elements designed inside a 100x100 viewport.
     */
    const registry = {
        // =========================================================================
        // FRUITS & VEGGIES
        // =========================================================================

        banana: `
            <!-- Banana -->
            <!-- Main peel body -->
            <path d="M 68 20 C 72 20, 75 23, 71 29 C 62 48, 48 70, 26 77 C 22 78, 19 75, 21 70 C 27 54, 44 32, 65 21 Z"
                  fill="#fed330" stroke="#2d231e" stroke-width="3.5" stroke-linejoin="round" stroke-linecap="round"/>
            <!-- Lower peel shaded facet -->
            <path d="M 26 77 C 48 70, 62 48, 71 29 C 68 37, 58 56, 38 71 C 32 75, 26 77, 26 77 Z"
                  fill="#f7b731"/>
            <!-- Inner curve ridge -->
            <path d="M 65 24 C 52 42, 38 58, 24 72"
                  fill="none" stroke="#f39c12" stroke-width="2.5" stroke-linecap="round"/>
            <!-- Stem at top -->
            <path d="M 67 21 L 74 15 C 75 14, 78 15, 77 17 L 72 25 Z"
                  fill="#6F4E37" stroke="#2d231e" stroke-width="3" stroke-linejoin="round"/>
            <!-- Brown blossom tip at bottom -->
            <ellipse cx="23" cy="73.5" rx="3" ry="2.5" fill="#4a3525"/>
            <!-- Glossy white highlight arc -->
            <path d="M 60 27 C 46 40, 36 54, 29 65"
                  fill="none" stroke="#ffffff" stroke-width="3.5" stroke-linecap="round" opacity="0.65"/>
        `,

        apple: `
            <!-- Apple -->
            <!-- Curved brown stem -->
            <path d="M 50 32 C 50 20, 56 16, 63 13"
                  fill="none" stroke="#6F4E37" stroke-width="4" stroke-linecap="round"/>
            <!-- Cheerful green leaf -->
            <path d="M 52 24 C 64 16, 75 19, 76 27 C 67 32, 57 29, 52 24 Z"
                  fill="#2ed573" stroke="#2d231e" stroke-width="3" stroke-linejoin="round"/>
            <!-- Apple main body -->
            <path d="M 50 35 C 42 22, 19 24, 18 47 C 17 68, 33 85, 50 85 C 67 85, 83 68, 82 47 C 81 24, 58 22, 50 35 Z"
                  fill="#ff4757" stroke="#2d231e" stroke-width="3.5" stroke-linejoin="round" stroke-linecap="round"/>
            <!-- Lower dimple -->
            <path d="M 46 82 C 48 80, 52 80, 54 82"
                  stroke="#2d231e" stroke-width="3" stroke-linecap="round" fill="none"/>
            <!-- Glossy white highlight curve & glint -->
            <path d="M 27 42 C 24 50, 26 62, 33 71"
                  fill="none" stroke="#ffffff" stroke-width="3.5" stroke-linecap="round" opacity="0.6"/>
            <circle cx="31" cy="35" r="3" fill="#ffffff" opacity="0.75"/>
        `,

        pear: `
            <!-- Pear -->
            <!-- Brown curved stem -->
            <path d="M 50 28 C 48 18, 41 15, 36 14"
                  fill="none" stroke="#795548" stroke-width="4" stroke-linecap="round"/>
            <!-- Little green leaf -->
            <path d="M 47 22 C 38 17, 30 19, 29 25 C 36 29, 44 27, 47 22 Z"
                  fill="#4cd137" stroke="#2d231e" stroke-width="3" stroke-linejoin="round"/>
            <!-- Pear body -->
            <path d="M 50 28 C 42 28, 40 38, 36 50 C 27 60, 23 68, 25 78 C 27 85, 38 86, 50 86 C 62 86, 73 85, 75 78 C 77 68, 73 60, 64 50 C 60 38, 58 28, 50 28 Z"
                  fill="#badc58" stroke="#2d231e" stroke-width="3.5" stroke-linejoin="round"/>
            <!-- Warm yellow-green belly shading -->
            <path d="M 50 40 C 44 40, 42 46, 38 56 C 34 64, 30 71, 32 78 C 34 83, 41 84, 50 84"
                  fill="none" stroke="#c4e538" stroke-width="6" opacity="0.5" stroke-linecap="round"/>
            <!-- White highlight -->
            <path d="M 32 58 C 29 65, 30 73, 34 79"
                  fill="none" stroke="#ffffff" stroke-width="3.5" stroke-linecap="round" opacity="0.65"/>
            <circle cx="37" cy="46" r="2.5" fill="#ffffff" opacity="0.7"/>
        `,

        watermelon: `
            <!-- Watermelon Slice -->
            <!-- Outer green rind -->
            <path d="M 16 54 C 21 76, 44 87, 50 87 C 56 87, 79 76, 84 54"
                  fill="none" stroke="#26af5f" stroke-width="11" stroke-linecap="round"/>
            <!-- Light green inner rind ring -->
            <path d="M 18 54 C 23 74, 44 83, 50 83 C 56 83, 77 74, 82 54"
                  fill="none" stroke="#a8e6cf" stroke-width="5" stroke-linecap="round"/>
            <!-- Red juicy watermelon flesh -->
            <path d="M 18 53 L 82 53 C 78 74, 57 82, 50 82 C 43 82, 22 74, 18 53 Z"
                  fill="#ff4757"/>
            <!-- Dark outer contour outline -->
            <path d="M 14 53 L 86 53 C 86 53, 81 83, 50 87 C 19 83, 14 53, 14 53 Z"
                  fill="none" stroke="#2d231e" stroke-width="3.5" stroke-linejoin="round" stroke-linecap="round"/>
            <!-- Seeds -->
            <ellipse cx="32" cy="62" rx="2.5" ry="4" transform="rotate(-15 32 62)" fill="#2d231e"/>
            <ellipse cx="44" cy="71" rx="2.5" ry="4" transform="rotate(-5 44 71)" fill="#2d231e"/>
            <ellipse cx="50" cy="60" rx="2.5" ry="4" fill="#2d231e"/>
            <ellipse cx="56" cy="71" rx="2.5" ry="4" transform="rotate(5 56 71)" fill="#2d231e"/>
            <ellipse cx="68" cy="62" rx="2.5" ry="4" transform="rotate(15 68 62)" fill="#2d231e"/>
            <!-- White highlight along top slice -->
            <path d="M 22 56 L 78 56"
                  stroke="#ffffff" stroke-width="2.5" stroke-linecap="round" opacity="0.6"/>
        `,

        pineapple: `
            <!-- Pineapple -->
            <!-- Spiky green crown leaves -->
            <path d="M 50 38 C 45 28, 36 20, 24 22 C 32 30, 42 34, 46 40 Z"
                  fill="#26af5f" stroke="#2d231e" stroke-width="3" stroke-linejoin="round"/>
            <path d="M 50 38 C 55 28, 64 20, 76 22 C 68 30, 58 34, 54 40 Z"
                  fill="#26af5f" stroke="#2d231e" stroke-width="3" stroke-linejoin="round"/>
            <path d="M 50 38 C 44 24, 38 14, 36 12 C 44 18, 48 26, 49 38 Z"
                  fill="#2ed573" stroke="#2d231e" stroke-width="3" stroke-linejoin="round"/>
            <path d="M 50 38 C 56 24, 62 14, 64 12 C 56 18, 52 26, 51 38 Z"
                  fill="#2ed573" stroke="#2d231e" stroke-width="3" stroke-linejoin="round"/>
            <path d="M 50 38 C 49 22, 50 12, 50 10 C 50 12, 51 22, 50 38 Z"
                  fill="#7bed9f" stroke="#2d231e" stroke-width="3" stroke-linejoin="round"/>
            <!-- Pineapple oval body -->
            <rect x="27" y="38" width="46" height="50" rx="23"
                  fill="#ffa502" stroke="#2d231e" stroke-width="3.5"/>
            <!-- Diamond crosshatch lines -->
            <path d="M 33 48 L 67 82 M 43 40 L 71 68 M 67 48 L 33 82 M 57 40 L 29 68"
                  stroke="#e67e22" stroke-width="2.5" stroke-linecap="round"/>
            <!-- Texture flecks / eyes -->
            <circle cx="50" cy="54" r="2" fill="#d35400"/>
            <circle cx="40" cy="64" r="2" fill="#d35400"/>
            <circle cx="60" cy="64" r="2" fill="#d35400"/>
            <circle cx="50" cy="74" r="2" fill="#d35400"/>
            <!-- White highlight -->
            <path d="M 32 50 C 30 60, 32 72, 38 80"
                  fill="none" stroke="#ffffff" stroke-width="3.5" stroke-linecap="round" opacity="0.6"/>
        `,

        grapes: `
            <!-- Grapes -->
            <!-- Woody main stem -->
            <path d="M 50 25 C 50 18, 54 14, 60 12"
                  fill="none" stroke="#795548" stroke-width="4" stroke-linecap="round"/>
            <!-- Curly tendril -->
            <path d="M 52 20 C 62 18, 66 26, 61 28"
                  fill="none" stroke="#20bf6b" stroke-width="2.5" stroke-linecap="round"/>
            <!-- Green grape leaf -->
            <path d="M 48 24 C 36 18, 30 26, 36 32 C 44 32, 48 28, 48 24 Z"
                  fill="#2ed573" stroke="#2d231e" stroke-width="3" stroke-linejoin="round"/>
            <!-- Grape bunch cluster (overlapping circles) -->
            <!-- Bottom single grape -->
            <circle cx="50" cy="78" r="9" fill="#8854d0" stroke="#2d231e" stroke-width="3.5"/>
            <!-- Tier 2 -->
            <circle cx="42" cy="66" r="9.5" fill="#9b59b6" stroke="#2d231e" stroke-width="3.5"/>
            <circle cx="58" cy="66" r="9.5" fill="#8854d0" stroke="#2d231e" stroke-width="3.5"/>
            <!-- Tier 3 -->
            <circle cx="33" cy="52" r="9.5" fill="#8854d0" stroke="#2d231e" stroke-width="3.5"/>
            <circle cx="50" cy="52" r="10" fill="#a55eea" stroke="#2d231e" stroke-width="3.5"/>
            <circle cx="67" cy="52" r="9.5" fill="#8854d0" stroke="#2d231e" stroke-width="3.5"/>
            <!-- Top tier -->
            <circle cx="40" cy="39" r="9" fill="#9b59b6" stroke="#2d231e" stroke-width="3.5"/>
            <circle cx="60" cy="39" r="9" fill="#a55eea" stroke="#2d231e" stroke-width="3.5"/>
            <!-- Cute crescent shine dots on grapes -->
            <circle cx="47" cy="49" r="2.5" fill="#ffffff" opacity="0.75"/>
            <circle cx="39" cy="63" r="2.5" fill="#ffffff" opacity="0.75"/>
            <circle cx="55" cy="63" r="2.5" fill="#ffffff" opacity="0.75"/>
            <circle cx="47" cy="75" r="2" fill="#ffffff" opacity="0.75"/>
        `,

        carrot: `
            <!-- Carrot -->
            <!-- Feathery leafy green top -->
            <path d="M 50 34 C 42 24, 36 14, 38 12 C 43 14, 46 22, 49 33 Z"
                  fill="#2ed573" stroke="#2d231e" stroke-width="3" stroke-linejoin="round"/>
            <path d="M 50 34 C 58 24, 64 14, 62 12 C 57 14, 54 22, 51 33 Z"
                  fill="#2ed573" stroke="#2d231e" stroke-width="3" stroke-linejoin="round"/>
            <path d="M 50 34 C 48 20, 50 10, 50 8 C 50 10, 52 20, 50 34 Z"
                  fill="#7bed9f" stroke="#2d231e" stroke-width="3" stroke-linejoin="round"/>
            <!-- Carrot root body -->
            <path d="M 34 36 C 34 32, 66 32, 66 36 C 65 52, 56 76, 51 88 C 50 90, 48 90, 47 88 C 42 76, 35 52, 34 36 Z"
                  fill="#ff793f" stroke="#2d231e" stroke-width="3.5" stroke-linejoin="round"/>
            <!-- Horizontal texture creases -->
            <path d="M 38 46 Q 44 49 48 47" stroke="#d35400" stroke-width="2.5" stroke-linecap="round" fill="none"/>
            <path d="M 48 58 Q 54 61 60 59" stroke="#d35400" stroke-width="2.5" stroke-linecap="round" fill="none"/>
            <path d="M 42 70 Q 47 73 52 71" stroke="#d35400" stroke-width="2.5" stroke-linecap="round" fill="none"/>
            <!-- Long glossy highlight -->
            <path d="M 39 40 C 40 54, 44 70, 47 81"
                  stroke="#ffffff" stroke-width="3" stroke-linecap="round" fill="none" opacity="0.6"/>
        `,

        strawberry: `
            <!-- Strawberry -->
            <!-- Short stem -->
            <path d="M 50 34 C 50 25, 54 21, 58 19"
                  fill="none" stroke="#2d231e" stroke-width="3.5" stroke-linecap="round"/>
            <!-- Plump red heart-shaped body -->
            <path d="M 50 36 C 66 36, 78 44, 76 60 C 74 74, 58 84, 51 88 C 50 89, 49 89, 48 88 C 41 84, 25 74, 23 60 C 21 44, 34 36, 50 36 Z"
                  fill="#eb3b5a" stroke="#2d231e" stroke-width="3.5" stroke-linejoin="round"/>
            <!-- Starry green leafy cap (calyx) -->
            <path d="M 50 36 L 40 32 L 31 38 L 38 43 L 34 50 L 46 45 L 50 51 L 54 45 L 66 50 L 62 43 L 69 38 L 60 32 Z"
                  fill="#2ed573" stroke="#2d231e" stroke-width="3" stroke-linejoin="round"/>
            <!-- Golden seeds dotted across berry -->
            <ellipse cx="40" cy="54" rx="1.5" ry="2.2" fill="#fed330"/>
            <ellipse cx="50" cy="58" rx="1.5" ry="2.2" fill="#fed330"/>
            <ellipse cx="60" cy="54" rx="1.5" ry="2.2" fill="#fed330"/>
            <ellipse cx="35" cy="64" rx="1.5" ry="2.2" fill="#fed330"/>
            <ellipse cx="46" cy="68" rx="1.5" ry="2.2" fill="#fed330"/>
            <ellipse cx="56" cy="67" rx="1.5" ry="2.2" fill="#fed330"/>
            <ellipse cx="65" cy="63" rx="1.5" ry="2.2" fill="#fed330"/>
            <ellipse cx="50" cy="78" rx="1.5" ry="2.2" fill="#fed330"/>
            <!-- Glossy white shine -->
            <path d="M 30 48 C 27 55, 28 64, 33 72"
                  stroke="#ffffff" stroke-width="3" stroke-linecap="round" fill="none" opacity="0.6"/>
        `,

        mango: `
            <!-- Mango -->
            <!-- Short brown stem -->
            <path d="M 52 28 L 54 18"
                  stroke="#6F4E37" stroke-width="3.5" stroke-linecap="round"/>
            <!-- Tropical green leaf -->
            <path d="M 52 28 C 42 16, 26 18, 22 24 C 28 32, 44 32, 52 28 Z"
                  fill="#2ed573" stroke="#2d231e" stroke-width="3" stroke-linejoin="round"/>
            <!-- Plump kidney-shaped mango body -->
            <path d="M 54 28 C 72 28, 80 44, 78 62 C 75 78, 60 86, 46 84 C 30 82, 22 68, 24 50 C 26 36, 38 28, 54 28 Z"
                  fill="#ff7f50" stroke="#2d231e" stroke-width="3.5" stroke-linejoin="round"/>
            <!-- Warm yellow-golden blush overlay -->
            <path d="M 54 31 C 68 31, 74 43, 72 57 C 70 69, 58 77, 48 77 C 36 77, 30 67, 30 53 C 30 41, 42 31, 54 31 Z"
                  fill="#fed330" opacity="0.6"/>
            <!-- Glossy white highlight arc -->
            <path d="M 32 42 C 29 50, 31 62, 37 72"
                  stroke="#ffffff" stroke-width="3.5" stroke-linecap="round" fill="none" opacity="0.65"/>
            <circle cx="38" cy="35" r="2.5" fill="#ffffff" opacity="0.75"/>
        `,

        melon: `
            <!-- Cantaloupe / Honeydew Melon Wedge -->
            <!-- Outer ribbed rind -->
            <path d="M 20 68 C 30 79, 48 85, 62 83 C 76 81, 84 73, 86 65"
                  fill="none" stroke="#95afc0" stroke-width="12" stroke-linecap="round"/>
            <!-- Greenish sub-rind layer -->
            <path d="M 22 67 C 32 77, 48 83, 62 81 C 74 79, 82 72, 84 65"
                  fill="none" stroke="#badc58" stroke-width="6" stroke-linecap="round"/>
            <!-- Cantaloupe juicy orange flesh -->
            <path d="M 20 62 L 78 30 C 84 46, 84 60, 80 66 C 66 79, 42 77, 20 62 Z"
                  fill="#ff9f43" stroke="#2d231e" stroke-width="3.5" stroke-linejoin="round"/>
            <!-- Seed pocket dots along top hollow curve -->
            <ellipse cx="44" cy="55" rx="2" ry="3.5" transform="rotate(-30 44 55)" fill="#f5cd79"/>
            <ellipse cx="54" cy="50" rx="2" ry="3.5" transform="rotate(-30 54 50)" fill="#f5cd79"/>
            <ellipse cx="64" cy="44" rx="2" ry="3.5" transform="rotate(-30 64 44)" fill="#f5cd79"/>
            <!-- Slice shine -->
            <path d="M 25 60 L 73 34"
                  stroke="#ffffff" stroke-width="3" stroke-linecap="round" opacity="0.6"/>
        `,

        // =========================================================================
        // FOODS & SNACKS
        // =========================================================================

        cheese: `
            <!-- Swiss Cheese Wedge -->
            <!-- 3D Cheese wedge back / side -->
            <path d="M 20 62 L 20 80 L 84 66 L 84 46 Z"
                  fill="#f7b731" stroke="#2d231e" stroke-width="3.5" stroke-linejoin="round"/>
            <!-- Triangular top surface -->
            <path d="M 20 62 L 56 34 L 84 46 L 20 62 Z"
                  fill="#fed330" stroke="#2d231e" stroke-width="3.5" stroke-linejoin="round"/>
            <!-- Swiss cheese holes / indentations with darker inner shadow -->
            <ellipse cx="38" cy="52" rx="5" ry="3.5" fill="#f19066" stroke="#2d231e" stroke-width="2"/>
            <ellipse cx="64" cy="42" rx="4" ry="3" fill="#f19066" stroke="#2d231e" stroke-width="2"/>
            <!-- Holes on front vertical face -->
            <ellipse cx="44" cy="69" rx="6" ry="5" fill="#e17055" stroke="#2d231e" stroke-width="2"/>
            <ellipse cx="66" cy="58" rx="4.5" ry="4" fill="#e17055" stroke="#2d231e" stroke-width="2"/>
            <!-- Scalloped edge cutout hole -->
            <path d="M 20 70 C 23 70, 25 73, 23 76 C 21 78, 20 78, 20 78 Z"
                  fill="#f19066" stroke="#2d231e" stroke-width="2"/>
            <!-- White highlight along front ridge -->
            <path d="M 22 62 L 82 46"
                  stroke="#ffffff" stroke-width="2.5" stroke-linecap="round" opacity="0.7"/>
        `,

        pancake: `
            <!-- Pancakes -->
            <!-- Plate base -->
            <ellipse cx="50" cy="80" rx="42" ry="9"
                     fill="#f1f2f6" stroke="#2d231e" stroke-width="3.5"/>
            <!-- Bottom pancake -->
            <path d="M 18 68 C 18 63, 82 63, 82 68 C 82 74, 18 74, 18 68 Z"
                  fill="#eccc68" stroke="#2d231e" stroke-width="3.5"/>
            <!-- Middle pancake -->
            <path d="M 20 56 C 20 51, 80 51, 80 56 C 80 62, 20 62, 20 56 Z"
                  fill="#f5cd79" stroke="#2d231e" stroke-width="3.5"/>
            <!-- Top pancake -->
            <ellipse cx="50" cy="45" rx="28" ry="9.5"
                     fill="#f5cd79" stroke="#2d231e" stroke-width="3.5"/>
            <!-- Rich maple syrup dripping down -->
            <path d="M 32 46 C 36 53, 40 57, 44 53 C 48 49, 52 64, 56 57 C 60 51, 64 55, 68 46 Z"
                  fill="#d35400" stroke="#2d231e" stroke-width="2.5" stroke-linejoin="round"/>
            <!-- Melting butter pat on top -->
            <path d="M 44 38 L 56 34 L 58 41 L 46 45 Z"
                  fill="#fff200" stroke="#2d231e" stroke-width="3" stroke-linejoin="round"/>
            <!-- Butter shine -->
            <circle cx="48" cy="38" r="1.5" fill="#ffffff"/>
        `,

        cupcake: `
            <!-- Cupcake -->
            <!-- Pleated paper baking liner -->
            <path d="M 28 54 L 33 82 C 33 85, 67 85, 67 82 L 72 54 Z"
                  fill="#70a1ff" stroke="#2d231e" stroke-width="3.5" stroke-linejoin="round"/>
            <path d="M 38 56 L 41 83 M 50 56 L 50 83 M 62 56 L 59 83"
                  stroke="#2d231e" stroke-width="2.5" stroke-linecap="round"/>
            <!-- Swirl of fluffy pink strawberry frosting -->
            <path d="M 21 56 C 18 50, 26 44, 34 46 C 40 42, 60 42, 66 46 C 74 44, 82 50, 79 56 C 75 62, 25 62, 21 56 Z"
                  fill="#ff9ff3" stroke="#2d231e" stroke-width="3.5" stroke-linejoin="round"/>
            <path d="M 30 46 C 30 33, 47 25, 50 25 C 53 25, 70 33, 70 46 Z"
                  fill="#f368e0" stroke="#2d231e" stroke-width="3.5" stroke-linejoin="round"/>
            <!-- Sprinkles -->
            <rect x="36" y="38" width="5" height="2" rx="1" transform="rotate(25 38 39)" fill="#fed330"/>
            <rect x="58" y="37" width="5" height="2" rx="1" transform="rotate(-30 60 38)" fill="#2ed573"/>
            <rect x="48" y="44" width="5" height="2" rx="1" transform="rotate(10 50 45)" fill="#ffffff"/>
            <rect x="42" y="52" width="5" height="2" rx="1" transform="rotate(-20 44 53)" fill="#70a1ff"/>
            <rect x="56" y="52" width="5" height="2" rx="1" transform="rotate(35 58 53)" fill="#fed330"/>
            <!-- Shiny red cherry on top -->
            <circle cx="50" cy="20" r="7.5" fill="#ee5253" stroke="#2d231e" stroke-width="3"/>
            <path d="M 52 14 C 56 6, 66 8, 68 12"
                  fill="none" stroke="#2d231e" stroke-width="2.5" stroke-linecap="round"/>
            <circle cx="48" cy="18" r="2" fill="#ffffff" opacity="0.8"/>
        `,

        pizza: `
            <!-- Cheesy Pepperoni Pizza Slice -->
            <!-- Golden crust at top -->
            <path d="M 22 28 C 40 22, 60 22, 78 28 C 82 32, 78 36, 76 38 C 58 32, 42 32, 24 38 C 22 36, 18 32, 22 28 Z"
                  fill="#e1b12c" stroke="#2d231e" stroke-width="3.5" stroke-linejoin="round"/>
            <!-- Triangular cheesy slice -->
            <path d="M 24 36 L 76 36 L 50 86 Z"
                  fill="#fed330" stroke="#2d231e" stroke-width="3.5" stroke-linejoin="round"/>
            <!-- Red tomato sauce peeking below crust -->
            <path d="M 25 36 C 42 39, 58 39, 75 36"
                  stroke="#eb3b5a" stroke-width="3.5" stroke-linecap="round" fill="none"/>
            <!-- Pepperoni slices -->
            <circle cx="42" cy="48" r="6" fill="#eb3b5a" stroke="#2d231e" stroke-width="2.5"/>
            <circle cx="58" cy="54" r="5.5" fill="#eb3b5a" stroke="#2d231e" stroke-width="2.5"/>
            <circle cx="46" cy="68" r="5" fill="#eb3b5a" stroke="#2d231e" stroke-width="2.5"/>
            <!-- Pepperoni seasonings -->
            <circle cx="41" cy="46" r="1" fill="#795548"/>
            <circle cx="57" cy="53" r="1" fill="#795548"/>
            <circle cx="45" cy="67" r="1" fill="#795548"/>
            <!-- White highlight -->
            <path d="M 28 40 L 45 74"
                  stroke="#ffffff" stroke-width="2.5" stroke-linecap="round" opacity="0.6"/>
        `,

        cookie: `
            <!-- Chocolate Chip Cookie -->
            <!-- Cookie golden-brown body -->
            <path d="M 50 18 C 69 17, 84 31, 84 50 C 85 68, 70 83, 50 84 C 31 85, 17 69, 16 50 C 15 32, 31 18, 50 18 Z"
                  fill="#e0a96d" stroke="#2d231e" stroke-width="3.5" stroke-linejoin="round"/>
            <!-- Dark chocolate chips -->
            <path d="M 37 32 C 41 30, 44 34, 42 38 C 39 40, 34 38, 35 34 Z" fill="#4b2c16" stroke="#2d231e" stroke-width="2"/>
            <path d="M 62 36 C 66 34, 69 38, 68 42 C 65 44, 60 42, 61 38 Z" fill="#4b2c16" stroke="#2d231e" stroke-width="2"/>
            <path d="M 32 52 C 36 50, 39 54, 38 58 C 35 60, 30 58, 31 54 Z" fill="#4b2c16" stroke="#2d231e" stroke-width="2"/>
            <path d="M 52 50 C 56 48, 60 52, 59 56 C 56 59, 50 57, 51 52 Z" fill="#4b2c16" stroke="#2d231e" stroke-width="2"/>
            <path d="M 64 64 C 68 62, 71 66, 70 70 C 67 72, 62 70, 63 66 Z" fill="#4b2c16" stroke="#2d231e" stroke-width="2"/>
            <path d="M 42 68 C 46 66, 49 70, 48 74 C 45 76, 40 74, 41 70 Z" fill="#4b2c16" stroke="#2d231e" stroke-width="2"/>
            <!-- Texture flecks / crackles -->
            <circle cx="28" cy="40" r="1.5" fill="#8d5b24"/>
            <circle cx="70" cy="52" r="1.5" fill="#8d5b24"/>
            <circle cx="54" cy="74" r="1.5" fill="#8d5b24"/>
            <!-- White highlight -->
            <path d="M 30 26 C 36 22, 45 20, 52 20"
                  stroke="#ffffff" stroke-width="3" stroke-linecap="round" fill="none" opacity="0.6"/>
        `,

        taco: `
            <!-- Crunchy Taco -->
            <!-- Folded golden taco shell -->
            <path d="M 18 64 C 18 38, 40 26, 50 26 C 60 26, 82 38, 82 64 C 82 78, 66 82, 50 82 C 34 82, 18 78, 18 64 Z"
                  fill="#f5cd79" stroke="#2d231e" stroke-width="3.5" stroke-linejoin="round"/>
            <!-- Savory beef filling -->
            <path d="M 22 56 C 34 46, 66 46, 78 56 Z" fill="#795548"/>
            <!-- Ruffled green lettuce -->
            <path d="M 24 54 C 28 44, 36 48, 40 44 C 44 48, 52 42, 56 46 C 60 42, 68 46, 72 44 C 76 48, 78 52, 76 56 Z"
                  fill="#2ed573" stroke="#2d231e" stroke-width="2.5" stroke-linejoin="round"/>
            <!-- Tomato cubes -->
            <rect x="34" y="44" width="6" height="5" rx="1" fill="#ff4757" stroke="#2d231e" stroke-width="2"/>
            <rect x="54" y="42" width="6" height="5" rx="1" fill="#ff4757" stroke="#2d231e" stroke-width="2"/>
            <rect x="66" y="48" width="5" height="5" rx="1" fill="#ff4757" stroke="#2d231e" stroke-width="2"/>
            <!-- Shredded yellow cheddar strands -->
            <path d="M 44 42 L 48 50 M 62 40 L 64 48" stroke="#fed330" stroke-width="2.5" stroke-linecap="round"/>
            <!-- Front folded shell lip -->
            <path d="M 18 64 C 24 76, 40 82, 50 82 C 60 82, 76 76, 82 64 Z"
                  fill="#f7b731" stroke="#2d231e" stroke-width="3.5" stroke-linejoin="round"/>
            <!-- White highlight -->
            <path d="M 24 64 C 32 74, 44 78, 50 78"
                  stroke="#ffffff" stroke-width="2.5" stroke-linecap="round" fill="none" opacity="0.65"/>
        `,

        donut: `
            <!-- Glazed Donut with Sprinkles -->
            <!-- Golden donut base ring -->
            <ellipse cx="50" cy="50" rx="34" ry="32"
                     fill="#e5b078" stroke="#2d231e" stroke-width="3.5"/>
            <!-- Wavy pink glaze dripping over donut -->
            <path d="M 50 20 C 68 20, 80 32, 80 50 C 80 56, 76 60, 72 58 C 68 56, 66 66, 60 64 C 54 62, 50 68, 44 64 C 38 60, 36 68, 30 64 C 24 60, 20 56, 20 50 C 20 32, 32 20, 50 20 Z"
                  fill="#ff78ae" stroke="#2d231e" stroke-width="3.5" stroke-linejoin="round"/>
            <!-- Central donut hole cutout -->
            <ellipse cx="50" cy="50" rx="11" ry="10"
                     fill="#ffffff" stroke="#2d231e" stroke-width="3.5"/>
            <!-- Colorful sprinkles -->
            <rect x="34" y="32" width="6" height="2.5" rx="1" transform="rotate(30 36 33)" fill="#fed330"/>
            <rect x="58" y="28" width="6" height="2.5" rx="1" transform="rotate(-25 60 29)" fill="#00d2d3"/>
            <rect x="68" y="44" width="6" height="2.5" rx="1" transform="rotate(70 70 45)" fill="#ffffff"/>
            <rect x="30" y="46" width="6" height="2.5" rx="1" transform="rotate(-40 32 47)" fill="#2ed573"/>
            <rect x="42" y="62" width="6" height="2.5" rx="1" transform="rotate(15 44 63)" fill="#fed330"/>
            <rect x="58" y="60" width="6" height="2.5" rx="1" transform="rotate(-45 60 61)" fill="#ffffff"/>
            <!-- Glaze shine -->
            <path d="M 32 26 C 40 22, 54 22, 64 25"
                  stroke="#ffffff" stroke-width="3" stroke-linecap="round" fill="none" opacity="0.6"/>
        `,

        marshmallow: `
            <!-- Marshmallow on a Stick -->
            <!-- Wooden roasting stick -->
            <path d="M 16 84 L 84 16"
                  stroke="#8d6e63" stroke-width="5" stroke-linecap="round"/>
            <path d="M 80 20 L 88 12"
                  stroke="#5d4037" stroke-width="3.5" stroke-linecap="round"/>
            <!-- Marshmallow rotated pill -->
            <rect x="32" y="32" width="36" height="36" rx="11" transform="rotate(45 50 50)"
                  fill="#f8f9fa" stroke="#2d231e" stroke-width="3.5"/>
            <!-- Golden toasted patch on top -->
            <path d="M 44 32 C 48 30, 52 30, 56 32 C 58 35, 56 40, 50 40 C 44 40, 42 35, 44 32 Z"
                  fill="#c78c42"/>
            <circle cx="50" cy="35" r="2" fill="#8d5b24"/>
            <!-- Pillowy highlight -->
            <path d="M 36 50 C 38 56, 44 62, 50 64"
                  stroke="#dfe4ea" stroke-width="2.5" stroke-linecap="round" fill="none"/>
        `,

        hot_dog: `
            <!-- Hot Dog -->
            <!-- Golden bun -->
            <path d="M 22 42 C 16 54, 24 72, 38 78 C 54 84, 76 80, 82 66 C 88 52, 78 40, 68 38 Z"
                  fill="#f5cd79" stroke="#2d231e" stroke-width="3.5" stroke-linejoin="round"/>
            <!-- Juicy red sausage -->
            <path d="M 16 46 C 13 41, 18 35, 26 38 L 74 62 C 82 66, 84 72, 80 76 C 76 80, 70 78, 64 74 L 18 52 Z"
                  fill="#eb3b5a" stroke="#2d231e" stroke-width="3.5" stroke-linejoin="round"/>
            <!-- Front bun crease -->
            <path d="M 30 52 C 42 68, 62 76, 76 70"
                  stroke="#2d231e" stroke-width="3.5" stroke-linecap="round" fill="none"/>
            <!-- Wavy yellow mustard line -->
            <path d="M 24 44 Q 30 40 34 46 Q 40 54 46 48 Q 52 44 58 52 Q 64 60 70 54 Q 74 52 78 58"
                  fill="none" stroke="#fed330" stroke-width="4.5" stroke-linecap="round"/>
        `,

        // =========================================================================
        // TOYS & BEDROOM PROPS
        // =========================================================================

        teddy_bear: `
            <!-- Teddy Bear -->
            <!-- Ears -->
            <circle cx="32" cy="24" r="8" fill="#b36b3d" stroke="#2d231e" stroke-width="3.5"/>
            <circle cx="32" cy="24" r="4.5" fill="#ffb8b8"/>
            <circle cx="68" cy="24" r="8" fill="#b36b3d" stroke="#2d231e" stroke-width="3.5"/>
            <circle cx="68" cy="24" r="4.5" fill="#ffb8b8"/>
            <!-- Body -->
            <ellipse cx="50" cy="65" rx="20" ry="18" fill="#b36b3d" stroke="#2d231e" stroke-width="3.5"/>
            <ellipse cx="50" cy="66" rx="12" ry="11" fill="#f5cd79"/>
            <!-- Head -->
            <circle cx="50" cy="37" r="19" fill="#b36b3d" stroke="#2d231e" stroke-width="3.5"/>
            <!-- Snout / muzzle -->
            <ellipse cx="50" cy="43" rx="9" ry="7" fill="#f5cd79" stroke="#2d231e" stroke-width="2.5"/>
            <ellipse cx="50" cy="40" rx="3.5" ry="2.5" fill="#4a2e18"/>
            <path d="M 50 42.5 L 50 46 M 47 46 Q 50 48.5 53 46" stroke="#2d231e" stroke-width="2" stroke-linecap="round" fill="none"/>
            <!-- Button eyes with shine -->
            <circle cx="42" cy="33" r="3" fill="#2d231e"/>
            <circle cx="41" cy="32" r="1" fill="#ffffff"/>
            <circle cx="58" cy="33" r="3" fill="#2d231e"/>
            <circle cx="57" cy="32" r="1" fill="#ffffff"/>
            <!-- Paws / feet -->
            <circle cx="34" cy="80" r="7" fill="#b36b3d" stroke="#2d231e" stroke-width="3"/>
            <circle cx="34" cy="80" r="4" fill="#ffb8b8"/>
            <circle cx="66" cy="80" r="7" fill="#b36b3d" stroke="#2d231e" stroke-width="3"/>
            <circle cx="66" cy="80" r="4" fill="#ffb8b8"/>
            <!-- Little arms -->
            <ellipse cx="27" cy="58" rx="5" ry="8" transform="rotate(25 27 58)" fill="#b36b3d" stroke="#2d231e" stroke-width="3"/>
            <ellipse cx="73" cy="58" rx="5" ry="8" transform="rotate(-25 73 58)" fill="#b36b3d" stroke="#2d231e" stroke-width="3"/>
            <!-- Red bow tie -->
            <path d="M 50 51 L 43 47 L 43 55 Z M 50 51 L 57 47 L 57 55 Z" fill="#ff4757" stroke="#2d231e" stroke-width="2.5" stroke-linejoin="round"/>
            <circle cx="50" cy="51" r="2.5" fill="#ff4757"/>
        `,

        robot: `
            <!-- Retro Toy Robot -->
            <!-- Antenna -->
            <path d="M 50 20 L 50 12" stroke="#2d231e" stroke-width="3" stroke-linecap="round"/>
            <circle cx="50" cy="11" r="3.5" fill="#ff7f50" stroke="#2d231e" stroke-width="2.5"/>
            <!-- Ear bolts -->
            <rect x="27" y="27" width="5" height="10" rx="1" fill="#a4b0be" stroke="#2d231e" stroke-width="2"/>
            <rect x="68" y="27" width="5" height="10" rx="1" fill="#a4b0be" stroke="#2d231e" stroke-width="2"/>
            <!-- Head -->
            <rect x="32" y="19" width="36" height="26" rx="5"
                  fill="#70a1ff" stroke="#2d231e" stroke-width="3.5"/>
            <!-- Glowing round cyan eyes -->
            <circle cx="42" cy="29" r="4" fill="#00d2d3" stroke="#2d231e" stroke-width="2"/>
            <circle cx="41" cy="28" r="1.2" fill="#ffffff"/>
            <circle cx="58" cy="29" r="4" fill="#00d2d3" stroke="#2d231e" stroke-width="2"/>
            <circle cx="57" cy="28" r="1.2" fill="#ffffff"/>
            <!-- Mouth grill -->
            <rect x="42" y="37" width="16" height="4" rx="2" fill="#2d3436"/>
            <!-- Torso -->
            <rect x="29" y="48" width="42" height="30" rx="4"
                  fill="#4b7bec" stroke="#2d231e" stroke-width="3.5"/>
            <!-- Chest gauge dial -->
            <circle cx="42" cy="62" r="6" fill="#ffffff" stroke="#2d231e" stroke-width="2"/>
            <path d="M 42 62 L 45 59" stroke="#ff4757" stroke-width="2" stroke-linecap="round"/>
            <!-- Chest buttons -->
            <circle cx="58" cy="58" r="3" fill="#fed330" stroke="#2d231e" stroke-width="1.5"/>
            <circle cx="58" cy="67" r="3" fill="#2ed573" stroke="#2d231e" stroke-width="1.5"/>
            <!-- Legs / feet -->
            <rect x="36" y="78" width="10" height="8" rx="2" fill="#a4b0be" stroke="#2d231e" stroke-width="3"/>
            <rect x="54" y="78" width="10" height="8" rx="2" fill="#a4b0be" stroke="#2d231e" stroke-width="3"/>
            <!-- Arms / claws -->
            <path d="M 29 55 L 20 62 C 18 64, 18 68, 22 70" stroke="#2d231e" stroke-width="3" stroke-linecap="round" fill="none"/>
            <path d="M 71 55 L 80 62 C 82 64, 82 68, 78 70" stroke="#2d231e" stroke-width="3" stroke-linecap="round" fill="none"/>
        `,

        dinosaur: `
            <!-- Friendly Green Dinosaur -->
            <!-- Spine spikes -->
            <polygon points="44,20 48,14 52,20" fill="#ff7f50" stroke="#2d231e" stroke-width="2.5" stroke-linejoin="round"/>
            <polygon points="54,23 58,17 62,24" fill="#ff7f50" stroke="#2d231e" stroke-width="2.5" stroke-linejoin="round"/>
            <polygon points="64,28 69,23 72,31" fill="#ff7f50" stroke="#2d231e" stroke-width="2.5" stroke-linejoin="round"/>
            <polygon points="72,38 78,34 78,43" fill="#ff7f50" stroke="#2d231e" stroke-width="2.5" stroke-linejoin="round"/>
            <!-- Body, head, and tail -->
            <path d="M 38 32 C 38 20, 56 18, 64 26 C 72 34, 70 48, 74 60 C 78 70, 88 72, 88 76 C 88 78, 80 80, 72 76 C 66 72, 60 76, 52 76 C 36 76, 28 66, 30 52 C 32 42, 38 42, 38 32 Z"
                  fill="#2ed573" stroke="#2d231e" stroke-width="3.5" stroke-linejoin="round"/>
            <!-- Cute lime tummy -->
            <path d="M 38 52 C 40 44, 48 42, 54 48 C 58 56, 56 68, 48 72 C 40 72, 36 62, 38 52 Z"
                  fill="#badc58"/>
            <!-- Legs -->
            <rect x="36" y="74" width="8" height="12" rx="4" fill="#2ed573" stroke="#2d231e" stroke-width="3"/>
            <rect x="52" y="74" width="8" height="12" rx="4" fill="#2ed573" stroke="#2d231e" stroke-width="3"/>
            <!-- Tiny cute arm -->
            <path d="M 44 48 C 40 50, 36 50, 38 54" stroke="#2d231e" stroke-width="3" stroke-linecap="round" fill="none"/>
            <!-- Big happy eye with sparkle -->
            <circle cx="46" cy="27" r="4.5" fill="#2d231e"/>
            <circle cx="44.5" cy="25.5" r="1.5" fill="#ffffff"/>
            <!-- Rosy cheek -->
            <circle cx="40" cy="33" r="3" fill="#ff78ae" opacity="0.6"/>
            <!-- Cute smile -->
            <path d="M 38 34 Q 42 38 46 35" stroke="#2d231e" stroke-width="2.5" stroke-linecap="round" fill="none"/>
        `,

        sock: `
            <!-- Cozy Striped Crew Sock -->
            <!-- Ribbed cuff -->
            <rect x="38" y="16" width="28" height="9" rx="3"
                  fill="#ffffff" stroke="#2d231e" stroke-width="3.5"/>
            <!-- Sock body -->
            <path d="M 40 25 L 40 55 C 40 68, 34 76, 22 76 C 18 76, 16 72, 18 67 C 24 57, 48 55, 52 55 L 64 55 L 64 25 Z"
                  fill="#ff4757" stroke="#2d231e" stroke-width="3.5" stroke-linejoin="round"/>
            <!-- White stripes across sock -->
            <path d="M 40 33 L 64 33 M 40 43 L 64 43 M 40 53 L 64 53"
                  stroke="#ffffff" stroke-width="4.5" stroke-linecap="butt"/>
            <!-- Contrasting blue heel patch -->
            <path d="M 52 55 C 62 55, 66 65, 58 71 C 52 75, 48 70, 50 62 Z"
                  fill="#70a1ff" stroke="#2d231e" stroke-width="2.5"/>
            <!-- Contrasting blue toe cap -->
            <path d="M 24 76 C 18 76, 16 72, 18 67 C 21 62, 27 63, 28 72 Z"
                  fill="#70a1ff" stroke="#2d231e" stroke-width="2.5"/>
        `,

        crown: `
            <!-- Royal Golden Crown -->
            <!-- 5 Crown peaks -->
            <path d="M 18 72 L 20 44 L 34 54 L 50 26 L 66 54 L 80 44 L 82 72 Z"
                  fill="#ffd32a" stroke="#2d231e" stroke-width="3.5" stroke-linejoin="round"/>
            <!-- Pearly golden balls atop peaks -->
            <circle cx="20" cy="42" r="3.5" fill="#ffffff" stroke="#2d231e" stroke-width="2.5"/>
            <circle cx="34" cy="52" r="3" fill="#ffffff" stroke="#2d231e" stroke-width="2.5"/>
            <circle cx="50" cy="24" r="4.5" fill="#ffffff" stroke="#2d231e" stroke-width="2.5"/>
            <circle cx="66" cy="52" r="3" fill="#ffffff" stroke="#2d231e" stroke-width="2.5"/>
            <circle cx="80" cy="42" r="3.5" fill="#ffffff" stroke="#2d231e" stroke-width="2.5"/>
            <!-- Base headband -->
            <path d="M 16 70 C 34 76, 66 76, 84 70 L 84 80 C 66 85, 34 85, 16 80 Z"
                  fill="#ffa801" stroke="#2d231e" stroke-width="3.5" stroke-linejoin="round"/>
            <!-- Studded jewels -->
            <circle cx="32" cy="76" r="3.5" fill="#1e90ff" stroke="#2d231e" stroke-width="2"/>
            <ellipse cx="50" cy="76" rx="4.5" ry="3.5" fill="#ff4757" stroke="#2d231e" stroke-width="2"/>
            <circle cx="68" cy="76" r="3.5" fill="#2ed573" stroke="#2d231e" stroke-width="2"/>
            <!-- Sparkles -->
            <path d="M 50 36 L 50 44 M 46 40 L 54 40" stroke="#ffffff" stroke-width="2" stroke-linecap="round"/>
        `,

        // =========================================================================
        // KEYS, TOOLS & MAGIC ITEMS
        // =========================================================================

        key_blue: `
            <!-- Blue Bow Key -->
            <!-- Golden shaft & teeth -->
            <path d="M 50 44 L 50 82 M 50 72 L 62 72 M 50 80 L 59 80"
                  stroke="#f7b731" stroke-width="6" stroke-linecap="round"/>
            <path d="M 50 44 L 50 82 M 50 72 L 62 72 M 50 80 L 59 80"
                  stroke="#2d231e" stroke-width="3.5" stroke-linecap="round" fill="none"/>
            <!-- Ornate golden bow loop -->
            <circle cx="50" cy="30" r="16" fill="#ffd32a" stroke="#2d231e" stroke-width="3.5"/>
            <!-- Blue Bow Gem -->
            <polygon points="50,18 60,30 50,42 40,30"
                     fill="#3867d6" stroke="#2d231e" stroke-width="3" stroke-linejoin="round"/>
            <!-- Gem highlight -->
            <polygon points="50,18 50,42 40,30" fill="#70a1ff"/>
            <circle cx="47" cy="26" r="1.5" fill="#ffffff"/>
        `,

        key_green: `
            <!-- Green Bow Key -->
            <!-- Golden shaft & teeth -->
            <path d="M 50 44 L 50 82 M 50 72 L 62 72 M 50 80 L 59 80"
                  stroke="#f7b731" stroke-width="6" stroke-linecap="round"/>
            <path d="M 50 44 L 50 82 M 50 72 L 62 72 M 50 80 L 59 80"
                  stroke="#2d231e" stroke-width="3.5" stroke-linecap="round" fill="none"/>
            <!-- Ornate golden bow loop -->
            <circle cx="50" cy="30" r="16" fill="#ffd32a" stroke="#2d231e" stroke-width="3.5"/>
            <!-- Emerald Green Gem -->
            <polygon points="50,18 60,30 50,42 40,30"
                     fill="#20bf6b" stroke="#2d231e" stroke-width="3" stroke-linejoin="round"/>
            <!-- Gem highlight -->
            <polygon points="50,18 50,42 40,30" fill="#26de81"/>
            <circle cx="47" cy="26" r="1.5" fill="#ffffff"/>
        `,

        key_yellow: `
            <!-- Yellow Bow Key -->
            <!-- Golden shaft & teeth -->
            <path d="M 50 44 L 50 82 M 50 72 L 62 72 M 50 80 L 59 80"
                  stroke="#ffa801" stroke-width="6" stroke-linecap="round"/>
            <path d="M 50 44 L 50 82 M 50 72 L 62 72 M 50 80 L 59 80"
                  stroke="#2d231e" stroke-width="3.5" stroke-linecap="round" fill="none"/>
            <!-- Ornate golden bow loop -->
            <circle cx="50" cy="30" r="16" fill="#ffd32a" stroke="#2d231e" stroke-width="3.5"/>
            <!-- Yellow Citrine Gem -->
            <polygon points="50,18 60,30 50,42 40,30"
                     fill="#fed330" stroke="#2d231e" stroke-width="3" stroke-linejoin="round"/>
            <!-- Gem highlight -->
            <polygon points="50,18 50,42 40,30" fill="#fff200"/>
            <circle cx="47" cy="26" r="1.5" fill="#ffffff"/>
        `,

        key_gold: `
            <!-- Master Gold Bow Key -->
            <!-- Ornate golden shaft & double-stepped bit -->
            <path d="M 50 44 L 50 82 M 50 68 L 63 68 M 50 74 L 58 74 M 50 80 L 64 80"
                  stroke="#ffa801" stroke-width="6" stroke-linecap="round"/>
            <path d="M 50 44 L 50 82 M 50 68 L 63 68 M 50 74 L 58 74 M 50 80 L 64 80"
                  stroke="#2d231e" stroke-width="3.5" stroke-linecap="round" fill="none"/>
            <!-- Crown-styled golden bow loop -->
            <circle cx="50" cy="28" r="16" fill="#ffd32a" stroke="#2d231e" stroke-width="3.5"/>
            <!-- Sparkling Diamond/White Gold Bow Center -->
            <polygon points="50,16 60,28 50,40 40,28"
                     fill="#fff9c4" stroke="#2d231e" stroke-width="3" stroke-linejoin="round"/>
            <circle cx="50" cy="28" r="3" fill="#ffffff"/>
            <!-- Sparkles -->
            <path d="M 32 16 L 32 22 M 29 19 L 35 19" stroke="#fed330" stroke-width="2" stroke-linecap="round"/>
        `,

        shovel: `
            <!-- Garden / Beach Shovel -->
            <!-- Wooden shaft -->
            <path d="M 33 24 L 58 53"
                  stroke="#e5b078" stroke-width="6" stroke-linecap="round"/>
            <path d="M 33 24 L 58 53"
                  stroke="#2d231e" stroke-width="3.5" stroke-linecap="round" fill="none"/>
            <!-- D-grip handle at top -->
            <path d="M 22 13 L 34 25 C 37 28, 41 24, 38 21 L 27 10 C 24 7, 19 10, 22 13 Z"
                  fill="#ff4757" stroke="#2d231e" stroke-width="3.5" stroke-linejoin="round"/>
            <!-- Steel spade blade -->
            <path d="M 50 48 L 70 68 C 76 74, 82 86, 76 88 C 74 90, 62 86, 56 80 L 44 64 Z"
                  fill="#a4b0be" stroke="#2d231e" stroke-width="3.5" stroke-linejoin="round"/>
            <!-- Metallic blade highlight -->
            <path d="M 48 58 L 68 78"
                  stroke="#ffffff" stroke-width="2.5" stroke-linecap="round" opacity="0.6"/>
        `,

        wand: `
            <!-- Magic Star Wand -->
            <!-- Tapered wooden wand shaft -->
            <path d="M 22 80 L 52 48"
                  stroke="#8d6e63" stroke-width="6" stroke-linecap="round"/>
            <path d="M 22 80 L 52 48"
                  stroke="#2d231e" stroke-width="3.5" stroke-linecap="round" fill="none"/>
            <!-- Decorative golden collar ring -->
            <ellipse cx="50" cy="50" rx="3.5" ry="2" transform="rotate(-45 50 50)" fill="#ffd32a" stroke="#2d231e" stroke-width="1.5"/>
            <!-- Glowing 5-point golden star on tip -->
            <polygon points="64,18 68,30 80,31 71,40 74,52 64,45 54,52 57,40 48,31 60,30"
                     fill="#ffd32a" stroke="#2d231e" stroke-width="3.5" stroke-linejoin="round"/>
            <!-- Star center highlight -->
            <circle cx="64" cy="35" r="4.5" fill="#fff9c4"/>
            <!-- Twinkling magical sparkles -->
            <path d="M 42 22 L 42 28 M 39 25 L 45 25" stroke="#ffeaa7" stroke-width="2.5" stroke-linecap="round"/>
            <path d="M 82 18 L 82 24 M 79 21 L 85 21" stroke="#ffeaa7" stroke-width="2.5" stroke-linecap="round"/>
            <circle cx="76" cy="58" r="1.5" fill="#ffeaa7"/>
        `,

        can_blue: `
            <!-- Blue Watering Can -->
            <!-- Top arch handle -->
            <path d="M 30 44 C 30 24, 60 24, 60 44"
                  fill="none" stroke="#2d231e" stroke-width="5" stroke-linecap="round"/>
            <path d="M 30 44 C 30 24, 60 24, 60 44"
                  fill="none" stroke="#4b7bec" stroke-width="3" stroke-linecap="round"/>
            <!-- Back tipping handle -->
            <path d="M 24 50 C 14 50, 14 74, 24 74"
                  fill="none" stroke="#2d231e" stroke-width="4" stroke-linecap="round"/>
            <!-- Angled spout -->
            <path d="M 54 62 L 76 44"
                  stroke="#2d231e" stroke-width="8" stroke-linecap="round"/>
            <path d="M 54 62 L 76 44"
                  stroke="#4b7bec" stroke-width="5" stroke-linecap="round"/>
            <!-- Shower rosette sprinkler head -->
            <ellipse cx="78" cy="42" rx="4" ry="7" transform="rotate(-30 78 42)"
                     fill="#ffffff" stroke="#2d231e" stroke-width="3"/>
            <!-- Main can canister body -->
            <rect x="24" y="44" width="36" height="34" rx="8"
                  fill="#4b7bec" stroke="#2d231e" stroke-width="3.5"/>
            <!-- White highlight -->
            <path d="M 28 50 L 28 72"
                  stroke="#ffffff" stroke-width="3" stroke-linecap="round" opacity="0.6"/>
        `,

        can_red: `
            <!-- Red Watering Can -->
            <!-- Top arch handle -->
            <path d="M 30 44 C 30 24, 60 24, 60 44"
                  fill="none" stroke="#2d231e" stroke-width="5" stroke-linecap="round"/>
            <path d="M 30 44 C 30 24, 60 24, 60 44"
                  fill="none" stroke="#eb3b5a" stroke-width="3" stroke-linecap="round"/>
            <!-- Back tipping handle -->
            <path d="M 24 50 C 14 50, 14 74, 24 74"
                  fill="none" stroke="#2d231e" stroke-width="4" stroke-linecap="round"/>
            <!-- Angled spout -->
            <path d="M 54 62 L 76 44"
                  stroke="#2d231e" stroke-width="8" stroke-linecap="round"/>
            <path d="M 54 62 L 76 44"
                  stroke="#eb3b5a" stroke-width="5" stroke-linecap="round"/>
            <!-- Shower rosette sprinkler head -->
            <ellipse cx="78" cy="42" rx="4" ry="7" transform="rotate(-30 78 42)"
                     fill="#ffffff" stroke="#2d231e" stroke-width="3"/>
            <!-- Main can canister body -->
            <rect x="24" y="44" width="36" height="34" rx="8"
                  fill="#eb3b5a" stroke="#2d231e" stroke-width="3.5"/>
            <!-- White highlight -->
            <path d="M 28 50 L 28 72"
                  stroke="#ffffff" stroke-width="3" stroke-linecap="round" opacity="0.6"/>
        `,

        can_green: `
            <!-- Green Watering Can -->
            <!-- Top arch handle -->
            <path d="M 30 44 C 30 24, 60 24, 60 44"
                  fill="none" stroke="#2d231e" stroke-width="5" stroke-linecap="round"/>
            <path d="M 30 44 C 30 24, 60 24, 60 44"
                  fill="none" stroke="#20bf6b" stroke-width="3" stroke-linecap="round"/>
            <!-- Back tipping handle -->
            <path d="M 24 50 C 14 50, 14 74, 24 74"
                  fill="none" stroke="#2d231e" stroke-width="4" stroke-linecap="round"/>
            <!-- Angled spout -->
            <path d="M 54 62 L 76 44"
                  stroke="#2d231e" stroke-width="8" stroke-linecap="round"/>
            <path d="M 54 62 L 76 44"
                  stroke="#20bf6b" stroke-width="5" stroke-linecap="round"/>
            <!-- Shower rosette sprinkler head -->
            <ellipse cx="78" cy="42" rx="4" ry="7" transform="rotate(-30 78 42)"
                     fill="#ffffff" stroke="#2d231e" stroke-width="3"/>
            <!-- Main can canister body -->
            <rect x="24" y="44" width="36" height="34" rx="8"
                  fill="#20bf6b" stroke="#2d231e" stroke-width="3.5"/>
            <!-- White highlight -->
            <path d="M 28 50 L 28 72"
                  stroke="#ffffff" stroke-width="3" stroke-linecap="round" opacity="0.6"/>
        `,

        // =========================================================================
        // TREASURES & PLANTS
        // =========================================================================

        gold_chest: `
            <!-- Pirate Treasure Chest -->
            <!-- Open arched lid tilted back -->
            <path d="M 20 40 C 20 25, 80 25, 80 40 L 76 48 L 24 48 Z"
                  fill="#8b4513" stroke="#2d231e" stroke-width="3.5" stroke-linejoin="round"/>
            <!-- Chest bottom body -->
            <rect x="20" y="52" width="60" height="30" rx="3"
                  fill="#a0522d" stroke="#2d231e" stroke-width="3.5"/>
            <!-- Iron reinforcement bands -->
            <rect x="30" y="52" width="6" height="30" fill="#4b4b4b" stroke="#2d231e" stroke-width="2"/>
            <rect x="64" y="52" width="6" height="30" fill="#4b4b4b" stroke="#2d231e" stroke-width="2"/>
            <!-- Golden keyhole latch plate -->
            <rect x="46" y="56" width="8" height="10" rx="2" fill="#ffd32a" stroke="#2d231e" stroke-width="2"/>
            <circle cx="50" cy="60" r="1.5" fill="#2d231e"/>
            <!-- Overflowing gold coins -->
            <circle cx="34" cy="48" r="4.5" fill="#ffd32a" stroke="#2d231e" stroke-width="1.5"/>
            <circle cx="42" cy="46" r="4.5" fill="#fed330" stroke="#2d231e" stroke-width="1.5"/>
            <circle cx="50" cy="47" r="5" fill="#ffd32a" stroke="#2d231e" stroke-width="1.5"/>
            <circle cx="58" cy="45" r="4.5" fill="#fed330" stroke="#2d231e" stroke-width="1.5"/>
            <circle cx="66" cy="49" r="4.5" fill="#ffd32a" stroke="#2d231e" stroke-width="1.5"/>
            <!-- Ruby gem nestled in coins -->
            <polygon points="52,43 56,47 52,51 48,47" fill="#ff4757" stroke="#2d231e" stroke-width="1.5"/>
            <!-- Sparkles -->
            <path d="M 38 36 L 38 42 M 35 39 L 41 39" stroke="#ffffff" stroke-width="2" stroke-linecap="round"/>
        `,

        pink_shell: `
            <!-- Scalloped Pink Seashell with Pearl -->
            <!-- Fan fluted seashell body -->
            <path d="M 50 80 C 44 80, 20 62, 18 42 C 16 28, 32 20, 50 20 C 68 20, 84 28, 82 42 C 80 62, 56 80, 50 80 Z"
                  fill="#ff9ff3" stroke="#2d231e" stroke-width="3.5" stroke-linejoin="round"/>
            <!-- Scalloped flutes radiating from hinge -->
            <path d="M 50 80 L 30 30 M 50 80 L 42 22 M 50 80 L 58 22 M 50 80 L 70 30"
                  stroke="#f368e0" stroke-width="2.5" stroke-linecap="round"/>
            <!-- Glowing white pearl inside -->
            <circle cx="50" cy="54" r="10"
                    fill="#ffffff" stroke="#2d231e" stroke-width="3"/>
            <!-- Pearl iridescent reflection -->
            <circle cx="47" cy="51" r="3" fill="#e0f7fa"/>
            <circle cx="48" cy="50" r="1.5" fill="#ffffff"/>
            <!-- Sparkle -->
            <path d="M 64 42 L 64 46 M 62 44 L 66 44" stroke="#ffffff" stroke-width="2" stroke-linecap="round"/>
        `,

        silver_star: `
            <!-- Shimmering Silver Star -->
            <!-- 5-Point faceted star -->
            <polygon points="50,14 61,37 86,37 66,52 74,76 50,62 26,76 34,52 14,37 39,37"
                     fill="#dcdde1" stroke="#2d231e" stroke-width="3.5" stroke-linejoin="round"/>
            <!-- 3D Beveled bright facets -->
            <polygon points="50,14 50,62 61,37" fill="#ffffff"/>
            <polygon points="86,37 50,62 66,52" fill="#ffffff"/>
            <polygon points="74,76 50,62 50,62" fill="#f1f2f6"/>
            <polygon points="26,76 50,62 34,52" fill="#ffffff"/>
            <polygon points="14,37 50,62 39,37" fill="#f1f2f6"/>
            <!-- Facet divider lines -->
            <path d="M 50 14 L 50 62 M 86 37 L 50 62 M 74 76 L 50 62 M 26 76 L 50 62 M 14 37 L 50 62"
                  stroke="#2d231e" stroke-width="2" stroke-linecap="round"/>
            <!-- Sparkles -->
            <path d="M 78 20 L 78 26 M 75 23 L 81 23" stroke="#70a1ff" stroke-width="2.5" stroke-linecap="round"/>
        `,

        diamond: `
            <!-- Sparkling Cyan Diamond -->
            <!-- Brilliant faceted gem cut -->
            <!-- Lower pavilion pointing down -->
            <polygon points="16,42 84,42 50,86"
                     fill="#00d2d3" stroke="#2d231e" stroke-width="3.5" stroke-linejoin="round"/>
            <!-- Flat table & crown at top -->
            <polygon points="32,22 68,22 84,42 16,42"
                     fill="#54a0ff" stroke="#2d231e" stroke-width="3.5" stroke-linejoin="round"/>
            <!-- Front table highlight -->
            <polygon points="32,22 68,22 58,42 42,42" fill="#ffffff" opacity="0.8"/>
            <!-- Triangular lower facet -->
            <polygon points="42,42 58,42 50,86" fill="#48dbfb" stroke="#2d231e" stroke-width="2.5" stroke-linejoin="round"/>
            <!-- Big sparkle star glint on corner -->
            <path d="M 28 22 L 28 32 M 23 27 L 33 27" stroke="#ffffff" stroke-width="3" stroke-linecap="round"/>
            <circle cx="28" cy="27" r="1.5" fill="#ffffff"/>
        `,

        ruby: `
            <!-- Sparkling Crimson Ruby -->
            <!-- Cushion / octagon cut ruby -->
            <polygon points="32,18 68,18 84,36 84,64 68,82 32,82 16,64 16,36"
                     fill="#eb3b5a" stroke="#2d231e" stroke-width="3.5" stroke-linejoin="round"/>
            <!-- Inner table facet -->
            <polygon points="38,28 62,28 72,42 72,58 62,72 38,72 28,58 28,42"
                     fill="#ff4757" stroke="#2d231e" stroke-width="2.5" stroke-linejoin="round"/>
            <!-- Deep wine shadow facets -->
            <polygon points="16,36 28,42 28,58 16,64" fill="#b71540"/>
            <polygon points="68,82 62,72 38,72 32,82" fill="#b71540"/>
            <!-- Sparkling white glints -->
            <polygon points="38,28 62,28 56,36 44,36" fill="#ffffff" opacity="0.85"/>
            <path d="M 72 24 L 72 32 M 68 28 L 76 28" stroke="#ffffff" stroke-width="2.5" stroke-linecap="round"/>
        `,

        sunflower: `
            <!-- Bloomed Sunflower -->
            <!-- Green stem & leaves -->
            <path d="M 50 64 L 50 88" stroke="#2ed573" stroke-width="6" stroke-linecap="round"/>
            <path d="M 50 64 L 50 88" stroke="#2d231e" stroke-width="3.5" stroke-linecap="round" fill="none"/>
            <path d="M 50 76 C 40 74, 30 78, 28 84 C 36 86, 46 82, 50 76 Z"
                  fill="#2ed573" stroke="#2d231e" stroke-width="2.5" stroke-linejoin="round"/>
            <path d="M 50 72 C 60 70, 70 74, 72 80 C 64 82, 54 78, 50 72 Z"
                  fill="#2ed573" stroke="#2d231e" stroke-width="2.5" stroke-linejoin="round"/>
            <!-- Corona of golden yellow petals -->
            <!-- 8 Main cardinal/diagonal petals -->
            <circle cx="50" cy="46" r="32" fill="#ffa502"/>
            <path d="M 50 14 C 47 24, 53 24, 50 14 Z M 50 78 C 47 68, 53 68, 50 78 Z M 18 46 C 28 43, 28 49, 18 46 Z M 82 46 C 72 43, 72 49, 82 46 Z"
                  fill="#fed330" stroke="#2d231e" stroke-width="3" stroke-linejoin="round"/>
            <circle cx="50" cy="46" r="28" fill="#fed330" stroke="#2d231e" stroke-width="3.5"/>
            <!-- Rich brown seed center -->
            <circle cx="50" cy="46" r="16" fill="#5d4037" stroke="#2d231e" stroke-width="3"/>
            <!-- Texture seed dots in center -->
            <circle cx="46" cy="43" r="1.5" fill="#ffd32a"/>
            <circle cx="54" cy="43" r="1.5" fill="#ffd32a"/>
            <circle cx="50" cy="49" r="1.5" fill="#ffd32a"/>
        `,

        rose: `
            <!-- Bloomed Red Rose -->
            <!-- Stem and leaves -->
            <path d="M 50 66 L 50 88" stroke="#2ed573" stroke-width="5" stroke-linecap="round"/>
            <path d="M 50 66 L 50 88" stroke="#2d231e" stroke-width="3.5" stroke-linecap="round" fill="none"/>
            <path d="M 50 74 C 38 70, 32 76, 32 80 C 40 82, 48 78, 50 74 Z"
                  fill="#2ed573" stroke="#2d231e" stroke-width="2.5" stroke-linejoin="round"/>
            <path d="M 50 70 C 62 66, 68 72, 68 76 C 60 78, 52 74, 50 70 Z"
                  fill="#2ed573" stroke="#2d231e" stroke-width="2.5" stroke-linejoin="round"/>
            <!-- Outer rose petals -->
            <circle cx="50" cy="44" r="24" fill="#eb2f06" stroke="#2d231e" stroke-width="3.5"/>
            <!-- Layered spiral petals -->
            <path d="M 32 40 C 34 26, 66 26, 68 40 C 70 54, 40 64, 32 40 Z"
                  fill="#ff4757" stroke="#2d231e" stroke-width="3" stroke-linejoin="round"/>
            <path d="M 40 40 C 42 32, 58 32, 60 40 C 62 48, 44 52, 40 40 Z"
                  fill="#b71540" stroke="#2d231e" stroke-width="2.5" stroke-linejoin="round"/>
            <!-- Center swirl -->
            <circle cx="50" cy="41" r="5" fill="#eb2f06"/>
            <!-- White highlight on petal lip -->
            <path d="M 38 32 C 44 28, 56 28, 62 32"
                  stroke="#ffffff" stroke-width="2.5" stroke-linecap="round" fill="none" opacity="0.7"/>
        `,

        pumpkin: `
            <!-- Harvest Pumpkin -->
            <!-- Curved green stem -->
            <path d="M 50 34 C 50 20, 58 16, 62 14"
                  fill="none" stroke="#20bf6b" stroke-width="5" stroke-linecap="round"/>
            <path d="M 50 34 C 50 20, 58 16, 62 14"
                  fill="none" stroke="#2d231e" stroke-width="3.5" stroke-linecap="round"/>
            <!-- Curled vine tendril -->
            <path d="M 52 28 C 60 26, 64 34, 58 36"
                  fill="none" stroke="#10ac84" stroke-width="2.5" stroke-linecap="round"/>
            <!-- Pumpkin outer side lobes -->
            <ellipse cx="32" cy="58" rx="16" ry="22" fill="#fa8231" stroke="#2d231e" stroke-width="3.5"/>
            <ellipse cx="68" cy="58" rx="16" ry="22" fill="#fa8231" stroke="#2d231e" stroke-width="3.5"/>
            <!-- Intermediate lobes -->
            <ellipse cx="40" cy="59" rx="14" ry="23" fill="#ff793f" stroke="#2d231e" stroke-width="3.5"/>
            <ellipse cx="60" cy="59" rx="14" ry="23" fill="#ff793f" stroke="#2d231e" stroke-width="3.5"/>
            <!-- Center front lobe -->
            <ellipse cx="50" cy="60" rx="13" ry="24" fill="#ffa502" stroke="#2d231e" stroke-width="3.5"/>
            <!-- Lobe highlight -->
            <path d="M 48 42 C 46 50, 46 68, 48 76"
                  stroke="#ffffff" stroke-width="2.5" stroke-linecap="round" fill="none" opacity="0.6"/>
        `,

        // =========================================================================
        // CLOTHING & VEHICLE ACCESSORIES
        // =========================================================================

        red_hat: `
            <!-- Red Knit Beanie with Pom-pom -->
            <!-- White fluffy pom-pom -->
            <circle cx="50" cy="18" r="9" fill="#ffffff" stroke="#2d231e" stroke-width="3.5"/>
            <circle cx="50" cy="18" r="5" fill="#f1f2f6"/>
            <!-- Main red dome -->
            <path d="M 22 64 C 22 36, 78 36, 78 64 Z"
                  fill="#ff4757" stroke="#2d231e" stroke-width="3.5" stroke-linejoin="round"/>
            <!-- Vertical knit rib lines -->
            <path d="M 36 64 C 36 46, 40 40, 42 36 M 50 64 L 50 34 M 64 64 C 64 46, 60 40, 58 36"
                  stroke="#eb3b5a" stroke-width="2.5" stroke-linecap="round"/>
            <!-- Folded-over ribbed brim cuff -->
            <rect x="18" y="64" width="64" height="18" rx="6"
                  fill="#eb3b5a" stroke="#2d231e" stroke-width="3.5"/>
            <!-- Brim rib stitches -->
            <path d="M 30 65 L 30 81 M 42 65 L 42 81 M 54 65 L 54 81 M 66 65 L 66 81"
                  stroke="#2d231e" stroke-width="2.5" stroke-linecap="round"/>
            <!-- Highlight -->
            <path d="M 30 46 C 36 38, 46 36, 52 36"
                  stroke="#ffffff" stroke-width="3" stroke-linecap="round" fill="none" opacity="0.6"/>
        `,

        blue_scarf: `
            <!-- Warm Blue Winter Scarf -->
            <!-- Scarf neck loop -->
            <path d="M 22 42 C 22 26, 78 26, 78 42 C 78 56, 22 56, 22 42 Z"
                  fill="#3867d6" stroke="#2d231e" stroke-width="3.5" stroke-linejoin="round"/>
            <!-- Neck stripes -->
            <path d="M 40 28 C 40 46, 44 48, 44 54 M 56 28 C 56 46, 60 48, 60 54"
                  stroke="#70a1ff" stroke-width="4" stroke-linecap="round"/>
            <!-- Hanging tails -->
            <path d="M 34 50 L 32 82 L 48 82 L 48 50 Z"
                  fill="#4b7bec" stroke="#2d231e" stroke-width="3.5" stroke-linejoin="round"/>
            <path d="M 48 50 L 52 76 L 66 76 L 62 50 Z"
                  fill="#3867d6" stroke="#2d231e" stroke-width="3.5" stroke-linejoin="round"/>
            <!-- Fringed tassels -->
            <path d="M 34 82 L 34 88 M 40 82 L 40 88 M 46 82 L 46 88"
                  stroke="#2d231e" stroke-width="3" stroke-linecap="round"/>
            <path d="M 54 76 L 54 82 M 60 76 L 60 82 M 65 76 L 65 82"
                  stroke="#2d231e" stroke-width="3" stroke-linecap="round"/>
        `,

        green_mittens: `
            <!-- Pair of Green Mittens -->
            <!-- Connecting string -->
            <path d="M 32 60 C 32 30, 68 30, 68 60"
                  fill="none" stroke="#2d231e" stroke-width="3" stroke-dasharray="4,3"/>
            <!-- Left mitten body & thumb -->
            <g transform="rotate(-15 32 58)">
                <rect x="22" y="68" width="20" height="10" rx="3" fill="#ffffff" stroke="#2d231e" stroke-width="3"/>
                <path d="M 22 68 L 22 46 C 22 36, 42 36, 42 46 L 42 68 Z"
                      fill="#20bf6b" stroke="#2d231e" stroke-width="3.5" stroke-linejoin="round"/>
                <path d="M 22 52 C 16 52, 16 60, 22 64 Z"
                      fill="#20bf6b" stroke="#2d231e" stroke-width="3" stroke-linejoin="round"/>
                <circle cx="32" cy="50" r="1.5" fill="#ffffff"/>
            </g>
            <!-- Right mitten body & thumb -->
            <g transform="rotate(15 68 58)">
                <rect x="58" y="68" width="20" height="10" rx="3" fill="#ffffff" stroke="#2d231e" stroke-width="3"/>
                <path d="M 58 68 L 58 46 C 58 36, 78 36, 78 46 L 78 68 Z"
                      fill="#20bf6b" stroke="#2d231e" stroke-width="3.5" stroke-linejoin="round"/>
                <path d="M 78 52 C 84 52, 84 60, 78 64 Z"
                      fill="#20bf6b" stroke="#2d231e" stroke-width="3" stroke-linejoin="round"/>
                <circle cx="68" cy="50" r="1.5" fill="#ffffff"/>
            </g>
        `,

        yellow_boots: `
            <!-- Shiny Yellow Rain Boots -->
            <!-- Left boot -->
            <g>
                <path d="M 22 34 L 38 34 L 38 62 L 44 64 C 48 66, 48 76, 42 76 L 22 76 C 18 76, 18 64, 22 62 Z"
                      fill="#fed330" stroke="#2d231e" stroke-width="3.5" stroke-linejoin="round"/>
                <rect x="18" y="74" width="28" height="6" rx="2" fill="#2d3436" stroke="#2d231e" stroke-width="2"/>
                <rect x="22" y="32" width="16" height="4" rx="2" fill="#ffffff" stroke="#2d231e" stroke-width="2"/>
                <!-- Shine streak -->
                <path d="M 26 40 L 26 58" stroke="#ffffff" stroke-width="2.5" stroke-linecap="round"/>
            </g>
            <!-- Right boot -->
            <g transform="translate(32, 0)">
                <path d="M 22 34 L 38 34 L 38 62 L 44 64 C 48 66, 48 76, 42 76 L 22 76 C 18 76, 18 64, 22 62 Z"
                      fill="#fed330" stroke="#2d231e" stroke-width="3.5" stroke-linejoin="round"/>
                <rect x="18" y="74" width="28" height="6" rx="2" fill="#2d3436" stroke="#2d231e" stroke-width="2"/>
                <rect x="22" y="32" width="16" height="4" rx="2" fill="#ffffff" stroke="#2d231e" stroke-width="2"/>
                <!-- Shine streak -->
                <path d="M 26 40 L 26 58" stroke="#ffffff" stroke-width="2.5" stroke-linecap="round"/>
            </g>
        `,

        party_hat: `
            <!-- Polka-dot Party Hat -->
            <!-- Cone body -->
            <polygon points="50,18 24,76 76,76"
                     fill="#8854d0" stroke="#2d231e" stroke-width="3.5" stroke-linejoin="round"/>
            <!-- Polka dots -->
            <circle cx="44" cy="40" r="4" fill="#fed330"/>
            <circle cx="58" cy="48" r="4.5" fill="#ff78ae"/>
            <circle cx="38" cy="58" r="4" fill="#00d2d3"/>
            <circle cx="52" cy="64" r="4.5" fill="#2ed573"/>
            <circle cx="66" cy="62" r="3.5" fill="#fed330"/>
            <!-- Fluffy brim trim -->
            <path d="M 22 76 C 26 72, 34 80, 40 76 C 46 72, 54 80, 60 76 C 66 72, 74 80, 78 76 L 76 80 C 72 84, 64 80, 58 84 C 52 80, 44 84, 38 80 C 32 84, 24 80, 20 80 Z"
                  fill="#fed330" stroke="#2d231e" stroke-width="2.5" stroke-linejoin="round"/>
            <!-- Pom-pom burst at top -->
            <circle cx="50" cy="16" r="7.5" fill="#ff78ae" stroke="#2d231e" stroke-width="3"/>
            <circle cx="50" cy="16" r="3.5" fill="#ffffff"/>
        `,

        bow_tie: `
            <!-- Dapper Red Polka-dot Bow Tie -->
            <!-- Left wing -->
            <polygon points="50,50 20,32 18,68"
                     fill="#eb3b5a" stroke="#2d231e" stroke-width="3.5" stroke-linejoin="round"/>
            <!-- Right wing -->
            <polygon points="50,50 80,32 82,68"
                     fill="#eb3b5a" stroke="#2d231e" stroke-width="3.5" stroke-linejoin="round"/>
            <!-- Polka dots -->
            <circle cx="28" cy="44" r="3" fill="#ffffff"/>
            <circle cx="34" cy="56" r="3" fill="#ffffff"/>
            <circle cx="24" cy="58" r="2.5" fill="#ffffff"/>
            <circle cx="72" cy="44" r="3" fill="#ffffff"/>
            <circle cx="66" cy="56" r="3" fill="#ffffff"/>
            <circle cx="76" cy="58" r="2.5" fill="#ffffff"/>
            <!-- Center knot -->
            <rect x="44" y="42" width="12" height="16" rx="4"
                  fill="#b71540" stroke="#2d231e" stroke-width="3.5"/>
            <!-- Knot highlight -->
            <circle cx="48" cy="47" r="1.5" fill="#ffffff"/>
        `,

        sunglasses: `
            <!-- Cool Star-frame Sunglasses -->
            <!-- Bridge -->
            <path d="M 46 48 C 50 45, 50 45, 54 48" stroke="#2d231e" stroke-width="4" stroke-linecap="round"/>
            <!-- Left Star Frame -->
            <polygon points="30,28 35,40 48,40 37,49 41,62 30,54 19,62 23,49 12,40 25,40"
                     fill="#00d2d3" stroke="#2d231e" stroke-width="3.5" stroke-linejoin="round"/>
            <!-- Left Dark Lens -->
            <circle cx="30" cy="47" r="8" fill="#2d3436"/>
            <!-- Left Lens Shine Glint -->
            <path d="M 26 43 L 34 51" stroke="#ffffff" stroke-width="2.5" stroke-linecap="round"/>
            <!-- Right Star Frame -->
            <polygon points="70,28 75,40 88,40 77,49 81,62 70,54 59,62 63,49 52,40 65,40"
                     fill="#00d2d3" stroke="#2d231e" stroke-width="3.5" stroke-linejoin="round"/>
            <!-- Right Dark Lens -->
            <circle cx="70" cy="47" r="8" fill="#2d3436"/>
            <!-- Right Lens Shine Glint -->
            <path d="M 66 43 L 74 51" stroke="#ffffff" stroke-width="2.5" stroke-linecap="round"/>
        `,

        big_wheels: `
            <!-- Monster Truck Knobby Wheels -->
            <!-- Axle bar -->
            <rect x="26" y="47" width="48" height="6" fill="#747d8c" stroke="#2d231e" stroke-width="3"/>
            <!-- Left tire with knobby treads -->
            <g>
                <circle cx="28" cy="50" r="22" fill="#2f3542" stroke="#2d231e" stroke-width="3.5"/>
                <!-- Treads -->
                <path d="M 28 25 L 28 30 M 28 70 L 28 75 M 5 50 L 10 50 M 46 50 L 51 50 M 12 34 L 16 38 M 40 62 L 44 66 M 12 66 L 16 62 M 40 38 L 44 34"
                      stroke="#2d231e" stroke-width="3" stroke-linecap="round"/>
                <!-- Fiery red rim -->
                <circle cx="28" cy="50" r="13" fill="#eb3b5a" stroke="#2d231e" stroke-width="2.5"/>
                <!-- Center gold hub & lugs -->
                <circle cx="28" cy="50" r="5" fill="#fed330" stroke="#2d231e" stroke-width="2"/>
            </g>
            <!-- Right tire -->
            <g transform="translate(44, 0)">
                <circle cx="28" cy="50" r="22" fill="#2f3542" stroke="#2d231e" stroke-width="3.5"/>
                <!-- Treads -->
                <path d="M 28 25 L 28 30 M 28 70 L 28 75 M 5 50 L 10 50 M 46 50 L 51 50 M 12 34 L 16 38 M 40 62 L 44 66 M 12 66 L 16 62 M 40 38 L 44 34"
                      stroke="#2d231e" stroke-width="3" stroke-linecap="round"/>
                <!-- Fiery red rim -->
                <circle cx="28" cy="50" r="13" fill="#eb3b5a" stroke="#2d231e" stroke-width="2.5"/>
                <!-- Center gold hub & lugs -->
                <circle cx="28" cy="50" r="5" fill="#fed330" stroke="#2d231e" stroke-width="2"/>
            </g>
        `,

        jet_wings: `
            <!-- Rocket Booster Wings -->
            <!-- Center backpack mounting harness -->
            <rect x="42" y="38" width="16" height="24" rx="4" fill="#a4b0be" stroke="#2d231e" stroke-width="3"/>
            <!-- Left aerodynamic wing -->
            <polygon points="42,42 12,32 16,56 42,54"
                     fill="#f1f2f6" stroke="#2d231e" stroke-width="3.5" stroke-linejoin="round"/>
            <polygon points="32,40 16,35 18,48 32,47" fill="#ff4757"/>
            <!-- Left rocket booster engine pod -->
            <rect x="22" y="52" width="10" height="18" rx="3" fill="#747d8c" stroke="#2d231e" stroke-width="2.5"/>
            <!-- Left thruster flame -->
            <polygon points="23,70 27,86 31,70" fill="#ffa502"/>
            <polygon points="25,70 27,80 29,70" fill="#fed330"/>
            <!-- Right aerodynamic wing -->
            <polygon points="58,42 88,32 84,56 58,54"
                     fill="#f1f2f6" stroke="#2d231e" stroke-width="3.5" stroke-linejoin="round"/>
            <polygon points="68,40 84,35 82,48 68,47" fill="#ff4757"/>
            <!-- Right rocket booster engine pod -->
            <rect x="68" y="52" width="10" height="18" rx="3" fill="#747d8c" stroke="#2d231e" stroke-width="2.5"/>
            <!-- Right thruster flame -->
            <polygon points="69,70 73,86 77,70" fill="#ffa502"/>
            <polygon points="71,70 73,80 75,70" fill="#fed330"/>
        `,

        shiny_horn: `
            <!-- Golden Squeeze Bicycle Horn -->
            <!-- Flared golden horn bell -->
            <path d="M 52 46 L 76 32 C 82 28, 86 36, 86 50 C 86 64, 82 72, 76 68 L 52 54 Z"
                  fill="#ffd32a" stroke="#2d231e" stroke-width="3.5" stroke-linejoin="round"/>
            <!-- Inner bell opening oval -->
            <ellipse cx="80" cy="50" rx="4" ry="14" fill="#f7b731" stroke="#2d231e" stroke-width="2"/>
            <!-- Curled brass tube -->
            <path d="M 52 50 C 44 50, 40 42, 44 36 C 48 30, 56 30, 56 40 C 56 58, 38 58, 32 50"
                  fill="none" stroke="#2d231e" stroke-width="6" stroke-linecap="round"/>
            <path d="M 52 50 C 44 50, 40 42, 44 36 C 48 30, 56 30, 56 40 C 56 58, 38 58, 32 50"
                  fill="none" stroke="#fed330" stroke-width="3.5" stroke-linecap="round"/>
            <!-- Bulbous red rubber squeeze bulb -->
            <circle cx="22" cy="50" r="12" fill="#ff4757" stroke="#2d231e" stroke-width="3.5"/>
            <ellipse cx="20" cy="46" rx="4" ry="6" transform="rotate(-30 20 46)" fill="#ffffff" opacity="0.6"/>
            <!-- Sound honk waves -->
            <path d="M 88 42 C 92 46, 92 54, 88 58 M 93 38 C 98 44, 98 56, 93 62"
                  fill="none" stroke="#2d231e" stroke-width="2.5" stroke-linecap="round"/>
        `,

        // =========================================================================
        // SPACE CHARACTERS
        // =========================================================================

        astronaut: `
            <!-- Cute Kid Astronaut -->
            <!-- Oxygen backpack behind shoulders -->
            <rect x="26" y="34" width="48" height="36" rx="8"
                  fill="#dcdde1" stroke="#2d231e" stroke-width="3.5"/>
            <!-- Suit body -->
            <rect x="33" y="48" width="34" height="30" rx="8"
                  fill="#f5f6fa" stroke="#2d231e" stroke-width="3.5"/>
            <!-- Chest control pack -->
            <rect x="42" y="54" width="16" height="12" rx="3" fill="#718093" stroke="#2d231e" stroke-width="2"/>
            <circle cx="46" cy="60" r="2" fill="#00d2d3"/>
            <circle cx="54" cy="60" r="2" fill="#ff4757"/>
            <!-- Helmet -->
            <circle cx="50" cy="34" r="22" fill="#f5f6fa" stroke="#2d231e" stroke-width="3.5"/>
            <!-- Shiny tinted visor -->
            <ellipse cx="50" cy="35" rx="16" ry="13"
                     fill="#00d2d3" stroke="#2d231e" stroke-width="3"/>
            <!-- Visor reflection glint -->
            <path d="M 40 28 C 46 25, 54 25, 60 28"
                  stroke="#ffffff" stroke-width="3" stroke-linecap="round" fill="none"/>
            <circle cx="58" cy="36" r="2" fill="#ffffff" opacity="0.8"/>
            <!-- Waving right glove -->
            <circle cx="74" cy="48" r="6" fill="#f5f6fa" stroke="#2d231e" stroke-width="3"/>
            <path d="M 66 52 L 74 48" stroke="#2d231e" stroke-width="3" stroke-linecap="round"/>
            <!-- Left arm resting -->
            <circle cx="26" cy="56" r="6" fill="#f5f6fa" stroke="#2d231e" stroke-width="3"/>
            <!-- Boots -->
            <rect x="35" y="78" width="12" height="10" rx="4" fill="#718093" stroke="#2d231e" stroke-width="3"/>
            <rect x="53" y="78" width="12" height="10" rx="4" fill="#718093" stroke="#2d231e" stroke-width="3"/>
        `,

        alien: `
            <!-- Friendly 3-Eyed Alien -->
            <!-- Antennae with yellow glowing bobbles -->
            <path d="M 42 24 C 36 14, 30 14, 28 12 M 58 24 C 64 14, 70 14, 72 12"
                  stroke="#2d231e" stroke-width="3" stroke-linecap="round"/>
            <circle cx="26" cy="11" r="4.5" fill="#ffd32a" stroke="#2d231e" stroke-width="2.5"/>
            <circle cx="74" cy="11" r="4.5" fill="#ffd32a" stroke="#2d231e" stroke-width="2.5"/>
            <!-- Pear-shaped lime green head & body -->
            <path d="M 50 20 C 66 20, 74 34, 72 50 C 70 66, 68 84, 50 84 C 32 84, 30 66, 28 50 C 26 34, 34 20, 50 20 Z"
                  fill="#2ed573" stroke="#2d231e" stroke-width="3.5" stroke-linejoin="round"/>
            <!-- 3 Cute round eyes with big pupils -->
            <!-- Left Eye -->
            <circle cx="34" cy="36" r="6.5" fill="#ffffff" stroke="#2d231e" stroke-width="2.5"/>
            <circle cx="34" cy="36" r="3.5" fill="#2d231e"/>
            <circle cx="32.5" cy="34.5" r="1.2" fill="#ffffff"/>
            <!-- Center Big Eye -->
            <circle cx="50" cy="32" r="8" fill="#ffffff" stroke="#2d231e" stroke-width="2.5"/>
            <circle cx="50" cy="32" r="4.5" fill="#2d231e"/>
            <circle cx="48" cy="30" r="1.5" fill="#ffffff"/>
            <!-- Right Eye -->
            <circle cx="66" cy="36" r="6.5" fill="#ffffff" stroke="#2d231e" stroke-width="2.5"/>
            <circle cx="66" cy="36" r="3.5" fill="#2d231e"/>
            <circle cx="64.5" cy="34.5" r="1.2" fill="#ffffff"/>
            <!-- Big happy open smile -->
            <path d="M 38 48 Q 50 60 62 48 Z" fill="#eb3b5a" stroke="#2d231e" stroke-width="2.5" stroke-linejoin="round"/>
            <ellipse cx="50" cy="53" rx="5" ry="3" fill="#ff78ae"/>
            <!-- Purple cosmic belt -->
            <rect x="34" y="66" width="32" height="6" rx="2" fill="#8854d0" stroke="#2d231e" stroke-width="2"/>
            <circle cx="50" cy="69" r="2.5" fill="#ffd32a"/>
            <!-- Waving 3-fingered arm -->
            <path d="M 70 56 C 80 54, 84 46, 84 42" stroke="#2ed573" stroke-width="5" stroke-linecap="round"/>
            <path d="M 70 56 C 80 54, 84 46, 84 42" stroke="#2d231e" stroke-width="3" stroke-linecap="round" fill="none"/>
            <circle cx="84" cy="42" r="3" fill="#2ed573" stroke="#2d231e" stroke-width="2"/>
        `
    };

    /**
     * Item metadata detailing friendly labels, categories, and sound suggestions.
     */
    const metadata = {
        // Fruits & Veggies
        banana:       { name: 'Banana', category: 'fruit', sound: 'pop' },
        apple:        { name: 'Apple', category: 'fruit', sound: 'crunch' },
        pear:         { name: 'Pear', category: 'fruit', sound: 'crunch' },
        watermelon:   { name: 'Watermelon', category: 'fruit', sound: 'crunch' },
        pineapple:    { name: 'Pineapple', category: 'fruit', sound: 'pop' },
        grapes:       { name: 'Grapes', category: 'fruit', sound: 'pop' },
        carrot:       { name: 'Carrot', category: 'veggie', sound: 'crunch' },
        strawberry:   { name: 'Strawberry', category: 'fruit', sound: 'pop' },
        mango:        { name: 'Mango', category: 'fruit', sound: 'pop' },
        melon:        { name: 'Melon', category: 'fruit', sound: 'crunch' },

        // Foods & Snacks
        cheese:       { name: 'Cheese', category: 'food', sound: 'squeak' },
        pancake:      { name: 'Pancakes', category: 'food', sound: 'splat' },
        cupcake:      { name: 'Cupcake', category: 'food', sound: 'sweet' },
        pizza:        { name: 'Pizza', category: 'food', sound: 'cheer' },
        cookie:       { name: 'Cookie', category: 'food', sound: 'crunch' },
        taco:         { name: 'Taco', category: 'food', sound: 'crunch' },
        donut:        { name: 'Donut', category: 'food', sound: 'sweet' },
        marshmallow:  { name: 'Marshmallow', category: 'food', sound: 'pop' },
        hot_dog:      { name: 'Hot Dog', category: 'food', sound: 'pop' },

        // Toys & Bedroom Props
        teddy_bear:   { name: 'Teddy Bear', category: 'toy', sound: 'squeak' },
        robot:        { name: 'Robot', category: 'toy', sound: 'beep' },
        dinosaur:     { name: 'Dinosaur', category: 'toy', sound: 'roar' },
        sock:         { name: 'Sock', category: 'cloth', sound: 'whoosh' },
        crown:        { name: 'Crown', category: 'treasure', sound: 'magic' },

        // Keys, Tools & Magic Items
        key_blue:     { name: 'Blue Key', category: 'key', sound: 'chime' },
        key_green:    { name: 'Green Key', category: 'key', sound: 'chime' },
        key_yellow:   { name: 'Yellow Key', category: 'key', sound: 'chime' },
        key_gold:     { name: 'Gold Key', category: 'key', sound: 'magic' },
        shovel:       { name: 'Shovel', category: 'tool', sound: 'tap' },
        wand:         { name: 'Magic Wand', category: 'magic', sound: 'sparkle' },
        can_blue:     { name: 'Blue Watering Can', category: 'tool', sound: 'splash' },
        can_red:      { name: 'Red Watering Can', category: 'tool', sound: 'splash' },
        can_green:    { name: 'Green Watering Can', category: 'tool', sound: 'splash' },

        // Treasures & Plants
        gold_chest:   { name: 'Treasure Chest', category: 'treasure', sound: 'treasure' },
        pink_shell:   { name: 'Pink Shell', category: 'treasure', sound: 'water' },
        silver_star:  { name: 'Silver Star', category: 'treasure', sound: 'sparkle' },
        diamond:      { name: 'Diamond', category: 'treasure', sound: 'gem' },
        ruby:         { name: 'Ruby', category: 'treasure', sound: 'gem' },
        sunflower:    { name: 'Sunflower', category: 'plant', sound: 'pop' },
        rose:         { name: 'Rose', category: 'plant', sound: 'sparkle' },
        pumpkin:      { name: 'Pumpkin', category: 'plant', sound: 'thud' },

        // Clothing & Vehicle Accessories
        red_hat:      { name: 'Red Beanie', category: 'clothing', sound: 'whoosh' },
        blue_scarf:   { name: 'Blue Scarf', category: 'clothing', sound: 'whoosh' },
        green_mittens:{ name: 'Green Mittens', category: 'clothing', sound: 'whoosh' },
        yellow_boots: { name: 'Yellow Boots', category: 'clothing', sound: 'step' },
        party_hat:    { name: 'Party Hat', category: 'clothing', sound: 'cheer' },
        bow_tie:      { name: 'Bow Tie', category: 'clothing', sound: 'pop' },
        sunglasses:   { name: 'Sunglasses', category: 'clothing', sound: 'cool' },
        big_wheels:   { name: 'Big Wheels', category: 'vehicle', sound: 'vroom' },
        jet_wings:    { name: 'Jet Wings', category: 'vehicle', sound: 'whoosh' },
        shiny_horn:   { name: 'Honk Horn', category: 'vehicle', sound: 'honk' },

        // Space Characters
        astronaut:    { name: 'Astronaut', category: 'space', sound: 'beep' },
        alien:        { name: 'Friendly Alien', category: 'space', sound: 'alien' }
    };

    /**
     * Fallback graphic in case an unknown item ID is requested.
     */
    function getFallbackGraphic(id) {
        return `
            <!-- Fallback Mystery Box -->
            <rect x="22" y="26" width="56" height="56" rx="10"
                  fill="#fed330" stroke="#2d231e" stroke-width="3.5"/>
            <!-- Ribbon -->
            <rect x="45" y="26" width="10" height="56" fill="#ff4757" stroke="#2d231e" stroke-width="2.5"/>
            <rect x="22" y="49" width="56" height="10" fill="#ff4757" stroke="#2d231e" stroke-width="2.5"/>
            <!-- Ribbon bow on top -->
            <circle cx="44" cy="24" r="5" fill="#ff4757" stroke="#2d231e" stroke-width="2"/>
            <circle cx="56" cy="24" r="5" fill="#ff4757" stroke="#2d231e" stroke-width="2"/>
            <circle cx="50" cy="25" r="3" fill="#b71540"/>
            <!-- Question mark -->
            <text x="50" y="60" font-family="Comic Sans MS, sans-serif" font-weight="bold" font-size="20"
                  fill="#ffffff" text-anchor="middle" dominant-baseline="middle" stroke="#2d231e" stroke-width="1.5">?</text>
        `;
    }

    let filterCounter = 0;

    /**
     * Main API object
     */
    const LeviItemSprites = {
        version: '1.0.0',
        strokeColor: STROKE_COLOR,
        strokeWidth: STROKE_WIDTH,
        registry,
        metadata,

        /**
         * Check if an item exists in the registry.
         * @param {string} id
         * @returns {boolean}
         */
        has(id) {
            return Object.prototype.hasOwnProperty.call(this.registry, id);
        },

        /**
         * Return a list of all available item IDs.
         * @returns {string[]}
         */
        list() {
            return Object.keys(this.registry);
        },

        /**
         * Get all item IDs belonging to a specific category.
         * @param {string} category
         * @returns {string[]}
         */
        getByCategory(category) {
            return Object.keys(this.metadata).filter(id => this.metadata[id]?.category === category);
        },

        /**
         * Get metadata object for an item.
         * @param {string} id
         * @returns {object|null}
         */
        getMeta(id) {
            return this.metadata[id] || null;
        },

        /**
         * Render and return a complete storybook sticker-style SVG string for an item.
         *
         * @param {string} id - Item identifier (e.g., 'banana', 'apple', 'key_gold')
         * @param {object} [options={}] - Customization options
         * @param {string} [options.className] - Additional CSS classes
         * @param {number|string} [options.size] - Width & height of the SVG
         * @param {number|string} [options.width] - SVG width
         * @param {number|string} [options.height] - SVG height
         * @param {boolean} [options.shadow=true] - Whether to include white sticker glow and drop-shadow
         * @param {string} [options.title] - Accessible title text (defaults to item name)
         * @param {string} [options.style] - Inline CSS styles
         * @param {string} [options.id] - Element ID attribute
         * @returns {string} Complete <svg viewBox="0 0 100 100" class="item-svg" ...> markup
         */
        get(id, options = {}) {
            let inner = this.registry[id];
            const meta = this.metadata[id] || { name: id, category: 'item' };

            if (!inner) {
                inner = getFallbackGraphic(id);
            }

            const classes = ['item-svg', `item-${id}`, options.className].filter(Boolean).join(' ');
            const widthAttr = options.width || options.size;
            const heightAttr = options.height || options.size;
            const sizeStr = (widthAttr ? ` width="${widthAttr}"` : '') + (heightAttr ? ` height="${heightAttr}"` : '');
            const elemId = options.id ? ` id="${options.id}"` : '';
            const styleAttr = options.style ? ` style="${options.style}"` : '';
            const titleText = options.title || meta.name || id;
            const useShadow = options.shadow !== false;

            filterCounter++;
            const filterId = `sticker-${id}-${filterCounter}`;

            const filterDef = useShadow ? `
  <defs>
    <filter id="${filterId}" x="-25%" y="-25%" width="150%" height="150%">
      <!-- Sticker White Die-cut Halo -->
      <feDropShadow dx="0" dy="0" stdDeviation="1.5" flood-color="#ffffff" flood-opacity="0.95" />
      <feDropShadow dx="0" dy="0" stdDeviation="2.5" flood-color="#ffffff" flood-opacity="0.8" />
      <!-- Soft Warm Grounding Shadow -->
      <feDropShadow dx="0" dy="2.5" stdDeviation="2" flood-color="#2d231e" flood-opacity="0.22" />
    </filter>
  </defs>` : '';

            const groupOpen = useShadow ? `<g filter="url(#${filterId})">` : `<g>`;
            const groupClose = `</g>`;

            return `<svg viewBox="0 0 100 100" class="${classes}" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="${titleText}"${sizeStr}${elemId}${styleAttr}>
  <title>${titleText}</title>${filterDef}
  ${groupOpen}
    ${inner.trim()}
  ${groupClose}
</svg>`;
        }
    };

    // Export to browser window & global environment
    if (typeof window !== 'undefined') {
        window.LeviItemSprites = LeviItemSprites;
    }
    if (typeof globalThis !== 'undefined') {
        globalThis.LeviItemSprites = LeviItemSprites;
    }

    // Export to CommonJS / Node if present
    if (typeof module !== 'undefined' && module.exports) {
        module.exports = LeviItemSprites;
    }

})(typeof window !== 'undefined' ? window : globalThis);

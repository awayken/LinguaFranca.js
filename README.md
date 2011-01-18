**LinguaFranca.js**

The world, and the Web, do not exist in one language, solitary. By the very virtue of its structure, the Internet exists on a global level. The advent of this interconnectivity has brought about a new era of extra-linguality. In short, language is blurring.

The genesis of this project involved a blog post that I was reading by Peter-Paul Koch. The author was discussing Varronian years and used the Latin term fasti consulares. I thought, "How helpful it would be if I were given a simple way to find the translation of that text." By the end of the night, I had a working early version of this script.

**Usage**

This script uses the Google AJAX Language API, so you'll need to include that in your page. It doesn't support translations between every language, so check out their list of supported language pairs.

Include this somewhere on your page:
<script src="http://www.google.com/jsapi"></script>
<script>google.load("language","1");</script>
<script src="linguafranca.js"></script>

Then just apply the lang="" attribute to any of your HTML tags, using the appropriate language code. You can specify your page's native language by applying that same attribute to the HTML tag, or the script can attempt to automatic detection. The script will go through your document, applying a class of lf_translate to those elements, allowing you to style them however you want. Then, just click to toggle between original and translated text. It's THAT simple.

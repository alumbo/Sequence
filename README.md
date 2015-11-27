# Sequence
Play images sequence in JavaScript

<h2>Example html</h2>
<pre>
  &lt;img class='loader' data-sequence-length='10' data-sequence-autoplay='Infinity' src='img/sequence/loader/1.png' alt=''/&gt;
  &lt;img class='arrow' data-sequence-length='6' src='img/sequence/arrow/1.png' alt=''/&gt;
</pre>

<h2>Example JS</h2>
<pre>
  $(function() {
    Sequence.init();
    $('#sequence-arrow').on('mouseenter', function() {
      Sequence.play('arrow');
    });
  });
</pre>
# Sequence
Play images sequence in JavaScript
Example
<pre>
  <img class='loader' data-sequence-length='10' data-sequence-autoplay='Infinity' src='img/sequence/loader/1.png' alt=''/>
  <img class='arrow' data-sequence-length='6' src='img/sequence/arrow/1.png' alt=''/>
</pre>

<pre>
  $(function() {
    Sequence.init();
    $('#sequence-arrow').on('mouseenter', function() {
      Sequence.play('arrow');
    });
  });
</pre>
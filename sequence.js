var Sequence = {
  sequenceContainer: '<div id="{id}" class="sequence"></div>',
  imgPath: 'img/sequence/{id}/{index}.png',
  intervalTime: 50,
  stoped: false,
  _sequenceList: [],
  init:function(options) {
    if(options) {
      for(var optionName in options) {
        this[optionName] = options[optionName];
      }
    }
    this.load();
    this.frame();
  },
  load:function() {
    $('[data-sequence-length]').each($.proxy(function(index, el) {
      var length = $(el).data('sequence-length');
      var id = index;
      var attrId = false;
      if(
        $(el).attr('class') &&
        $(el).attr('class') != '' &&
        $(el).attr('class').split(' ').join('') == $(el).attr('class')
      ) id = $(el).attr('class');
      if(
        $(el).attr('id') &&
        $(el).attr('id') != ''
      ) {
        attrId = true;
        id = $(el).attr('id');
      }
      if(
        $(el).data('sequence-id') &&
        $(el).data('sequence-id') != ''
      ) {
        attrId = false;
        id = $(el).data('sequence-id');
      }
      var loops = 0;
      if($(el).data('sequence-autoplay')) {
        loops = $(el).data('sequence-autoplay') | 0;
        if(String($(el).data('sequence-autoplay')).toLowerCase().substr(0, 3) == 'inf') loops = Infinity;
      }
      $(el).removeAttr('data-sequence-autoplay');
      $(el).removeAttr('data-sequence-length');
      $(el).removeAttr('id');
      attrId = attrId ? id : 'sequence-' + id;
      $(el).after(this.sequenceContainer.split('{id}').join(attrId));
      var $container = $(el).next();
      $container.css('display', $(el).css('display'));
      $container.append($(el));
      for(var indexSequence = 1; indexSequence <= length; indexSequence++) {
        var $img = $(el).clone();
        $img.attr('src', this.imgPath.split('{index}').join(indexSequence).split('{id}').join(id));
        $container.append($img);
        $img.hide();
      }
      var sequence = {
        id : id,
        $container : $container,
        $imgs : $container.find('img'),
        imgLength : $container.find('img').length,
        imgIndex : 0,
        loops : loops
      };
      this._sequenceList.push(sequence);
    }, this));
  },
  play: function(idOrEl, loops) {
    if(loops == undefined) loops = 1;
    if(loops === true) loops = Infinity;
    var sequence = this.getSequenceById(idOrEl);
    if(sequence) {
      sequence.loops = loops;
    }
    else {
      console.error('Sequence \'' + idOrEl + '\' not found');
    }
  },
  stopAll: function() {
    this.stoped = true;
  },
  resumeAll: function() {
    this.stoped = false;
  },
  frame: function() {
    var sequenceIndex = 0;
    var sequenceLength = this._sequenceList.length;
    for(; sequenceIndex < sequenceLength; sequenceIndex++) {
      var sequence = this._sequenceList[sequenceIndex];
      if(sequence.loops > 0) {
        sequence.$imgs.eq(sequence.imgIndex).hide();
        sequence.imgIndex ++;
        if(sequence.imgIndex == sequence.imgLength) {
          sequence.imgIndex = 0;
          sequence.loops--;
        }
        sequence.$imgs.eq(sequence.imgIndex).show();
      }
    }
    if(!this.stoped) setTimeout($.proxy(this.frame, this), this.intervalTime);
  },
  getSequenceById: function(idOrEl, second) {
    var id = null;
    var $el = null;
    if(typeof idOrEl == 'string') {
      id = idOrEl;
    }
    else {
      $el = idOrEl;
    }
    var sequenceIndex = 0;
    var sequenceLength = this._sequenceList.length;
    for(; sequenceIndex < sequenceLength; sequenceIndex++) {
      var sequence = this._sequenceList[sequenceIndex];
      if($el && sequence.$container[0] == $el[0]) return sequence;
      if(id && sequence.id == idOrEl) return sequence;
      if(id && second && sequence.id == 'sequence-' + idOrEl) return sequence;
    }
    if(id && !second) return this.getSequenceById(idOrEl, true);
    return null;
  }
};
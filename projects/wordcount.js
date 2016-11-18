console.log('Hello world!');
function DocumentParser(reader)
{
  this.reader = reader;
  this.reset();
}

DocumentParser.prototype.reset = function()
{
  this.wordCount = 0;
  this.charCount = 0;
  this.lineCount = 0;
};

DocumentParser.prototype.parse = function()
{
  let content = this.reader.getChunk(), char = content, lines = 1, spaces = 0;
  while(char !== '') {
    char = this.reader.getChunk();
    content += char;
  }
  console.log(content);
  this.charCount = content.length;
  for(let i = 0; i < content.length; i++) {
    //TODO: Replace these three wrapped conditions with one regex condition
    if((content[i] === '.' || content[i] === '?' || content[i] === '!') && content[i+1] === ' ' && content[i-1] !== '.') lines++;
  }
  this.lineCount = lines;
  const spaceCheck = content.split('').filter((val, i, arr) => {
    if(val === arr[i+1] && val === ' ') return false;
    else return true;
  });
  spaceCheck.forEach((val) => val === ' ' ? spaces++ : null);
  this.wordCount = spaces + 1;
  return this;

};

function FileReaderSimulator(text)
{
  var index = -1;
  this.getChunk = function()
  {
    index++;
    return index == text.length ? "" : text.charAt(index);
  };
}

var fileContent = "Once upon a time",
  reader = new FileReaderSimulator(fileContent),
  parser = new DocumentParser(reader);

var details = parser.parse();
console.log(details.wordCount);
console.log(details.lineCount);
console.log(details.charCount);






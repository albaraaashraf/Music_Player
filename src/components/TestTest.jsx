export default function TestTest() {
  let jsmediatags = window.jsmediatags;
  console.log(jsmediatags);

  // let aCtx = new AudioContext();
  let audio_file;
  fetch("/src/assets/music/Eye_of_the_Tiger.mp3")
    .then((res) => res.arrayBuffer())
    .then(
      (arrayBuffer) =>
        (audio_file = new File([arrayBuffer], "Eye_of_the_Tiger.mp3"))
    )
    .then(() => {
      jsmediatags.read(audio_file, {
        onSuccess: function (tag) {
          console.log(tag);
        },
        onError: function (error) {
          console.log(error);
        },
      });

      console.log(audio_file);
    });

  return <div>TestTest</div>;
}

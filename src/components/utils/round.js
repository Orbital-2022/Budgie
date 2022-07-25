export default function to2dp (props) {
    var t = String(props);
    props = Number((t.indexOf(".") >= 0) ? (t.substr(0, t.indexOf(".")) + t.substr(t.indexOf("."), 3)) : t);
    return props;
  }
import './DMSans.css';
import '@utilitywarehouse/hearth-fonts/dm-sans.css';

export const DMSans = () => (
  <div>
    <p className="dm-sans" contentEditable="true">
      AaBbCcDdEeFfGgHhIiJjKkLlMmNnOoPpQqRrSsTtUuVvWwXxYyZz
    </p>
    <p className="dm-sans" contentEditable="true">
      0123456789 !@#$%^&*(),.?
    </p>
    <p className="dm-sans bold" contentEditable="true">
      AaBbCcDdEeFfGgHhIiJjKkLlMmNnOoPpQqRrSsTtUuVvWwXxYyZz
    </p>
    <p className="dm-sans bold" contentEditable="true">
      0123456789 !@#$%^&*(),.?
    </p>
  </div>
);

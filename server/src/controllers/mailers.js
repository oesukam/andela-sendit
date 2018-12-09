import dotenv from 'dotenv';
import mailer from '../helpers/mailer';

dotenv.config();
const { URL, FRONT_URL } = process.env;

// Send an email function
const sendConfirmEmail = (user = '') => {
  if (user) {
    const HOST_URL = FRONT_URL || URL;
    const mailBody = `
      <div style="color: #5a5a5a;">
        <div style="border-bottom: 1px solid #3359DF; padding: 15px;">
          <h2 style="color: #3359DF; text-align: center;">SendIT - Email Confirmation</h2>
        </div>
        <p style="font-size: 1.2rem; line-height: 2rem; color: #5a5a5a;">
          Hello ${user.first_name}, <br>
          Thank you for creating an account with us, please proceed to confirm your email.
        <p/>
        <div style="text-align: center; padding: 20px;">
          <a href="${HOST_URL}/#/profile/${user.id}/confirm_email/${user.confirmation_code}"
            style="color: #fff; background-color: #3359DF; padding: 10px 20px; font-size: 1.2rem; text-align: center; text-decoration: none;"
          > Confirm email </a>
          <p style="font-size: 1.5rem; margin-top: 30px; color: #5a5a5a !important">
            Or copy the link below
          <p><br>${HOST_URL}/#/profile/${user.id}/confirm_email/${user.confirmation_code} 
        </div>
        <p style="color: #5a5a5a !important;">Thank you, <br> Andela - SendIT Team</p>
      </div>
    `;
    return mailer({ subject: 'Email confirmation', to: user.email, html: mailBody });
  }
};

// Send a confirmation email function
const sendEmailConfirmed = (user = '') => {
  if (user) {
    const mailBody = `
      <div style="color: #5a5a5a;">
        <div style="border-bottom: 1px solid #3359DF; padding: 15px;">
          <h2 style="color: #3359DF; text-align: center;">SendIT - Email Confirmation</h2>
        </div>
        <p style="font-size: 1.2rem; line-height: 2rem; color: #5a5a5a;">
          Your email <${user.email}> has been confirmed, your are now
          able to make a parcel delivery order
        <p/>
        <p style="color: #5a5a5a !important;">
          Thank you, <br> Andela - SendIT Team
        </p>
      </div>
    `;
    return mailer({ subject: 'Email confirmed', to: user.email, html: mailBody });
  }
};


const sendParcelStatusChanged = (user = '', parcel = '') => {
  if (!user || !parcel) return false;
  const mailBody = `
    <div style="color: #5a5a5a;">
      <div style="border-bottom: 1px solid #3359DF; padding: 15px;">
        <h2 style="color: #3359DF; text-align: center;">SendIT - Parcel Status Changed</h2>
      </div>
      <p style="font-size: 1.2rem; line-height: 2rem; color: #5a5a5a;">
        Dear <strong>${user.first_name} ${user.last_name}</strong>, <br>
        Your parcel status with the following tracking number: ${parcel.tracking_number || parcel.id} 
        was changed to <strong>${parcel.status}</strong>
      <p/>
      <p style="color: #5a5a5a !important;">
        Thank you, <br> Andela - SendIT Team
      </p>
    </div>
  `;
  return mailer({ subject: 'Parcel Status Changed', to: user.email, html: mailBody });
};

const sendParcelLocationChanged = (user = '', parcel = '') => {
  if (!user || !parcel) return false;
  const mailBody = `
    <div style="color: #5a5a5a;">
      <div style="border-bottom: 1px solid #3359DF; padding: 15px;">
        <h2 style="color: #3359DF; text-align: center;">SendIT - Parcel Status Changed</h2>
      </div>
      <p style="font-size: 1.2rem; line-height: 2rem; color: #5a5a5a;">
        Dear <strong>${user.first_name} ${user.last_name}</strong>, <br>
        The current location of your parcel (${parcel.tracking_number || parcel.id}) 
        is at ${parcel.present_location}
      <p/>
      <p style="color: #5a5a5a !important;">
        Thank you, <br> Andela - SendIT Team
      </p>
    </div>
  `;
  return mailer({ subject: 'Parcel Status Changed', to: user.email, html: mailBody });
};

const sendParcelDestinationChanged = (user = '', parcel = '') => {
  if (!user || !parcel) return false;
  const mailBody = `
    <div style="color: #5a5a5a;">
      <div style="border-bottom: 1px solid #3359DF; padding: 15px;">
        <h2 style="color: #3359DF; text-align: center;">SendIT - Parcel Status Changed</h2>
      </div>
      <p style="font-size: 1.2rem; line-height: 2rem; color: #5a5a5a;">
        Dear <strong>${user.first_name} ${user.last_name}</strong>, <br>
        The parcel destination of the tracking number (${parcel.tracking_number || parcel.id}) 
        was changed to:<p/><br><p style="text-transform: capitalize; font-weight: 600;">
        <strong>${parcel.to_province}, ${parcel.to_district}<br>${parcel.receiver_address}</strong></p>
      <p style="color: #5a5a5a !important;">
        Thank you, <br> Andela - SendIT Team
      </p>
    </div>
  `;
  return mailer({ subject: 'Parcel Destination Changed', to: user.email, html: mailBody });
};

export default {
  sendConfirmEmail,
  sendEmailConfirmed,
  sendParcelStatusChanged,
  sendParcelLocationChanged,
  sendParcelDestinationChanged,
};

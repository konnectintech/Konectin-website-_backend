const request = require('supertest');
const { app } = require("../../server");
const User = require("../../models/user.model");

describe('Get user info', () => {

  it('should return user info if email is provided', async () => {
    const user = await User.create({
      email: 'test@example.com',
      fullname: 'testUser'
    });

    const res = await request(app)
      .get('/user/getUserInfo')
      .query({ email: user.email });

    expect(res.status).toBe(200);
    expect(res.body.user.email).toBe(user.email);
  });

  it('should return 404 if user not found', async () => {
    const res = await request(app)
      .get('/user/getUserInfo')
      .query({ email: 'none@example.com' });
    
    expect(res.status).toBe(404); 
  });

});

describe('Get notification settings', () => {

  it('should get notification settings for user', async () => {
    // Create user
    const user = await User.create({
      fullname: 'John',
      email: "johnny@gmail.com",
      notificationSettings: {
        emails: true  
      }
    });
    let userId = user._id

    const res = await request(app)
      .get(`/user/getNotificationSettings?userId=${userId}`)

      expect(res.status).toBe(200);
      expect(res.body.emails).toEqual(user.notificationSettings.emails);
      expect(res.body.pushNotifications).toEqual(user.notificationSettings.pushNotifications);
  });

});

describe('Update user', () => {

  it('should update user details', async () => {
    // Create user
    const user = await User.create({
      fullname: 'John', 
      email: "johnny@gmail.com",
    });

    let userId = user._id
    const update = { fullname: 'Jane' };
    
    const res = await request(app)
      .put(`/user/updateUser?userId=${userId}`) 
      .send(update);

    expect(res.body.fullname).toBe('Jane');
  });
});

describe('Update socials', () => {
  it('should update socials for user', async () => {
    // Create user
    const user = await User.create({
      fullname: 'John',
      email: "johnny@gmail.com",
      socials: {
        github: 'https://github.com/johnny',
        linkedin: 'https://linkedin.com/in/johnny',
      }
    });
    const userId = user._id;

    const update = {
      socials: {
        github: 'https://github.com/jane',
        linkedin: 'https://linkedin.com/in/jane',
      }
    };

    const res = await request(app)
      .put(`/user/updateUser?userId=${userId}`)
      .send(update);

    expect(res.body.socials.github).toBe('https://github.com/jane');
    expect(res.body.socials.linkedin).toBe('https://linkedin.com/in/jane');
  });
});

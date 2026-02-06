# Deployment Checklist

Use this checklist before deploying the Student Housing Billboard application to production.

## Pre-Deployment

### 1. Environment Configuration
- [ ] All environment variables configured in production environment
- [ ] Firebase project created and configured for production
- [ ] Google Maps API keys created and restricted
- [ ] API key restrictions properly configured (domain restrictions)
- [ ] Environment variables stored securely (not in code)

### 2. Firebase Setup
- [ ] Email/Password authentication enabled
- [ ] Firestore database created
- [ ] Firestore security rules configured
- [ ] Sample listings added to database
- [ ] Billing enabled (if needed for production scale)

### 3. Google Cloud Setup
- [ ] Maps JavaScript API enabled
- [ ] Directions API enabled
- [ ] API key created with proper restrictions
- [ ] Billing enabled and quotas reviewed
- [ ] Budget alerts configured

### 4. Code Quality
- [ ] All tests passing (if tests exist)
- [ ] Linter passing (`npm run lint`)
- [ ] TypeScript compilation successful
- [ ] Production build successful (`npm run build`)
- [ ] No console errors in browser
- [ ] No security vulnerabilities in dependencies

### 5. Security
- [ ] Firestore security rules implemented
- [ ] API keys restricted to production domain
- [ ] HTTPS enabled
- [ ] Content Security Policy configured (optional)
- [ ] Rate limiting considered
- [ ] No sensitive data in client code

## Firestore Security Rules

Before deploying, update your Firestore security rules:

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // Users must be authenticated to read listings
    match /listings/{listing} {
      allow read: if request.auth != null;
      // Only allow admins to write (customize as needed)
      allow write: if false;
    }
    
    // Add more collections as needed
    // match /users/{userId} {
    //   allow read, write: if request.auth != null && request.auth.uid == userId;
    // }
  }
}
```

## Deployment Platforms

### Option 1: Vercel (Recommended)

1. Connect GitHub repository to Vercel
2. Add environment variables in Vercel dashboard:
   - `NEXT_PUBLIC_FIREBASE_API_KEY`
   - `NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN`
   - `NEXT_PUBLIC_FIREBASE_PROJECT_ID`
   - `NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET`
   - `NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID`
   - `NEXT_PUBLIC_FIREBASE_APP_ID`
   - `NEXT_PUBLIC_GOOGLE_MAPS_API_KEY`
3. Deploy from main branch
4. Verify deployment

### Option 2: Netlify

1. Connect GitHub repository
2. Build command: `npm run build`
3. Publish directory: `.next`
4. Add environment variables
5. Deploy

### Option 3: Self-Hosted

```bash
# Build the application
npm run build

# Start the production server
npm start

# Or use PM2 for process management
pm2 start npm --name "student-housing" -- start
```

## Post-Deployment

### 1. Verification
- [ ] Homepage loads correctly
- [ ] Login/Signup works
- [ ] Listings page displays data
- [ ] Search functionality works
- [ ] Listing details page loads
- [ ] Map displays correctly
- [ ] Route calculation works
- [ ] Logout works

### 2. Performance
- [ ] Page load times acceptable
- [ ] Images optimized (if added)
- [ ] No console errors
- [ ] Mobile responsive
- [ ] Cross-browser testing

### 3. Monitoring
- [ ] Error tracking setup (e.g., Sentry)
- [ ] Analytics setup (e.g., Google Analytics)
- [ ] Uptime monitoring (e.g., UptimeRobot)
- [ ] Firebase usage monitoring
- [ ] Google Maps API usage monitoring

### 4. Documentation
- [ ] Update README with production URL
- [ ] Document any deployment-specific settings
- [ ] Share credentials with team (securely)
- [ ] Document rollback procedure

## API Usage Monitoring

### Firebase Free Tier Limits
- 50,000 document reads/day
- 20,000 document writes/day
- 1 GB storage
- 10 GB/month data transfer

Monitor usage in Firebase Console.

### Google Maps Free Tier
- $200 credit/month
- ~28,000 map loads free
- Monitor usage in Google Cloud Console
- Set up billing alerts

## Rollback Plan

If issues occur after deployment:

1. Revert to previous Git commit
2. Redeploy from previous working commit
3. Check environment variables
4. Verify Firebase/Google Cloud configurations
5. Check application logs

## Security Incident Response

If a security issue is discovered:

1. Immediately rotate affected API keys
2. Review Firebase audit logs
3. Update Firestore security rules if needed
4. Deploy security patches immediately
5. Notify affected users if necessary

## Maintenance

### Regular Tasks
- [ ] Review Firebase usage monthly
- [ ] Review Google Maps usage monthly
- [ ] Update dependencies quarterly
- [ ] Review security rules quarterly
- [ ] Backup Firestore data regularly

### Scaling Considerations
- Monitor response times
- Consider upgrading Firebase plan
- Implement caching if needed
- Optimize database queries
- Consider CDN for static assets

## Support Contacts

- Firebase Support: https://firebase.google.com/support
- Google Cloud Support: https://cloud.google.com/support
- Next.js Documentation: https://nextjs.org/docs

## Emergency Contacts

List team members responsible for:
- Firebase administration
- Google Cloud administration
- Code deployments
- Security issues
- Customer support

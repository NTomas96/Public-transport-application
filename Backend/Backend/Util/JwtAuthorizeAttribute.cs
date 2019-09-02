using Backend.Models;
using Backend.Models.Web;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Security.Principal;
using System.Text;
using System.Threading;
using System.Threading.Tasks;
using System.Web;
using System.Web.Http.Filters;
using System.Web.Http.Results;

namespace Backend.Util
{
    public class JwtAuthorizeAttribute : Attribute, IAuthenticationFilter
    {
        private UserType[] roles = null;
        public bool DontBlock { get; set; } = false;

        public JwtAuthorizeAttribute()
        {
            this.roles = null;
        }

        public JwtAuthorizeAttribute(UserType[] roles)
        {
            this.roles = roles;
        }

        public bool AllowMultiple { get; set; } = false;

        public async Task AuthenticateAsync(HttpAuthenticationContext context, CancellationToken cancellationToken)
        {
            var request = context.Request;
            var authorization = request.Headers.Authorization;

            if (authorization == null || authorization.Scheme != "Bearer")
            {
                if(!DontBlock) context.ErrorResult = new ErrorApiResult<ErrorApiResponse>(new ErrorApiResponse(1001, "Missing credentials"), request);
                return;
            }
            if (string.IsNullOrEmpty(authorization.Parameter))
            {
                if (!DontBlock) context.ErrorResult = new ErrorApiResult<ErrorApiResponse>(new ErrorApiResponse(1002, "Missing Jwt Token"), request);
                return;
            }

            var token = authorization.Parameter;
            var principal = await AuthenticateJwtToken(token);

            if (principal == null)
            {
                if (!DontBlock) context.ErrorResult = new ErrorApiResult<ErrorApiResponse>(new ErrorApiResponse(1003, "Invalid token"), request);
                return;
            }

            if(this.roles != null && ! roles.Contains(principal.UserType))
            {
                if (!DontBlock) context.ErrorResult = new ErrorApiResult<ErrorApiResponse>(new ErrorApiResponse(1004, "Unauthorized request"), request);
                return;
            }

            context.Principal = principal;   
        }

        public Task ChallengeAsync(HttpAuthenticationChallengeContext context, CancellationToken cancellationToken)
        {
            return Task.FromResult(0);
        }

        private static bool ValidateToken(string token, out int userId, out UserType userRole)
        {
            userId = 0;
            userRole = UserType.Passenger;

            var simplePrinciple = JwtManager.GetPrincipal(token);
            var identity = simplePrinciple?.Identity as ClaimsIdentity;

            if (identity == null)
                return false;

            if (!identity.IsAuthenticated)
                return false;

            var userIdClaim = identity.FindFirst(ClaimTypes.NameIdentifier);

            if (userIdClaim == null)
                return false;

            if (!Int32.TryParse(userIdClaim.Value, out userId))
                return false;

            var userRoleClaim = identity.FindFirst(ClaimTypes.Role);

            if (userRoleClaim == null)
                return false;

            int userRoleInt = -1;

            if (!Int32.TryParse(userRoleClaim.Value, out userRoleInt))
                return false;

            if (!Enum.IsDefined(typeof(UserType), userRoleInt))
                return false;

            userRole = (UserType) userRoleInt;

            return true;
        }

        protected Task<JwtPrincipal> AuthenticateJwtToken(string token)
        {
            int userId;
            UserType userRole;

            if (ValidateToken(token, out userId, out userRole))
            {
                return Task.FromResult(new JwtPrincipal(userId, userRole));
            }

            return Task.FromResult<JwtPrincipal>(null);
        }
    }
}
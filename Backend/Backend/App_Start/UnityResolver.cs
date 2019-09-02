using Backend.Persistence;
using Backend.Persistence.Repository;
using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;
using System.Web;
using System.Web.Http.Dependencies;
using Unity;
using Unity.Lifetime;
using WebApp.Persistence.Repository;
using WebApp.Persistence.UnitOfWork;

namespace Backend.App_Start
{
    public class UnityResolver : IDependencyResolver
    {
        protected IUnityContainer container;

        public UnityResolver(IUnityContainer container)
        {
            if (container == null)
            {
                throw new ArgumentNullException("container");
            }
            this.container = container;
        }

        public object GetService(Type serviceType)
        {
            try
            {
                return container.Resolve(serviceType);
            }
            catch (ResolutionFailedException e)
            {
                Console.WriteLine(e.ToString());
                return null;
            }
        }

        public IEnumerable<object> GetServices(Type serviceType)
        {
            try
            {
                return container.ResolveAll(serviceType);
            }
            catch (ResolutionFailedException e)
            {
                Console.WriteLine(e.ToString());
                return new List<object>();
            }
        }

        public IDependencyScope BeginScope()
        {
            var child = container.CreateChildContainer();
            return new UnityResolver(child);
        }

        public void RegisterTypes()
        {
            // NOTE: To load from web.config uncomment the line below.
            // Make sure to add a Unity.Configuration to the using statements.
            // container.LoadConfiguration();

            // TODO: Register your type's mappings here.
            container.RegisterType<IUserRepository, UserRepository>();
            container.RegisterType<ILineRepository, LineRepository>();
            container.RegisterType<IStationRepository, StationRepository>();
            container.RegisterType<ITimetableRepository, TimetableRepository>();
            container.RegisterType<IPricelistRepository, PricelistRepository>();
            container.RegisterType<IVehicleRepository, VehicleRepository>();

            container.RegisterType<DbContext, AppDbContext>(new PerResolveLifetimeManager());
            container.RegisterType<IUnitOfWork, DemoUnitOfWork>();
        }

        public void Dispose()
        {
            Dispose(true);
        }

        protected virtual void Dispose(bool disposing)
        {
            container.Dispose();
        }
    }
}
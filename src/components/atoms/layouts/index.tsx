
export function AppContainer({ children }: { children: React.ReactNode }) {
  return (
    <div className=" w-full max-h-screen min-h-screen mx-auto bg-white shadow-md overflow-hidden flex flex-col-reverse justify-between md:max-w-[90vw] md:max-h-[90vh] md:min-h-[90vh] md:h-[90vh]  md:w-[90vw] md:min-w-[90vw] md:flex-row m-auto md:rounded-lg">
      {children}
    </div>
  );
}

export function PageContent({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex flex-col items-start justify-start w-full h-full overflow-y-auto md:p-12 md:w-full md:h-full md:min-h-full">
     {children}
  </div>
  );
}
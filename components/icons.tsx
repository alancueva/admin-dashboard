export function UsersIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
      <circle cx="9" cy="7" r="4" />
      <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
      <path d="M16 3.13a4 4 0 0 1 0 7.75" />
    </svg>
  );
}

export function SettingsIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1-1-1.74v-.5a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z" />
      <circle cx="12" cy="12" r="3" />
    </svg>
  );
}

export function SearchIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="11" cy="11" r="8" />
      <path d="m21 21-4.3-4.3" />
    </svg>
  );
}

export function Spinner() {
  return (
    <div className="absolute right-0 top-0 bottom-0 flex items-center justify-center">
      <svg
        className="animate-spin -ml-1 mr-3 h-5 w-5 text-gray-700"
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
      >
        <circle
          className="opacity-25"
          cx="12"
          cy="12"
          r="10"
          stroke="currentColor"
          strokeWidth="4"
        />
        <path
          className="opacity-75"
          fill="currentColor"
          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
        />
      </svg>
    </div>
  );
}

export function Logo() {
  return (
    <svg
      width="32"
      height="32"
      viewBox="0 0 32 32"
      fill="none"
      className="text-gray-100"
      xmlns="http://www.w3.org/2000/svg"
    >
      <rect width="100%" height="100%" rx="16" fill="currentColor" />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M17.6482 10.1305L15.8785 7.02583L7.02979 22.5499H10.5278L17.6482 10.1305ZM19.8798 14.0457L18.11 17.1983L19.394 19.4511H16.8453L15.1056 22.5499H24.7272L19.8798 14.0457Z"
        fill="black"
      />
    </svg>
  );
}

export function VercelLogo(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props} height="64"
      id="Capa_1" data-name="Capa 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 601.71 560.12"><title>stokontrol</title><circle cx="300.86" cy="280.06" r="264.01"/><path d="M373.72,196.63c-22,0-43.14-.55-64.3.18-16.43.57-32.47,3.58-46.23,13.95-16.73,12.6-23.38,29.25-21.41,49.89,2.64,27.59,18.49,44.79,43,55,10.51,4.37,21.5,7.59,32.14,11.66a49.1,49.1,0,0,1,11.71,6.23c10.86,8.1,13.32,24.71,5,36.57A42.46,42.46,0,0,1,321,381.79c-19.6,11.66-40.79,19.74-62.46,26.71-28.17,9.06-57,15.1-86.18,19.7a258,258,0,0,1-29.06,3.08c-11.31.48-20.18-4.73-25.76-14.55-5.7-10-5.51-20.39.36-30.41q41.16-70.26,82.4-140.47Q238.21,181,276,116c10.83-18.57,39.43-18.66,50.68.08,11.69,19.47,23,39.18,34.42,58.79C365.15,181.87,369.21,188.88,373.72,196.63Z" fill="#fff"/><path d="M300.43,432.13c13.51-5.57,27.33-10.5,40.43-16.89,15.93-7.77,29.58-18.67,36.13-35.94,7.8-20.54,7.56-40.95-3.5-60.49-5.91-10.43-15.68-16.52-26.18-21.25-11.09-5-22.61-9-33.75-13.93-6-2.63-12.07-5.53-17.19-9.49-8.93-6.93-9.95-16.87-7.78-27.25a12.55,12.55,0,0,1,7.48-9.12c4.71-1.93,9.79-4.06,14.74-4.14,26.66-.4,53.34-.14,80-.26,2.91,0,4.54.87,6,3.39Q426.52,287.91,456.4,339c9,15.45,18,30.93,27.06,46.33,7.74,13.11,6.33,27.63-4.11,38a27.32,27.32,0,0,1-19.91,8.07q-73.74,0-147.46,0H300.25Z" fill="#fff"/></svg>
  );
}

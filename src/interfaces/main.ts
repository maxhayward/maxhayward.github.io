export interface IBall {
  x: number
  y: number
  vx: number
  vy: number
  r: number
  alpha?: number
  phase?: number
  type?: string
}

export interface IExperience {
  role: string
  company: string
  dates: string
  description: string
  imagePath?: string
}

import { Component } from '@angular/core';

@Component({
  templateUrl: './blocks.component.html'
})
export class BlocksComponent{

  block1: string = `
  <div class="grid grid-nogutter surface-section text-800">
      <div class="col-12 md:col-6 p-6 text-center md:text-left flex align-items-center ">
          <section>
              <span class="block text-6xl font-bold mb-1">Create the screens your</span>
              <div class="text-6xl text-primary font-bold mb-3">your visitors deserve to see</div>
              <p class="mt-0 mb-4 text-700 line-height-3">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>

              <button pButton pRipple label="Learn More" type="button" class="mr-3 p-button-raised"></button>
              <button pButton pRipple label="Live Demo" type="button" class="p-button-outlined"></button>
          </section>
      </div>
      <div class="col-12 md:col-6 overflow-hidden">
          <img src="assets/demo/images/blocks/hero/hero-1.png" alt="Image" class="md:ml-auto block md:h-full" style="clip-path: polygon(8% 0, 100% 0%, 100% 100%, 0 100%)">
      </div>
  </div>`;

      block2: string = `
  <div class="surface-section px-4 py-8 md:px-6 lg:px-8 text-center">
      <div class="mb-3 font-bold text-2xl">
          <span class="text-900">One Product, </span>
          <span class="text-blue-600">Many Solutions</span>
      </div>
      <div class="text-700 text-sm mb-6">Ac turpis egestas maecenas pharetra convallis posuere morbi leo urna.</div>
      <div class="grid">
          <div class="col-12 md:col-4 mb-4 px-5">
              <span class="p-3 shadow-2 mb-3 inline-block surface-card" style="border-radius: 10px">
                  <i class="pi pi-desktop text-4xl text-blue-500"></i>
              </span>
              <div class="text-900 mb-3 font-medium">Built for Developers</div>
              <span class="text-700 text-sm line-height-3">Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.</span>
          </div>
          <div class="col-12 md:col-4 mb-4 px-5">
              <span class="p-3 shadow-2 mb-3 inline-block surface-card" style="border-radius: 10px">
                  <i class="pi pi-lock text-4xl text-blue-500"></i>
              </span>
              <div class="text-900 mb-3 font-medium">End-to-End Encryption</div>
              <span class="text-700 text-sm line-height-3">Risus nec feugiat in fermentum posuere urna nec. Posuere sollicitudin aliquam ultrices sagittis.</span>
          </div>
          <div class="col-12 md:col-4 mb-4 px-5">
              <span class="p-3 shadow-2 mb-3 inline-block surface-card" style="border-radius: 10px">
                  <i class="pi pi-check-circle text-4xl text-blue-500"></i>
              </span>
              <div class="text-900 mb-3 font-medium">Easy to Use</div>
              <span class="text-700 text-sm line-height-3">Ornare suspendisse sed nisi lacus sed viverra tellus. Neque volutpat ac tincidunt vitae semper.</span>
          </div>
          <div class="col-12 md:col-4 mb-4 px-5">
              <span class="p-3 shadow-2 mb-3 inline-block surface-card" style="border-radius: 10px">
                  <i class="pi pi-globe text-4xl text-blue-500"></i>
              </span>
              <div class="text-900 mb-3 font-medium">Fast & Global Support</div>
              <span class="text-700 text-sm line-height-3">Fermentum et sollicitudin ac orci phasellus egestas tellus rutrum tellus.</span>
          </div>
          <div class="col-12 md:col-4 mb-4 px-5">
              <span class="p-3 shadow-2 mb-3 inline-block surface-card" style="border-radius: 10px">
                  <i class="pi pi-github text-4xl text-blue-500"></i>
              </span>
              <div class="text-900 mb-3 font-medium">Open Source</div>
              <span class="text-700 text-sm line-height-3">Nec tincidunt praesent semper feugiat. Sed adipiscing diam donec adipiscing tristique risus nec feugiat. </span>
          </div>
          <div class="col-12 md:col-4 md:mb-4 mb-0 px-3">
              <span class="p-3 shadow-2 mb-3 inline-block surface-card" style="border-radius: 10px">
                  <i class="pi pi-shield text-4xl text-blue-500"></i>
              </span>
              <div class="text-900 mb-3 font-medium">Trusted Securitty</div>
              <span class="text-700 text-sm line-height-3">Mattis rhoncus urna neque viverra justo nec ultrices. Id cursus metus aliquam eleifend.</span>
          </div>
      </div>
  </div>`;

      block3: string = `
  <div class="surface-ground px-4 py-8 md:px-6 lg:px-8">
      <div class="text-900 font-bold text-6xl mb-4 text-center">Pricing Plans</div>
      <div class="text-700 text-xl mb-6 text-center line-height-3">Lorem ipsum dolor sit, amet consectetur adipisicing elit. Velit numquam eligendi quos.</div>

      <div class="grid">
          <div class="col-12 lg:col-4">
              <div class="p-3 h-full">
                  <div class="shadow-2 p-3 h-full flex flex-column surface-card" style="border-radius: 6px">
                      <div class="text-900 font-medium text-xl mb-2">Basic</div>
                      <div class="text-600">Plan description</div>
                      <hr class="my-3 mx-0 border-top-1 border-none surface-border" />
                      <div class="flex align-items-center">
                          <span class="font-bold text-2xl text-900">$9</span>
                          <span class="ml-2 font-medium text-600">per month</span>
                      </div>
                      <hr class="my-3 mx-0 border-top-1 border-none surface-border" />
                      <ul class="list-none p-0 m-0 flex-grow-1">
                          <li class="flex align-items-center mb-3">
                              <i class="pi pi-check-circle text-green-500 mr-2"></i>
                              <span>Arcu vitae elementum</span>
                          </li>
                          <li class="flex align-items-center mb-3">
                              <i class="pi pi-check-circle text-green-500 mr-2"></i>
                              <span>Dui faucibus in ornare</span>
                          </li>
                          <li class="flex align-items-center mb-3">
                              <i class="pi pi-check-circle text-green-500 mr-2"></i>
                              <span>Morbi tincidunt augue</span>
                          </li>
                      </ul>
                      <hr class="mb-3 mx-0 border-top-1 border-none surface-border mt-auto" />
                      <button pButton pRipple label="Buy Now" class="p-3 w-full mt-auto"></button>
                  </div>
              </div>
          </div>

          <div class="col-12 lg:col-4">
              <div class="p-3 h-full">
                  <div class="shadow-2 p-3 h-full flex flex-column surface-card" style="border-radius: 6px">
                      <div class="text-900 font-medium text-xl mb-2">Premium</div>
                      <div class="text-600">Plan description</div>
                      <hr class="my-3 mx-0 border-top-1 border-none surface-border" />
                      <div class="flex align-items-center">
                          <span class="font-bold text-2xl text-900">$29</span>
                          <span class="ml-2 font-medium text-600">per month</span>
                      </div>
                      <hr class="my-3 mx-0 border-top-1 border-none surface-border" />
                      <ul class="list-none p-0 m-0 flex-grow-1">
                          <li class="flex align-items-center mb-3">
                              <i class="pi pi-check-circle text-green-500 mr-2"></i>
                              <span>Arcu vitae elementum</span>
                          </li>
                          <li class="flex align-items-center mb-3">
                              <i class="pi pi-check-circle text-green-500 mr-2"></i>
                              <span>Dui faucibus in ornare</span>
                          </li>
                          <li class="flex align-items-center mb-3">
                              <i class="pi pi-check-circle text-green-500 mr-2"></i>
                              <span>Morbi tincidunt augue</span>
                          </li>
                          <li class="flex align-items-center mb-3">
                              <i class="pi pi-check-circle text-green-500 mr-2"></i>
                              <span>Duis ultricies lacus sed</span>
                          </li>
                      </ul>
                      <hr class="mb-3 mx-0 border-top-1 border-none surface-border" />
                      <button pButton pRipple label="Buy Now" class="p-3 w-full"></button>
                  </div>
              </div>
          </div>

          <div class="col-12 lg:col-4">
              <div class="p-3 h-full">
                  <div class="shadow-2 p-3 flex flex-column surface-card" style="border-radius: 6px">
                      <div class="text-900 font-medium text-xl mb-2">Enterprise</div>
                      <div class="text-600">Plan description</div>
                      <hr class="my-3 mx-0 border-top-1 border-none surface-border" />
                      <div class="flex align-items-center">
                          <span class="font-bold text-2xl text-900">$49</span>
                          <span class="ml-2 font-medium text-600">per month</span>
                      </div>
                      <hr class="my-3 mx-0 border-top-1 border-none surface-border" />
                      <ul class="list-none p-0 m-0 flex-grow-1">
                          <li class="flex align-items-center mb-3">
                              <i class="pi pi-check-circle text-green-500 mr-2"></i>
                              <span>Arcu vitae elementum</span>
                          </li>
                          <li class="flex align-items-center mb-3">
                              <i class="pi pi-check-circle text-green-500 mr-2"></i>
                              <span>Dui faucibus in ornare</span>
                          </li>
                          <li class="flex align-items-center mb-3">
                              <i class="pi pi-check-circle text-green-500 mr-2"></i>
                              <span>Morbi tincidunt augue</span>
                          </li>
                          <li class="flex align-items-center mb-3">
                              <i class="pi pi-check-circle text-green-500 mr-2"></i>
                              <span>Duis ultricies lacus sed</span>
                          </li>
                          <li class="flex align-items-center mb-3">
                              <i class="pi pi-check-circle text-green-500 mr-2"></i>
                              <span>Imperdiet proin</span>
                          </li>
                          <li class="flex align-items-center mb-3">
                              <i class="pi pi-check-circle text-green-500 mr-2"></i>
                              <span>Nisi scelerisque</span>
                          </li>
                      </ul>
                      <hr class="mb-3 mx-0 border-top-1 border-none surface-border" />
                      <button pButton pRipple label="Buy Now" class="p-3 w-full p-button-outlined"></button>
                  </div>
              </div>
          </div>
      </div>
  </div>`;

      block4: string = `
  <div class="surface-section px-4 py-8 md:px-6 lg:px-8">
      <div class="text-700 text-center">
          <div class="text-blue-600 font-bold mb-3"><i class="pi pi-discord"></i>&nbsp;POWERED BY DISCORD</div>
          <div class="text-900 font-bold text-5xl mb-3">Join Our Design Community</div>
          <div class="text-700 text-2xl mb-5">Lorem ipsum dolor sit, amet consectetur adipisicing elit. Velit numquam eligendi quos.</div>
          <button pButton pRipple label="Join Now" icon="pi pi-discord" class="font-bold px-5 py-3 p-button-raised p-button-rounded white-space-nowrap"></button>
      </div>
  </div>`;

      block5: string = `
  <div class="bg-bluegray-900 text-gray-100 p-3 flex justify-content-between lg:justify-content-center align-items-center flex-wrap">
      <div class="font-bold mr-8">🔥 Hot Deals!</div>
      <div class="align-items-center hidden lg:flex">
          <span class="line-height-3">Libero voluptatum atque exercitationem praesentium provident odit.</span>
      </div>
      <a class="flex align-items-center ml-2 mr-8">
          <a class="text-white" href="#"><span class="underline font-bold">Learn More</span></a>
      </a>
      <a pRipple class="flex align-items-center no-underline justify-content-center border-circle text-gray-50 hover:bg-bluegray-700 cursor-pointer transition-colors transition-duration-150" style="width:2rem; height: 2rem">
          <i class="pi pi-times"></i>
      </a>
  </div>`;

      block6: string = `
  <div class="surface-section px-4 py-5 md:px-6 lg:px-8">
      <ul class="list-none p-0 m-0 flex align-items-center font-medium mb-3">
          <li>
              <a class="text-500 no-underline line-height-3 cursor-pointer">Application</a>
          </li>
          <li class="px-2">
              <i class="pi pi-angle-right text-500 line-height-3"></i>
          </li>
          <li>
              <span class="text-900 line-height-3">Analytics</span>
          </li>
      </ul>
      <div class="flex align-items-start flex-column lg:justify-content-between lg:flex-row">
          <div>
              <div class="font-medium text-3xl text-900">Customers</div>
              <div class="flex align-items-center text-700 flex-wrap">
                  <div class="mr-5 flex align-items-center mt-3">
                      <i class="pi pi-users mr-2"></i>
                      <span>332 Active Users</span>
                  </div>
                  <div class="mr-5 flex align-items-center mt-3">
                      <i class="pi pi-globe mr-2"></i>
                      <span>9402 Sessions</span>
                  </div>
                  <div class="flex align-items-center mt-3">
                      <i class="pi pi-clock mr-2"></i>
                      <span>2.32m Avg. Duration</span>
                  </div>
              </div>
          </div>
          <div class="mt-3 lg:mt-0">
              <button pButton pRipple label="Add" class="p-button-outlined mr-2" icon="pi pi-user-plus"></button>
              <button pButton pRipple label="Save" icon="pi pi-check"></button>
          </div>
      </div>
  </div>`;

      block7: string = `
  <div class="surface-ground px-4 py-5 md:px-6 lg:px-8">
      <div class="grid">
          <div class="col-12 md:col-6 lg:col-3">
              <div class="surface-card shadow-2 p-3 border-round">
                  <div class="flex justify-content-between mb-3">
                      <div>
                          <span class="block text-500 font-medium mb-3">Orders</span>
                          <div class="text-900 font-medium text-xl">152</div>
                      </div>
                      <div class="flex align-items-center justify-content-center bg-blue-100 border-round" style="width:2.5rem;height:2.5rem">
                          <i class="pi pi-shopping-cart text-blue-500 text-xl"></i>
                      </div>
                  </div>
                  <span class="text-green-500 font-medium">24 new </span>
                  <span class="text-500">since last visit</span>
              </div>
          </div>
          <div class="col-12 md:col-6 lg:col-3">
              <div class="surface-card shadow-2 p-3 border-round">
                  <div class="flex justify-content-between mb-3">
                      <div>
                          <span class="block text-500 font-medium mb-3">Revenue</span>
                          <div class="text-900 font-medium text-xl">$2.100</div>
                      </div>
                      <div class="flex align-items-center justify-content-center bg-orange-100 border-round" style="width:2.5rem;height:2.5rem">
                          <i class="pi pi-map-marker text-orange-500 text-xl"></i>
                      </div>
                  </div>
                  <span class="text-green-500 font-medium">%52+ </span>
                  <span class="text-500">since last week</span>
              </div>
          </div>
          <div class="col-12 md:col-6 lg:col-3">
              <div class="surface-card shadow-2 p-3 border-round">
                  <div class="flex justify-content-between mb-3">
                      <div>
                          <span class="block text-500 font-medium mb-3">Customers</span>
                          <div class="text-900 font-medium text-xl">28441</div>
                      </div>
                      <div class="flex align-items-center justify-content-center bg-cyan-100 border-round" style="width:2.5rem;height:2.5rem">
                          <i class="pi pi-inbox text-cyan-500 text-xl"></i>
                      </div>
                  </div>
                  <span class="text-green-500 font-medium">520  </span>
                  <span class="text-500">newly registered</span>
              </div>
          </div>
          <div class="col-12 md:col-6 lg:col-3">
              <div class="surface-card shadow-2 p-3 border-round">
                  <div class="flex justify-content-between mb-3">
                      <div>
                          <span class="block text-500 font-medium mb-3">Comments</span>
                          <div class="text-900 font-medium text-xl">152 Unread</div>
                      </div>
                      <div class="flex align-items-center justify-content-center bg-purple-100 border-round" style="width:2.5rem;height:2.5rem">
                          <i class="pi pi-comment text-purple-500 text-xl"></i>
                      </div>
                  </div>
                  <span class="text-green-500 font-medium">85 </span>
                  <span class="text-500">responded</span>
              </div>
          </div>
      </div>
  </div>`;

      block8: string = `
  <div class="surface-card p-4 shadow-2 border-round w-full lg:w-6">
      <div class="text-center mb-5">
          <img src="assets/demo/images/blocks/logos/hyper.svg" alt="Image" height="50" class="mb-3">
          <div class="text-900 text-3xl font-medium mb-3">Welcome Back</div>
          <span class="text-600 font-medium line-height-3">Don't have an account?</span>
          <a class="font-medium no-underline ml-2 text-blue-500 cursor-pointer">Create today!</a>
      </div>

      <div>
          <label for="email1" class="block text-900 font-medium mb-2">Email</label>
          <input id="email1" type="text" pInputText class="w-full mb-3">

          <label for="password1" class="block text-900 font-medium mb-2">Password</label>
          <input id="password1" type="password" pInputText class="w-full mb-3">

          <div class="flex align-items-center justify-content-between mb-6">
              <div class="flex align-items-center">
                  <p-checkbox id="rememberme1" [binary]="true" styleClass="mr-2"></p-checkbox>
                  <label for="rememberme1">Remember me</label>
              </div>
              <a class="font-medium no-underline ml-2 text-blue-500 text-right cursor-pointer">Forgot password?</a>
          </div>

          <button pButton pRipple label="Sign In" icon="pi pi-user" class="w-full"></button>
      </div>
  </div>`;

      block9: string = `
  <div class="surface-section">
      <div class="font-medium text-3xl text-900 mb-3">Movie Information</div>
      <div class="text-500 mb-5">Morbi tristique blandit turpis. In viverra ligula id nulla hendrerit rutrum.</div>
      <ul class="list-none p-0 m-0">
          <li class="flex align-items-center py-3 px-2 border-top-1 surface-border flex-wrap">
              <div class="text-500 w-6 md:w-2 font-medium">Title</div>
              <div class="text-900 w-full md:w-8 md:flex-order-0 flex-order-1">Heat</div>
              <div class="w-6 md:w-2 flex justify-content-end">
                  <button pButton pRipple label="Edit" icon="pi pi-pencil" class="p-button-text"></button>
              </div>
          </li>
          <li class="flex align-items-center py-3 px-2 border-top-1 surface-border flex-wrap">
              <div class="text-500 w-6 md:w-2 font-medium">Genre</div>
              <div class="text-900 w-full md:w-8 md:flex-order-0 flex-order-1">
                  <p-chip label="Crime" class="mr-2"></p-chip>
                  <p-chip label="Drama" class="mr-2"></p-chip>
                  <p-chip label="Thriller"></p-chip>
              </div>
              <div class="w-6 md:w-2 flex justify-content-end">
                  <button pButton pRipple label="Edit" icon="pi pi-pencil" class="p-button-text"></button>
              </div>
          </li>
          <li class="flex align-items-center py-3 px-2 border-top-1 surface-border flex-wrap">
              <div class="text-500 w-6 md:w-2 font-medium">Director</div>
              <div class="text-900 w-full md:w-8 md:flex-order-0 flex-order-1">Michael Mann</div>
              <div class="w-6 md:w-2 flex justify-content-end">
                  <button pButton pRipple label="Edit" icon="pi pi-pencil" class="p-button-text"></button>
              </div>
          </li>
          <li class="flex align-items-center py-3 px-2 border-top-1 surface-border flex-wrap">
              <div class="text-500 w-6 md:w-2 font-medium">Actors</div>
              <div class="text-900 w-full md:w-8 md:flex-order-0 flex-order-1">Robert De Niro, Al Pacino</div>
              <div class="w-6 md:w-2 flex justify-content-end">
                  <button pButton pRipple label="Edit" icon="pi pi-pencil" class="p-button-text"></button>
              </div>
          </li>
          <li class="flex align-items-center py-3 px-2 border-top-1 border-bottom-1 surface-border flex-wrap">
              <div class="text-500 w-6 md:w-2 font-medium">Plot</div>
              <div class="text-900 w-full md:w-8 md:flex-order-0 flex-order-1 line-height-3">
                  A group of professional bank robbers start to feel the heat from police
                   when they unknowingly leave a clue at their latest heist.</div>
              <div class="w-6 md:w-2 flex justify-content-end">
                  <button pButton pRipple label="Edit" icon="pi pi-pencil" class="p-button-text"></button>
              </div>
          </li>
      </ul>
  </div>`;

      block10: string = `
  <div class="surface-card p-4 shadow-2 border-round">
      <div class="text-3xl font-medium text-900 mb-3">Card Title</div>
      <div class="font-medium text-500 mb-3">Vivamus id nisl interdum, blandit augue sit amet, eleifend mi.</div>
      <div style="height: 150px" class="border-2 border-dashed surface-border"></div>
  </div>`;

}

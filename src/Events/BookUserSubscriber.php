<?php

namespace App\Events;

use ApiPlatform\Core\EventListener\EventPriorities;
use App\Entity\Book;
use Symfony\Component\EventDispatcher\EventSubscriberInterface;
use Symfony\Component\HttpKernel\Event\ViewEvent;
use Symfony\Component\HttpKernel\KernelEvents;
use Symfony\Component\Security\Core\Security;

class BookUserSubscriber implements EventSubscriberInterface
{
    /**
     * @var Security
     */
    private $security;

    /**
     * BookUserSubscriber constructor.
     * @param Security $security
     */
    public function __construct(Security $security)
    {
        $this->security = $security;
    }

    public static function getSubscribedEvents()
    {
        return [
            KernelEvents::VIEW => ['setUserForBook', EventPriorities::PRE_VALIDATE]
        ];
    }

    public function setUserForBook(ViewEvent $event)
    {
        $book = $event->getControllerResult();
        $method = $event->getRequest()->getMethod();
        $user = $this->security->getUser();

        if ($book instanceof Book && $method === 'POST') {
            $book->setUser($user);
        }

    }

}